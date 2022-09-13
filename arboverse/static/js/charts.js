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