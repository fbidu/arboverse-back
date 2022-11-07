drawVectorTransmissionPie();
drawVectorGenusBarStack();
drawVectorHabitat();
drawVectorFeedBehavior();


async function drawVectorTransmissionPie(){

    const datapoints = await getVectorDataTransmission();
    const data = {
        labels: datapoints.labels,
        datasets: [
            {
                label: 'order',
                data: datapoints.order,
                backgroundColor: ['#00404d', '#607d14', '#ffe599', '#0a4646', '#144c40', '#1e533a', '#285935', '#80922e', '#a0a749', '#e0d17e']
            },{
                label: 'organism',
                data: datapoints.org,
                backgroundColor: ['#00404d', '#607d14', '#ffe599', '#0a4646', '#144c40', '#1e533a', '#285935', '#80922e', '#a0a749', '#e0d17e']
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
                    text: 'Vectors related to arbovirus transmission'
                }
            }
        }
    }

    const myChart = new Chart(
        document.getElementById('vector_pie'),
        config
    );
};

async function getVectorDataTransmission(){
    const labels = [];
    const order = [];
    const org = [];

    const url = 'https://gist.githubusercontent.com/JacquelineTida/f1d61a137ae870bc8f1a1e6fd9e59344/raw/be4495de2c91455a9d8d1321fb4bcc5b142b1892/vector_transmission.csv';
    const response = await fetch(url);
    const tableData = await response.text();
    const table = tableData.split('\n');
    table.forEach( row => {

        const column = row.split(',')

        const name = column[0];
        const order_num = column[1];
        const org_num = column[2];

        labels.push(name);
        order.push(order_num);
        org.push(org_num)
    });
    return{labels, order, org}
}

async function drawVectorGenusBarStack(){
    const datapoints = await getVectorGenusData();
    const labels = datapoints.labels;
    console.log(datapoints.labels);

    const  data = {
        labels: labels,
        datasets: [{
            label: 'Argas',
            data: datapoints.argas,
            backgroundColor: ['#011959'],
            borderWidth: 1
        },{
            label: 'Carios',
            data: datapoints.carios,
            backgroundColor: ['#08265b'],
            borderWidth: 1
        },{
            label: 'Ornithodoros',
            data: datapoints.ornithodoros,
            backgroundColor: ['#0d325e'],
            borderWidth: 1
        },{
            label: 'Culicoides',
            data: datapoints.culicoides,
            backgroundColor: ['#0f3c5f'],
            borderWidth: 1
        },{
            label: 'Oeciacus',
            data: datapoints.oecicacus,
            backgroundColor: ['#124561'],
            borderWidth: 1
        },{
            label: 'Stricticimex',
            data: datapoints.strictimex,
            backgroundColor: ['#144d62'],
            borderWidth: 1
        },{
            label: 'Aedeomyia',
            data: datapoints.aedeomyia,
            backgroundColor: ['#185562'],
            borderWidth: 1
        },{
            label: 'Aedes',
            data: datapoints.aedes,
            backgroundColor: ['#1e5c62'],
            borderWidth: 1
        },{
            label: 'Anopheles',
            data: datapoints.anopheles,
            backgroundColor: ['#26635f'],
            borderWidth: 1
        },{
            label: 'Armigeres',
            data: datapoints.armigeres,
            backgroundColor: ['#30685b'],
            borderWidth: 1
        },{
            label: 'Coquillettidia',
            data: datapoints.coquillettidia,
            backgroundColor: ['#3c6d56'],
            borderWidth: 1
        },{
            label: 'Culex',
            data: datapoints.culex,
            backgroundColor: ['#49714e'],
            borderWidth: 1
        },{
            label: 'Culiseta',
            data: datapoints.culiseta,
            backgroundColor: ['#577647'],
            borderWidth: 1
        },{
            label: 'Eretmapodites',
            data: datapoints.eretmapodites,
            backgroundColor: ['#647a3f'],
            borderWidth: 1
        },{
            label: 'Haemagogus',
            data: datapoints.haemagogus,
            backgroundColor: ['#737e38'],
            borderWidth: 1
        },{
            label: 'Lutzia',
            data: datapoints.lutzia,
            backgroundColor: ['#828231'],
            borderWidth: 1
        },{
            label: 'Mansonia',
            data: datapoints.mansonia,
            backgroundColor: ['#91862d'],
            borderWidth: 1
        },{
            label: 'Psorophora',
            data: datapoints.psorophora,
            backgroundColor: ['#a28a2b'],
            borderWidth: 1
        },{
            label: 'Sabethes',
            data: datapoints.sabethes,
            backgroundColor: ['#b38e2f'],
            borderWidth: 1  
        },{
            label: 'Trichoprosopon',
            data: datapoints.trichoprosopon,
            backgroundColor: ['#c39137'],
            borderWidth: 1   
        },{
            label: 'Verrallina',
            data: datapoints.verrallina,
            backgroundColor: ['#d29343'],
            borderWidth: 1   
        },{
            label: 'Wyeomyia',
            data: datapoints.wyeomyia,
            backgroundColor: ['#d29343'],
            borderWidth: 1   
        },{
            label: 'Amblyomma',
            data: datapoints.amblyomma,
            backgroundColor: ['#e19751'],
            borderWidth: 1   
        },{
            label: 'Dermacentor',
            data: datapoints.dermacentor,
            backgroundColor: ['#ed9a62'],
            borderWidth: 1 
        },{
            label: 'Haemaphysalis',
            data: datapoints.haemaphysalis,
            backgroundColor: ['#f6a075'],
            borderWidth: 1 
        },{
            label: 'Hyalomma',
            data: datapoints.hyalomma,
            backgroundColor: ['#fba689'],
            borderWidth: 1 
        },{
            label: 'Ixodes',
            data: datapoints.ixodes,
            backgroundColor: ['#fdac9d'],
            borderWidth: 1 
        },{
            label: 'Rhipicephalus',
            data: datapoints.rhipicephalus,
            backgroundColor: ['#fdb2af'],
            borderWidth: 1 
        },{
            label: 'Eucampsipoda',
            data: datapoints.eucampsipoda,
            backgroundColor: ['#fdb9c1'],
            borderWidth: 1 
        },{
            label: 'Lutzomyia',
            data: datapoints.lutzomyia,
            backgroundColor: ['#fcbfd3'],
            borderWidth: 1 
        },{
            label: 'Phlebotomus',
            data: datapoints.phlebotomus,
            backgroundColor: ['#fcc6e7'],
            borderWidth: 1
        }]
    };
    const config = {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Families and genus related to vectors associated to arbovirus transmission'
                }
            },
            resposive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Families',
                        align: 'end'
                    }
                },
                y: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'N˚ of Vectors',
                        align: 'end'
                    }
            }
            }
        }
    }
     //render Bar chart One 
     const myChart = new Chart(
        document.getElementById('vector_bar'),
        config
    );
}

