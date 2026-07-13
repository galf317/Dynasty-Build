
window.MULTIPLAYER_ACTIVE = false;

let roomCode = null;
let roomRef = null;
let firebaseUser = null;
let isHost = false;
let roomPlayers = {};
let multiplayerBuildStarted = false;

const multiEl = id => document.getElementById(id);

function firebaseConfigured(){
  const config = window.FIREBASE_CONFIG;
  return Boolean(config && config.apiKey && config.databaseURL);
}

async function initializeFirebase(){
  try{
    if(!firebaseConfigured()){
      showFirebaseMessage("Firebase configuration is missing.");
      return false;
    }

    if(!firebase.apps.length){
      firebase.initializeApp(window.FIREBASE_CONFIG);
    }

    await firebase.auth().signInAnonymously();
    firebaseUser = firebase.auth().currentUser;
    return Boolean(firebaseUser);
  }catch(error){
    console.error(error);
    showFirebaseMessage("Firebase could not connect: " + error.message);
    return false;
  }
}

function showFirebaseMessage(message){
  const box = multiEl("firebaseMessage");
  box.textContent = message;
  box.classList.remove("hidden");
}

function generateRoomCode(){
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";

  for(let index = 0; index < 6; index++){
    code += characters[Math.floor(Math.random() * characters.length)];
  }

  return code;
}

function cleanDisplayName(){
  return multiEl("multiplayerName").value.trim().slice(0,16) || "Player";
}

function roomPlayer(displayName){
  return {
    uid: firebaseUser.uid,
    name: displayName,
    status: "waiting",
    joinedAt: firebase.database.ServerValue.TIMESTAMP
  };
}

async function createMultiplayerRoom(){
  if(!await initializeFirebase()) return;

  roomCode = generateRoomCode();
  roomRef = firebase.database().ref("rooms/" + roomCode);
  isHost = true;
  window.MULTIPLAYER_ACTIVE = true;

  await roomRef.set({
    host: firebaseUser.uid,
    status: "lobby",
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    players: {
      [firebaseUser.uid]: roomPlayer(cleanDisplayName())
    }
  });

  enterLobby();
}

async function joinMultiplayerRoom(){
  const enteredCode = multiEl("roomCodeInput").value.trim().toUpperCase();

  if(enteredCode.length !== 6){
    alert("Enter the 6-character room code.");
    return;
  }

  if(!await initializeFirebase()) return;

  roomCode = enteredCode;
  roomRef = firebase.database().ref("rooms/" + roomCode);

  const snapshot = await roomRef.once("value");

  if(!snapshot.exists()){
    alert("Room not found.");
    return;
  }

  const room = snapshot.val();
  const existingPlayers = room.players || {};
  const existingPlayerIds = Object.keys(existingPlayers);

  if(existingPlayerIds.length >= 3 && !existingPlayers[firebaseUser.uid]){
    alert("This room already has three players.");
    return;
  }

  if(room.status !== "lobby"){
    alert("This match has already started.");
    return;
  }

  isHost = room.host === firebaseUser.uid;
  window.MULTIPLAYER_ACTIVE = true;

  await roomRef.child("players/" + firebaseUser.uid).set(
    roomPlayer(cleanDisplayName())
  );

  enterLobby();
}

function enterLobby(){
  show("lobby");
  multiEl("roomCodeDisplay").textContent = roomCode;

  roomRef.child("players").on("value", snapshot => {
    roomPlayers = snapshot.val() || {};
    renderLobby();
  });

  roomRef.child("status").on("value", snapshot => {
    if(snapshot.val() === "building" && !multiplayerBuildStarted){
      multiplayerBuildStarted = true;
      beginMultiplayerBuild();
    }
  });
}

function renderLobby(){
  const players = Object.values(roomPlayers);

  multiEl("lobbyPlayers").innerHTML = players.map(player => `
    <div class="lobby-player">
      <strong>${escapeHtml(player.name)}</strong>
      <span class="status-${player.status}">${player.status}</span>
    </div>
  `).join("");

  multiEl("startMultiplayerMatch").classList.toggle(
    "hidden",
    !isHost || players.length < 2
  );
}

