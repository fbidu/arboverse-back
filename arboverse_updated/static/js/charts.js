//call for the charts
drawBarChartOne();
drawBarChartTwo();
drawBarChartThree();
drawDoughnutOne();
drawMapDiscovery();

//Taxonomy calls
drawDoughnutSequence();
drawStackedBarChartSequence();
drawBoxPlotGenome();

//Drawing Bar Chart Arbovirus Time
async function drawBarChartOne() {
    const datapoints = await getData();
    const labels = datapoints.labels;
    const data = {
        labels : labels,
        datasets: [{
            label: 'By Year',
            type: 'bar',
            data: datapoints.timeDataOne,
            yAxisID: 'y',
            backgroundColor: '#1e3d7d'
        },{
            label: 'Accumulated',
            type: 'line',
            data: datapoints.timeDataTwo,
            yAxisID: 'accumulated',
            fill: true,
            backgroundColor: 'rgba(210,218,184,0.7)',
            borderColor: [
                '#d2dab8'
            ],
            tension: 1
        }
        ]
    };
    
    //Bar Chart One config
    const config = {
        type: 'scatter',
        data: data,
        options: {
            plugins:{
                title:{
                    display: true,
                    position: 'top',
                    text: 'Number of Arbovirus Discovered Over Time',
                    font:{
                        family: 'Montserrat',
                        size: 20
                    }
                }
            },
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    type: 'linear',
                    position: 'left',
                    title:{
                        display: true,
                        text:'N˚ of Arbovirus by Year',
                        align: 'center',
                        font:{
                            family: 'Montserrat',
                            size: 14
                        }
                    }
                }, 
                accumulated: {
                    beginAtZero: true,
                    type: 'linear',
                    position: 'right',
                    grid: {
                        display: false,
                    },
                    title:{
                        display: true,
                        text:'N˚ of Arbovirus Accumulated',
                        align: 'center',
                        font:{
                            family: 'Montserrat',
                            size: 14
                        }
                    }
                }
            }
        }
    }
    
    //render Bar chart One 
    const myChartOne = new Chart(
        document.getElementById('myChart1'),
        config
    );
}

//Fetching DATA
//Fetching data arbv by time 
async function getData() {

    const labels = [];
    const timeDataOne = [];
    const timeDataTwo = [];

    const url = 'https://gist.githubusercontent.com/JacquelineTida/5f07fc83f1614388cca55e1ae0108f55/raw/a2f6ebda9caa626df1242850145ea6de4f1872fa/discovery_per_year.csv';
    const response = await fetch(url);
    const tableData = await response.text();// csv to text
    //console.log(tableData);

    const table = tableData.split('\n'); //separate array
    //console.log(table)
    table.forEach(row => {
        const column = row.split(',');
        //console.log(column);
        const year = column[0];
        const timeOne = column[1];
        const timeTwo = column[2]
        labels.push(year);
        timeDataOne.push(timeOne);
        timeDataTwo.push(timeTwo);
    });
        labels.shift();
        timeDataOne.shift();
        timeDataTwo.shift();
    const timeDataOneName = 'a';
    const timeDataTwoName = 'b';
    //console.log(timeDataTwo)
    return {labels, timeDataOne, timeDataTwo, timeDataOneName, timeDataTwoName }

}

