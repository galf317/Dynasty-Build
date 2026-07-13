
const TRAITS={
QB:[["Arm Strength","Deep velocity and tight-window power"],["Accuracy","Ball placement at every level"],["Legs","Rushing and escape ability"],["Pocket Presence","Movement and pressure awareness"],["Decision Making","Reading coverage and limiting mistakes"],["Leadership","Commanding the huddle"],["Clutch","Late-game performance"],["Durability","Availability over a full season"]],
RB:[["Speed","Long speed and acceleration"],["Power","Finishing through contact"],["Vision","Reading blocks and leverage"],["Hands","Receiving out of the backfield"],["Elusiveness","Making defenders miss"],["Pass Protection","Keeping the quarterback clean"],["Leadership","Setting the offensive tone"],["Durability","Handling a heavy workload"]],
WR:[["Speed","Vertical burst and acceleration"],["Hands","Securing difficult catches"],["Route Running","Creating separation with precision"],["Release","Beating press coverage"],["Contested Catch","Winning when covered"],["YAC","Creating yards after the catch"],["Football IQ","Finding space against coverage"],["Clutch","Delivering in big moments"]]
};

/*
 Ratings are fictional gameplay values. Each team has starters and depth options.
 The roster pool is intentionally broad rather than star-only.
*/
const ROSTERS=[
["Arizona Cardinals","🐦",{
 QB:[["Kyler Murray",87,"Starter"],["Jacoby Brissett",73,"Backup"]],
 RB:[["James Conner",84,"Starter"],["Trey Benson",76,"Rotation"]],
 WR:[["Marvin Harrison Jr.",88,"Starter"],["Michael Wilson",78,"Starter"],["Greg Dortch",72,"Depth"]]}],
["Atlanta Falcons","🦅",{
 QB:[["Michael Penix Jr.",82,"Starter"],["Kirk Cousins",78,"Veteran backup"]],
 RB:[["Bijan Robinson",94,"Starter"],["Tyler Allgeier",78,"Backup"]],
 WR:[["Drake London",89,"Starter"],["Darnell Mooney",80,"Starter"],["Ray-Ray McCloud",72,"Depth"]]}],
["Baltimore Ravens","🐦‍⬛",{
 QB:[["Lamar Jackson",97,"Starter"],["Cooper Rush",72,"Backup"]],
 RB:[["Derrick Henry",94,"Starter"],["Justice Hill",75,"Backup"]],
 WR:[["Zay Flowers",87,"Starter"],["Rashod Bateman",79,"Starter"],["DeAndre Hopkins",80,"Rotation"]]}],
["Buffalo Bills","🦬",{
 QB:[["Josh Allen",98,"Starter"],["Mitchell Trubisky",70,"Backup"]],
 RB:[["James Cook",89,"Starter"],["Ray Davis",76,"Backup"]],
 WR:[["Khalil Shakir",84,"Starter"],["Keon Coleman",80,"Starter"],["Curtis Samuel",74,"Rotation"]]}],
["Carolina Panthers","🐆",{
 QB:[["Bryce Young",82,"Starter"],["Andy Dalton",71,"Backup"]],
 RB:[["Chuba Hubbard",84,"Starter"],["Jonathon Brooks",76,"Rotation"]],
 WR:[["Tetairoa McMillan",82,"Starter"],["Xavier Legette",76,"Starter"],["Adam Thielen",79,"Veteran"]]}],
["Chicago Bears","🐻",{
 QB:[["Caleb Williams",86,"Starter"],["Tyson Bagent",70,"Backup"]],
 RB:[["D'Andre Swift",82,"Starter"],["Roschon Johnson",73,"Backup"]],
 WR:[["DJ Moore",88,"Starter"],["Rome Odunze",84,"Starter"],["Luther Burden III",78,"Rotation"]]}],
["Cincinnati Bengals","🐅",{
 QB:[["Joe Burrow",97,"Starter"],["Jake Browning",72,"Backup"]],
 RB:[["Chase Brown",84,"Starter"],["Samaje Perine",73,"Backup"]],
 WR:[["Ja'Marr Chase",98,"Starter"],["Tee Higgins",90,"Starter"],["Andrei Iosivas",73,"Depth"]]}],
["Cleveland Browns","🟤",{
 QB:[["Joe Flacco",75,"Veteran"],["Kenny Pickett",72,"Competition"],["Dillon Gabriel",70,"Rookie"]],
 RB:[["Jerome Ford",77,"Rotation"],["Quinshon Judkins",79,"Rookie"]],
 WR:[["Jerry Jeudy",84,"Starter"],["Cedric Tillman",75,"Starter"],["Diontae Johnson",76,"Rotation"]]}],
["Dallas Cowboys","⭐",{
 QB:[["Dak Prescott",90,"Starter"],["Joe Milton III",70,"Backup"]],
 RB:[["Javonte Williams",77,"Starter"],["Jaydon Blue",72,"Rookie"]],
 WR:[["CeeDee Lamb",96,"Starter"],["George Pickens",87,"Starter"],["Jalen Tolbert",74,"Depth"]]}],
["Denver Broncos","🐴",{
 QB:[["Bo Nix",87,"Starter"],["Jarrett Stidham",70,"Backup"]],
 RB:[["RJ Harvey",78,"Rookie"],["Jaleel McLaughlin",72,"Rotation"]],
 WR:[["Courtland Sutton",87,"Starter"],["Marvin Mims Jr.",81,"Starter"],["Troy Franklin",73,"Depth"]]}],
["Detroit Lions","🦁",{
 QB:[["Jared Goff",91,"Starter"],["Hendon Hooker",70,"Backup"]],
 RB:[["Jahmyr Gibbs",95,"Starter"],["David Montgomery",86,"Rotation"]],
 WR:[["Amon-Ra St. Brown",95,"Starter"],["Jameson Williams",86,"Starter"],["Kalif Raymond",71,"Depth"]]}],
["Green Bay Packers","🧀",{
 QB:[["Jordan Love",88,"Starter"],["Malik Willis",73,"Backup"]],
 RB:[["Josh Jacobs",90,"Starter"],["MarShawn Lloyd",72,"Backup"]],
 WR:[["Jayden Reed",84,"Starter"],["Romeo Doubs",80,"Starter"],["Dontayvion Wicks",75,"Rotation"]]}],
["Houston Texans","🤘",{
 QB:[["C.J. Stroud",90,"Starter"],["Davis Mills",71,"Backup"]],
 RB:[["Joe Mixon",86,"Starter"],["Dameon Pierce",72,"Backup"]],
 WR:[["Nico Collins",93,"Starter"],["Christian Kirk",82,"Starter"],["Jayden Higgins",76,"Rookie"]]}],
["Indianapolis Colts","🐎",{
 QB:[["Anthony Richardson",79,"Starter"],["Daniel Jones",75,"Competition"]],
 RB:[["Jonathan Taylor",91,"Starter"],["Tyler Goodson",70,"Backup"]],
 WR:[["Michael Pittman Jr.",85,"Starter"],["Josh Downs",83,"Starter"],["Alec Pierce",77,"Starter"]]}],
["Jacksonville Jaguars","🐆",{
 QB:[["Trevor Lawrence",86,"Starter"],["Nick Mullens",70,"Backup"]],
 RB:[["Travis Etienne Jr.",82,"Starter"],["Tank Bigsby",76,"Rotation"]],
 WR:[["Brian Thomas Jr.",92,"Starter"],["Travis Hunter",84,"Rookie"],["Dyami Brown",73,"Depth"]]}],
["Kansas City Chiefs","🏹",{
 QB:[["Patrick Mahomes",99,"Starter"],["Gardner Minshew",73,"Backup"]],
 RB:[["Isiah Pacheco",84,"Starter"],["Kareem Hunt",77,"Rotation"]],
 WR:[["Rashee Rice",87,"Starter"],["Xavier Worthy",85,"Starter"],["Marquise Brown",78,"Rotation"]]}],
["Las Vegas Raiders","☠️",{
 QB:[["Geno Smith",84,"Starter"],["Aidan O'Connell",71,"Backup"]],
 RB:[["Ashton Jeanty",88,"Rookie starter"],["Zamir White",71,"Backup"]],
 WR:[["Jakobi Meyers",84,"Starter"],["Tre Tucker",74,"Starter"],["Jack Bech",76,"Rookie"]]}],
["Los Angeles Chargers","⚡",{
 QB:[["Justin Herbert",94,"Starter"],["Trey Lance",69,"Backup"]],
 RB:[["Najee Harris",81,"Starter"],["Omarion Hampton",82,"Rookie"]],
 WR:[["Ladd McConkey",90,"Starter"],["Quentin Johnston",78,"Starter"],["Tre Harris",75,"Rookie"]]}],
["Los Angeles Rams","🐏",{
 QB:[["Matthew Stafford",90,"Starter"],["Jimmy Garoppolo",72,"Backup"]],
 RB:[["Kyren Williams",88,"Starter"],["Blake Corum",75,"Backup"]],
 WR:[["Puka Nacua",94,"Starter"],["Davante Adams",91,"Starter"],["Tutu Atwell",73,"Depth"]]}],
["Miami Dolphins","🐬",{
 QB:[["Tua Tagovailoa",88,"Starter"],["Zach Wilson",70,"Backup"]],
 RB:[["De'Von Achane",91,"Starter"],["Jaylen Wright",75,"Backup"]],
 WR:[["Tyreek Hill",94,"Starter"],["Jaylen Waddle",88,"Starter"],["Nick Westbrook-Ikhine",73,"Depth"]]}],
["Minnesota Vikings","🟣",{
 QB:[["J.J. McCarthy",81,"Starter"],["Sam Howell",71,"Backup"]],
 RB:[["Aaron Jones",84,"Starter"],["Jordan Mason",78,"Rotation"]],
 WR:[["Justin Jefferson",99,"Starter"],["Jordan Addison",85,"Starter"],["Jalen Nailor",73,"Depth"]]}],
["New England Patriots","🇺🇸",{
 QB:[["Drake Maye",88,"Starter"],["Joshua Dobbs",70,"Backup"]],
 RB:[["Rhamondre Stevenson",82,"Starter"],["TreVeyon Henderson",80,"Rookie"]],
 WR:[["Stefon Diggs",87,"Starter"],["DeMario Douglas",77,"Starter"],["Kyle Williams",74,"Rookie"]]}],
["New Orleans Saints","⚜️",{
 QB:[["Tyler Shough",75,"Rookie"],["Spencer Rattler",71,"Competition"]],
 RB:[["Alvin Kamara",88,"Starter"],["Kendre Miller",73,"Backup"]],
 WR:[["Chris Olave",88,"Starter"],["Rashid Shaheed",81,"Starter"],["Brandin Cooks",76,"Veteran"]]}],
["New York Giants","🔵",{
 QB:[["Russell Wilson",80,"Starter"],["Jaxson Dart",77,"Rookie"],["Jameis Winston",73,"Backup"]],
 RB:[["Tyrone Tracy Jr.",80,"Starter"],["Cam Skattebo",75,"Rookie"]],
 WR:[["Malik Nabers",93,"Starter"],["Darius Slayton",79,"Starter"],["Wan'Dale Robinson",78,"Slot"]]}],
["New York Jets","✈️",{
 QB:[["Justin Fields",82,"Starter"],["Tyrod Taylor",72,"Backup"]],
 RB:[["Breece Hall",88,"Starter"],["Braelon Allen",76,"Backup"]],
 WR:[["Garrett Wilson",92,"Starter"],["Josh Reynolds",76,"Starter"],["Allen Lazard",72,"Depth"]]}],
["Philadelphia Eagles","🦅",{
 QB:[["Jalen Hurts",93,"Starter"],["Tanner McKee",72,"Backup"]],
 RB:[["Saquon Barkley",98,"Starter"],["Will Shipley",73,"Backup"]],
 WR:[["A.J. Brown",94,"Starter"],["DeVonta Smith",89,"Starter"],["Jahan Dotson",74,"Depth"]]}],
["Pittsburgh Steelers","🟡",{
 QB:[["Mason Rudolph",73,"Competition"],["Will Howard",70,"Rookie"]],
 RB:[["Jaylen Warren",82,"Starter"],["Kaleb Johnson",77,"Rookie"]],
 WR:[["DK Metcalf",91,"Starter"],["Calvin Austin III",75,"Starter"],["Roman Wilson",72,"Depth"]]}],
["San Francisco 49ers","⛏️",{
 QB:[["Brock Purdy",91,"Starter"],["Mac Jones",72,"Backup"]],
 RB:[["Christian McCaffrey",94,"Starter"],["Isaac Guerendo",75,"Backup"]],
 WR:[["Brandon Aiyuk",87,"Starter"],["Jauan Jennings",82,"Starter"],["Ricky Pearsall",79,"Rotation"]]}],
["Seattle Seahawks","🦅",{
 QB:[["Sam Darnold",86,"Starter"],["Drew Lock",70,"Backup"]],
 RB:[["Kenneth Walker III",86,"Starter"],["Zach Charbonnet",78,"Rotation"]],
 WR:[["Jaxon Smith-Njigba",91,"Starter"],["Cooper Kupp",86,"Starter"],["Marquez Valdes-Scantling",72,"Depth"]]}],
["Tampa Bay Buccaneers","🏴‍☠️",{
 QB:[["Baker Mayfield",90,"Starter"],["Kyle Trask",69,"Backup"]],
 RB:[["Bucky Irving",89,"Starter"],["Rachaad White",80,"Rotation"]],
 WR:[["Mike Evans",91,"Starter"],["Chris Godwin",88,"Starter"],["Emeka Egbuka",79,"Rookie"]]}],
["Tennessee Titans","⚔️",{
 QB:[["Cam Ward",82,"Rookie starter"],["Brandon Allen",69,"Backup"]],
 RB:[["Tony Pollard",83,"Starter"],["Tyjae Spears",78,"Rotation"]],
 WR:[["Calvin Ridley",85,"Starter"],["Tyler Lockett",80,"Veteran"],["Elic Ayomanor",73,"Rookie"]]}],
["Washington Commanders","🛡️",{
 QB:[["Jayden Daniels",94,"Starter"],["Marcus Mariota",72,"Backup"]],
 RB:[["Brian Robinson Jr.",83,"Starter"],["Austin Ekeler",79,"Rotation"]],
 WR:[["Terry McLaurin",91,"Starter"],["Deebo Samuel",85,"Starter"],["Noah Brown",73,"Depth"]]}]
];


