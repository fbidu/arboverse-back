drawBarChartLevelDisease();
drawMultiPieChartHumanDisease()
drawSpiderChartHumanDisease();



async function drawBarChartLevelDisease() {
    Chart.register(ChartjsPluginStacked100.default)

    const datapoints = await getDataPercentage();

    const labels = datapoints.labels;
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Hyperendemic',
                data:datapoints.hyper,
                backgroundColor: [
                '#00054a'
                ],
                borderColor: [
                '#00054a'
                ],
                borderWidth: 1
            },{
                label: 'Epidemic',
                data:datapoints.epi,
                backgroundColor: [
                '#1c3f84'
                ],
                borderColor: [
                '#1c3f84'
                ],
                borderWidth: 1
            },
        {
            label: 'Endemic',
                data:datapoints.ende,
                backgroundColor: [
                '#43709d'
                ],
                borderColor: [
                '#43709d'
                ],
                borderWidth: 1
        }, {
            label: 'Outbreaks',
                data:datapoints.out,
                backgroundColor: [
                '#6b8e93'
                ],
                borderColor: [
                '#6b8e93'
                ],
                borderWidth: 1
        }, {
            label: 'Sporadic',
                data:datapoints.spo,
                backgroundColor: [
                '#99ad88'
                ],
                borderColor: [
                '#99ad88'
                ],
                borderWidth: 1
        }, {
            label: 'Unknown',
                data:datapoints.unk,
                backgroundColor: [
                '#e2e6b7'
                ],
                borderColor: [
                '#e2e6b7'
                ],
                borderWidth: 1
        }]
        };
            
        // stacked Bar config
            const config = {
                type: 'bar',
                data: data,
                options: {
                    indexAxis: 'y',
                    plugins: {
                        stacked100 : {
                            enable: true,
                            precision:2
                        }
                    },
                    resposive: true,
                    maintainAspectRatio: false
                }
            }
    
    //render Bar chart One 
    const myChart = new Chart(
        document.getElementById('myChart_disease_level'),
        config
    );
}
//Fetching data arbv and outbreaks level 
async function getDataPercentage() {

    const labels = [];
    const hyper = [];
    const epi = [];
    const ende = [];
    const out = [];
    const spo = [];
    const unk = [];


    const url = 'https://gist.githubusercontent.com/JacquelineTida/7da049a5c295d5932cdbeb73445bd906/raw/dfbad7d9d9d7b747c2a4fc6518eb1731f841c961/level_disease.csv';
    const response = await fetch(url);
    const tableData = await response.text();// csv to text
    //console.log(tableData);

    const table = tableData.split('\n'); //separate array
    //console.log(table)
    table.forEach(row => {
        const column = row.split(',');
        //console.log(column);
        const families = column[0];
        const hyper_number = column[1];
        const epi_number = column[2];
        const ende_number = column[3];
        const out_number = column[4];
        const spo_number = column[5];
        const unk_number = column[6];

        labels.push(families);
        hyper.push(hyper_number);
        epi.push(epi_number);
        ende.push(ende_number);
        out.push(out_number);
        spo.push(spo_number);
        unk.push(unk_number);
    });
        labels.shift();
        hyper.shift();
        epi.shift();
        ende.shift();
        out.shift();
        spo.shift();
        unk.shift();
    //console.log(timeDataTwo)
    return {labels, hyper, epi, ende, out, spo, unk}

}

async function drawSpiderChartHumanDisease() {
    const datapoints = await getDataHumanDisease();
    const labels = datapoints.labels;
    const data = {
        labels : labels,
        datasets: [{
            label: 'Central Nervous System',
            data: datapoints.cns,
            backgroundColor: 
                '#00054a',
            borderColor: 
                '#00054a',
            borderWidth: 1
        },
        {
            label: 'Febrile Illness',
            data: datapoints.fi,
            backgroundColor: 
                '#234a8c',
            borderColor: 
                '#234a8c',
            borderWidth: 1
        },
        {
            label: 'Hemorrhagic Fever',
            data: datapoints.hf,
            backgroundColor: 
                '#547d9c',
            borderColor: 
                '#547d9c',
            borderWidth: 1
        }, {
            label: 'Hepatitis', 
            data: datapoints.hep,
            backgroundColor: '#849e89',
            borderColor: '#849e89',
            borderWidth: 1
        }, {
            label: 'Unknown',
            data: datapoints.ukn,
            backgroundColor: '#d4dba8',
            borderColor: '#d4dba8',
            borderWidth: 1

        }
        ]
    };
    
// stacked Bar config
    const config = {
        type: 'radar',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Human diseases caused by arbovirus and its family'
                }
            },
            resposive: true,
            maintainAspectRatio: false
        }
    }
    
    //render Bar chart One 
    const myChart = new Chart(
        document.getElementById('human_disease'),
        config
    );
}
//Fetching data arbv and human disease
async function getDataHumanDisease() {

    const labels = [];
    const cns = [];
    const fi = [];
    const hf = [];
    const hep = [];
    const ukn = [];


    const url = 'https://gist.githubusercontent.com/JacquelineTida/0ab2f3c31b0d8c40898fc76ee1acf098/raw/493b65ddabf1a6d4b54841da191100c823db01b4/human_disease.csv';
    const response = await fetch(url);
    const tableData = await response.text();// csv to text
    //console.log(tableData);

    const table = tableData.split('\n'); //separate array
    //console.log(table)
    table.forEach(row => {
        const column = row.split(',');
        //console.log(column);
        const families = column[0];
        const cns_number = column[1];
        const fi_number = column[2];
        const hf_number = column[3];
        const hep_number = column[4];
        const ukn_number = column[5];

        labels.push(families);
        cns.push(cns_number);
        fi.push(fi_number);
        hf.push(hf_number);
        hep.push(hep_number);
        ukn.push(ukn_number);
    });
        labels.shift();
        cns.shift();
        fi.shift();
        hf.shift();
        hep.shift()
    //console.log(timeDataTwo)
    return {labels, cns, fi, hf, hep, ukn}

}
function drawMultiPieChartHumanDisease(){
    const ctx = document.getElementById('human_disease_pie').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'doughnut',
    
        options: {
            responsive: true,
            plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Human Disease'
            }
            }
        },
    data: {
        labels: ['Human Disease', 'Uknown Human Disease', 'Fatal Human Disease', 'Unknown Fatal Human Disease'],
        datasets: [{
            label: 'Human Disease',
            data: [154, 768, 0, 0],
            backgroundColor: ['#1d3e81', '#436c97','#9fb393', '#dbe1b7'],
            borderWidth: 1
        },{
            label: 'Fatal Human Disease',
            data: [0, 0, 45, 877],
            backgroundColor: ['#1d3e81', '#436c97','#9fb393', '#dbe1b7'],
            borderWidth: 1
        }]
    },
    
});
};

