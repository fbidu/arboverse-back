//Lateral buton active
const buttons = document.querySelectorAll('.item-button')
buttons.forEach(button => {
    button.addEventListener('click', function () {
        buttons.forEach(btn => btn.classList.remove('btn-active'));
        this.classList.add('btn-active');
    });
});

// Open and Close submenu Discovery
function openNav() {
    document.getElementById("discovery-menu").style.width = "260px";
    document.getElementById("discovery-menu").style.opacity = "1";
    document.getElementById("distribution-menu").style.width = "0";
    document.getElementById('vector-menu').style.width = "0";
    document.getElementById('climate-menu').style.width = "0";
    document.getElementById('forestcover-menu').style.width = "0";
    document.getElementById('land-cover-menu').style.width = "0";
    document.getElementById('mobility-menu').style.width = "0";
    document.getElementById('socio-menu').style.width = "0";
    document.getElementById('biodiversity-menu').style.width = "0";
    document.getElementById('discovery').classList.add('btn-active')

}
function closeNav() {
    document.getElementById("discovery-menu").style.width = "0";
    document.getElementById('discovery').classList.remove('btn-active')
}

// Open and Close submenu Distribution
function openNavdist() {
    document.getElementById("distribution-menu").style.width = "260px";
    document.getElementById("distribution-menu").style.opacity = "1";
    document.getElementById("discovery-menu").style.width = "0";
    document.getElementById('vector-menu').style.width = "0";
    document.getElementById('climate-menu').style.width = "0";
    document.getElementById('forestcover-menu').style.width = "0";
    document.getElementById('land-cover-menu').style.width = "0";
    document.getElementById('mobility-menu').style.width = "0";
    document.getElementById('socio-menu').style.width = "0";
    document.getElementById('biodiversity-menu').style.width = "0";
    document.getElementById('distribution').classList.add('btn-active')

}
function closeNavdist() {
    document.getElementById("distribution-menu").style.width = "0";
    document.getElementById('distribution').classList.remove('btn-active')
}

// Open and Close submenu Vector
function openNavVec() {
    document.getElementById('vector-menu').style.width = "260px";
    document.getElementById('vector-menu').style.opacity = "1";
    document.getElementById("discovery-menu").style.width = "0";
    document.getElementById("distribution-menu").style.width = "0";
    document.getElementById('climate-menu').style.width = "0";
    document.getElementById('forestcover-menu').style.width = "0";
    document.getElementById('land-cover-menu').style.width = "0";
    document.getElementById('mobility-menu').style.width = "0";
    document.getElementById('socio-menu').style.width = "0";
    document.getElementById('biodiversity-menu').style.width = "0";
    document.getElementById('vector').classList.add('btn-active')

}
function closeNavVec() {
    document.getElementById('vector-menu').style.width = "0";
    document.getElementById('vector').classList.remove('btn-active')
}
// Open and Close submenu Climate
function openNavCli() {
    document.getElementById('climate-menu').style.width = "320px";
    document.getElementById('climate-menu').style.opacity = "1";
    document.getElementById("discovery-menu").style.width = "0";
    document.getElementById("distribution-menu").style.width = "0";
    document.getElementById('vector-menu').style.width = "0";
    document.getElementById('forestcover-menu').style.width = "0";
    document.getElementById('land-cover-menu').style.width = "0";
    document.getElementById('mobility-menu').style.width = "0";
    document.getElementById('socio-menu').style.width = "0";
    document.getElementById('biodiversity-menu').style.width = "0";
    document.getElementById('climate').classList.add('btn-active')

}
function closeNavCli() {
    document.getElementById('climate-menu').style.width = "0";
    document.getElementById('climate').classList.remove('btn-active')
}

// Open and Close submenu Forest cover
function openNavFor() {
    document.getElementById('forestcover-menu').style.width = "320px";
    document.getElementById('forestcover-menu').style.opacity = "1";
    document.getElementById("discovery-menu").style.width = "0";
    document.getElementById("distribution-menu").style.width = "0";
    document.getElementById('vector-menu').style.width = "0";
    document.getElementById('climate-menu').style.width = "0";
    document.getElementById('land-cover-menu').style.width = "0";
    document.getElementById('mobility-menu').style.width = "0";
    document.getElementById('socio-menu').style.width = "0";
    document.getElementById('biodiversity-menu').style.width = "0";
    document.getElementById('forest').classList.add('btn-active')

}
function closeNavFor() {
    document.getElementById('forestcover-menu').style.width = "0";
    document.getElementById('forest').classList.remove('btn-active')
}