const LEGENDS={
"Arizona Cardinals":{
 QB:[["Kurt Warner",97,"All-Time Legend"]],
 RB:[["Ottis Anderson",94,"All-Time Legend"]],
 WR:[["Larry Fitzgerald",99,"All-Time Legend"]]
},
"Atlanta Falcons":{
 QB:[["Matt Ryan",96,"All-Time Legend"]],
 RB:[["Michael Turner",92,"All-Time Legend"]],
 WR:[["Julio Jones",98,"All-Time Legend"]]
},
"Baltimore Ravens":{
 QB:[["Joe Flacco",92,"All-Time Legend"]],
 RB:[["Jamal Lewis",96,"All-Time Legend"]],
 WR:[["Derrick Mason",92,"All-Time Legend"]]
},
"Buffalo Bills":{
 QB:[["Jim Kelly",97,"All-Time Legend"]],
 RB:[["Thurman Thomas",97,"All-Time Legend"]],
 WR:[["Andre Reed",96,"All-Time Legend"]]
},
"Carolina Panthers":{
 QB:[["Cam Newton",97,"All-Time Legend"]],
 RB:[["DeAngelo Williams",92,"All-Time Legend"]],
 WR:[["Steve Smith Sr.",97,"All-Time Legend"]]
},
"Chicago Bears":{
 QB:[["Jim McMahon",90,"All-Time Legend"]],
 RB:[["Walter Payton",99,"All-Time Legend"]],
 WR:[["Harlon Hill",94,"All-Time Legend"]]
},
"Cincinnati Bengals":{
 QB:[["Ken Anderson",96,"All-Time Legend"]],
 RB:[["Corey Dillon",95,"All-Time Legend"]],
 WR:[["Chad Johnson",96,"All-Time Legend"]]
},
"Cleveland Browns":{
 QB:[["Otto Graham",99,"All-Time Legend"]],
 RB:[["Jim Brown",99,"All-Time Legend"]],
 WR:[["Paul Warfield",97,"All-Time Legend"]]
},
"Dallas Cowboys":{
 QB:[["Roger Staubach",98,"All-Time Legend"]],
 RB:[["Emmitt Smith",99,"All-Time Legend"]],
 WR:[["Michael Irvin",97,"All-Time Legend"]]
},
"Denver Broncos":{
 QB:[["John Elway",99,"All-Time Legend"]],
 RB:[["Terrell Davis",98,"All-Time Legend"]],
 WR:[["Rod Smith",95,"All-Time Legend"]]
},
"Detroit Lions":{
 QB:[["Bobby Layne",95,"All-Time Legend"]],
 RB:[["Barry Sanders",99,"All-Time Legend"]],
 WR:[["Calvin Johnson",99,"All-Time Legend"]]
},
"Green Bay Packers":{
 QB:[["Brett Favre",98,"All-Time Legend"]],
 RB:[["Ahman Green",94,"All-Time Legend"]],
 WR:[["Don Hutson",99,"All-Time Legend"]]
},
"Houston Texans":{
 QB:[["Matt Schaub",89,"Franchise Legend"]],
 RB:[["Arian Foster",96,"Franchise Legend"]],
 WR:[["Andre Johnson",98,"Franchise Legend"]]
},
"Indianapolis Colts":{
 QB:[["Peyton Manning",99,"All-Time Legend"]],
 RB:[["Edgerrin James",97,"All-Time Legend"]],
 WR:[["Marvin Harrison",99,"All-Time Legend"]]
},
"Jacksonville Jaguars":{
 QB:[["Mark Brunell",94,"Franchise Legend"]],
 RB:[["Fred Taylor",96,"Franchise Legend"]],
 WR:[["Jimmy Smith",96,"Franchise Legend"]]
},
"Kansas City Chiefs":{
 QB:[["Len Dawson",97,"All-Time Legend"]],
 RB:[["Priest Holmes",97,"All-Time Legend"]],
 WR:[["Otis Taylor",95,"All-Time Legend"]]
},
"Las Vegas Raiders":{
 QB:[["Ken Stabler",97,"All-Time Legend"]],
 RB:[["Marcus Allen",98,"All-Time Legend"]],
 WR:[["Tim Brown",98,"All-Time Legend"]]
},
"Los Angeles Chargers":{
 QB:[["Dan Fouts",97,"All-Time Legend"]],
 RB:[["LaDainian Tomlinson",99,"All-Time Legend"]],
 WR:[["Lance Alworth",99,"All-Time Legend"]]
},
"Los Angeles Rams":{
 QB:[["Kurt Warner",98,"All-Time Legend"]],
 RB:[["Eric Dickerson",99,"All-Time Legend"]],
 WR:[["Isaac Bruce",98,"All-Time Legend"]]
},
"Miami Dolphins":{
 QB:[["Dan Marino",99,"All-Time Legend"]],
 RB:[["Larry Csonka",97,"All-Time Legend"]],
 WR:[["Mark Clayton",95,"All-Time Legend"]]
},
"Minnesota Vikings":{
 QB:[["Fran Tarkenton",98,"All-Time Legend"]],
 RB:[["Adrian Peterson",99,"All-Time Legend"]],
 WR:[["Randy Moss",99,"All-Time Legend"]]
},
"New England Patriots":{
 QB:[["Tom Brady",99,"All-Time Legend"]],
 RB:[["Corey Dillon",94,"All-Time Legend"]],
 WR:[["Stanley Morgan",96,"All-Time Legend"]]
},
"New Orleans Saints":{
 QB:[["Drew Brees",99,"All-Time Legend"]],
 RB:[["Deuce McAllister",94,"All-Time Legend"]],
 WR:[["Marques Colston",95,"All-Time Legend"]]
},
"New York Giants":{
 QB:[["Eli Manning",96,"All-Time Legend"]],
 RB:[["Tiki Barber",96,"All-Time Legend"]],
 WR:[["Amani Toomer",93,"All-Time Legend"]]
},
"New York Jets":{
 QB:[["Joe Namath",97,"All-Time Legend"]],
 RB:[["Curtis Martin",98,"All-Time Legend"]],
 WR:[["Don Maynard",98,"All-Time Legend"]]
},
"Philadelphia Eagles":{
 QB:[["Randall Cunningham",97,"All-Time Legend"]],
 RB:[["LeSean McCoy",97,"All-Time Legend"]],
 WR:[["Harold Carmichael",96,"All-Time Legend"]]
},
"Pittsburgh Steelers":{
 QB:[["Terry Bradshaw",97,"All-Time Legend"]],
 RB:[["Franco Harris",97,"All-Time Legend"]],
 WR:[["Hines Ward",96,"All-Time Legend"]]
},
"San Francisco 49ers":{
 QB:[["Joe Montana",99,"All-Time Legend"]],
 RB:[["Frank Gore",97,"All-Time Legend"]],
 WR:[["Jerry Rice",99,"All-Time Legend"]]
},
"Seattle Seahawks":{
 QB:[["Russell Wilson",96,"Franchise Legend"]],
 RB:[["Shaun Alexander",97,"All-Time Legend"]],
 WR:[["Steve Largent",99,"All-Time Legend"]]
},
"Tampa Bay Buccaneers":{
 QB:[["Doug Williams",92,"Franchise Legend"]],
 RB:[["Mike Alstott",95,"All-Time Legend"]],
 WR:[["Keyshawn Johnson",91,"Franchise Legend"]]
},
"Tennessee Titans":{
 QB:[["Warren Moon",98,"Oilers/Titans Legend"]],
 RB:[["Earl Campbell",99,"Oilers/Titans Legend"]],
 WR:[["Ernest Givins",93,"Oilers/Titans Legend"]]
},
"Washington Commanders":{
 QB:[["Sammy Baugh",99,"All-Time Legend"]],
 RB:[["John Riggins",98,"All-Time Legend"]],
 WR:[["Art Monk",98,"All-Time Legend"]]
}
};

