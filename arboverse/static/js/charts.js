//call for the charts
drawBarChartOne();

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