// Open and Close submenu Land cover
function openNavLan() {
    document.getElementById('land-cover-menu').style.width = "320px";
    document.getElementById('land-cover-menu').style.opacity = "1";
    document.getElementById("discovery-menu").style.width = "0";
    document.getElementById("distribution-menu").style.width = "0";
    document.getElementById('vector-menu').style.width = "0";
    document.getElementById('climate-menu').style.width = "0";
    document.getElementById('forestcover-menu').style.width = "0";
    document.getElementById('mobility-menu').style.width = "0";
    document.getElementById('socio-menu').style.width = "0";
    document.getElementById('biodiversity-menu').style.width = "0";
    document.getElementById('land').classList.add('btn-active')

}
function closeNavLan() {
    document.getElementById('land-cover-menu').style.width = "0";
    document.getElementById('land').classList.remove('btn-active')
}

// Open and Close submenu Mobility
function openNavMob() {
    document.getElementById('mobility-menu').style.width = "320px";
    document.getElementById('mobility-menu').style.opacity = "1";
    document.getElementById("discovery-menu").style.width = "0";
    document.getElementById("distribution-menu").style.width = "0";
    document.getElementById('vector-menu').style.width = "0";
    document.getElementById('climate-menu').style.width = "0";
    document.getElementById('forestcover-menu').style.width = "0";
    document.getElementById('land-cover-menu').style.width = "0";
    document.getElementById('socio-menu').style.width = "0";
    document.getElementById('biodiversity-menu').style.width = "0";
    document.getElementById('mobility').classList.add('btn-active')

}
function closeNavMob() {
    document.getElementById('mobility-menu').style.width = "0";
    document.getElementById('mobility').classList.remove('btn-active')
}
// Open and Close submenu socio
function openNavSocio() {
    document.getElementById('socio-menu').style.width = "320px";
    document.getElementById('socio-menu').style.opacity = "1";
    document.getElementById("discovery-menu").style.width = "0";
    document.getElementById("distribution-menu").style.width = "0";
    document.getElementById('vector-menu').style.width = "0";
    document.getElementById('climate-menu').style.width = "0";
    document.getElementById('forestcover-menu').style.width = "0";
    document.getElementById('land-cover-menu').style.width = "0";
    document.getElementById('mobility-menu').style.width = "0";
    document.getElementById('biodiversity-menu').style.width = "0";
    document.getElementById('socioeconomic').classList.add('btn-active')

}
function closeNavSocio() {
    document.getElementById('socio-menu').style.width = "0";
    document.getElementById('socioeconomic').classList.remove('btn-active')
}
// Open and Close submenu biodiversity
function openNavBio() {
    document.getElementById('biodiversity-menu').style.width = "320px";
    document.getElementById('biodiversity-menu').style.opacity = "1";
    document.getElementById("discovery-menu").style.width = "0";
    document.getElementById("distribution-menu").style.width = "0";
    document.getElementById('vector-menu').style.width = "0";
    document.getElementById('climate-menu').style.width = "0";
    document.getElementById('forestcover-menu').style.width = "0";
    document.getElementById('land-cover-menu').style.width = "0";
    document.getElementById('mobility-menu').style.width = "0";
    document.getElementById('socio-menu').style.width = "0";
    document.getElementById('biodiversity').classList.add('btn-active')

}
function closeNavBio() {
    document.getElementById('biodiversity-menu').style.width = "0";
    document.getElementById('biodiversity').classList.remove('btn-active')
}
//Checked Discovery
showChekedDis();
var i = 0;
function showChekedDis() {
    document.getElementById('check1').textContent = document.querySelectorAll("input[name=discovery]:checked").length;
}
document.querySelectorAll("input[name=discovery]").forEach(i => {
    i.onclick = function () {
        showChekedDis();
        update_map(this);
    }
});
//Checked Distribution
showChekedDistri();
var i = 0;
function showChekedDistri() {
    document.getElementById('check2').textContent = document.querySelectorAll("input[name=distribution]:checked").length;
}
document.querySelectorAll("input[name=distribution]").forEach(i => {
    i.onclick = function () {
        showChekedDistri();
    }
});
//Checked Vector
showChekedVec();
var i = 0;
function showChekedVec() {
    document.getElementById('check3').textContent = document.querySelectorAll("input[name=vector]:checked").length;
}
document.querySelectorAll("input[name=vector]").forEach(i => {
    i.onclick = function () {
        showChekedVec();
        update_map(this);
    }
});
//checked Climate
showChekedCli();
var i = 0;
function showChekedCli() {
    document.getElementById('check4').textContent = document.querySelectorAll("input[name=climate]:checked").length;
}
document.querySelectorAll("input[name=climate]").forEach(i => {
    i.onclick = function () {
        showChekedCli();
        update_map(this);
        update_map_time(this);
    }
});
//Checked Forest
showChekedFor();
var i = 0;
function showChekedFor() {
    document.getElementById('check5').textContent = document.querySelectorAll("input[name=forest]:checked").length;
}
document.querySelectorAll("input[name=forest]").forEach(i => {
    i.onclick = function () {
        showChekedFor();
        update_map(this);
    }
});
//Checked Land use
showChekedLand();
var i = 0;
function showChekedLand() {
    document.getElementById('check6').textContent = document.querySelectorAll("input[name=land]:checked").length;
}
document.querySelectorAll("input[name=land]").forEach(i => {
    i.onclick = function () {
        showChekedLand();
        update_map(this);
    }
});
//Checked human mobility
showChekedMob();
var i = 0;
function showChekedMob() {
    document.getElementById('check7').textContent = document.querySelectorAll("input[name=mobility]:checked").length;
}
document.querySelectorAll("input[name=mobility]").forEach(i => {
    i.onclick = function () {
        showChekedMob();
        update_map(this)
    }
});
//Checked socioeconomics
showChekedSoc();
var i = 0;
function showChekedSoc() {
    document.getElementById('check8').textContent = document.querySelectorAll("input[name=socioeconomics]:checked").length;
}
document.querySelectorAll("input[name=socioeconomics]").forEach(i => {
    i.onclick = function () {
        showChekedSoc();
        update_map(this)
    }
});
//Checked socioeconomics
showChekedBio();
var i = 0;
function showChekedBio() {
    document.getElementById('check9').textContent = document.querySelectorAll("input[name=biodiversity]:checked").length;
}
document.querySelectorAll("input[name=biodiversity]").forEach(i => {
    i.onclick = function () {
        showChekedBio();
        update_map(this)
    }
});
//Forecast mosquito climate Condition 
var i=0;
var forecastSwitchbtn = document.getElementById('forecast_switch')
function enableForecastRadio() {
    document.getElementById("arboverse.c89hazcs").disabled = true;
    document.getElementById("arboverse.cugep9k4").disabled = true;
    document.getElementById("arboverse.9uh1mltv").disabled = true;
    document.getElementById("arboverse.7va6tx65").disabled = true;
    document.getElementById("arboverse.bud0k3bq").disabled = true;
    document.getElementById("arboverse.cot4nhox").disabled = true;
    document.getElementById("arboverse.59jzfz3w").disabled = true;
    document.getElementById("arboverse.2wsi2z3v").disabled = true;
    document.getElementById("arboverse.a51uv49z").disabled = true;
    document.getElementById("arboverse.92xut72i").disabled = true;
    var dev = document.getElementById('forecast_switch').checked;
    if (dev === true) {
        document.getElementById("arboverse.c89hazcs").disabled = false;
        document.getElementById("arboverse.cugep9k4").disabled = false;
        document.getElementById("arboverse.9uh1mltv").disabled = false;
        document.getElementById("arboverse.7va6tx65").disabled = false;
        document.getElementById("arboverse.bud0k3bq").disabled = false;
        document.getElementById("arboverse.cot4nhox").disabled = false;
        document.getElementById("arboverse.59jzfz3w").disabled = false;
        document.getElementById("arboverse.2wsi2z3v").disabled = false;
        document.getElementById("arboverse.a51uv49z").disabled = false;
        document.getElementById("arboverse.92xut72i").disabled = false;
    } else if (dev != true) {
        document.getElementById("arboverse.c89hazcs").checked = false;
        document.getElementById("arboverse.cugep9k4").checked = false;
        document.getElementById("arboverse.9uh1mltv").checked = false;
        document.getElementById("arboverse.7va6tx65").disabled = false;
        document.getElementById("arboverse.bud0k3bq").disabled = false;
        document.getElementById("arboverse.cot4nhox").disabled = false;
        document.getElementById("arboverse.59jzfz3w").disabled = false;
        document.getElementById("arboverse.2wsi2z3v").disabled = false;
        document.getElementById("arboverse.a51uv49z").disabled = false;
        document.getElementById("arboverse.92xut72i").disabled = false;
    };
    var j = 0;
    document.querySelectorAll("input[name=model_climate]").forEach(j => {
        j.checked = false;
        update_map(j)
    })
}
forecastSwitchbtn.onchange = enableForecastRadio;
var i = 0;
document.querySelectorAll("input[name=model_climate]").forEach(i => {
    i.onchange = function () {
        var j = 0;
        document.querySelectorAll("input[name=model_climate]").forEach(j => {
            j.checked = false;
            update_map(j)
        });
        i.checked = true;
        update_map(this);
    }
})
//Koppen geiger climate Condition 
var i=0;
var climateSwitchbtn = document.getElementById('kp_switch')
function enableClimateRadio() {
    document.getElementById("arboverse.presentfull").disabled = true;
    document.getElementById("arboverse.koppenfuture").disabled = true;
    var dev = document.getElementById('kp_switch').checked;
    if (dev == true) {
        document.getElementById("arboverse.presentfull").disabled = false;
        document.getElementById("arboverse.koppenfuture").disabled = false;
    } else if (dev != true) {
        document.getElementById("arboverse.presentfull").checked = false;
        document.getElementById("arboverse.koppenfuture").checked = false;
    };
    var j = 0;
    document.querySelectorAll("input[name=kp-amount]").forEach(j => {
        j.checked = false;
        update_map(j)
    })
}
climateSwitchbtn.onchange = enableClimateRadio;
var i = 0;
document.querySelectorAll("input[name=kp-amount]").forEach(i => {
    i.onchange = function () {
        var j = 0;
        document.querySelectorAll("input[name=kp-amount]").forEach(j => {
            j.checked = false;
            update_map(j)
        });
        i.checked = true;
        update_map(this);
    }
})