function getFullPositionPool(teamName,position,currentPool){
 const legends=(LEGENDS[teamName]&&LEGENDS[teamName][position])||[];
 return [...currentPool,...legends];
}

const NFL_DRAFT_TEAMS=ROSTERS.map((team,index)=>[
  team[0],
  team[1],
  74 + ((index*7)%16),
  73 + ((index*11)%17),
  72 + ((index*13)%18)
]);
const OPP=["Chicago Grizzlies","Miami Waves","Seattle Steel","Dallas Wranglers","Boston Rebels","Phoenix Firebirds","Nashville Notes","Las Vegas Aces","Carolina Flight","Denver Peaks","Detroit Motors","Atlanta Empire","New York Knights","Houston Launch","Los Angeles Stars","Minnesota Frost"];

const $=x=>document.getElementById(x);
let pos="QB",name="",step=0,picks=[],current=null,team=null,wins=0,losses=0,week=0,stats={},round=0,respins=2,usedTraits=[],demoMode=false,demoTimer=null;
function show(id){["start","draw","built","draft","season","playoffs","final","lobby","multiplayerResults","leaderboard"].forEach(x=>$(x).classList.toggle("hidden",x!==id));scrollTo({top:0,behavior:"smooth"})}
document.querySelectorAll(".pos").forEach(b=>b.onclick=()=>{document.querySelectorAll(".pos").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");pos=b.dataset.pos});
$("begin").onclick=()=>{window.__LEADERBOARD_SUBMITTED=false;demoMode=false;name=$("name").value.trim()||"Rookie One";step=0;picks=[];respins=2;usedTraits=[];show("draw");renderTrait()};

$("demoBtn").onclick=()=>{
 demoMode=true;
 pos=["QB","RB","WR"][Math.floor(Math.random()*3)];
 name=["Marcus Reed","Dante Brooks","Jordan Hayes","Cameron Price"][Math.floor(Math.random()*4)];
 step=0;picks=[];respins=2;usedTraits=[];
 $("demoIntro").classList.remove("hidden");
 show("draw");
 renderTrait();
 setTimeout(runDemoSpin,600);
};

function runDemoSpin(){
 if(!demoMode||step>=8)return;
 $("drawBtn").click();
 setTimeout(demoEvaluatePlayer,3300);
}

function demoEvaluatePlayer(){
 if(!demoMode||!current)return;
 const remaining=TRAITS[pos].map(x=>x[0]).filter(t=>!usedTraits.includes(t));
 const options=remaining.map(trait=>({trait,rating:traitRating(current.base,trait)})).sort((a,b)=>b.rating-a.rating);
 const best=options[0];
 const weakPlayer=current.base<76;
 const weakTrait=best.rating<76;
 if(respins>0&&(weakPlayer||weakTrait)){
   respins--;
   $("respinCount").textContent=`${respins} respin${respins===1?"":"s"} left`;
   $("traitChoicePanel").classList.add("hidden");
   $("drawBtn").classList.remove("hidden");
   $("drawBtn").textContent="Spin again";
   setTimeout(()=>$("drawBtn").click(),500);
   setTimeout(demoEvaluatePlayer,3800);
   return;
 }
 setTimeout(()=>selectTrait(best.trait,best.rating),700);
}

function demoContinueAfterBuild(){
 if(!demoMode)return;
 setTimeout(()=>$("draftBtn").click(),900);
 setTimeout(()=>$("seasonBtn").click(),1900);
 setTimeout(()=>$("all").click(),2800);
}

function renderTrait(){
 $("posChip").textContent=pos+" BUILD";
 $("stepChip").textContent=`${step+1} / 8`;
 $("bar").style.width=`${step/8*100}%`;
 $("trait").textContent="Spin for a player";
 $("desc").textContent=`Watch the full depth-chart reel. The center card is your player; the cards beside it show who you narrowly missed.`;
 $("teamReel").innerHTML='<div><div class="team-logo">🎰</div><div class="team-name">Tap spin</div></div>';
 $("playerIdle").classList.remove("hidden");
 $("playerIdle").textContent="Waiting for team…";
 $("playerWindow").classList.add("hidden");
 $("nearMissCopy").classList.add("hidden");
 $("nearMissCopy").textContent="";
 $("playerStrip").style.transition="none";
 $("playerStrip").style.transform="translateX(0)";
 $("playerStrip").innerHTML="";
 $("drawBtn").classList.remove("hidden");
 $("drawBtn").disabled=false;
 $("drawBtn").textContent="Spin team & player";
 $("traitChoicePanel").classList.add("hidden");
 $("respinCount").textContent=`${respins} respin${respins===1?"":"s"} left`;
}

function buildWeightedPlayerSequence(pool){
 const weighted=[];
 pool.forEach(p=>{
   const label=p[2].toLowerCase();
   const copies=label.includes("legend") ? 1 :
                label.includes("starter") ? 2 :
                label.includes("rookie") ? 2 :
                label.includes("rotation") ? 3 :
                label.includes("backup") ? 4 :
                label.includes("depth") ? 5 : 3;
   for(let i=0;i<copies;i++)weighted.push(p);
 });
 const seq=[];
 for(let loop=0;loop<5;loop++){
   const shuffled=[...weighted].sort(()=>Math.random()-.5);
   seq.push(...shuffled);
 }
 return seq;
}

function renderPlayerStrip(sequence,selectedIndex,traitName){
 $("playerStrip").innerHTML=sequence.map((p,i)=>{
   const isLegend=p[2].toLowerCase().includes("legend");
   return `<div class="player-tile ${isLegend?"legend":""}" data-index="${i}">
     ${isLegend?'<div class="legend-tag">LEGEND</div>':""}
     <div class="tile-depth">${p[2]}</div>
     <div class="tile-name">${p[0]}</div>
     <div class="tile-rating">${p[1]}</div>
   </div>`;
 }).join("");

 const tiles=[...document.querySelectorAll(".player-tile")];
 if(tiles[selectedIndex])tiles[selectedIndex].classList.add("selected");
 for(let i=selectedIndex-1;i>=0;i--){
   if(sequence[i][0]!==sequence[selectedIndex][0]){
     if(tiles[i])tiles[i].classList.add("near-miss");
     break;
   }
 }
 for(let i=selectedIndex+1;i<sequence.length;i++){
   if(sequence[i][0]!==sequence[selectedIndex][0]){
     if(tiles[i])tiles[i].classList.add("near-miss");
     break;
   }
 }

 $("playerIdle").classList.add("hidden");
 $("playerWindow").classList.remove("hidden");

 const selectedTile=tiles[selectedIndex];
 const viewport=$("playerWindow").clientWidth;
 const selectedCenter=selectedTile.offsetLeft+(selectedTile.offsetWidth/2);
 const target=selectedCenter-(viewport/2);
 $("playerStrip").style.transition="none";
 $("playerStrip").style.transform="translateX(0)";
 requestAnimationFrame(()=>{
   requestAnimationFrame(()=>{
     $("playerStrip").style.transition="transform 2.65s cubic-bezier(.12,.72,.10,1)";
     $("playerStrip").style.transform=`translateX(${-target}px)`;
   });
 });

 const selected=sequence[selectedIndex];

 let left=null;
 for(let i=selectedIndex-1;i>=0;i--){
   if(sequence[i][0]!==selected[0]){left=sequence[i];break;}
 }

 let right=null;
 for(let i=selectedIndex+1;i<sequence.length;i++){
   if(sequence[i][0]!==selected[0]){right=sequence[i];break;}
 }

 const tease=[];
 if(left)tease.push(`${left[0]} was one slot away`);
 if(right)tease.push(`${right[0]} was one slot away`);
 $("nearMissCopy").textContent=`Selected: ${selected[0]}${tease.length?" • "+tease.join(" • "):""}`;
 $("nearMissCopy").classList.remove("hidden");
 return selected;
}

$("drawBtn").onclick=()=>{
 $("drawBtn").disabled=true;
 $("teamReel").classList.add("spinning");
 $("playerReel").classList.add("spinning");
 let teamFlashes=0;
 const teamInterval=setInterval(()=>{
   const temp=ROSTERS[Math.floor(Math.random()*ROSTERS.length)];
   $("teamReel").innerHTML=`<div><div class="team-logo">${temp[1]}</div><div class="team-name">${temp[0]}</div></div>`;
   teamFlashes++;
   if(teamFlashes>=18){
     clearInterval(teamInterval);
     const selectedTeam=ROSTERS[Math.floor(Math.random()*ROSTERS.length)];
     $("teamReel").classList.remove("spinning");
     $("teamReel").innerHTML=`<div><div class="team-logo">${selectedTeam[1]}</div><div class="team-name">${selectedTeam[0]}</div></div>`;

     const pool=getFullPositionPool(selectedTeam[0],pos,selectedTeam[2][pos]);
     const sequence=buildWeightedPlayerSequence(pool);
     const minIndex=Math.max(6,Math.floor(sequence.length*.55));
     const maxIndex=Math.max(minIndex+1,sequence.length-4);
     const selectedIndex=Math.floor(minIndex+Math.random()*(maxIndex-minIndex));
     const p=sequence[selectedIndex];

     $("playerReel").classList.remove("spinning");
     renderPlayerStrip(sequence,selectedIndex,"");

     setTimeout(()=>{
       current={team:selectedTeam[0],logo:selectedTeam[1],player:p[0],depth:p[2],base:p[1],isLegend:p[2].toLowerCase().includes("legend")};
       $("confirmedPlayerName").textContent=current.player;
       $("confirmedPlayerMeta").textContent=`${current.team} • ${current.depth}${current.isLegend?" • LEGEND":""} • Traits stay near ${current.base} OVR`;
       $("confirmedBaseRating").textContent=current.base;
       $("traitChoicePanel").classList.remove("hidden");
       $("respinCount").textContent=`${respins} respin${respins===1?"":"s"} left`;
       $("respinBtn").disabled=respins<=0||demoMode;
       renderTraitChoices();
       $("drawBtn").classList.add("hidden");
       $("drawBtn").disabled=false;
     },2750);
   }
 },90);
};
function traitRating(playerBase, traitName){
 const all=TRAITS[pos].map(x=>x[0]);
 const idx=all.indexOf(traitName);
 const nameSeed=[...current.player].reduce((s,c)=>s+c.charCodeAt(0),0);

 // Stable player-to-trait variation limited to -3 through +3.
 const profileOffset=((nameSeed + idx*13) % 7)-3;

 // Small position-category bias, never enough to turn a backup into a superstar.
 let categoryBias=0;
 if(pos==="QB"){
   if(["Arm Strength","Accuracy","Pocket Presence","Decision Making"].includes(traitName))categoryBias=1;
   if(["Legs","Leadership","Clutch","Durability"].includes(traitName))categoryBias=0;
 }
 if(pos==="RB"){
   if(["Speed","Power","Vision","Elusiveness"].includes(traitName))categoryBias=1;
 }
 if(pos==="WR"){
   if(["Speed","Hands","Route Running","Release"].includes(traitName))categoryBias=1;
 }

 const isLegend=current.depth.toLowerCase().includes("legend");
 const maxSwing=isLegend?3:4;
 const raw=playerBase+profileOffset+categoryBias;

 // Hard cap around the player's true base rating.
 return Math.max(
   60,
   Math.min(
     99,
     Math.max(playerBase-maxSwing,Math.min(playerBase+maxSwing,raw))
   )
 );
}

function renderTraitChoices(){
 if(!current||!current.player){
   alert("Player selection failed. Please spin again.");
   return;
 }
 $("confirmedPlayerName").textContent=current.player;
 $("confirmedPlayerMeta").textContent=`${current.team} • ${current.depth}${current.isLegend?" • LEGEND":""} • Traits stay near ${current.base} OVR`;
 $("confirmedBaseRating").textContent=current.base;
 const remaining=TRAITS[pos].map(x=>x[0]).filter(t=>!usedTraits.includes(t));
 $("traitChoices").innerHTML=remaining.map(trait=>{
   const rating=traitRating(current.base,trait);
   return `<button class="trait-choice" data-trait="${trait}" data-rating="${rating}">
     <b>${trait}</b><span>${rating}</span>
   </button>`;
 }).join("");
 document.querySelectorAll(".trait-choice").forEach(btn=>{
   btn.onclick=()=>selectTrait(btn.dataset.trait,Number(btn.dataset.rating));
 });
}

function selectTrait(trait,rating){
 picks.push({trait,team:current.team,logo:current.logo,player:current.player,depth:current.depth,rating});
 usedTraits.push(trait);
 step++;
 if(step<8){renderTrait();if(demoMode)setTimeout(runDemoSpin,650);}else{renderBuilt();if(demoMode)demoContinueAfterBuild();}
}

$("respinBtn").onclick=()=>{
 if(respins<=0)return;
 respins--;
 $("respinCount").textContent=`${respins} respin${respins===1?"":"s"} left`;
 $("traitChoicePanel").classList.add("hidden");
 $("drawBtn").classList.remove("hidden");
 $("drawBtn").textContent="Spin again";
 $("drawBtn").click();
};

function overall(){return Math.round(picks.reduce((a,b)=>a+b.rating,0)/picks.length)}
function renderBuilt(){show("built");const o=overall();$("builtName").textContent=`${name} • ${pos}`;$("ovr").textContent=o;$("grade").textContent=o>=92?"A rare superstar build.":o>=85?"A strong playoff-caliber build.":o>=78?"A solid but flawed starter.":o>=70?"A difficult developmental build.":"A true underdog challenge.";$("buildList").innerHTML=picks.map(p=>`<div class="build-row"><span>${p.trait}<br><small>${p.team} • ${p.depth}</small></span><span>${p.player}</span><b>${p.rating}</b></div>`).join("")}
$("draftBtn").onclick=()=>{team=NFL_DRAFT_TEAMS[Math.floor(Math.random()*NFL_DRAFT_TEAMS.length)];show("draft");$("logo").textContent=team[1];$("teamname").textContent=team[0];$("teammeta").textContent=`Team OVR ${Math.round((team[2]+team[3]+team[4])/3)} • Player ${overall()} OVR`;$("roster").innerHTML=`<div><b>${team[2]}</b>Pass offense</div><div><b>${team[3]}</b>Run offense</div><div><b>${team[4]}</b>Defense</div>`;$("story").textContent=`The ${team[0]} select ${name}, a ${overall()} overall ${pos}. The team fit and every chosen trait influence the season simulation.`};
$("seasonBtn").onclick=()=>{wins=0;losses=0;week=0;round=0;stats=pos==="QB"?{yards:0,td:0,to:0}:pos==="RB"?{yards:0,td:0,rec:0}:{yards:0,td:0,rec:0};$("log").innerHTML="";$("seasonTeam").textContent=team[0];show("season");updateRecord()};
function impact(){return (overall()-82)*.65+picks.filter(x=>x.rating>=90).length*.35}
function sim(playoff=false){const opp=OPP[Math.floor(Math.random()*OPP.length)],base=(team[2]+team[3]+team[4])/3,oppOvr=77+Math.random()*12+(playoff?3:0);let ours=Math.max(7,Math.round(17+(base-78)*.6+impact()+Math.random()*14)),theirs=Math.max(7,Math.round(18+(oppOvr-78)*.8+Math.random()*14));if(ours===theirs)ours+=3;let line="";if(pos==="QB"){const y=Math.round(180+(overall()-72)*6+Math.random()*115),td=Math.max(0,Math.round((ours-8)/11+Math.random())),to=Math.random()<(overall()<78?.55:.32)?1:0;stats.yards+=y;stats.td+=td;stats.to+=to;line=`${y} YDS • ${td} TD • ${to} INT`}if(pos==="RB"){const y=Math.round(40+(overall()-68)*3+Math.random()*72),td=Math.random()<ours/36?1:0,rec=Math.round(Math.random()*5);stats.yards+=y;stats.td+=td;stats.rec+=rec;line=`${y} RUSH YDS • ${td} TD • ${rec} REC`}if(pos==="WR"){const rec=Math.max(1,Math.round(2+(overall()-68)*.18+Math.random()*5)),y=Math.round(rec*(8+Math.random()*8)),td=Math.random()<ours/36?1:0;stats.yards+=y;stats.td+=td;stats.rec+=rec;line=`${rec} REC • ${y} YDS • ${td} TD`}return{opp,ours,theirs,win:ours>theirs,line}}
function updateRecord(){$("record").textContent=`${wins}-${losses}`;$("next").disabled=week>=17;$("all").disabled=week>=17}
function add(g){week++;g.win?wins++:losses++;$("log").insertAdjacentHTML("beforeend",`<div class="game"><div class="wk">WK ${week}</div><div><b class="${g.win?"win":"loss"}">${g.win?"W":"L"} ${g.ours}-${g.theirs}</b><div>vs ${g.opp}</div></div><div class="line">${g.line}</div></div>`);$("log").scrollTop=$("log").scrollHeight;updateRecord();if(week>=17)setTimeout(endSeason,500)}
$("next").onclick=()=>add(sim());$("all").onclick=()=>{const r=()=>{if(week<17){add(sim());setTimeout(r,90)}};r()};
function endSeason(){if(wins<9&&!(wins===8&&Math.random()<.35)){finish(false,`The ${team[0]} finished ${wins}-${losses} and missed the playoffs.`);return}show("playoffs");$("playoffIntro").textContent=`The ${team[0]} finished ${wins}-${losses}. Four wins stand between this build and a championship.`;$("playoffLog").innerHTML="";$("playoffBtn").classList.remove("hidden");$("playoffBtn").textContent="Sim Wild Card";if(demoMode)setTimeout(()=>$("playoffBtn").click(),900)}
$("playoffBtn").onclick=()=>{const names=["Wild Card","Divisional Round","Conference Championship","Championship"],g=sim(true),r=names[round];$("playoffLog").insertAdjacentHTML("beforeend",`<div class="playoff ${g.win?"won":"lost"}"><b>${r}: <span class="${g.win?"win":"loss"}">${g.win?"WIN":"LOSS"} ${g.ours}-${g.theirs}</span></b><div>vs ${g.opp}</div><div class="muted">${name}: ${g.line}</div></div>`);if(!g.win){$("playoffBtn").classList.add("hidden");setTimeout(()=>finish(false,`The season ended in the ${r}.`),650);return}round++;if(round>=4){$("playoffBtn").classList.add("hidden");setTimeout(()=>finish(true,`${name} carried the ${team[0]} to a championship!`),650)}else $("playoffBtn").textContent=`Sim ${names[round]}`};
function finish(champ,text){
 if(window.MULTIPLAYER_ACTIVE){window.submitMultiplayerResult(champ);return;}
 if(window.recordLeaderboardResult&&!window.__LEADERBOARD_SUBMITTED){
   window.__LEADERBOARD_SUBMITTED=true;
   window.recordLeaderboardResult(champ);
 }
 show("final");$("trophy").textContent=champ?"🏆":"🏈";$("finalTitle").textContent=champ?"Champions!":"Season Complete";$("finalText").textContent=text;const labels=pos==="QB"?[["PASS YDS",stats.yards],["PASS TD",stats.td],["INT",stats.to]]:pos==="RB"?[["RUSH YDS",stats.yards],["TOTAL TD",stats.td],["REC",stats.rec]]:[["REC YDS",stats.yards],["REC TD",stats.td],["REC",stats.rec]];$("finalStats").innerHTML=labels.map(x=>`<div class="stat"><b>${x[1]}</b>${x[0]}</div>`).join("")}
$("again").onclick=()=>show("start");
