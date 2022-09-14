//call for the charts
drawBarChartOne();
drawBarChartTwo();

//Drawing Bar Chart Arbovirus Time
async function drawBarChartOne() {
    const datapoints = await getData();
    const labels = datapoints.labels;
    const data = {
        labels : labels,
        datasets: [{
            label: 'Arbovirus discovered by year',
            type: 'bar',
            data: datapoints.timeDataOne,
            yAxisID: 'y',
            backgroundColor: ['rgba(68, 94, 242, 0.9)'],
            borderColor: ['rgb(68, 94, 242)'],
            borderWidth: 1
        },{
            label: 'Accumulated Arbovirus discover',
            type: 'line',
            data: datapoints.timeDataTwo,
            yAxisID: 'accumulated',
            fill: true,
            backgroundColor: ['rgba(245, 134, 31, 0.2)'],
            borderColor: [
                'rgb(245, 134, 31)'
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
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    type: 'linear',
                    position: 'left',
                }, 
                accumulated: {
                    beginAtZero: true,
                    type: 'linear',
                    position: 'right',
                    grid: {
                        display: false,
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
        labels : labels,
        datasets: [{
            label: 'Arbovirus discovered',
            type: 'bar', 
            data: datapoints.continentData,
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)'],
            borderWidth: 1,
            borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)'
            ]
        }]
    };

    //Bar Chart config
    const config = {
        type: 'bar', 
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Arbovirus discovered by continent',
                    position: 'top',
                    align: 'center'
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
    const labels = [];
    const continentData = [];

    const url = 'https://gist.githubusercontent.com/JacquelineTida/485e7a798565599f636eb3a3e7e75507/raw/efe6309fd0df002d877a84f7f7b67ddefd036fdc/discovery_by_continent.csv';
    const response = await fetch(url);
    const tableData = await response.text();

    const table = tableData.split('\n');
    table.forEach(row => {
        const column = row.split(',');
        const continet = column[0];
        const amount = column[1];
        labels.push(continet);
        continentData.push(amount);
    });
    labels.shift();
    continentData.shift();
    return { labels, continentData}
}

//chart Geo for arbovirus discovery by country
const atlasUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

 const world = fetch(atlasUrl).then((result) => result.json()).then((datapoint) => {
    const countries = ChartGeo.topojson.feature(datapoint, datapoint.objects.countries).features;
    //console.log(countries[45].properties.name);
    console.log(countries.map(country => country.properties.name));
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
                    projection: 'equalEarth'
                },
                color: {
                    interpolate: 'interpolateOrRd', 
                    quantize: 10
                }
            },
            plugins: {
                legend: {
                    diplay: false,
                },
                title: {
                    display: true,
                    text: 'Arbovirus discovered by country',
                    position: 'top',
                    align: 'center'
                }
            }
        }
      };
      const myChart3 = new Chart(
        document.getElementById('myChart3'),
        config
      );

})