//Drawing Bar chart arbovirus dicovery and continent
async function drawBarChartTwo() {
    const datapoints = await getDataContinets();
    const labels = datapoints.labels;
    const data = {
        labels : ['Continents'],
        datasets: [{
            label: 'America',
            data: datapoints.america,
            backgroundColor: '#05598c',
            borderWidth:1
        },{
            label: 'Africa',
            data: datapoints.africa,
            backgroundColor: '#436e82',
            borderWidth:1
        },{
            label: 'Europe',
            data: datapoints.europe,
            backgroundColor: '#859493',
            borderWidth:1
        },{
            label: 'Asia',
            data: datapoints.asia,
            backgroundColor: '#b2b293',
            borderWidth:1
        },{
            label: 'Oceania',
            data: datapoints.oceania,
            backgroundColor: '#caca83',
            borderWidth:1
        }]
    };

    //Bar Chart config
    const config = {
        type: 'bar', 
        data: data,
        options: {
            scales:{
                y:{
                    title:{
                        display: true,
                        text:'N˚ of Arbovirus',
                        align: 'center',
                        font:{
                            family: 'Montserrat',
                            size: 14
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Arbovirus Discovered by Continent',
                    position: 'top',
                    align: 'center',
                    font:{
                        family: 'Montserrat',
                        size: 20
                    }
                }
            }
        },
    }

    //render Bar Chart Two 
    const myChartTwo = new Chart(
        document.getElementById('myChart2'),
        config
    );
}
//fetching Data by continent 
async function getDataContinets() {
    const america = [];
    const africa = [];
    const europe = [];
    const asia = [];
    const oceania = [];

    const url = 'https://gist.githubusercontent.com/JacquelineTida/485e7a798565599f636eb3a3e7e75507/raw/f184e45285e0c8157c96f3f78c1cc2e591cfc29a/discovery_by_continent.csv';
    const response = await fetch(url);
    const tableData = await response.text();

    const table = tableData.split('\n');
    table.forEach(row => {
        const column = row.split(',');
        const america_num = column[0];
        const africa_num = column[1];
        const europe_num = column[2];
        const asia_num = column[3];
        const oceania_num = column[4];
        america.push(america_num);
        africa.push(africa_num);
        europe.push(europe_num);
        asia.push(asia_num);
        oceania.push(oceania_num);
    });
    america.shift();
    africa.shift();
    europe.shift();
    asia.shift();
    oceania.shift();
    return { america, africa, europe, asia, oceania}
}

function drawMapDiscovery() {
    //chart Geo for arbovirus discovery by country
const atlasUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

const world = fetch(atlasUrl).then((result) => result.json()).then((datapoint) => {
   const countries = ChartGeo.topojson.feature(datapoint, datapoint.objects.countries).features;
   //console.log(countries[45].properties.name);
   //console.log(countries.map(country => country.properties.name));
   //America
   const UnitedStates = countries.find(country => country.properties.name === 'United States of America')
   const Brazil = countries.find(country => country.properties.name === 'Brazil')
   const Venezuela = countries.find(country => country.properties.name === 'Venezuela')
   const Peru = countries.find(country => country.properties.name === 'Peru')
   const Tinindad = countries.find(country => country.properties.name === 'Trinindad and Tobago')
   const FrenchGuiana = countries.find(country => country.properties.name === 'Guyana')
   const Ecuador = countries.find(country => country.properties.name === 'Ecuador')
   const Panama = countries.find(country => country.properties.name === 'Panama')
   const Argentina = countries.find(country => country.properties.name === 'Argentina')
   const Suriname = countries.find(country => country.properties.name === 'Suriname')
   const Canada = countries.find(country => country.properties.name === 'Canada')
   const Mexico = countries.find(country => country.properties.name === 'Mexico')
   const Colombia = countries.find(country => country.properties.name === 'Colombia')
   const Cuba = countries.find(country => country.properties.name === 'Cuba')
   const Guatemala = countries.find(country => country.properties.name === 'Guatemala')
   const Bolivia = countries.find(country => country.properties.name === 'Bolivia')
   const CostaRica = countries.find(country => country.properties.name === 'Costa Rica')
   //Oceania
   const Australia = countries.find(country => country.properties.name === 'Australia')
   const Papua = countries.find(country => country.properties.name === 'Papua New Guinea')
   const NewZeland = countries.find(country => country.properties.name === 'New Zealand')
   //Asia
   const Philippine = countries.find(country => country.properties.name === 'Philippine')
   const Kyrgyzsta = countries.find(country => country.properties.name === 'Kyrgyzsta')
   const Iran = countries.find(country => country.properties.name === 'Iran')
   const China = countries.find(country => country.properties.name === 'China')
   const Japan = countries.find(country => country.properties.name === 'Japan')
   const India = countries.find(country => country.properties.name === 'India')
   const Indonesia = countries.find(country => country.properties.name === 'Indonesia')
   const Malaysia = countries.find(country => country.properties.name === 'Malaysia')
   const Thailand = countries.find(country => country.properties.name === 'Thailand')
   const Israel = countries.find(country => country.properties.name === 'Israel')
   const Vietnam = countries.find(country => country.properties.name === 'Vietnam')
   const Uzberkistan = countries.find(country => country.properties.name === 'Uzbekistan')
   const Pakistan = countries.find(country => country.properties.name === 'Pakistan')
   const Turkey = countries.find(country => country.properties.name === 'Turkey')
   const Saudi = countries.find(country => country.properties.name === 'Saudi Arabia')
   const Azerbaijan = countries.find(country => country.properties.name === 'Azerbaijan')
   const Nepal = countries.find(country => country.properties.name === 'Nepal')
   const Tajikistan = countries.find(country => country.properties.name === 'Tajikistan')
   const Taiwan = countries.find(country => country.properties.name === 'Taiwan')
   const Cambodia = countries.find(country => country.properties.name === 'Cambodia')
   const Afghanistan = countries.find(country => country.properties.name === 'Afghanistan')
   const Singapore = countries.find(country => country.properties.name === 'Singapore')
   const UnitedArab = countries.find(country => country.properties.name === 'United Arab Emirates')
   //EUROPE
   const Sweden = countries.find(country => country.properties.name === 'Sweden')
   const Czechia = countries.find(country => country.properties.name === 'Czechia')
   const Russia = countries.find(country => country.properties.name === 'Russia')
   const Bulgaria = countries.find(country => country.properties.name === 'Bulgaria')
   const Austria = countries.find(country => country.properties.name === 'Austria')
   const Finland = countries.find(country => country.properties.name === 'Finland')
   const Germany = countries.find(country => country.properties.name === 'Germany')
   const Albania = countries.find(country => country.properties.name === 'Albania')
   const Italy = countries.find(country => country.properties.name === 'Italy')
   const Uk = countries.find(country => country.properties.name === 'United Kingdom')
   const France = countries.find(country => country.properties.name === 'France')
   const Portugal = countries.find(country => country.properties.name === 'Portugal')
   const Greece = countries.find(country => country.properties.name === 'Greece')
   const Armenia = countries.find(country => country.properties.name === 'Armenia')
   const Macedonia = countries.find(country => country.properties.name === 'Macedonia')
   const Slovakia = countries.find(country => country.properties.name === 'Slovakia')
   const Slovenia = countries.find(country => country.properties.name === 'Slovenia')
   const Iceland = countries.find(country => country.properties.name === 'Iceland')
   const Norway = countries.find(country => country.properties.name === 'Norway')
   const Spain = countries.find(country => country.properties.name === 'Spain')
   const Ireland = countries.find(country => country.properties.name === 'Ireland')
   const Belgium = countries.find(country => country.properties.name === 'Belgium')
   const Moldova = countries.find(country => country.properties.name === 'Moldova')
   const Romania = countries.find(country => country.properties.name === 'Romania')
   const Serbia = countries.find(country => country.properties.name === 'Serbia')
   const Croatia= countries.find(country => country.properties.name === 'Croatia')
   //Faroe island
   //Africa
   const Tanzania = countries.find(country => country.properties.name === 'Tanzania')
   const Ghana = countries.find(country => country.properties.name === 'Ghana')
   const Uganda = countries.find(country => country.properties.name === 'Uganda')
   const SouthAfrica = countries.find(country => country.properties.name === 'South Africa')
   const Senegal = countries.find(country => country.properties.name === 'Senegal')
   const Kenya = countries.find(country => country.properties.name === 'Kenya')
   const Guinea = countries.find(country => country.properties.name === 'Guinea')
   const Cameroon = countries.find(country => country.properties.name === 'Cameroon')
   const CentralAfricanRepuplic = countries.find(country => country.properties.name === 'Central African Rep.')
   const Madagascar = countries.find(country => country.properties.name === 'Madagascar')
   const Egypt = countries.find(country => country.properties.name === 'Egypt')
   const Mozambique = countries.find(country => country.properties.name === 'Mozambique')
   const IvoryCoast = countries.find(country => country.properties.name === "Côte d'Ivoire")
   const SouthSudan = countries.find(country => country.properties.name === 'S. Sudan')
   const Ethiopia = countries.find(country => country.properties.name === 'Ethiopia')
   const Nigeria = countries.find(country => country.properties.name === 'Nigeria')
   const Sudan = countries.find(country => country.properties.name === 'Sudan')
   const Seychelles = countries.find(country => country.properties.name === 'Seychelles')
   const Congo = countries.find(country => country.properties.name === 'Congo')
   const Morocco = countries.find(country => country.properties.name === 'Morocco')
   const Zimbabwe = countries.find(country => country.properties.name === 'Zimbabwe')
   const Somalia = countries.find(country => country.properties.name === 'Somalia')
   const Zambia = countries.find(country => country.properties.name === 'Zambia')
   const Tunisia = countries.find(country => country.properties.name === 'Tunizia')
   const Namibia = countries.find(country => country.properties.name === 'Namibia')
   //setup
  
   
     const data = {
       labels: ['Brazil', 'United States', 'Venezuela', 'Peru', 'Trinindad and Tobago','Guyana', 'Ecuador','Panama','Argentina','Suriname','Canada','Mexico','Colombia', 'Cuba','Guatemala','Bolivia','Costa Rica', 'Australia', 'Papua New Guinea', 'New Zeland','Philippine','Kyrgyzsta','Iran','China','Japan','India','Indonesia','Malaysia','Thailand','Israel','Vietnam','Uzbekistan','Pakistan','Turkey','Saudi Arabia','Azerbaijan','Nepal','Tajikistan','Taiwan','Cambodia','Afghanistan','Singapore','United Arab Emirates','Sweden','Czechia','Russia','Bulgaria','Austria','Finland','Germany','Albania','Italy','United Kingdom','France','Portugal','Greece','Armenia','Macedonia','Slovakia','Slovenia','Iceland','Norway','Spain','Ireland','Belgium','Moldova','Romania','Serbia','Croatia','Tanzania','Ghana','Uganda','South Africa','Senegal','Kenya','Guinea','Cameroon','Central African Republic','Madagascar','Egypt','Mozambique',"Côte d'Ivoire",'South Sudan','Ethiopia','Nigeria','Sudan','Seychelles','Congo','Morocco','Zimbabwe','Somalia','Zambia','Tunizia','Namibia'],
       datasets: [{
         outline: countries,
         showoutline: true,
         data: [{
             value: 181,
             feature: Brazil
         },
           {
               value: 88,
               feature: UnitedStates
           },
           {
               value: 2,
               feature: Venezuela
           },
           {
               value: 13,
               feature: Peru
           },
           {
               value: 17,
               feature: Tinindad
           },
           {
               value: 4,
               feature: FrenchGuiana
           },
           {
               value: 9,
               feature: Ecuador
           },
           {
               value: 30,
               feature: Panama
           },
           {
               value: 7,
               feature: Argentina
           },
           {
               value: 1,
               feature: Suriname
           },
           {
               value: 6,
               feature: Canada
           },
           {
               value: 9,
               feature: Mexico
           },
           {
               value: 11,
               feature: Colombia
           },
           {
               value: 1,
               feature: Cuba
           },
           {
               value: 2,
               feature: Guatemala
           },
           {
               value: 1,
               feature: Bolivia
           },
           {
               value: 1,
               feature: CostaRica
           },{
               value: 81,
               feature: Australia
           },{
               value: 6,
               feature: Papua
           },{
               value: 1,
               feature: NewZeland
           },{
               value: 2,
               feature: Philippine
           },{
               value: 4,
               feature: Kyrgyzsta
           },{
               value: 5,
               feature: Iran
           },{
               value: 33,
               feature: China
           },{
               value: 28,
               feature: Japan
           },{
               value: 28,
               feature: India
           },{
               value: 2,
               feature: Indonesia
           },{
               value: 17,
               feature: Malaysia
           },{
               value: 3,
               feature: Thailand
           },{
               value: 3,
               feature: Israel
           },{
               value: 1,
               feature: Vietnam
           },{
               value: 4,
               feature: Uzberkistan
           },{
               value: 3,
               feature: Pakistan
           },{
               value: 4,
               feature: Turkey
           },{
               value: 2,
               feature: Saudi
           },{
               value: 2,
               feature: Azerbaijan
           },{
               value: 1,
               feature: Nepal
           },{
               value: 2,
               feature: Tajikistan
           },{
               value: 1,
               feature: Taiwan
           },{
               value: 1,
               feature: Cambodia
           },{
               value: 1,
               feature: Afghanistan
           },{
               value: 1,
               feature: Singapore
           },{
               value: 1,
               feature: UnitedArab
           },{
               value: 1,
               feature: Sweden
           },{
               value: 14,
               feature: Czechia
           },{
               value: 41,
               feature: Russia
           },{
               value: 1,
               feature: Bulgaria
           },{
               value: 1,
               feature: Austria
           },{
               value: 2,
               feature: Finland
           },{
               value: 5,
               feature: Germany
           },{
               value: 3,
               feature: Albania
           },{
               value: 8,
               feature: Italy
           },{
               value: 19,
               feature: Uk
           },{
               value: 10,
               feature: France
           },{
               value: 3,
               feature: Portugal
           },{
               value: 4,
               feature: Greece
           },{
               value: 5,
               feature: Armenia
           },{
               value: 1,
               feature: Macedonia
           },{
               value: 5,
               feature: Slovakia
           },{
               value: 1,
               feature: Slovenia
           },{
               value: 3,
               feature: Iceland
           },{
               value: 3,
               feature: Norway
           },{
               value: 3,
               feature: Spain
           },{
               value: 3,
               feature: Ireland
           },{
               value: 1,
               feature: Belgium
           },{
               value: 1,
               feature: Moldova
           },{
               value: 2,
               feature: Romania
           },{
               value: 1,
               feature: Serbia
           },{
               value: 1,
               feature: Croatia
           },{
               value: 3,
               feature: Tanzania
           },{
               value: 4,
               feature: Ghana
           },{
               value: 20,
               feature: Uganda
           },{
               value: 21,
               feature: SouthAfrica
           },{
               value: 15,
               feature: Senegal
           },{
               value: 14,
               feature: Kenya
           },{
               value: 4,
               feature: Guinea
           },{
               value: 5,
               feature: Cameroon
           },{
               value: 23,
               feature: CentralAfricanRepuplic
           },{
               value: 2,
               feature: Madagascar
           },{
               value: 9,
               feature: Egypt
           },{
               value: 4,
               feature: Mozambique
           },{
               value: 4,
               feature: IvoryCoast
           },{
               value: 4,
               feature: SouthSudan
           },{
               value: 2,
               feature: Ethiopia
           },{
               value: 17,
               feature: Nigeria
           },{
               value: 1,
               feature: Sudan
           },{
               value: 1,
               feature: Seychelles
           },{
               value: 1,
               feature: Congo
           },{
               value: 2,
               feature: Morocco
           },{
               value: 3,
               feature: Zimbabwe
           },{
               value: 1,
               feature: Somalia
           },{
               value: 2,
               feature: Zambia
           },{
               value: 3,
               feature: Tunisia
           },{
               value: 1,
               feature: Namibia
           }],
       }]
     };
   
     const config = {
       type: 'choropleth',
       data: data,
       options: {
           showOutline: true,
           scales: {
               xy: {
                   projection: 'naturalEarth1'
               },
               color: {
                interpolate: (v) => {
                    if (v < 0.1) {
                      return "#e1e198";
                    } else if (v < 0.2) {
                      return "#c8c885";
                    }  else if (v < 0.3) {
                      return "#baba8e";
                    } else if (v < 0.4) {
                      return "#a8ac93";
                    }  else if (v < 0.5) {
                      return "#8f9b93";
                    }  else if (v < 0.6) {
                      return "#6f878d";
                    } else if (v < 0.7) {
                      return "#4a7284";
                    }  else if (v < 0.8) {
                      return "#276586";
                    }  else if (v < 0.9) {
                      return "#05598c";
                    } else {
                      return "#05598c";
                    }
                  },
                  quantize:10,
                  legend:{
                      position: "bottom-right"
                  }
               }
           },
           plugins: {
               legend: {
                   display: false
               },
               title: {
                   display: true,
                   text: 'Arbovirus Discovered by Country',
                   position: 'top',
                   align: 'center',
                   font:{
                       family: 'Montserrat',
                       size: 20
                   }
               }
           }
       }
     };
     const myChart6 = new Chart(
       document.getElementById('myChart3'),
       config
     );

})
}

//Drawing Bar Chart arbovirus by koppen Geiger classification
async function drawBarChartThree() {

    const datapoint = await getDataBiomes();
    const labels = datapoint.labels;
    //console.log(datapoint.af)
    const data = {
        labels: labels,
        datasets: [{
            label: 'Rainforest',
            data: datapoint.af,
            backgroundColor: ['#00054a'],
            borderWidth: 1
        },
        {
            label: 'Monsson ',
            data: datapoint.am,
            backgroundColor: ['#0b2d5d'],
            borderWidth: 1
        },
        {
            label: 'Dry savanna',
            data: datapoint.as,
            backgroundColor: ['#071256'],
            borderWidth: 1
        },
        {
            label: 'Wet savanna',
            data: datapoint.aw,
            backgroundColor: ['#0e2062'],
            borderWidth: 1
        },{
            label: 'Hot Steppe',
            data: datapoint.bsh,
            backgroundColor: ['#152d6f'],
            borderWidth: 1
        },
        {
            label: 'Cold Steppe ',
            data: datapoint.bsk,
            backgroundColor: ['#1c3a7b'],
            borderWidth: 1
        },
        {
            label: 'Hot Desert',
            data: datapoint.bwh,
            backgroundColor: ['#254682'],
            borderWidth: 1
        },{
            label: 'Cold Desert',
            data: datapoint.bwk,
            backgroundColor: ['#2e5188'],
            borderWidth: 1
        },{
            label: 'Humid Subtropical',
            data: datapoint.cfa,
            backgroundColor: ['#365c8d'],
            borderWidth: 1
        },
        {
            label: 'Temperate Oceanic',
            data: datapoint.cfb,
            backgroundColor: ['#3f6893'],
            borderWidth: 1
        },
        {
            label: 'Subpolar Oceanic',
            data: datapoint.cfc,
            backgroundColor: ['#497195'],
            borderWidth: 1
        },{
            label: 'Hot-Summer Mediterranean',
            data: datapoint.csa,
            backgroundColor: ['#527994'],
            borderWidth: 1
        },
        {
            label: 'Warm-Summer Mediterranean',
            data: datapoint.csb,
            backgroundColor: ['#5c8294'],
            borderWidth: 1
        },
        {
            label: 'Monsoon-Influenced Humid Subtropical',
            data: datapoint.cwa,
            backgroundColor: ['#668a93'],
            borderWidth: 1
        },{
            label: 'Subtropical Highlands or Temperate Oceanic with Dry Winters ',
            data: datapoint.cwb,
            backgroundColor: ['#719393'],
            borderWidth: 1
        },{
            label: 'Hot-Summer Humid',
            data: datapoint.dfa,
            backgroundColor: ['#7e9c93'],
            borderWidth: 1
        },
        {
            label: 'Warm-Summer Humid',
            data: datapoint.dfb,
            backgroundColor: ['#8ba594'],
            borderWidth: 1
        },
        {
            label: 'Subartic ',
            data: datapoint.dfc,
            backgroundColor: ['#98ae94'],
            borderWidth: 1
        },{
            label: 'Hot, Dry-summer',
            data: datapoint.dsa,
            backgroundColor: ['#a5b897'],
            borderWidth: 1
        },
        {
            label: 'Warm, Dry-summer',
            data: datapoint.dsb,
            backgroundColor: ['#b1c1a0'],
            borderWidth: 1
        },
        {
            label: 'Dry-Summer Subartic',
            data: datapoint.dsc,
            backgroundColor: ['#bdcaa8'],
            borderWidth: 1
        },{
            label: 'Monsson-Influenced Warm-Summer Humid',
            data: datapoint.dwb,
            backgroundColor: ['#c8d3b1'],
            borderWidth: 1
        },
        {
            label: 'Monsoon-Influenced Subartic',
            data: datapoint.dwc,
            backgroundColor: ['#d4dcbb'],
            borderWidth: 1
        }, {
            label: 'Tundra',
            data: datapoint.et,
            backgroundColor: ['#dfe4cc'],
            borderWidth: 1
        }]
    };
    // stacked Bar config
    const config = {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Arbovirus Discovery by Koppen Geiger Classification',
                    font:{
                        family: 'Montserrat',
                        size: 20
                    }
                }
            },
            resposive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true,
                    title:{
                        display: true,
                        text: 'Climate',
                        align: 'center'
                    }
                },
                y: {
                    stacked: true,
                    title:{
                        display: true,
                        text: 'N˚ Arbovirus Discovered',
                        align: 'center'
                    }
            }
            }
        }
    }
     //render Bar chart One 
     const myChart = new Chart(
        document.getElementById('myChart4'),
        config
    );
}