//Population Time condition
var i = 0
var popSwitchbtn = document.getElementById('pop_switch');
function enablePopRadio() {
    document.getElementById("arboverse.pop_2015").disabled = true;
    document.getElementById("arboverse.pop_2020").disabled = true;
    var dev = document.getElementById('pop_switch').checked;
    if (dev == true) {
        document.getElementById("arboverse.pop_2015").disabled = false;
        document.getElementById("arboverse.pop_2020").disabled = false;
    } else if (dev != true) {
        document.getElementById("arboverse.pop_2015").checked = false;
        document.getElementById("arboverse.pop_2020").checked = false;
    };
    var j = 0;
    document.querySelectorAll("input[name=year-picker]").forEach(j => {
        j.checked = false;
        update_map(j)
    })
}
popSwitchbtn.onchange = enablePopRadio;
var i = 0;
document.querySelectorAll("input[name=year-picker]").forEach(i => {
    i.onchange = function () {
        var j = 0;
        document.querySelectorAll("input[name=year-picker]").forEach(j => {
            j.checked = false;
            update_map(j)
        });
        i.checked = true;
        update_map(this);
    }
})
//Slider time response for arrivals, departures and passengers 
var hot = document.querySelector('input[name=hotdays_year]');
var hotValue = function () {
    var newValue = hot.value;
    var endValue = Number(newValue) + 30;
    var target = document.querySelector('.hotdays_value');
    target.innerHTML = `${newValue} - ${endValue}`
}
hot.addEventListener("input", hotValue);
//Slider time response for arrivals, departures and passengers 
var arr = document.querySelector('input[name=arrivals]');
var arrValue = function () {
    var newValue = arr.value;
    var target = document.querySelector('.arr_value');
    target.innerHTML = newValue;
}
arr.addEventListener("input", arrValue);

