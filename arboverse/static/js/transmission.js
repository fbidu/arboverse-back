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
                backgroundColor: ['#00054a', '#517994', '#abbd9d', '#102668', '#244580', '#3a618f', '#6c8f94', '#8ba695', '#c9d4b4', '#e4ead5']
            },{
                label: 'organism',
                data: datapoints.org,
                backgroundColor: ['#00054a', '#517994', '#abbd9d', '#102668', '#244580', '#3a618f', '#6c8f94', '#8ba695', '#c9d4b4', '#e4ead5']
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
                    text: 'Vectors Related to Arbovirus Transmission',
                    font:{
                        family: 'Montserrat',
                        size: 20
                    }
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
            backgroundColor: ['#00054a'],
            borderWidth: 1
        },{
            label: 'Carios',
            data: datapoints.carios,
            backgroundColor: ['#050f53'],
            borderWidth: 1
        },{
            label: 'Ornithodoros',
            data: datapoints.ornithodoros,
            backgroundColor: ['#0a195d'],
            borderWidth: 1
        },{
            label: 'Culicoides',
            data: datapoints.culicoides,
            backgroundColor: ['#0f2466'],
            borderWidth: 1
        },{
            label: 'Oeciacus',
            data: datapoints.oecicacus,
            backgroundColor: ['#152d6e'],
            borderWidth: 1
        },{
            label: 'Stricticimex',
            data: datapoints.strictimex,
            backgroundColor: ['#1b3775'],
            borderWidth: 1
        },{
            label: 'Aedeomyia',
            data: datapoints.aedeomyia,
            backgroundColor: ['#21417d'],
            borderWidth: 1
        },{
            label: 'Aedes',
            data: datapoints.aedes,
            backgroundColor: ['#284a83'],
            borderWidth: 1
        },{
            label: 'Anopheles',
            data: datapoints.anopheles,
            backgroundColor: ['#2f5388'],
            borderWidth: 1
        },{
            label: 'Armigeres',
            data: datapoints.armigeres,
            backgroundColor: ['#365c8c'],
            borderWidth: 1
        },{
            label: 'Coquillettidia',
            data: datapoints.coquillettidia,
            backgroundColor: ['#3d6490'],
            borderWidth: 1
        },{
            label: 'Culex',
            data: datapoints.culex,
            backgroundColor: ['#446b91'],
            borderWidth: 1
        },{
            label: 'Culiseta',
            data: datapoints.culiseta,
            backgroundColor: ['#4b7393'],
            borderWidth: 1
        },{
            label: 'Eretmapodites',
            data: datapoints.eretmapodites,
            backgroundColor: ['#537a94'],
            borderWidth: 1
        },{
            label: 'Haemagogus',
            data: datapoints.haemagogus,
            backgroundColor: ['#5b8194'],
            borderWidth: 1
        },{
            label: 'Lutzia',
            data: datapoints.lutzia,
            backgroundColor: ['#638894'],
            borderWidth: 1
        },{
            label: 'Mansonia',
            data: datapoints.mansonia,
            backgroundColor: ['#6c8f94'],
            borderWidth: 1
        },{
            label: 'Psorophora',
            data: datapoints.psorophora,
            backgroundColor: ['#769694'],
            borderWidth: 1
        },{
            label: 'Sabethes',
            data: datapoints.sabethes,
            backgroundColor: ['#7f9d95'],
            borderWidth: 1  
        },{
            label: 'Trichoprosopon',
            data: datapoints.trichoprosopon,
            backgroundColor: ['#89a595'],
            borderWidth: 1   
        },{
            label: 'Verrallina',
            data: datapoints.verrallina,
            backgroundColor: ['#93ac97'],
            borderWidth: 1   
        },{
            label: 'Wyeomyia',
            data: datapoints.wyeomyia,
            backgroundColor: ['#9db39a'],
            borderWidth: 1   
        },{
            label: 'Amblyomma',
            data: datapoints.amblyomma,
            backgroundColor: ['#a7ba9c'],
            borderWidth: 1   
        },{
            label: 'Dermacentor',
            data: datapoints.dermacentor,
            backgroundColor: ['#b1c2a1'],
            borderWidth: 1 
        },{
            label: 'Haemaphysalis',
            data: datapoints.haemaphysalis,
            backgroundColor: ['#bac9a9'],
            borderWidth: 1 
        },{
            label: 'Hyalomma',
            data: datapoints.hyalomma,
            backgroundColor: ['#c4d0b0'],
            borderWidth: 1 
        },{
            label: 'Ixodes',
            data: datapoints.ixodes,
            backgroundColor: ['#cdd7b8'],
            borderWidth: 1 
        },{
            label: 'Rhipicephalus',
            data: datapoints.rhipicephalus,
            backgroundColor: ['#d5dec2'],
            borderWidth: 1 
        },{
            label: 'Eucampsipoda',
            data: datapoints.eucampsipoda,
            backgroundColor: ['#dee4cd'],
            borderWidth: 1 
        },{
            label: 'Lutzomyia',
            data: datapoints.lutzomyia,
            backgroundColor: ['#e6ebd7'],
            borderWidth: 1 
        },{
            label: 'Phlebotomus',
            data: datapoints.phlebotomus,
            backgroundColor: ['#eef1e4'],
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
                    text: 'Vector Families and Genus Related to Arbovirus Transmission',
                    font:{
                        family: 'Montserrat',
                        size:20
                    }
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
        Sylvatic : '#234a8c',
        Rural: '#547d9c',
        'Peri-Urban': '#849e89',
        Urban: '#d4dba8',
        'Ground Level': '#00404d',
        'Ground Level or Attached to the Host': '#0d4745',
        Ground: '#1a4f3e',
        'Ground Level at Woods': '#275836',
        Canopy: '#35612d',
        Arboreal: '#456b24',
        'Fresh Water': '#57771a',
        Costal:'#6b840e',
        Pasture: '#858e03',
        Swampy: '#a1960e',
        Unknown: '#c2ab2e'


    };
    var priority = {
        Sylvatic: 1,
        Rural: 2,
        Urban: 3,
        'Peri-Urban': 4,
        'Ground Level': 1,
        'Ground Level or Attached to the Host': 3,
        Ground: 2,
        'Ground Level at Woods': 6,
        Canopy: 4,
        Arboreal: 5,
        'Fresh Water': 9,
        Costal:10,
        Pasture: 8,
        Swampy: 11,
        Unknown: 7

    }
    var labels ={
        Costal:'Costal Mangroves | Bammboo Groves | Shady Jungle',
        Pasture: 'Pastures or Long Grasses',
        Swampy: 'Swampy Wetlands'

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
                        {from: 'Rural', to: 'Ground Level', flow:32},
                        {from:'Sylvatic', to:'Ground Level', flow:104.5},
                        {from: 'Urban', to: 'Ground Level', flow:7},
                        {from: 'Peri-Urban', to: 'Ground Level', flow: 1},
                        {from: 'Rural', to: 'Ground Level or Attached to the Host', flow: 27.25},
                        {from: 'Urban', to:'Ground Level or Attached to the Host', flow: 4.25},
                        {from:'Sylvatic', to:'Ground Level or Attached to the Host', flow: 61.25},
                        {from: 'Peri-Urban', to:'Ground Level or Attached to the Host', flow:0.25},
                        {from: 'Sylvatic', to:'Ground', flow: 17.5},
                        {from: 'Rural', to: 'Ground', flow: 7.5},
                        {from: 'Urban', to: 'Ground', flow: 2.5},
                        {from: 'Peri-Urban', to: 'Ground', flow: 1.5},
                        {from:'Sylvatic', to:'Ground Level at Woods', flow: 2.5},
                        {from: 'Rural', to:'Ground Level at Woods', flow: 0.5}, 
                        {from:'Sylvatic', to:'Arboreal', flow: 2.83 },
                        {from:'Rural', to: 'Arboreal', flow: 0.33},
                        {from: 'Peri-Urban', to: 'Arboreal', flow: 0.33},
                        {from: 'Sylvatic', to:'Canopy', flow: 6 },
                        {from: 'Rural', to: 'Canopy', flow: 1},
                        {from: 'Sylvatic', to: 'Fresh Water', flow: 1 },
                        {from:'Sylvatic', to: 'Pasture', flow: 0.5},
                        {from:'Rural', to: 'Pasture', flow: 0.5}, 
                        {from:'Sylvatic', to:'Unknown', flow:2} 
                        
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
                    text: 'Vector Transmission Habitat',
                    font:{
                        family:'Montserrat',
                        size:20
                    }
                },
                tooltip:{
                    callback:{
                        
                    }
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
                    text: 'Vector Feeding Period and Behavior',
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
                        text:'Feeding Preference Time',
                        align: 'center',
                        font:{
                            family: 'Montserrat',
                            size: 14
                        }
                    }
                },
                y: {
                    stacked: true,
                    title:{
                        display: true,
                        text:'Feeding Preference Behavior',
                        align: 'center',
                        font:{
                            family: 'Montserrat',
                            size: 14
                        }
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

    const url = 'https://gist.githubusercontent.com/JacquelineTida/22575da04fe88bf4206d0f31aa6c3e19/raw/3219758fdb0499c7b56ce2995db38e4060a0e2f8/Feeding_time_and_behavior.csv';
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