//Fetching data  Kp 
async function getDataBiomes() {
    
    const labels = [];
    const af = [];
    const am = [];
    const as = [];
    const aw = [];
    const bsh = [];
    const bsk = [];
    const bwh = [];
    const bwk = [];
    const cfa = [];
    const cfb = [];
    const cfc = [];
    const csa = [];
    const csb = [];
    const cwa = [];
    const cwb = [];
    const dfa = [];
    const dfb = [];
    const dfc = [];
    const dsa = [];
    const dsb = [];
    const dsc = [];
    const dwb = [];
    const dwc = [];
    const et = [];
    const url = 'https://gist.githubusercontent.com/JacquelineTida/4ccc00795e1a0b1b38f6ce8ffa7f02a6/raw/1aaeaf96161bc8fb6f71d613cbe093e16c0fd40a/discovery_by_kp.csv';
    const response = await fetch(url);
    const tableData = await response.text();
    //console.log(tableData);

    const table = tableData.split('\n');
    //console.log(table);
    table.forEach(row => {
        const column = row.split(',');

        const biome = column[0];
        const af_num = column[1];
        const am_num  = column[2]
        const as_num  = column[3]
        const aw_num  = column[4]
        const bsh_num  = column[5]
        const bsk_num  = column[6]
        const bwh_num  = column[7]
        const bwk_num  = column[8]
        const cfa_num  = column[9]
        const cfb_num  = column[10]
        const cfc_num  = column[11]
        const csa_num  = column[12]
        const csb_num  = column[13]
        const cwa_num  = column[14]
        const cwb_num  = column[15]
        const dfa_num  = column[16]
        const dfb_num  = column[17]
        const dfc_num  = column[18]
        const dsa_num  = column[19]
        const dsb_num  = column[20]
        const dsc_num = column[21]
        const dwb_num  = column[22]
        const dwc_num  = column[23]
        const et_num = column[24]

        labels.push(biome);
        af.push(af_num);
        am.push(am_num)
        aw.push(aw_num);
        as.push(as_num);
        bsh.push(bsh_num);
        bsk.push(bsk_num);
        bwh.push(bwh_num);
        bwk.push(bwk_num);
        cfa.push(cfa_num);
        cfb.push(cfb_num);
        cfc.push(cfc_num);
        csa.push(csa_num);
        csb.push(csb_num);
        cwa.push(cwa_num);
        cwb.push(cwb_num);
        dfa.push(dfa_num);
        dfb.push(dfb_num);
        dfc.push(dfc_num);
        dsa.push(dsa_num);
        dsb.push(dsb_num);
        dsc.push(dsc_num);
        dwb.push(dwb_num);
        dwc.push(dwc_num);
        et.push(et_num)
    });
        labels.shift();
        af.shift();
        am.shift();
        aw.shift();
        as.shift();
        bsh.shift();
        bsk.shift();
        bwh.shift();
        bwk.shift();
        cfa.shift();
        cfb.shift();
        cfc.shift();
        csa.shift();
        csb.shift();
        cwa.shift();
        cwb.shift();
        dfa.shift();
        dfb.shift();
        dfc.shift();
        dsa.shift();
        dsb.shift();
        dsc.shift();
        dwb.shift();
        dwc.shift();
        et.shift();
    return { labels, af, am, as, aw, bsk, bsh, bwh, bwk, cfa, cfb, cfc, csa, csb, cwa, cwb, dfa, dfb, dfc, dsa, dsb, dsc, dwb, dwc, et}
}

