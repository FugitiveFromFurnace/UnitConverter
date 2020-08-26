//imports

//Selectors
const inputFrom = document.getElementById("from");
const inputTo = document.getElementById("to");
const tabs = document.getElementsByClassName("tab-links");
const select1 = document.getElementById("units1");
const select2 = document.getElementById("units2");
const tabsContainer = document.getElementsByClassName("tab")[0];
const resultContainer = document.getElementById("resultContainer");
const resultParagraph = document.getElementById("resultParagraph");

//Units
const Units = {
  Temperature: ["Celsius", "Kelvin", "Fahrenheit"],
  Time: ["Second", "Minute", "Hour", "Day", "Week", "Month", "Year"],
  Volume: ["Cubic_Meter", "Litre", "Milliliter"],
  Length: [
    "Meter",
    "Kilometre",
    "Centimetre",
    "Millimetre",
    "Mile",
    "Yard",
    "Foot",
    "Inch",
    "Nautical_Mile",
  ],
  Area: [
    "Square_Meter",
    "Square_Kilometer",
    "Hectare",
    "Square_Mile",
    "Square_Yard",
    "Square_Foot",
    "Square_Inch",
    "Acre",
  ],
  Weight: ["Kilogram", "Gram", "Milligram", "Pound", "Ounce"],
};

