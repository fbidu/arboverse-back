drawDistributionMap();
drawDistributionBarChart();

async function drawDistributionBarChart(){
    const datapoints = await getDistributionContinent();
    const labels = datapoints.labels;

}
//Drawing Bar chart arbovirus dicovery and continent
async function drawDistributionBarChart() {
    const datapoints = await getDistributionContinent();
    const labels = datapoints.labels;
    const data = {
        labels : labels,
        datasets: [{
            label: 'Arbovirus distribution',
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
                    text: 'Arbovirus distribution by continent',
                    position: 'top',
                    align: 'center'
                }
            }
        },
    }

    //render Bar Chart Two 
    const myChart = new Chart(
        document.getElementById('myChart_D2'),
        config
    );
}
//fetching Data by continent 
async function getDistributionContinent() {
    const labels = [];
    const continentData = [];

    const url = 'https://gist.githubusercontent.com/JacquelineTida/250f9d2f71cc3d4202a03d54ad0cdd44/raw/0981977658eff88eebb013f23e7f8cd1f264cd95/arbovirus_distribution_continent.csv';
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

async function drawDistributionMap() {
    const datapoints = await getDistributionData();
    const labels = datapoints.labels;
    console.log(datapoints.distribution);
    //chart Geo for arbovirus discovery chart Geo for arbovirus discovery by country
    const atlasUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

    const world = fetch(atlasUrl).then((result) => result.json()).then((datapoint) => {
        const countries = ChartGeo.topojson.feature(datapoint, datapoint.objects.countries).features;
        //console.log(countries[45].properties.name);
        //console.log(countries.map(country => country.properties.name)); 
        //console.log(pais)
       
        //setup
        const brazil = countries.find(country => country.properties.name === 'Brazil');
        const china = countries.find(country => country.properties.name === 'China')
        console.log(datapoints.labels)
            const data = {
                labels : labels,
                datasets : [{
                    label: 'Countries',
                    outline: countries,
                    showOutline: true,
                    data:[{
                        value: 211,
                        feature: brazil
                    }, {
                        value: 52,
                        feature: china
                    }]
                }]
            };

            const configMAp = {
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
            const myChart = new Chart(
                document.getElementById('myChart_D1'),
                configMAp
            );
    
        

    })
}

async function getDistributionData() {
    const labels = [];
    const distribution = [];
     const url = 'https://gist.githubusercontent.com/JacquelineTida/b123b2795a23cee87603bf752fe161e1/raw/93897e27be363a87e9e87e8ed16af5df31b537bf/distribution.csv';

     const response = await fetch(url);
     const tableData = await response.text();

     const table = tableData.split('\n');
     table.forEach(row => {
         const column = row.split(',');
         const country = column[0];
         const amount = column[1];

         labels.push(country);
         distribution.push(amount);
     });
     labels.shift();
     distribution.shift();
     
     return{labels, distribution}
}
