//call for the charts
drawBarChartOne();
drawBarChartTwo();
drawBarChartThree();
drawDoughnutOne();

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
            backgroundColor: ['rgba(1, 25, 89, 0.7)'],
            borderColor: ['rgb(1, 25, 89)'],
            borderWidth: 1
        },{
            label: 'Accumulated Arbovirus discover',
            type: 'line',
            data: datapoints.timeDataTwo,
            yAxisID: 'accumulated',
            fill: true,
            backgroundColor: ['rgba(242, 157, 107, 0.2)'],
            borderColor: [
                '#f29d6b'
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
            label: 'Arbovirus discovery by continents',
            type: 'bar', 
            data: datapoints.continentData,
            backgroundColor: [
            '#011959',
            '#216061',
            '#828231',
            '#f29d6b',
            '#faccfa']
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
                    projection: 'naturalEarth1'
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

//Drawing Bar Chart arbovirus by koppen Geiger classification
async function drawBarChartThree() {

    const datapoint = await getDataBiomes();
    const labels = datapoint.labels;
    const data = {
        labels: labels,
        datasets: [{
            label: 'Af | Rainforest',
            data: datapoint.af,
            backgroundColor: ['#011959']
        },
        {
            label: 'Am | Monsson ',
            data: datapoint.am,
            backgroundColor: ['#0b2d5d']
        },
        {
            label: 'As | Dry savanna',
            data: datapoint.as,
            backgroundColor: ['#103e5f']
        },
        {
            label: 'Aw | Wet savanna',
            data: datapoint.aw,
            backgroundColor: ['#134b61']
        },{
            label: 'BSh | Hot Steppe',
            data: datapoint.bsh,
            backgroundColor: ['#195762']
        },
        {
            label: 'BSk | Cold Steppe ',
            data: datapoint.bsk,
            backgroundColor: ['#256260']
        },
        {
            label: 'BWh | Hot desert',
            data: datapoint.bwh,
            backgroundColor: ['#366a58']
        },{
            label: 'BWk | Cold desert',
            data: datapoint.bwk,
            backgroundColor: ['#4a724e']
        },{
            label: 'Cfa | Humid subtropical',
            data: datapoint.cfa,
            backgroundColor: ['#5b7745']
        },
        {
            label: 'Cfb | Temperate oceanic',
            data: datapoint.cfb,
            backgroundColor: ['#667a3f']
        },
        {
            label: 'Cfc | Subpolar oceanic',
            data: datapoint.cfc,
            backgroundColor: ['#707d3a']
        },{
            label: 'Csa | Hot-summer mediterranean',
            data: datapoint.csa,
            backgroundColor: ['#7c8035']
        },
        {
            label: 'Csb | Warm-summer mediterranean',
            data: datapoint.csb,
            backgroundColor: ['#888430']
        },
        {
            label: 'Cwa | Monsoon-influenced humid subtropical',
            data: datapoint.cwa,
            backgroundColor: ['#94872d']
        },{
            label: 'Cwb | Subtropical highlands or temperate oceanic with dry winters ',
            data: datapoint.cwb,
            backgroundColor: ['#a18a2c']
        },{
            label: 'Dfa | Hot-summer humid',
            data: datapoint.dfa,
            backgroundColor: ['#dd964e']
        },
        {
            label: 'Dfb | Warm-summer humid',
            data: datapoint.dfb,
            backgroundColor: ['#e7995b']
        },
        {
            label: 'Dfc | Subartic ',
            data: datapoint.dfc,
            backgroundColor: ['#f09c68']
        },{
            label: 'Dsa | Hot, dry-summer',
            data: datapoint.dsa,
            backgroundColor: ['#f5a077']
        },
        {
            label: 'Dsb | Warm, dry-summer',
            data: datapoint.dsb,
            backgroundColor: ['#faa586']
        },
        {
            label: 'Dsc | Dry-summer subartic',
            data: datapoint.dsc,
            backgroundColor: ['#fcaa95']
        },{
            label: 'Dwb | Monsson-influenced warm-summer humid',
            data: datapoint.dwb,
            backgroundColor: ['#fdafa4']
        },
        {
            label: 'Dwc | Monsoon-influenced subartic',
            data: datapoint.dwc,
            backgroundColor: ['#fdb3b2']
        }, {
            label: 'Et | Tundra',
            data: datapoint.et,
            backgroundColor: ['#faccfa']
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
                    text: 'Arbovirus discovery by Koppen Geiger classification'
                }
            },
            resposive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true,
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

//Fetching data Biomes Kp 
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

//
async function drawDoughnutOne() {
    const datapoints = await getDataHost();
    const data = {
        labels: ['Diptera', 'Human', "Primate", 'Perissodactyla', 'Ixodida', 'Artiodactyla', 'Rodentia', 'Chiroptera', 'Aves', 'Didelphimorphia', 'Lagomorpha', 'Unknown', 'Squamata', 'Pilosa', 'Siphonaptera', 'Anura', 'Eulipotyphla', 'Hemiptera', 'Carnivora', 'Pholidota', 'Cingulata'],
        datasets : [
            {
                label: 'datase1',
                data: [datapoints.diptera, datapoints.human, datapoints.primate, datapoints.perissodactyla, datapoints.ixodida, datapoints.artiodactyla, datapoints.rodentia, datapoints.chiroptera, datapoints.aves, datapoints.didelphimorphia, datapoints.lagomorpha, datapoints.unknown, datapoints.squamata, datapoints.pilosa, datapoints.siphonaptera, datapoints.anura, datapoints.eulipotyphla, datapoints.hemiptera, datapoints.carnivora, datapoints.pholidota, datapoints.cingulata],
                backgroundColor: ['#011959',
                                    '#0b2c5d',
                                    '#0f3c5f',
                                    '#134961',
                                    '#185562',
                                    '#216061',
                                    '#30685b',
                                    '#426f52',
                                    '#577647',
                                    '#6b7c3c',
                                    '#828231',
                                    '#9a882b',
                                    '#b38e2f',
                                    '#cb923d',
                                    '#e19751',
                                    '#f29d6b',
                                    '#fba689',
                                    '#fdafa7',
                                    '#fdb9c1',
                                    '#fcc3dd',
                                    '#faccfa']
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
                text: 'Arbovirus discovery by host'
            }
            }
        },
    }
    const myChart = new Chart(
        document.getElementById('myChart5'),
        config
    );
};

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
    console.log(diptera)
    return{labels, diptera, human, primate, perissodactyla, ixodida, artiodactyla, rodentia, chiroptera, aves, didelphimorphia, lagomorpha, unknown, squamata, pilosa, siphonaptera, anura, eulipotyphla, hemiptera, carnivora, pholidota, cingulata}
}