let airports = [];
let airlines = [];
let weights_airports = [];
let weights_airlines = [];
var my_chance = new Chance(); // instantiate a Chance instance https://github.com/chancejs/chancejs
let currentQuestion = null;
let mode = 'airport';
let score = 0;
let totalQuestions = 0;
const loc_indi = `Code,Location,Alt1,Alt2
WMKJ,Johor,Senai,
WMKI,Ipoh,,
WMKK,KL International,Kuala Lumpur,KLIA
WMKL,Langkawi,,
WMKP,Penang,,
WBSB,Brunei,,
WBGG,Kuching,,
WBGR,Miri,,
WBKK,Kota Kinabalu,Kinabalu,
WBKW,Tawau,,
WBKS,Sandakan,,
WIBB,Pekan Baru,,
WIDD,Batam,,
WIDN,Tg Pinang,Tanjung Pinang,
WIII,Jakarta International,Jakarta,
WIMM,Medan,,
WAAA,Ujung Pandang,,
WADD,Denpasar,,
WALL,Balikpapan,,
WAMM,Manado,,
WAHI,Yogyakarta International,Yogyakarta,
WAHH,Yogyakarta Adisucipto International,Yogyakarta,
WARR,Surabaya,,
WSAP,Paya Lebar,,
RPLL,Manila,,
RPLB,Subic Bay,,
RPVM,Cebu,,
RPMD,Davao,,
VHHH,Hong Kong,,
VYYY,Yangon,,
VYMD,Mandalay,,
VTBD,Bangkok Don Mueang International,Bangkok,Don Mueang
VTBS,Bangkok Suvarnabhumi,Bangkok,Suvarnabhumi
VTSP,Phuket International,Phuket,
VTSS,Hat Yai International,Hat Yai,
VVNB,Hanoi,,
VVTS,Ho Chi Minh,,
VIDP,Delhi,,
VABB,Mumbai,,
VOBL,Bangalore,,
RJAA,Narita,,
RJTT,Haneda,,
ZBAA,Beijing,,
ZBTJ,Tianjin,,
ZGGG,Guangzhou,,
ZGHA,Changsha,,
ZHHH,Wuhan,,
ZSNJ,Nanjing,,
ZUCK,Chongqing,,
AYPY,Port Moresby,,
YBBN,Brisbane,,
YSSY,Sydney,,
YMML,Melbourne,,
YPPH,Perth,,
YPAD,Adelaide,,
NZAA,Auckland,,
NZCH,Christchurch,,
ZSSS,Shanghai Hongqiao,Hongqiao,Shanghai
ZSPD,Shanghai Pudong,Pudong,Shanghai
RCTP,Taipei,,
RKSI,Seoul,Incheon,
VOMM,Chennai,,
KSFO,San Francisco,,
OMDB,Dubai,,
ZGSZ,Shenzhen,,
WBGS,Sibu,,
WIHH,Halim,,
YPDN,Darwin,,
EGLL,London Heathrow,Heathrow,
EGBB,Birmingham,,
OEJN,Jeddah,,
FACT,Cape Town,,
EGCC,Manchester,,
LGAV,Athens,,
LEMD,Madrid,,
LOWW,Vienna,,
EDDF,Frankfurt,,
EDDM,Munich,,
EHAM,Amsterdam,,
EKCH,Copenhagen,,
EFHK,Helsinki,,
LEBL,Barcelona,,
LFPG ,Paris Charles De Gaulle ,Paris,
LIMC,Milan,,
LIRF,Rome,,
LSZH,Zurich,,
LTFM,Istanbul,,
OMAA,Abu Dhabi,,
VTSM,Koh Samui,,
RJBB,Osaka Kansai International Airport,Osaka,Kansai
VGHS,Dhaka Shahjalal International Airport,Dhaka,
VDTI,Phnom Penh Techno International Airport,Phnom Penh,Techno
ZSAM,Xiamen,,
VVDN,Da Nang,,
OTHH,Doha Hamad International Airport,Doha,
VOHS,Hyderabad Rajiv Gandhi International Airport,Hyderabad,
VOTR,Tiruchirapalli,,
RPLC,Angeles City Clark International Airport,Angeles City,Clark
FAOR,Johannesburg OR Tambo International Airport,Johannesburg,OR Tambo International
EBLG,Belgium Liege,Liege,
EBBR,Belgium Brussels,Brussels,
EDDB,Berlin Brandenburg Int'l,Berlin,
EDDF,Frankfurt Int'l,Frankfurt,
EDDH,Hamburg,,
ELLX,Luxembourg,,
HAAB,Addis Ababa Bole Int'l,Addis Ababa,
HECA,Cairo Int'l,Cairo,
KEWR,Newark Liberty Int'l,Newark Liberty,New York
KLAX,Los Angeles Int'l,Los Angeles,
LSGG,Geneva International,Geneva,
ZJHK,Haikou,,
ZSHC,Hangzhou,,
VOCB,Coimbatore,,
VCBI,Sri Lanka Columbo,Columbo,Sri Lanka
VECC,Kolkata,,
VTSG,Krabi,,
ZPPP,Kunming,,
VMMC,Macau,,
VRMM,Male,Maldives,
ZGNN,Nanning,,
RKPK,Busan,,
RJFF,Fukuoka,,
RKPC,Jeju,,
RCKH,Kaohsiung,,
KJFK,New York JFK International Airport,New York,JFK
CYVR,Vancouver,,
OMSJ,Sharjah,,
WIOO,Pontianak,,
ZSFZ,Fuzhou,,
RKSS,Seoul Gimpo,Gimpo,
RJTY,Yokota Air Base,,`