var dep = document.querySelector('input[name="departures"]');
var rangeValueDepartures = function () {
    var newValue = dep.value;
    var target = document.querySelector('.year_departures');
    target.innerHTML = newValue;
}
dep.addEventListener("input", rangeValueDepartures);

var elem = document.querySelector('input[name="number_passengers"]');
var rangeValue = function () {
    var newValue = elem.value;
    var target = document.querySelector('.year_value');
    target.innerHTML = newValue;
}
elem.addEventListener("input", rangeValue);

// Slider response for opacity
var cli = document.querySelector('input[name=climate-opacity]');
var opValue = function(){
    var newOpValue = cli.value;
    var target = document.querySelector('.cli_op');
    target.innerHTML = newOpValue;
}
cli.addEventListener('input', opValue)

var fore = document.querySelector('input[name=forecast-opacity]');
var foreValue = function(){
    var newForeValue = fore.value;
    var target = document.querySelector('.fore_op');
    target.innerHTML = newForeValue;
}
fore.addEventListener('input', foreValue)

var arid = document.querySelector('input[name=aridity-opacity]');
var ariValue = function(){
    var newAriValue = ari.value;
    var target = document.querySelector('.ari_op');
    target.innerHTML = newAriValue;
}
ari.addEventListener('input', ariValue)

