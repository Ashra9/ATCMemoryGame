let airports = [];
let airlines = [];
let currentQuestion = null;
let mode = 'airport';
let score = 0;
let totalQuestions = 0;
loc_indi = `Code,Location
WMKJ,Johor
WMKI,Ipoh
WMKK,KL International
WMKL,Langkawi
WMKP,Penang
WBSB,Brunei
WBGG,Kuching
WBGR,Miri
WBKK,Kota Kinabalu
WBKW,Tawau
WBKS,Sandakan
WIBB,Pekan Baru
WIDD,Batam
WIDN,Tg Pinang
WIII,Jakarta International
WIMM,Medan
WAAA,Ujung Panding
WADD,Denpasar
WALL,Balikpapan
WAMM,Manado
WAHI,Jogyakarta
WARR,Surabaya
WSAP,Paya Lebar
RPLL,Manila
RPLB,Subic Bay
RPVM,Cebu
RPMD,Davao
VHHH,Hong Kong
VYYY,Yangon
VYMD,Mandalay
VTBD,Bangkok Don Mueang International
VTBS,Bangkok Suvarnabhumi
VTSP,Phuket International
VTSS,Hat Yai International
VVNB,Hanoi
VVTS,Ho Chi Minh
VIDP,Delhi
VABB,Mumbai
VOBL,Bangalore
RJAA,Narita
RJTT,Haneda 
ZBAA,Beijing
ZBTJ,Tianjin
ZGGG,Guangzhou
ZGHA,Changsha
ZHHH,Wuhan
ZSNJ,Nanjing
ZUCK,Chongqing
AYPY,Port Moresby
YBBN,Brisbane
YSSY,Sydney
YMML,Melbourne
YPPH,Perth
YPAD,Adelaide
NZAA,Auckland
NZCH,Christchurch
ZSSS,Shanghai Hongqiao
ZSPD,Shanghai Pudong
RCTP,Taipei
RKSI,Seoul
VOMM,Chennai
KSFO,San Francisco
OMDB,Dubai
ZGSZ,Shenzhen
`
acarrier_rtf = `Operator,Designator,RTF Callsign
Aero Dili,DTL,AERO DILI
"AHK, Air Hong Kong Ltd ",AHK ,AIR HONG KONG 
Air Asia Sdn Bhd ,AXM ,RED CAP 
Air Cambodia,KHV ,CAMBODIA AIR
Air Canada,ACA,AIR CANADA
Air China Intl. Corp. ,CCA ,AIR CHINA 
Air France ,AFR ,AIRFRANS 
Air India Ltd ,AIC ,AIRINDIA 
Air India Express ,AXB ,EXPRESS INDIA 
Air Japan Co. Ltd ,AJX ,AIR JAPAN 
Air Macau ,AMU ,AIR MACAU 
"Air Mobility Command (AMC, USAF) ",RCH ,REACH 
Air New Zealand Ltd ,ANZ ,NEW ZEALAND 
Air Niugini ,ANG ,NIUGINI 
Air Transport Intl. ,ATN ,AIR TRANSPORT 
All Nippon Airways Co. Ltd ,ANA ,ALL NIPPON 
Asia Cargo Airlines,TMG,TRILINES
Asiana Airlines ,AAR ,ASIANA 
Bangkok Airways ,BKP ,BANGKOK AIR 
Bangladesh Biman ,BBC ,BANGLADESH 
Batik Air ,BTK ,BATIK 
British Airways ,BAW ,SPEEDBIRD 
Cambodia Airways,KME,GIANT IBIS
Cathay Pacific Airways Ltd ,CPA ,CATHAY 
Cebu Pacific Air ,CEB ,CEBU AIR 
Central Airlines,HLF,HOMELAND
China Airlines ,CAL ,DYNASTY 
China Cargo Airlines,CKK,CARGO KING
China Eastern Airlines ,CES ,CHINA EASTERN 
China Southern Airlines ,CSN ,CHINA SOUTHERN 
Chongqing Airlines ,CQN ,CHONG QING 
Citilink Indonesia ,CTV ,SUPERGREEN 
Delta airlines ,DAL ,DELTA 
Lufthansa ,DLH ,LUFTHANSA 
Druk Air ,DRK ,ROYAL BHUTAN 
Emirates ,UAE ,EMIRATES 
Etihad Airlines ,ETD ,ETIHAD 
Ethiopian Airlines ,ETH ,ETHIOPIAN 
EVA Airways Corp. ,EVA ,EVA AIR 
Federal Express Corp. ,FDX ,FEDEX 
Finnair ,FIN ,FINNAIR 
Fiji Airways ,FJI ,FIJI 
Garuda Indonesia Airways ,GIA ,INDONESIA 
Gulf Air,GFA,GULF AIR
Hainan Airlines ,CHH ,HAINAN 
Vietnam Airlines,HVN ,VIET NAM AIRLINES 
Hong Kong Air Cargo Carrier Ltd ,HKC ,MASCOT 
Hong Kong Airlines Ltd ,CRK ,BAUHINIA 
Hong Kong Express Airways Ltd ,HKE ,HONG KONG SHUTTLE 
IndiGo Airlines ,IGO ,IFLY 
IDG Technology Air ,IDG ,INDIGO 
Japan Airlines ,JAL ,JAPANAIR 
JDL Airlines,JDL,JINGDONG
Jeju Air,JJA,JEJU AIR
Jetstar Airways ,JST ,JETSTAR 
Juneyao Airlines ,DKH ,AIR JUNEYAO 
KLM Royal Dutch Airlines ,KLM ,KLM 
Korean Airlines Co ltd ,KAL ,KOREANAIR 
K-Mile Air Co Ltd ,KMI ,KAY-MILE AIR 
Lao Airlines ,LAO ,LAO 
Lufthansa Cargo ,GEC ,LUFTHANSA CARGO 
Malaysia Airlines,MAS ,MALAYSIAN 
Malindo Airlines ,MXD ,MALINDO EXPRESS 
Mandarin Airlines,MDA,MANDARIN
Myanmar Airways International,MMA ,MYANMAR 
Nippon Cargo Airlines ,NCA ,NIPPON CARGO 
Peach,APJ,AIR PEACH
Pelita Air,PAS,PELITA
Philippine Airasia Inc ,APG ,COOL RED 
Philippines Airlines ,PAL ,PHILIPPINE 
Qantas Airways ,QFA ,QANTAS 
Qatar Airways ,QTR ,QATARI 
RAF (Air Transport) ,RRR ,ASCOT 
Regent Airways ,RGE ,REGENT 
Republic of S'pore Air Force ,SAF ,SINGA 
Royal Australian Air Force ,ASY ,AUSSIE 
Royal Brunei Airlines ,RBA ,BRUNEI 
Royal Malaysian Air Force ,RMF ,ANGKASA 
Royal Nepal Airlines ,RNA ,ROYAL NEPAL 
Saudi Arabian Airlines ,SVA ,SAUDIA 
Scoot Pte Ltd ,SCO/TGW ,SCOOTER 
SF Airlines,CSS,SHUN FENG
Shandong Airlines ,CDG ,SHANDONG 
Shenzhen Airlines ,CSZ ,SHENZHEN AIR 
Sichuan Airlines ,CSC ,SICHUAN AIR 
Silk Way West Airlines Azerbaijan ,AZG ,SILK WEST 
Singapore Airlines,SIA ,SINGAPORE 
Spring Airlines ,CQH ,AIR SPRING 
Srilankan Airlines ,ALK ,SRILANKAN 
Starlux,SJX,STARWALKER
Suparna Airlines,YZR,YANGTZE RIVER
Swiss International Airlines ,SWR ,SWISS 
T'way Air,TWB,TEEWAY
Tianjin Airlines,GCR,BOHAI
Thai Airways Intl. ,THA ,THAI 
Thai Air Asia Aviation Ltd ,AIQ ,THAI ASIA 
TransNusa,TNU,TRANSNUSA
Turkish Airlines Co ,THY ,TURKISH 
United Airlines Inc. ,UAL ,UNITED 
United Parcel Service Co ,UPS ,UPS 
US-Bangla Airlines ,UBG ,BANGLA STAR 
VietJet Air ,VJC ,VIET JET 
West Air Co Ltd ,CHB ,WEST CHINA 
Xiamen Airlines ,CXA ,XIAMEN AIR 
Zipair,TZP,ZIPPY`
window.onload = () => {
  loadCSVData();
};