const acarrier_rtf = `Operator,Designator,RTF Callsign
Aero Dili,DTL,AERO DILI
"AHK, Air Hong Kong Ltd ",AHK,AIR HONG KONG 
Air Asia Sdn Bhd ,AXM,RED CAP 
Air Cambodia,KHV,CAMBODIA AIR
Air Canada,ACA,AIR CANADA
Air China Intl. Corp. ,CCA,AIR CHINA 
Air France ,AFR,AIRFRANS 
Air India Ltd ,AIC,AIRINDIA 
Air India Express ,AXB,EXPRESS INDIA 
Air Japan Co. Ltd ,AJX,AIR JAPAN 
Air Macau ,AMU,AIR MACAU 
"Air Mobility Command (AMC, USAF) ",RCH,REACH 
Air New Zealand Ltd ,ANZ,NEW ZEALAND 
Air Niugini ,ANG,NIUGINI 
Air Transport Intl. ,ATN,AIR TRANSPORT 
All Nippon Airways Co. Ltd ,ANA,ALL NIPPON 
Asia Cargo Airlines,TMG,TRILINES
Asiana Airlines ,AAR,ASIANA 
Bangkok Airways ,BKP,BANGKOK AIR 
Bangladesh Biman ,BBC,BANGLADESH 
Batik Air ,BTK,BATIK 
British Airways ,BAW,SPEEDBIRD 
Cambodia Airways,KME,GIANT IBIS
Cathay Pacific Airways Ltd ,CPA,CATHAY 
Cebu Pacific Air ,CEB,CEBU AIR 
Central Airlines,HLF,HOMELAND
China Airlines ,CAL,DYNASTY 
China Cargo Airlines,CKK,CARGO KING
China Eastern Airlines ,CES,CHINA EASTERN 
China Southern Airlines ,CSN,CHINA SOUTHERN 
Chongqing Airlines ,CQN,CHONG QING 
Citilink Indonesia ,CTV,SUPERGREEN 
Delta airlines ,DAL,DELTA 
Lufthansa ,DLH,LUFTHANSA 
Druk Air ,DRK,ROYAL BHUTAN 
Emirates ,UAE,EMIRATES 
Etihad Airlines ,ETD,ETIHAD 
Ethiopian Airlines ,ETH,ETHIOPIAN 
EVA Airways Corp. ,EVA,EVA
Federal Express Corp. ,FDX,FEDEX 
Finnair ,FIN,FINNAIR 
Fiji Airways ,FJI,FIJI 
Garuda Indonesia Airways ,GIA,INDONESIA 
Gulf Air,GFA,GULF AIR
Hainan Airlines ,CHH,HAINAN 
Vietnam Airlines,HVN,VIET NAM AIRLINES 
Hong Kong Air Cargo Carrier Ltd ,HKC,MASCOT 
Hong Kong Airlines Ltd ,CRK,BAUHINIA 
Hong Kong Express Airways Ltd ,HKE,HONG KONG SHUTTLE 
IndiGo Airlines ,IGO,IFLY 
IDG Technology Air ,IDG,INDIGO 
Japan Airlines ,JAL,JAPANAIR 
JDL Airlines,JDL,JINGDONG
Jeju Air,JJA,JEJU AIR
Jetstar Airways ,JST,JETSTAR 
Juneyao Airlines ,DKH,AIR JUNEYAO 
KLM Royal Dutch Airlines ,KLM,KLM 
Korean Airlines Co ltd ,KAL,KOREANAIR 
K-Mile Air Co Ltd ,KMI,KAY-MILE AIR 
Lao Airlines ,LAO,LAO 
Lufthansa Cargo ,GEC,LUFTHANSA CARGO 
Malaysia Airlines,MAS,MALAYSIAN 
Malindo Airlines ,MXD,MALINDO 
Mandarin Airlines,MDA,MANDARIN
Myanmar Airways International,MMA,MYANMAR 
Nippon Cargo Airlines ,NCA,NIPPON CARGO 
Peach,APJ,AIR PEACH
Pelita Air,PAS,PELITA
Philippine Airasia Inc ,APG,COOL RED 
Philippines Airlines ,PAL,PHILIPPINE 
Qantas Airways ,QFA,QANTAS 
Qatar Airways ,QTR,QATARI 
RAF (Air Transport) ,RRR,ASCOT 
Regent Airways ,RGE,REGENT 
Republic of S'pore Air Force ,SAF,SINGA 
Royal Australian Air Force ,ASY,AUSSIE 
Royal Brunei Airlines ,RBA,BRUNEI 
Royal Malaysian Air Force ,RMF,ANGKASA 
Royal Nepal Airlines ,RNA,ROYAL NEPAL 
Saudi Arabian Airlines ,SVA,SAUDIA 
Scoot Pte Ltd ,TGW,SCOOTER 
SF Airlines,CSS,SHUN FENG
Shandong Airlines ,CDG,SHANDONG 
Shenzhen Airlines ,CSZ,SHENZHEN AIR 
Sichuan Airlines ,CSC,SICHUAN AIR 
Silk Way West Airlines Azerbaijan ,AZG,SILK WEST 
Singapore Airlines,SIA,SINGAPORE 
Spring Airlines ,CQH,AIR SPRING 
Srilankan Airlines ,ALK,SRILANKAN 
Starlux,SJX,STARWALKER
Suparna Airlines,YZR,YANGTZE RIVER
Swiss International Airlines ,SWR,SWISS 
T'way Air,TWB,TEEWAY
Tianjin Airlines,GCR,BOHAI
Thai Airways Intl. ,THA,THAI 
Thai Air Asia Aviation Ltd ,AIQ,THAI ASIA 
TransNusa,TNU,TRANSNUSA
Turkish Airlines Co ,THY,TURKISH 
United Airlines Inc. ,UAL,UNITED 
United Parcel Service Co ,UPS,UPS 
US-Bangla Airlines ,UBG,BANGLA STAR 
VietJet Air,VJC,VIET JET 
West Air Co Ltd,CHB,WEST CHINA 
Xiamen Airlines,CXA,XIAMEN AIR 
Zipair,TZP,ZIPPY
Sriwijaya Air,SJY,SRIWIJAYA
Police,POL,POLICE
Flyfirefly Sdn Bhd,FFM,FIREFLY
Myanmar National Airlines,UBA,UNION AIR
Lion Air,LNI,LION INTER
Indonesia AirAsia,AWQ,WAGON AIR
AirAsia X,XAX,XANADU
Wings Air,WON,WINGS ABADI
AeroLogic,BOX,GERMAN CARGO
Cargolux,CLX,CARGO LUX
Hebei Airlines,HBH,HEBEI
VistaJet,VJT,VISTA JET
REGA Swiss Air-Ambulance,SAZ,SWISS AMBULANCE
France - Navy,FNY,FRENCH NAVY
MJets Air,KXP,XPRESS KARGO
Thai Lion Air,TLM,MENTARI
Boeing Company,BOE,BOEING
Aircalin,ACI,AIRCALIN
RGA-Black Stone Airlines,RGM,BLACK STONE
Super Air Jet,SJV,PROSPER
YTO Cargo Airlines,HYT,QUICK AIR
EuroAtlantic Airways,MMZ,EUROATLANTIC
SkyUp Airlines,SQP,SKYUP
PAL Express,GAP,AIRPHIL
MY Indo Airlines,MYU,INDO
LOT Polish Airlines,LOT,LOT
NAM Air (Sriwijaya Air Group),LKN,NAMAIR
Raya Airways,RMY,RAYA EXPRESS
World Cargo Airlines,WCM,WORLD CARGO
PJSC Aeroflot - Russian Airlines,AFL,AEROFLOT
Berjaya Air Sdn Bhd,BVT,BERJAYA
TAG Aviation Asia,TBJ,TAG JET
Scandinavian Airlines System,SAS,SCANDINAVIAN
Phenix Jet (Private Charter),RKS,ROCKSTAR
Cebgo,SRQ,BLUE JAY
Air Zimbabwe,AZW,AIR ZIMBABWE
GX Airlines (Guangxi Beibu Gulf Airlines),CBG,GREEN CITY
Shanghai Airlines,CSH,SHANGHAI AIR
Kalitta Air,CKS,CONNIE`