//Converters
const Converters = {
  LengthConverter: {
    //Meter
    MeterKilometre: (length) => length / 1000,
    MeterCentimetre: (length) => length * 100,
    MeterMillimetre: (length) => length * 1000,
    MeterMile: (length) => length / 1609,
    MeterYard: (length) => length * 1.094,
    MeterFoot: (length) => length * 3.281,
    MeterInch: (length) => length * 39.37,
    MeterNautical_Mile: (length) => length / 1852,

    //Kilometre
    KilometreMeter: (length) => length * 1000,
    KilometreCentimetre: (length) => length * 100000,
    KilometreMillimetre: (length) => length * 1e6,
    KilometreMile: (length) => length / 1.609,
    KilometreYard: (length) => length * 1094,
    KilometreFoot: (length) => length * 3281,
    KilometreInch: (length) => length * 39370,
    KilometreNautical_Mile: (length) => length / 1.852,

    //Centimeter
    CentimetreMeter: (length) => length / 100,
    CentimetreKilometre: (length) => length / 100000,
    CentimetreMillimetre: (length) => length * 10,
    CentimetreMile: (length) => length / 160934,
    CentimetreYard: (length) => length / 91.44,
    CentimetreFoot: (length) => length / 30.48,
    CentimetreInch: (length) => length / 2.54,
    CentimetreNautical_Mile: (length) => length / 185200,

    //Milimenter
    MillimetreMeter: (length) => length / 1000,
    MillimetreKilometre: (length) => length / 1e6,
    MillimetreCentimetre: (length) => length / 10,
    MillimetreMile: (length) => length / 1609e6,
    MillimetreYard: (length) => length / 914,
    MillimetreFoot: (length) => length / 305,
    MillimetreInch: (length) => length / 25.4,
    MillimetreNautical_Mile: (length) => length / 1.852e6,

    //Mile
    MileMeter: (length) => length * 1609,
    MileKilometre: (length) => length * 1.609,
    MileCentimetre: (length) => length * 160934,
    MileMillimetre: (length) => length * 1.609e6,
    MileYard: (length) => length * 1760,
    MileFoot: (length) => length * 5280,
    MileInch: (length) => length * 63360,
    MileNautical_Mile: (length) => length / 1.151,

    //Yard
    YardMeter: (length) => length / 1.094,
    YardKilometre: (length) => length / 1094,
    YardCentimetre: (length) => length * 91.44,
    YardMillimetre: (length) => length * 914,
    YardMile: (length) => length / 1760,
    YardFoot: (length) => length * 3,
    YardInch: (length) => length * 36,
    YardNautical_Mile: (length) => length / 2025,

    //Foot
    FootMeter: (length) => length / 3.281,
    FootKilometre: (length) => length / 3281,
    FootCentimetre: (length) => length * 30.48,
    FootMillimetre: (length) => length * 305,
    FootMile: (length) => length / 5280,
    FootYard: (length) => length / 3,
    FootInch: (length) => length * 12,
    FootNautical_Mile: (length) => length / 6076,

    //Inch
    InchMeter: (length) => length / 39.37,
    InchKilometre: (length) => length / 39370,
    InchCentimetre: (length) => length / 2.54,
    InchMillimetre: (length) => length * 25.4,
    InchMile: (length) => length / 63360,
    InchYard: (length) => length / 36,
    InchFoot: (length) => length / 12,
    InchNautical_Mile: (length) => length / 72913,

    //Nautical_Mile
    Nautical_MileMeter: (length) => length * 1852,
    Nautical_MileKilometre: (length) => length * 1.852,
    Nautical_MileCentimetre: (length) => length * 185200,
    Nautical_MileMillimetre: (length) => length * 1.852e6,
    Nautical_MileMile: (length) => length * 1.151,
    Nautical_MileYard: (length) => length * 2025,
    Nautical_MileFoot: (length) => length * 6076,
    Nautical_MileInch: (length) => length * 72913,
  },
  TemperatureConverter: {
    CelsiusFahrenheit: (degrees) => (degrees * 9) / 5 + 32,
    CelsiusKelvin: (degrees) => Number(degrees) + 273.15,
    FahrenheitCelsius: (degrees) => ((degrees - 32) * 5) / 9,
    FahrenheitKelvin: (degrees) => ((degrees - 32) * 5) / 9 + 273.15,
    KelvinCelsius: (degrees) => degrees - 273.15,
    KelvinFahrenheit: (degrees) => ((degrees - 273.15) * 9) / 5 + 32,
  },
  TimeConverter: {
    //seconds
    SecondMinute: (time) => time / 60,
    SecondHour: (time) => time / 3600,
    SecondDay: (time) => time / 86400,
    SecondWeek: (time) => time / 604800,
    SecondMonth: (time) => time / 2628e6,
    SecondYear: (time) => time / 3154e7,

    //Minute
    MinuteSecond: (time) => time / 60,
    MinuteHour: (time) => time / 60,
    MinuteDay: (time) => time / 1440,
    MinuteWeek: (time) => time / 10080,
    MinuteMonth: (time) => time / 43800,
    MinuteYear: (time) => time / 525600,

    //Hour
    HourSecond: (time) => time * 3600,
    HourMinute: (time) => time * 60,
    HourDay: (time) => time / 24,
    HourWeek: (time) => time / 168,
    HourMonth: (time) => time / 730,
    HourYear: (time) => time / 8760,

    //Day
    DaySecond: (time) => time * 86400,
    DayMinute: (time) => time * 1440,
    DayHour: (time) => time * 24,
    DayWeek: (time) => time / 7,
    DayMonth: (time) => time / 30.417,
    DayYear: (time) => time / 365,

    //Week
    WeekSecond: (time) => time * 86400,
    WeekMinute: (time) => time * 1440,
    WeekHour: (time) => time * 24,
    WeekDay: (time) => time * 7,
    WeekMonth: (time) => time / 30.417,
    WeekYear: (time) => time / 365,

    //Month
    MonthSecond: (time) => time * 2.628e6,
    MonthMinute: (time) => time * 43800,
    MonthHour: (time) => time * 730,
    MonthDay: (time) => time * 30.417,
    MonthWeek: (time) => time * 4.345,
    MonthYear: (time) => time / 12,

    //Year
    YearSecond: (time) => time * 3.154e7,
    YearMinute: (time) => time * 525600,
    YearHour: (time) => time * 8760,
    YearDay: (time) => time * 365,
    YearWeek: (time) => time * 52.143,
    YearMonth: (time) => time * 12,
  },
  AreaConverter: {
    //Square_Meter
    Square_MeterSquare_Kilometer: (area) => area / 1e6,
    Square_MeterHectare: (area) => area / 10000,
    Square_MeterSquare_Mile: (area) => area / 2.59e6,
    Square_MeterSquare_Yard: (area) => area * 1.196,
    Square_MeterSquare_Foot: (area) => area * 10.764,
    Square_MeterSquare_Inch: (area) => area * 1550,
    Square_MeterAcre: (area) => area / 4047,

    //Square_Kilometer
    Square_KilometerSquare_Meter: (area) => area * 1e6,
    Square_KilometerHectare: (area) => area * 100,
    Square_KilometerSquare_Mile: (area) => area / 2.59,
    Square_KilometerSquare_Yard: (area) => area * 1.196e6,
    Square_KilometerSquare_Foot: (area) => area * 1.076e7,
    Square_KilometerSquare_Inch: (area) => area * 1.55e9,
    Square_KilometerAcre: (area) => area * 247,

    //Hectare
    HectareSquare_Meter: (area) => area * 10000,
    HectareSquare_Kilometer: (area) => area / 100,
    HectareSquare_Mile: (area) => area / 259,
    HectareSquare_Yard: (area) => area * 11960,
    HectareSquare_Foot: (area) => area * 107639,
    HectareSquare_Inch: (area) => area * 1.55e7,
    HectareAcre: (area) => area * 2.471,

    //Square_Mile
    Square_MileSquare_Meter: (area) => area * 2.59e6,
    Square_MileSquare_Kilometer: (area) => area * 2.59,
    Square_MileHectare: (area) => area * 259,
    Square_MileSquare_Yard: (area) => area * 3.098e6,
    Square_MileSquare_Foot: (area) => area * 2.788e7,
    Square_MileSquare_Inch: (area) => area * 4.014e9,
    Square_MileAcre: (area) => area * 640,

    //Square_Yard
    Square_YardSquare_Meter: (area) => area / 1.196,
    Square_YardSquare_Kilometer: (area) => area / 1.196e6,
    Square_YardHectare: (area) => area / 11960,
    Square_YardSquare_Mile: (area) => area / 3.098e6,
    Square_YardSquare_Foot: (area) => area * 9,
    Square_YardSquare_Inch: (area) => area * 1296,
    Square_YardAcre: (area) => area / 4840,

    //Square_Foot
    Square_FootSquare_Meter: (area) => area / 10.764,
    Square_FootSquare_Kilometer: (area) => area / 1.076e7,
    Square_FootHectare: (area) => area / 107639,
    Square_FootSquare_Mile: (area) => area / 2.788e7,
    Square_FootSquare_Yard: (area) => area / 9,
    Square_FootSquare_Inch: (area) => area * 144,
    Square_FootAcre: (area) => area / 43560,

    //Square_Inch
    Square_InchSquare_Meter: (area) => area / 1550,
    Square_InchSquare_Kilometer: (area) => area / 1.55e9,
    Square_InchHectare: (area) => area / 1.55e7,
    Square_InchSquare_Mile: (area) => area / 4.014e9,
    Square_InchSquare_Yard: (area) => area / 1296,
    Square_InchSquare_Foot: (area) => area / 144,
    Square_InchAcre: (area) => area * 6.273e6,

    //Acre
    AcreSquare_Meter: (area) => area * 4047,
    AcreSquare_Kilometer: (area) => area / 247,
    AcreHectare: (area) => area * 2.471,
    AcreSquare_Mile: (area) => area / 640,
    AcreSquare_Yard: (area) => area * 4840,
    AcreSquare_Foot: (area) => area * 43560,
    AcreSquare_Inch: (area) => area * 6.273e6,
  },
  VolumeConverter: {
    //Cubic_Meter
    Cubic_MeterLitre: (volume) => volume * 1000,
    Cubic_MeterMilliliter: (volume) => volume * 1e6,

    //Liter
    LitreCubic_Meter: (volume) => volume / 1000,
    LitreMilliliter: (volume) => volume * 1000,

    //Milliliter
    MillilitreLitre: (volume) => volume / 1000,
    MillilitreCubic_Meter: (volume) => volume / 1e6,
  },
  WeightConverter: {
    //Kilogram
    KilogramGram: (mass) => mass * 1000,
    KilogramMilligram: (mass) => mass * 1e6,
    KilogramPound: (mass) => mass * 2.205,
    KilogramOunce: (mass) => mass * 35.274,

    //Gram
    GramKilogram: (mass) => mass / 1000,
    GramMilligram: (mass) => mass * 1000,
    GramPound: (mass) => mass / 454,
    GramOunce: (mass) => mass / 28.35,

    //Miligram
    MilligramGram: (mass) => mass / 1000,
    MilligramKilogram: (mass) => mass / 1e6,
    MilligramPound: (mass) => mass / 453592,
    MilligramOunce: (mass) => mass / 28350,

    //Pound
    PoundGram: (mass) => mass * 454,
    PoundKilogram: (mass) => mass / 2.205,
    PoundMilligram: (mass) => mass * 453592,
    PoundOunce: (mass) => mass * 16,

    //Ounce
    OunceGram: (mass) => mass * 28.35,
    OunceKilogram: (mass) => mass / 35.274,
    OunceMilligram: (mass) => mass * 28350,
    OuncePound: (mass) => mass / 16,
  },
};