//DOughnut chart Discovery_host
async function drawDoughnutOne() {
    const datapoints = await getDataHost();
    const data = {
        labels: ['Diptera', 'Human', "Primate", 'Perissodactyla', 'Ixodida', 'Artiodactyla', 'Rodentia', 'Chiroptera', 'Aves', 'Didelphimorphia', 'Lagomorpha', 'Unknown', 'Squamata', 'Pilosa', 'Siphonaptera', 'Anura', 'Eulipotyphla', 'Hemiptera', 'Carnivora', 'Pholidota', 'Cingulata'],
        datasets : [
            {
                label: 'datase1',
                data: [datapoints.diptera, datapoints.human, datapoints.primate, datapoints.perissodactyla, datapoints.ixodida, datapoints.artiodactyla, datapoints.rodentia, datapoints.chiroptera, datapoints.aves, datapoints.didelphimorphia, datapoints.lagomorpha, datapoints.unknown, datapoints.squamata, datapoints.pilosa, datapoints.siphonaptera, datapoints.anura, datapoints.eulipotyphla, datapoints.hemiptera, datapoints.carnivora, datapoints.pholidota, datapoints.cingulata],
                backgroundColor: ['#00054a',
                                    '#081458',
                                    '#102567',
                                    '#193476',
                                    '#224380',
                                    '#2d5088',
                                    '#375e8e',
                                    '#426b94',
                                    '#4e7595',
                                    '#597f94',
                                    '#658993',
                                    '#729493',
                                    '#829f93',
                                    '#91a994',
                                    '#a1b596',
                                    '#afc09f',
                                    '#becba9',
                                    '#cbd5b4',
                                    '#d9e0c2',
                                    '#e5ead6',
                                    '#f2f4ea'],
            borderWidth: 0.5
            }
        ]
    };
    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Arbovirus Discovery by Host',
                font: {
                    family: 'Montserrat',
                    size: 20
                }
            }
            }
        },
    }
    const myChart = new Chart(
        document.getElementById('myChart5'),
        config
    );
};
//fetching host
async function getDataHost() {
    const labels = [];
    const diptera = [];
    const human = [];
    const primate = [];
    const perissodactyla = [];
    const ixodida = [];
    const artiodactyla = [];
    const rodentia = [];
    const chiroptera = [];
    const aves = [];
    const didelphimorphia = [];
    const lagomorpha = [];
    const unknown = [];
    const squamata = [];
    const pilosa = [];
    const siphonaptera = [];
    const anura = [];
    const eulipotyphla = [];
    const hemiptera = [];
    const carnivora = [];
    const pholidota = [];
    const cingulata = [];
    const url = 'https://gist.githubusercontent.com/JacquelineTida/3610199a6c8e36a4d247fdb107629c50/raw/7514a15c52858d0d7bf78c3a3424973812222763/discovery_host.csv';
    const response = await fetch(url);
    const tableData = await response.text();
    //console.log(tableData)

    const table = tableData.split('\n');
    //console.log(table)
    table.forEach( row => {
        const column = row.split(',')

        const host = column[0];
        const diptera_num = column[1];
        const human_num = column[2];
        const primate_num = column[3];
        const perissodactyla_num = column[4];
        const ixodida_num = column[5];
        const artiodactyla_num = column[6];
        const rodentia_num = column[7];
        const chiroptera_num = column[8];
        const aves_num = column[9];
        const didelphimorphia_num = column[10];
        const lagomorpha_num = column[11];
        const unknown_num = column[12];
        const squamata_num = column[13];
        const pilosa_num = column[14];
        const siphonaptera_num = column[15];
        const anura_num = column[16];
        const eulipotyphla_num = column[17];
        const hemiptera_num = column[18];
        const carnivora_num = column[19];
        const pholidota_num = column[20];
        const cingulata_num = column[21];

        labels.push(host);
        diptera.push(diptera_num);
        human.push(human_num);
        primate.push(primate_num);
        perissodactyla.push(perissodactyla_num);
        ixodida.push(ixodida_num)
        artiodactyla.push(artiodactyla_num)
        rodentia.push(rodentia_num)
        chiroptera.push(chiroptera_num)
        aves.push(aves_num) 
        didelphimorphia.push(didelphimorphia_num)
        lagomorpha.push(lagomorpha_num)
        unknown.push(unknown_num)
        squamata.push(squamata_num)
        pilosa.push(pilosa_num)
        siphonaptera.push(siphonaptera_num)
        anura.push(anura_num)
        eulipotyphla.push(eulipotyphla_num)
        hemiptera.push(hemiptera_num) 
        carnivora.push(carnivora_num)
        pholidota.push(pholidota_num)
        cingulata.push(cingulata_num)
    });
    labels.shift()
    diptera.shift()
    human.shift()
    primate.shift();
    perissodactyla .shift();
    ixodida .shift();
    artiodactyla.shift();
    rodentia.shift();
    chiroptera .shift();
    aves.shift();
    didelphimorphia.shift();
    lagomorpha.shift();
    unknown.shift();
    squamata.shift();
    pilosa.shift();
    siphonaptera.shift();
    anura.shift();
    eulipotyphla.shift();
    hemiptera.shift();
    carnivora.shift();
    pholidota.shift();
    cingulata.shift();
    //console.log(diptera)
    return{labels, diptera, human, primate, perissodactyla, ixodida, artiodactyla, rodentia, chiroptera, aves, didelphimorphia, lagomorpha, unknown, squamata, pilosa, siphonaptera, anura, eulipotyphla, hemiptera, carnivora, pholidota, cingulata}
}
async function drawStackedBarChartSequence() {
    const datapoints = await getDataPlattform();
    const labels = datapoints.labels;
    const data = {
        labels : labels,
        datasets: [{
            label: 'Complete',
            data: datapoints.complete,
            backgroundColor: 
                '#2e5a96'
        },
        {
            label: 'Partial',
            data: datapoints.partial,
            backgroundColor: 
                '#6b8e93'
        }
        ]
    };
    
// stacked Bar config
    const config = {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Methods Used for Complete and Partial Genomic Sequence',
                    font:{
                        family: 'Montserrat',
                        size: 20
                    }
                }
            },
            resposive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true,
                    title:{
                        display: true,
                        text:'Sequencing Methods'
                    }
                },
                y: {
                    stacked: true,
                    title:{
                        display: true,
                        text: 'N˚ of Arbovirus'
                    }
            }
            }
        }
    }
    
    //render Bar chart One 
    const myChartaxonomy = new Chart(
        document.getElementById('bar_taxonomy'),
        config
    );
}
//fetching plattform
async function getDataPlattform() {
    const labels = [];
    const complete = [];
    const partial = [];

    const url = 'https://gist.githubusercontent.com/JacquelineTida/db414818b85717dbbbcf546487a93aa8/raw/ebef8658c57b9bb173a3dd6f3c464bd57ac23347/plattform_sequence_complete_partial.csv';
    const response = await fetch(url);
    const tableData = await response.text();
    //console.log(tableData)
    const table = tableData.split('\n');
    //console.log(table)
    table.forEach(row => {
        const column = row.split(',');
        const l_num = column[0];
        const c_num = column[1];
        const p_num = column[2];
        

        labels.push(l_num);
        complete.push(c_num);
        partial.push(p_num);
        
    });
    labels.shift();
    complete.shift();
    partial.shift();
    
    return{labels, complete, partial}
}
//Circle packing Family and Genus
const data_tax = {
    name: 'Arbovirus',
    color: '#00054a',
    children: [{
      name: 'Asfaviridae',
      color: '#030b4f',
      children:[{
          name: 'Asfivirus',
          color: '#061155',
          size:1
      }]
    },{
      name: 'Flaviviridae',
      color: '#09175b',
      children: [{
        name: 'Flavivirus',
        color: '#0c1e61',
        size: 96
      }]
    }, {
        name: 'Nairoviridae', 
        color: '#102567',
        children:[{
            name: 'Orthonairovirus',
            color: '#132b6d',
            size: 67
        }]
    }, {
        name: 'Nyamiviridae',
        color: '#173173',
        children:[{
            name: 'Nyavirus', 
            color: '#1b3778',
            size:4
        }, {
            name: 'Unclassified', 
            color: '#1e3d7c',
            size: 2
        }]
    }, {
        name: 'Orthomyxoviridae',
        color: '#224380', 
        children: [{
            name:'Thogotovirus', 
            color: '#274984',
            size: 11
        }, {
            name: 'Quaranjavirus', 
            color: '#2b4e87', 
            size: 4
        },{
            name: 'Unclassified',
            color: '#2f538a',
            size: 3
        }]
    }, {
        name: 'Peribunyaviridae', 
        color: '#33598c', 
        children: [
            {
                name: 'Orthobunyavirus', 
                color: '#375f8e', 
                size: 219
            }, {
                name: 'Pacuvirus',
                color: '#3c6491',
                size: 4 
            }, {
                name: 'unclassified',
                color:  '#406993',
                size: 6
            }
        ]
    }, {
        name: 'Phenuiviridae', 
        color: '#456e94',
        children: [{
            name: 'Bandavirus', 
            color: '#4a7295',
            size:9
        }, {
            name: 'Banyangvirus', 
            color: '#4f7695',
            size:1
        }, {
            name: 'Mobuvirus',
            color: '#537a95',
            size: 1
        }, {
            name: 'Pacuvirus', 
            color: '#587e94',
            size: 1
        }, {
            name: 'Phlebovirus', 
            color: '#5c8294',
            size: 124
        }, {
            name: 'Tanzavirus', 
            color: '#618693',
            size: 1
        }, {
            name: 'Unclassified', 
            color: '#668a93',
            size: 1
        }, {
            name: 'Uukuvirus', 
            color: '#6b8f93',
            size: 16
        }]
    }, {
        name: 'Reoviridae', 
        color: '#719393', 
        children: [{
            name: 'coltivirus',
            color:'#779793',
            size: 6
        }, {
            name: 'Orbivirus',
            color: '#7d9c93',
            size: 196
        }, {
            name: 'Seadornavirus',
            color: '#84a093',
            size: 4
        }, {
            name: 'Unclassified',
            color: '#8aa494',
            size: 2
        }]
    }, {
        name: 'Rhabdoviridae',
        color: '#90a894',
        children: [{
            name: 'Arurhavirus',
            color: '#96ad95', 
            size:3
        },{
            name: 'Curiovirus',
            color: '#9db296', 
            size:4
        }, {
            name: 'Dimarhabdovirus',
            color: '#a3b797', 
            size:1
        }, {
            name: 'Ephemerovirus',
            color: '#a9bb9b', 
            size:13
        }, {
            name: 'Hapavirus',
            color: '#aec09f', 
            size:16
        }, {
            name: 'Ledantevirus',
            color: '#b4c4a3', 
            size:15
        }, {
            name: 'Ohlsrhavirus ',
            color: '#bac9a7', 
            size:1
        }, {
            name: 'Sawgrhavirus',
            color: '#c0cdab', 
            size:2
        },{
            name: 'Sripuvirus',
            color: '#c6d1af',
            size: 9
        },{
            name: 'Sunrhavirus',
            color: '#cbd5b4',
            size: 1
        }, {
            name: 'Tibrovirus',
            color: '#d0d9b9',
            size: 8
        },{
            name: 'Tupavirus',
            color: '#d6debf',
            size: 2
        },{
            name: 'Unclassified',
            color: '#dbe2c6',
            size: 5
        }, {
            name: 'Vesiculovirus',
            color: '#e0e6ce',
            size: 16
        }]
    },{
        name: 'Togaviridae',
        color: '#e5ead6',
        children: [{
            name:'Alphavirus',
            color: '#eaeede',
            size: 25
        }]
    }, {
        name:'Unclassified',
        color: '#eff2e6',
        size: 14
    }]
  };

  CirclePack()
    .data(data_tax)
    .size('size')
    .color('color')
    .tooltipContent((d, node) => `Size: <i>${node.value}</i>`)
    .zoomBy(4)
    .width(900)
    .height(600)
    (document.getElementById('myChart1_taxonomy'));