window.onload = () => {
  loadCSVData();
};

function loadCSVData() {
  let filesLoaded = 0;
  Papa.parse(loc_indi, {
    // download: true,
    header: true,
    complete: (results) => {
      airports = results.data
      filesLoaded++;
      checkIfReady();
    }
  });

  Papa.parse(acarrier_rtf, {
    // download: true,
    header: true,
    complete: (results2) => {
      airlines = results2.data
      filesLoaded++;
      checkIfReady();
    }
  });

  function checkIfReady() {
    if (filesLoaded === 2) {
      setMode('airport'); // or you can show a welcome screen first
    }
  }
}

function setMode(newMode) {
  mode = newMode;
  score = 0;
  totalQuestions = 0;
  // populate the weights arrays
  weights_airports = new Array(airports.length).fill(1);
  weights_airlines = new Array(airlines.length).fill(1);
  console.log(airports);
  console.log(weights_airports);
  updateScoreboard();
  askQuestion();
}

function askQuestion() {
  if ((mode === 'airport' && airports.length === 0) ||
      (mode === 'airline' && airlines.length === 0) ||
      (mode === 'mixed' && (airports.length === 0 || airlines.length === 0))) {
    document.getElementById('question').textContent = "Loading data...";
    return;
  }

  let question = {};

  if (mode === 'airport') {
    question = randomAirportQuestion();
  } else if (mode === 'airline') {
    question = randomAirlineQuestion();
  } else if (mode === 'mixed') {
    question = Math.random() > 0.5 ? randomAirportQuestion() : randomAirlineQuestion();
  }

  currentQuestion = question;
  document.getElementById('question').textContent = question.prompt;
  document.getElementById('answer').value = '';
  document.getElementById('feedback').textContent = '';
}