var biome = document.querySelector('input[name=biome-opacity]');
var biomeValue = function(){
    var newOpValue = biome.value;
    var target = document.querySelector('.biome_op');
    target.innerHTML = newOpValue;
}
biome.addEventListener('input', biomeValue)

var drive = document.querySelector('input[name=drive-opacity]');
var DriveValue = function(){
    var newOpValue = drive.value;
    var target = document.querySelector('.drive_op');
    target.innerHTML = newOpValue;
}
drive.addEventListener('input', DriveValue)

var primary = document.querySelector('input[name=primary-opacity]');
var primaryValue = function(){
    var newOpValue = primary.value;
    var target = document.querySelector('.primary_op');
    target.innerHTML = newOpValue;
}
primary.addEventListener('input', primaryValue)

var height = document.querySelector('input[name=height-opacity]');
var heightValue = function(){
    var newOpValue = height.value;
    var target = document.querySelector('.height_op');
    target.innerHTML = newOpValue;
}
height.addEventListener('input', heightValue)

var intact = document.querySelector('input[name=intact_opacity]');
var intactValue = function(){
    var newOpValue = intact.value;
    var target = document.querySelector('.intact_op');
    target.innerHTML = newOpValue;
}
intact.addEventListener('input', intactValue)

var index = document.querySelector('input[name=index-opacity]');
var indexValue = function(){
    var newOpValue = index.value;
    var target = document.querySelector('.index_op');
    target.innerHTML = newOpValue;
}
index.addEventListener('input', indexValue)

var land = document.querySelector('input[name=land-opacity]');
var landValue = function(){
    var newOpValue = land.value;
    var target = document.querySelector('.land_op');
    target.innerHTML = newOpValue;
}
land.addEventListener('input', landValue);

var mini = document.querySelector('input[name=mini-opacity]');
var miniValue = function(){
    var newOpValue = mini.value;
    var target = document.querySelector('.mini_op');
    target.innerHTML = newOpValue;
}
mini.addEventListener('input', miniValue);

var log = document.querySelector('input[name=log-opacity]');
var logValue = function(){
    var newOpValue = log.value;
    var target = document.querySelector('.log_op');
    target.innerHTML = newOpValue;
}
log.addEventListener('input', logValue);

var soy = document.querySelector('input[name=soy-opacity]');
var soyValue = function(){
    var newOpValue = soy.value;
    var target = document.querySelector('.soy_op');
    target.innerHTML = newOpValue;
}
soy.addEventListener('input', soyValue);

var dams = document.querySelector('input[name=dams-opacity]');
var damsValue = function(){
    var newOpValue = dams.value;
    var target = document.querySelector('.dams_op');
    target.innerHTML = newOpValue;
}
dams.addEventListener('input', damsValue);

var pop = document.querySelector('input[name=pop-opacity]');
var popValue = function(){
    var newOpValue = pop.value;
    var target = document.querySelector('.pop_op');
    target.innerHTML = newOpValue;
}
pop.addEventListener('input', popValue);

var OpArrival = document.querySelector('input[name=opacity-Arr]');
var OpArrValue = function(){
    var newOpValue = OpArrival.value;
    var target = document.querySelector('.opArr');
    target.innerHTML = newOpValue;
}
OpArrival.addEventListener('input', OpArrValue);

var depOp = document.querySelector('input[name=dep-opacity]');
var depOpValue = function(){
    var newOpValue = depOp.value;
    var target = document.querySelector('.dep_op');
    target.innerHTML = newOpValue;
}
depOp.addEventListener('input', depOpValue);

var pass = document.querySelector('input[name=pass-opacity]');
var passValue = function(){
    var newOpValue = pass.value;
    var target = document.querySelector('.pass_op');
    target.innerHTML = newOpValue;
}
pass.addEventListener('input', passValue);

