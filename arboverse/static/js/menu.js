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
    document.getElementById('land').classList.add('btn-active')

}
function closeNavLan() {
    document.getElementById('land-cover-menu').style.width = "0";
    document.getElementById('land').classList.remove('btn-active')
}

// Open and Close submenu Land cover
function openNavMob() {
    document.getElementById('mobility-menu').style.width = "320px";
    document.getElementById('mobility-menu').style.opacity = "1";
    document.getElementById("discovery-menu").style.width = "0";
    document.getElementById("distribution-menu").style.width = "0";
    document.getElementById('vector-menu').style.width = "0";
    document.getElementById('climate-menu').style.width = "0";
    document.getElementById('forestcover-menu').style.width = "0";
    document.getElementById('land-cover-menu').style.width = "0";
    document.getElementById('mobility').classList.add('btn-active')

}
function closeNavMob() {
    document.getElementById('mobility-menu').style.width = "0";
    document.getElementById('mobility').classList.remove('btn-active')
}

showChekedDis();
var i = 0;
function showChekedDis() {
    document.getElementById('check1').textContent = document.querySelectorAll("input[name=discovery]:checked").length;
}
document.querySelectorAll("input[name=discovery]").forEach(i => {
    i.onclick = function () {
        showChekedDis();
    }
});

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
showChekedCli();
var i = 0;
function showChekedCli() {
    document.getElementById('check4').textContent = document.querySelectorAll("input[name=climate]:checked").length;
}
document.querySelectorAll("input[name=climate]").forEach(i => {
    i.onclick = function () {
        showChekedCli();
    }
});

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
showChekedLand();
var i = 0;
function showChekedLand() {
    document.getElementById('check6').textContent = document.querySelectorAll("input[name=land]:checked").length;
}
document.querySelectorAll("input[name=land]").forEach(i => {
    i.onclick = function () {
        showChekedLand();
        update_map(this)
    }
});
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
//Climate Time condition
var i = 0
function enableClimateRadio(cb) {
    if (cb.checked){
        document.querySelectorAll("input[name=kp-amount]").forEach(i => {
            
            i.disabled = false;
            console.log("check", i.disabled);
        });
    } else {
        document.querySelectorAll("input[name=kp-amount]").forEach(i => {
            i.checked = false;
            i.disabled = true;
            console.log("uncheck", i.disabled);
        });
        var j = 0;
        document.querySelectorAll("input[name=kp-amount]").forEach(j => {
            j.checked = false;
            update_map(j)
        });
    }
}
document.querySelectorAll("input[name=climate]").forEach(i => {
    i.onclick = function () {
        enableClimateRadio(this);
    }
});

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
//Forest Time condition
var i = 0
var switchbtn = document.getElementById('forest_switch');
function enableForestRadio(){
        document.getElementById("arboverse.tree_cover_loss_1km_2001-2010").disabled = true;
        document.getElementById("arboverse.tree_cover_loss_1km_2011-2020").disabled = true;
        var dev = document.getElementById('forest_switch').checked;
    if (dev  == true){
        document.getElementById("arboverse.tree_cover_loss_1km_2001-2010").disabled = false;
        document.getElementById("arboverse.tree_cover_loss_1km_2011-2020").disabled = false;
    } else if(dev != true){
        document.getElementById("arboverse.tree_cover_loss_1km_2001-2010").checked = false;
        document.getElementById("arboverse.tree_cover_loss_1km_2011-2020").checked = false;
    };
    var j = 0;
    document.querySelectorAll("input[name=year-amount]").forEach(j =>{
        j.checked = false;
        update_map(j)
    })
}
switchbtn.onchange = enableForestRadio;
var i = 0;
document.querySelectorAll("input[name=year-amount]").forEach(i => {
    i.onchange = function () {
        var j = 0;
        document.querySelectorAll("input[name=year-amount]").forEach(j => {
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
function enablePopRadio(){
        document.getElementById("arboverse.pop_2015").disabled = true;
        document.getElementById("arboverse.pop_2020").disabled = true;
        var dev = document.getElementById('pop_switch').checked;
    if (dev  == true){
        document.getElementById("arboverse.pop_2015").disabled = false;
        document.getElementById("arboverse.pop_2020").disabled = false;
    } else if(dev != true){
        document.getElementById("arboverse.pop_2015").checked = false;
        document.getElementById("arboverse.pop_2020").checked = false;
    };
    var j = 0;
    document.querySelectorAll("input[name=year-picker]").forEach(j =>{
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