function escapeHtml(value){
  return String(value)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

async function startMultiplayerRoom(){
  const playerCount = Object.keys(roomPlayers).length;

  if(playerCount < 2){
    alert("At least two players are required.");
    return;
  }

  await roomRef.update({
    status: "building",
    startedAt: firebase.database.ServerValue.TIMESTAMP
  });
}

function beginMultiplayerBuild(){
  demoMode = false;

  const currentRoomPlayer = roomPlayers[firebaseUser.uid];
  name = currentRoomPlayer ? currentRoomPlayer.name : "Player";

  step = 0;
  picks = [];
  respins = 2;
  usedTraits = [];

  roomRef.child("players/" + firebaseUser.uid).update({
    status: "building"
  });

  show("draw");
  renderTrait();
}

window.submitMultiplayerResult = async function(champion){
  const result = {
    name,
    position: pos,
    overall: overall(),
    wins,
    losses,
    champion: Boolean(champion),
    traits: picks,
    draftTeam: team ? team[0] : "",
    finishedAt: firebase.database.ServerValue.TIMESTAMP
  };

  await roomRef.child("players/" + firebaseUser.uid).update({
    status: "finished",
    result
  });

  if(!window.__LEADERBOARD_SUBMITTED){
    window.__LEADERBOARD_SUBMITTED=true;
    await firebase.database().ref("leaderboard").push({
      uid: firebaseUser.uid,
      name: result.name,
      position: result.position,
      overall: result.overall,
      wins: result.wins,
      losses: result.losses,
      champion: result.champion,
      draftTeam: result.draftTeam,
      submittedAt: firebase.database.ServerValue.TIMESTAMP
    });
  }

  show("multiplayerResults");
  multiEl("multiplayerResultsList").innerHTML =
    '<div class="demo-log">Waiting for the other players to finish…</div>';

  roomRef.child("players").on("value", snapshot => {
    const players = Object.values(snapshot.val() || {});
    const finishedPlayers = players.filter(player => player.result);

    if(players.length >= 2 && finishedPlayers.length === players.length){
      showMultiplayerLeaderboard(finishedPlayers);
    }
  });
};

function multiplayerScore(result){
  return (
    result.overall * 10000 +
    result.wins * 100 +
    (result.champion ? 5000 : 0)
  );
}

function showMultiplayerLeaderboard(players){
  players.sort(
    (first, second) =>
      multiplayerScore(second.result) - multiplayerScore(first.result)
  );

  const medals = ["🥇","🥈","🥉"];

  multiEl("multiplayerResultsList").innerHTML = players.map((player,index) => `
    <div class="result-rank ${index === 0 ? "winner" : ""}">
      <div class="place">${medals[index] || ""}</div>

      <div>
        <strong>${escapeHtml(player.result.name)}</strong>
        <div class="muted">
          ${player.result.position} •
          ${player.result.wins}-${player.result.losses}
          ${player.result.champion ? " • Champion" : ""}
        </div>
      </div>

      <div class="score">${player.result.overall}</div>
    </div>
  `).join("");
}


function careerLeaderboardEntry(champion){
  return {
    uid: firebaseUser ? firebaseUser.uid : "",
    name: String(name || "Player").slice(0,16),
    position: pos || "",
    overall: Number(overall()) || 0,
    wins: Number(wins) || 0,
    losses: Number(losses) || 0,
    champion: Boolean(champion),
    draftTeam: team ? team[0] : "",
    submittedAt: firebase.database.ServerValue.TIMESTAMP
  };
}

window.recordLeaderboardResult = async function(champion){
  try{
    if(!await initializeFirebase()) return;
    await firebase.database().ref("leaderboard").push(
      careerLeaderboardEntry(champion)
    );
  }catch(error){
    console.error("Leaderboard submission failed:", error);
  }
};

function leaderboardSort(first,second){
  if(second.wins !== first.wins) return second.wins - first.wins;
  if(first.losses !== second.losses) return first.losses - second.losses;
  if(Number(second.champion) !== Number(first.champion)){
    return Number(second.champion) - Number(first.champion);
  }
  if(second.overall !== first.overall) return second.overall - first.overall;
  return (second.submittedAt || 0) - (first.submittedAt || 0);
}

async function loadLeaderboard(){
  show("leaderboard");
  multiEl("leaderboardList").innerHTML =
    '<div class="demo-log">Loading leaderboard…</div>';

  if(!await initializeFirebase()){
    multiEl("leaderboardList").innerHTML =
      '<div class="demo-log">The leaderboard could not connect to Firebase.</div>';
    return;
  }

  const snapshot = await firebase.database().ref("leaderboard").once("value");

  const entries = Object.values(snapshot.val() || {})
    .filter(entry =>
      entry &&
      typeof entry.wins === "number" &&
      typeof entry.losses === "number"
    )
    .sort(leaderboardSort)
    .slice(0,25);

  if(!entries.length){
    multiEl("leaderboardList").innerHTML =
      '<div class="demo-log">No completed careers yet. Finish a season to claim the first spot.</div>';
    return;
  }

  const medals = ["🥇","🥈","🥉"];

  multiEl("leaderboardList").innerHTML = entries.map((entry,index) => `
    <div class="leaderboard-row ${index < 3 ? "top-three" : ""}">
      <div class="leaderboard-rank">${medals[index] || index + 1}</div>

      <div class="leaderboard-player">
        <strong>${escapeHtml(entry.name)}</strong>
        <small>
          ${escapeHtml(entry.position)} • ${entry.overall} OVR
          ${entry.champion ? " • Champion" : ""}
          ${entry.draftTeam ? " • " + escapeHtml(entry.draftTeam) : ""}
        </small>
      </div>

      <div class="leaderboard-record">
        ${entry.wins}-${entry.losses}
        <small>${entry.wins} WINS</small>
      </div>
    </div>
  `).join("");
}

multiEl("modeSolo").onclick = () => {
  window.MULTIPLAYER_ACTIVE = false;
  multiEl("multiplayerSetup").classList.add("hidden");
  multiEl("modeSolo").classList.add("selected");
  multiEl("modeMulti").classList.remove("selected");
};

multiEl("modeMulti").onclick = () => {
  multiEl("multiplayerSetup").classList.remove("hidden");
  multiEl("modeMulti").classList.add("selected");
  multiEl("modeSolo").classList.remove("selected");
  multiEl("multiplayerSetup").scrollIntoView({behavior:"smooth"});
};

multiEl("modeDemo").onclick = () => multiEl("demoBtn").click();
multiEl("createRoom").onclick = createMultiplayerRoom;
multiEl("toggleJoin").onclick = () =>
  multiEl("joinRoomFields").classList.toggle("hidden");
multiEl("joinRoom").onclick = joinMultiplayerRoom;
multiEl("startMultiplayerMatch").onclick = startMultiplayerRoom;

multiEl("copyInviteLink").onclick = async () => {
  const inviteLink =
    location.origin + location.pathname + "?room=" + roomCode;

  try{
    await navigator.clipboard.writeText(inviteLink);
    alert("Invite link copied.");
  }catch(error){
    prompt("Copy this invite link:", inviteLink);
  }
};

multiEl("returnHome").onclick = () => {
  location.href = location.pathname;
};

(function loadRoomCodeFromInvite(){
  const inviteRoomCode =
    new URLSearchParams(location.search).get("room");

  if(inviteRoomCode){
    multiEl("multiplayerSetup").classList.remove("hidden");
    multiEl("joinRoomFields").classList.remove("hidden");
    multiEl("roomCodeInput").value = inviteRoomCode.toUpperCase();
    multiEl("modeMulti").classList.add("selected");
    multiEl("modeSolo").classList.remove("selected");
  }
})();

multiEl("modeLeaderboard").onclick = loadLeaderboard;
multiEl("refreshLeaderboard").onclick = loadLeaderboard;
multiEl("leaderboardHome").onclick = () => show("start");

window.loadDeveloperDashboard=async function(){
 const connection=multiEl("developerConnection");
 connection.className="dev-connection";
 connection.textContent="Connecting to Firebase…";

 try{
   if(!await initializeFirebase())throw new Error("Firebase connection failed");
   connection.classList.add("online");
   connection.textContent="Firebase connected • Live data loaded";

   const snapshot=await firebase.database().ref("leaderboard").once("value");
   const entries=Object.values(snapshot.val()||{});

   const total=entries.length;
   const champions=entries.filter(e=>e.champion).length;
   const highest=total?Math.max(...entries.map(e=>Number(e.overall)||0)):0;
   const average=total?(entries.reduce((s,e)=>s+(Number(e.overall)||0),0)/total).toFixed(1):"0.0";

   const positions={};
   entries.forEach(e=>positions[e.position]=(positions[e.position]||0)+1);
   const topPosition=Object.entries(positions).sort((a,b)=>b[1]-a[1])[0]?.[0]||"—";

   const best=entries.sort((a,b)=>{
     if((b.wins||0)!==(a.wins||0))return (b.wins||0)-(a.wins||0);
     return (a.losses||0)-(b.losses||0);
   })[0];

   multiEl("devTotalCareers").textContent=total;
   multiEl("devChampionships").textContent=champions;
   multiEl("devHighestOverall").textContent=highest;
   multiEl("devAverageOverall").textContent=average;
   multiEl("devTopPosition").textContent=topPosition;
   multiEl("devBestRecord").textContent=best?`${best.wins}-${best.losses}`:"—";
 }catch(error){
   connection.classList.add("offline");
   connection.textContent="Firebase unavailable • " + error.message;
 }
};