function randomAirportQuestion() {
  // const item = airports[Math.floor(Math.random() * airports.length)];
  const item = my_chance.weighted(airports, weights_airports); // obtain weighted random generated choice
  const idx = airports.indexOf(item);
  // update the weights
  weights_airports[idx] = weights_airports[idx] * 0.5;
  console.log(weights_airports);
  return {
    prompt: `What is the location for code: ${item.Code}?`,
    answer: item.Location.trim().toLowerCase(),
    alt1: item.Alt1.trim().toLowerCase(),
    alt2: item.Alt2.trim().toLowerCase(),
    notes: ''
  };
}

function randomAirlineQuestion() {
  // const item = airlines[Math.floor(Math.random() * airlines.length)];
  const item = my_chance.weighted(airlines, weights_airlines); // obtain weighted random generated choice
  const idx = airlines.indexOf(item);
  // update the weights
  weights_airlines[idx] = weights_airlines[idx] * 0.5;
  console.log(weights_airlines);  
  return {
    prompt: `RTF CALLSIGN for operator: ${item.Designator}?`,
    answer: item['RTF Callsign'].trim().toLowerCase(),
    alt1: null,
    alt2: null,
    notes: item.Operator.trim().toLowerCase()
  };
}

function submitAnswer() {
  const userAnswer = document.getElementById('answer').value.trim().toLowerCase();
  totalQuestions++;
  const dist = leven();
  // leveshtein distance tolerance between the correct answer and the given input
  if ((dist(userAnswer, currentQuestion.answer) <= 1) || (currentQuestion.alt1 && dist(userAnswer, currentQuestion.alt1) <= 1) || (currentQuestion.alt2 && dist(userAnswer, currentQuestion.alt2) <= 1)) {
    score++;
    document.getElementById('feedback').textContent = `✅ Correct! (🛬 ${currentQuestion.notes})`;
    document.getElementById('feedback').style.color = "lime";
  } else {
    document.getElementById('feedback').textContent = `❌ Wrong. Correct: ${currentQuestion.answer.toUpperCase()} (🛬 ${currentQuestion.notes})`;
    document.getElementById('feedback').style.color = "red";
  }

  updateScoreboard();
  setTimeout(askQuestion, 2000); // wait 2.0s before next
}
// allows submission using the Enter key
document.getElementById('answer').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    submitAnswer();
  }
});
function updateScoreboard() {
  document.getElementById('score').textContent = score;
  document.getElementById('questions').textContent = totalQuestions;
}