//Functions

function createTabs() {
  let text;
  for (var unitName in Units) {
    const tab = document.createElement("button");
    tab.classList.add("tab-links");
    tab.classList.add("active");
    text = unitName;

    if (tab.innerText.includes("_"))
      while (tab.innerText.includes("_")) text = text.replace("_", " ");

    tab.innerText = text;
    tabsContainer.appendChild(tab);
  }
}

function changeSelect() {
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }

  this.classList.toggle("active");

  populateSelect(Units[this.innerText]);
  convert();
}

function populateSelect(values) {
  while (select1.hasChildNodes()) select1.removeChild(select1.firstChild);
  while (select2.hasChildNodes()) select2.removeChild(select2.firstChild);

  for (let i = 0; i < values.length; i++)
    select1.appendChild(createOption(i, values[i]));

  for (let i = 0; i < values.length; i++)
    select2.appendChild(createOption(i, values[i]));

  select1.value = 0;
  select2.value = 1;
}

function createOption(value, text) {
  var opt = document.createElement("option");
  opt.value = value;

  if (text.includes("_"))
    while (text.includes("_")) text = text.replace("_", " ");

  opt.innerText = text;

  return opt;
}

function convert() {
  const activeTabText = document.getElementsByClassName("active")[0].innerText;
  let unit1 = Units[activeTabText][select1.selectedIndex];
  let unit2 = Units[activeTabText][select2.selectedIndex];
  let convertFunction = Converters[activeTabText + "Converter"][unit1 + unit2];
  let convertValue = inputFrom.value;
  let resultText = "";
  let result = "";

  if (convertValue != "") {
    result = unit1 == unit2 ? convertValue : convertFunction(convertValue);

    // unit1 = convertValue >= 2 || convertValue < 1 ? unit1 + "s" : unit1;
    // unit2 = result >= 2 || result < 1 ? unit2 + "s" : unit2;

    resultText = `${convertValue} ${unit1.replace(
      "_",
      " "
    )} = ${result} ${unit2.replace("_", " ")}`;

    resultContainer.style.display = "flex";
  } else {
    resultContainer.style.display = "none";
  }

  inputTo.value = result;
  resultParagraph.innerText = resultText;
}

//EventListeners
window.onload = function () {
  createTabs();

  let children = tabsContainer.children;

  for (let i = 0; i < children.length; i++) {
    children[i].addEventListener("click", changeSelect, false);
  }

  tabsContainer.children[0].click();
};

select1.addEventListener("change", convert);
select2.addEventListener("change", convert);