//Dughnut chart sequence taxonomy
async function drawDoughnutSequence() {
    const datapoints = await getDataSequence()
    const labels = datapoints.labels;
    const data = {
        labels: labels,
        datasets: [{
            label: 'dataset_sequence',
            data: datapoints.amount,
            backgroundColor: [
                '#2e5a96',
                '#6b8e93',
                '#bcc894'
            ]
        }]
    };
    const config ={
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Status of Arbovirus Sequence',
                    font:{
                        font: 'Montserrat',
                        size: 20
                    }
                }
            }
        }
    }
    const myChart = new Chart(
        document.getElementById('doughnut_taxonomy'),
        config
    )
}
//fetch sequence
async function getDataSequence() {
    const labels = [];
    const amount = [];
    const url = 'https://gist.githubusercontent.com/JacquelineTida/17b4a2f2a03b95cee22fc8adaee73976/raw/aafe8ac6571d5298c6a1afcb9bc472ad054e4f81/sequence_taxonomy.csv';
    const response = await fetch(url);
    const tableData = await response.text();
    const table = tableData.split('\n');
    table.forEach(row => {
        const column = row.split(',');
        const status = column[0];
        const number = column[1];

        labels.push(status);
        amount.push(number);

    });
    labels.shift();
    amount.shift();
    return{labels, amount}
}