`levenshtein function from [Gustaf Andersson](https://github.com/gustf/js-levenshtein).
MIT License
Copyright (c) 2017 Gustaf Andersson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`
function leven()
{
  function _min(d0, d1, d2, bx, ay)
  {
    return d0 < d1 || d2 < d1
        ? d0 > d2
            ? d2 + 1
            : d0 + 1
        : bx === ay
            ? d1
            : d1 + 1;
  }
  return function(a, b)
  {
    if (a === b) {
      return 0;
    }
    if (a.length > b.length) {
      var tmp = a;
      a = b;
      b = tmp;
    }

    var la = a.length;
    var lb = b.length;

    while (la > 0 && (a.charCodeAt(la - 1) === b.charCodeAt(lb - 1))) {
      la--;
      lb--;
    }

    var offset = 0;

    while (offset < la && (a.charCodeAt(offset) === b.charCodeAt(offset))) {
      offset++;
    }

    la -= offset;
    lb -= offset;

    if (la === 0 || lb < 3) {
      return lb;
    }

    var x = 0;
    var y;
    var d0;
    var d1;
    var d2;
    var d3;
    var dd;
    var dy;
    var ay;
    var bx0;
    var bx1;
    var bx2;
    var bx3;

    var vector = [];

    for (y = 0; y < la; y++) {
      vector.push(y + 1);
      vector.push(a.charCodeAt(offset + y));
    }

    var len = vector.length - 1;

    for (; x < lb - 3;) {
      bx0 = b.charCodeAt(offset + (d0 = x));
      bx1 = b.charCodeAt(offset + (d1 = x + 1));
      bx2 = b.charCodeAt(offset + (d2 = x + 2));
      bx3 = b.charCodeAt(offset + (d3 = x + 3));
      dd = (x += 4);
      for (y = 0; y < len; y += 2) {
        dy = vector[y];
        ay = vector[y + 1];
        d0 = _min(dy, d0, d1, bx0, ay);
        d1 = _min(d0, d1, d2, bx1, ay);
        d2 = _min(d1, d2, d3, bx2, ay);
        dd = _min(d2, d3, dd, bx3, ay);
        vector[y] = dd;
        d3 = d2;
        d2 = d1;
        d1 = d0;
        d0 = dy;
      }
    }

    for (; x < lb;) {
      bx0 = b.charCodeAt(offset + (d0 = x));
      dd = ++x;
      for (y = 0; y < len; y += 2) {
        dy = vector[y];
        vector[y] = dd = _min(dy, d0, dd, bx0, vector[y + 1]);
        d0 = dy;
      }
    }

    return dd;
  };
}