function loadCSVData() {
  let filesLoaded = 0;
  Papa.parse(loc_indi, {
    // download: true,
    header: true,
    complete: (results) => {
      console.log(results);
      airports = results.data.filter(item => item.Code && item.Location);
      filesLoaded++;
      checkIfReady();
    }
  });

  Papa.parse(acarrier_rtf, {
    // download: true,
    header: true,
    complete: (results2) => {
      console.log(results2.data);
      airlines = results2.data//.filter(item => item.Designator && item.Operator);
      console.log(airlines);
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
  updateScoreboard();
  askQuestion();
}

function askQuestion() {
  console.log(airports);
  console.log(airlines);
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
  const item = airports[Math.floor(Math.random() * airports.length)];
  return {
    prompt: `What is the location for code: ${item.Code}?`,
    answer: item.Location.trim().toLowerCase(),
    notes: ''
  };
}

function randomAirlineQuestion() {
  const item = airlines[Math.floor(Math.random() * airlines.length)];
  return {
    prompt: `What is the RTF CALLSIGN for operator: ${item.Designator}?`,
    answer: item['RTF Callsign'].trim().toLowerCase(),
    notes: item.Operator.trim().toLowerCase()
  };

  // const rand = Math.floor(Math.random() * 2); // 0 or 1
  // if (rand === 0) {
  //   return {
  //     prompt: `What operator uses designator: ${item.Designator}?`,
  //     answer: item.Operator.trim().toLowerCase(),
  //     notes: ''
  //   };
  // } else {
  //   return {
  //     prompt: `What is the RTF CALLSIGN for operator: ${item.Designator}?`,
  //     answer: item['RTF Callsign'].trim().toLowerCase(),
  //     notes: item.Operator.trim().toLowerCase()
  //   };
  // }
}

function submitAnswer() {
  const userAnswer = document.getElementById('answer').value.trim().toLowerCase();
  totalQuestions++;

  if (userAnswer === currentQuestion.answer) {
    score++;
    document.getElementById('feedback').textContent = `✅ Correct!`;
    document.getElementById('feedback').style.color = "green";
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