//BoxPlot genome length by family
async function drawBoxPlotGenome() {
    const datapoints = await getDataGenomelength();
    const labels = datapoints.new_labels;
    console.log(labels)
    const data = {
        labels: labels,
        datasets: [{
          label: 'Genome length',
          backgroundColor: '#6284A7',
          borderColor: '#426B95',
          borderWidth: 1,
          outlierColor: '#828231',
          padding: 10,
          itemRadius: 3,
          data: [
              datapoints.new_fla,
              datapoints.new_nai,
              datapoints.new_nya,
              datapoints.new_ortho,
              datapoints.new_peri,
              datapoints.new_phenu,
              datapoints.new_reo,
              datapoints.new_rhabdo,
              datapoints.new_toga
          ]
        }]
    };
    const config = {
        type: 'boxplot',
          data: data,
          options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Genome Length by Arbovirus Family',
                    font:{
                        family: 'Montserrat',
                        size: 20
                    }
                }
            },
            scales:{
                y:{
                    title:{
                        display:true,
                        text: 'Genome Length in Nucleotides'
                    }
                },
                x:{
                    title:{
                        display: true,
                        text: 'Families'
                    }
                }
            }
          }
    };
    const myBoxPlot = new Chart(
        document.getElementById('boxplot_taxonomy'),
        config
    );
}
 async function getDataGenomelength() {
     const labels = [];
     const fla = [];
     const nai = [];
     const nya = [];
     const ortho = [];
     const peri = [];
     const phenu = [];
     const reo = [];
     const rhabdo = [];
     const toga = [];

     const url = 'https://gist.githubusercontent.com/JacquelineTida/0cb99079a05cc0e1f75949ea1c7d53a8/raw/c8f81d217993ea1aeec98610cfbfe31f2569e7a4/genome_length.csv';
     const response = await fetch(url);
     const tableData = await response.text();

     const table = tableData.split('\n');
     table.forEach(row => {
         const column = row.split(',');
         const label = column [0];
         const fla_num = column[1]
         const nai_num = column[2];
         const nya_num = column[3];
         const ortho_num = column[4];
         const peri_num = column[5];
         const phenu_num = column[6];
         const reo_num = column[7];
         const rab_num = column[8];
         const tog_num = column[9];

         labels.push(label);
         fla.push(fla_num)
         nai.push(nai_num);
         nya.push(nya_num);
         ortho.push(ortho_num);
         peri.push(peri_num);
         phenu.push(phenu_num);
         reo.push(reo_num);
         rhabdo.push(rab_num);
         toga.push(tog_num);
     });
    const  new_labels = labels.filter(entry =>{return entry != null && entry != '';})
    const  new_fla = fla.filter(entry =>{return entry != null && entry != '';})
    const  new_nai = nai.filter(entry =>{return entry != null && entry != '';})
    const  new_nya = nya.filter(entry =>{return entry != null && entry != '';})
    const  new_ortho = ortho.filter(entry =>{return entry != null && entry != '';})
    const  new_peri = peri.filter(entry =>{return entry != null && entry != '';})
    const  new_phenu = phenu.filter(entry =>{return entry != null && entry != '';})
    const  new_reo = reo.filter(entry =>{return entry != null && entry != '';})
    const  new_rhabdo = rhabdo.filter(entry =>{return entry != null && entry != '';})
    const  new_toga = toga.filter(entry =>{return entry != null && entry != '';})

     return{new_labels, new_fla, new_nai, new_nya, new_ortho, new_peri, new_phenu, new_reo, new_rhabdo, new_toga}

     }