async function getVectorGenusData() {
    const labels = [];
    const argas = [];
    const carios = [];
    const ornithodoros = [];
    const culicoides = [];
    const oecicacus = [];
    const strictimex = [];
    const aedeomyia = [];
    const aedes = [];
    const anopheles = [];
    const armigeres = [];
    const coquillettidia = [];
    const culex = [];
    const culiseta = [];
    const eretmapodites = [];
    const haemagogus = [];
    const lutzia = [];
    const mansonia = [];
    const psorophora = [];
    const sabethes = [];
    const trichoprosopon = [];
    const verrallina = [];
    const wyeomyia = [];
    const amblyomma = [];
    const dermacentor = [];
    const haemaphysalis = [];
    const hyalomma = [];
    const ixodes = [];
    const rhipicephalus = [];
    const eucampsipoda = [];
    const lutzomyia = [];
    const phlebotomus = [];

    const url = 'https://gist.githubusercontent.com/JacquelineTida/469f83559b20df990f30214ac31b26a0/raw/ff6fef23376dcf7fe4c9bd03c4b9bff8b7fd34be/Vector_family_genus.csv';
    const response = await fetch(url);
    const tableData = await response.text();
    const table = tableData.split('\n');
    table.forEach(row => {
        const column = row.split(',');

        const name = column[0];
        const a = column[1];
        const b = column[2];
        const c = column[3];
        const d = column[4];
        const e = column[5];
        const f = column[6];
        const g = column[7];
        const h = column[8];
        const i = column[9];
        const j = column[10];
        const k = column[11];
        const l = column[12];
        const m = column[13];
        const n = column[14];
        const o = column[15];
        const p = column[16];
        const q = column[17];
        const r = column[18];
        const s = column[19];
        const t = column[20];
        const u = column[21];
        const v = column[22];
        const x = column[23];
        const y = column[24];
        const w = column[25];
        const z = column[26];
        const aa = column[27];
        const bb = column[28];
        const cc = column[29];
        const dd = column[30];
        const ee = column[31];

        labels.push(name);
        argas.push(a);
        carios.push(b);
        ornithodoros.push(c);
        culicoides.push(d);
        oecicacus.push(e);
        strictimex.push(f);
        aedeomyia.push(g);
        aedes.push(h);
        anopheles.push(i);
        armigeres.push(j);
        coquillettidia.push(k);
        culex.push(l);
        culiseta.push(m);
        eretmapodites.push(n);
        haemagogus.push(o);
        lutzia.push(p);
        mansonia.push(q);
        psorophora.push(r);
        sabethes.push(s);
        trichoprosopon.push(t);
        verrallina.push(u);
        wyeomyia.push(v);
        amblyomma.push(x);
        dermacentor.push(y);
        haemaphysalis.push(w);
        hyalomma.push(z);
        ixodes.push(aa);
        rhipicephalus.push(bb);
        eucampsipoda.push(cc);
        lutzomyia.push(dd);
        phlebotomus.push(ee);
    });
        labels.shift();
        argas.shift();
        carios.shift();
        ornithodoros.shift();
        culicoides.shift();
        oecicacus.shift();
        strictimex.shift();
        aedeomyia.shift();
        aedes.shift();
        anopheles.shift();
        armigeres.shift();
        coquillettidia.shift();
        culex.shift();
        culiseta.shift();
        eretmapodites.shift();
        haemagogus.shift();
        lutzia.shift();
        mansonia.shift();
        psorophora.shift();
        sabethes.shift();
        trichoprosopon.shift();
        verrallina.shift();
        wyeomyia.shift();
        amblyomma.shift();
        dermacentor.shift();
        haemaphysalis.shift();
        hyalomma.shift();
        ixodes.shift();
        rhipicephalus.shift();
        eucampsipoda.shift();
        lutzomyia.shift();
        phlebotomus.shift();
        return{labels, argas, carios, ornithodoros, culicoides, oecicacus, strictimex, aedeomyia, aedes, anopheles, armigeres, coquillettidia, culex, culiseta, eretmapodites, haemagogus, lutzia, mansonia, psorophora, sabethes, trichoprosopon, verrallina, wyeomyia, amblyomma, dermacentor, haemaphysalis, hyalomma, ixodes, rhipicephalus, eucampsipoda, lutzomyia, phlebotomus}
}
async function drawVectorHabitat() {
    var ctx = document.getElementById('habitat_bar').getContext('2d');

    var colors = {
        sylvatic : '#234a8c',
        rural: '#547d9c',
        periUrban: '#849e89',
        urban: '#d4dba8',
        groundLevel: '#00404d',
        groundAttached: '#0d4745',
        ground: '#1a4f3e',
        groundWoods: '#275836',
        canopy: '#35612d',
        arboreal: '#456b24',
        freshWater: '#57771a',
        costal:'#6b840e',
        pasture: '#858e03',
        swampy: '#a1960e',
        unknown: '#c2ab2e'


    };
    var priority = {
        sylvatic: 1,
        rural: 2,
        urban: 3,
        periUrban: 4,
        groundLevel: 1,
        groundAttached: 3,
        ground: 2,
        groundWoods: 6,
        canopy: 4,
        arboreal: 5,
        freshWater: 9,
        costal:10,
        pasture: 8,
        swampy: 11,
        unknown: 7

    }
    var labels ={
        sylvatic: 'Sylvatic',
        rural: 'Rural',
        periUrban: 'Peri-Urban',
        urban: 'Urban',
        groundLevel: 'Ground Level',
        groundAttached: 'Ground Level or Attached to the Host',
        ground: 'Ground',
        groundWoods: 'Ground Level at Woods',
        canopy: 'Canopy',
        arboreal: 'Arboreal',
        freshWater: 'Fresh Water',
        costal:'Costal Mangroves | Bammboo Groves | Shady Jungle',
        pasture: 'Pastures or Long Grasses',
        swampy: 'Swampy Wetlands',
        unknown: 'Unknown'

    }
    function getColor(name){
        return colors[name] || 'green';
    }
    var chart = new Chart(ctx, {
        type: 'sankey',
        data:{
            datasets:[
                {
                    data:[
                        {from: 'rural', to: 'groundLevel', flow:32},
                        {from:'sylvatic', to:'groundLevel', flow:104.5},
                        {from: 'urban', to: 'groundLevel', flow:7},
                        {from: 'periUrban', to: 'groundLevel', flow: 1},
                        {from: 'rural', to: 'groundAttached', flow: 27.25},
                        {from: 'urban', to:'groundAttached', flow: 4.25},
                        {from:'sylvatic', to:'groundAttached', flow: 61.25},
                        {from: 'periUrban', to:'groundAttached', flow:0.25},
                        {from: 'sylvatic', to:'ground', flow: 17.5},
                        {from: 'rural', to: 'ground', flow: 7.5},
                        {from: 'urban', to: 'ground', flow: 2.5},
                        {from: 'periUrban', to: 'ground', flow: 1.5},
                        {from:'sylvatic', to:'groundWoods', flow: 2.5},
                        {from: 'rural', to:'groundWoods', flow: 0.5}, 
                        {from:'sylvatic', to:'arboreal', flow: 2.83 },
                        {from:'rural', to: 'arboreal', flow: 0.33},
                        {from: 'periUrban', to: 'arboreal', flow: 0.33},
                        {from: 'sylvatic', to:'canopy', flow: 6 },
                        {from: 'rural', to: 'canopy', flow: 1},
                        {from: 'sylvatic', to: 'freshWater', flow: 1 },
                        {from:'sylvatic', to: 'pasture', flow: 0.5},
                        {from:'rural', to: 'pasture', flow: 0.5}, 
                        {from:'sylvatic', to:'unknown', flow:2} 
                        
                    ],
                    priority,
                    labels,
                    colorFrom: (c) => getColor(c.dataset.data[c.dataIndex].from),
                    colorTo: (c) => getColor(c.dataset.data[c.dataIndex].to),
                    borderWidth: 2,
                    borderColor: 'black'
                }
            ]
        },
        options:{
            plugins: {
                title: {
                    display: true,
                    text: 'Vector Transmission Habitat'
                }
            },
            responsive: true
        }
    })
}
async function drawVectorFeedBehavior() {
    const datapoints = await getVectorFeedData();
    const labels = datapoints.labels;

    const data = {
        labels: labels,
        datasets:[{
            label: 'Antropophilic',
            data: datapoints.antro,
            backgroundColor: '#00054a',
            borderWidth:1
        },{
            label: 'Exophilic & Zoophilic',
            data: datapoints.exo,
            backgroundColor: '#234a8c',
            borderWidth: 1
        },{
            label: 'Zoo-anthropophilic',
            data: datapoints.zooAntro,
            backgroundColor:'#547d9c',
            borderWidth:1
        },{
            label: 'Zoophilic',
            data: datapoints.zoo,
            backgroundColor:'#849e89',
            borderWidth:1
        },{
            label:'Unknown',
            data: datapoints.unknown,
            backgroundColor: '#d4dba8',
            borderWidth: 1 
        }]
    };
    const config = {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Vector Feeding period and behevior '
                }
            },
            resposive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true,
                    title:{
                        display: true,
                        text:'Feeding Preference Time',
                        align: 'end'
                    }
                },
                y: {
                    stacked: true,
                    title:{
                        display: true,
                        text:'Feeding Preference Behavior',
                        align: 'end'
                    }
            }
            }
        }
    }; 
    const myChart = new Chart(
        document.getElementById('behavior_bar'),
        config
    )
}

async function getVectorFeedData(){
    const labels = [];
    const antro = [];
    const exo = [];
    const zooAntro = [];
    const zoo = [];
    const unknown = [];

    const url = 'https://gist.githubusercontent.com/JacquelineTida/22575da04fe88bf4206d0f31aa6c3e19/raw/6b08e344ca291ab8ddec78f2c049bccabd791684/Feeding_time_and_behavior.csv';
    const response = await fetch(url);
    const tableData = await response.text();
    const table = tableData.split('\n');
    table.forEach(row => {
        const column = row.split(',');
        const name = column[0];
        const a = column[1];
        const b = column[2];
        const c = column[3];
        const d = column[4];
        const e = column[5];
        labels.push(name);
        antro.push(a);
        exo.push(b);
        zooAntro.push(c);
        zoo.push(d);
        unknown.push(e);
    });
    labels.shift();
    antro.shift();
    exo.shift();
    zooAntro.shift();
    zoo.shift();
    unknown.shift();
    return{labels, antro, exo, zooAntro, zoo, unknown}
}