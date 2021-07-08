//Lateral buton active
const buttons = document.querySelectorAll('.item-button')
buttons.forEach(button =>{
        button.addEventListener('click', function(){
            buttons.forEach(btn => btn.classList.remove('btn-active'));
        this.classList.add('btn-active');
    });
});

// Open and Close submenu Discovery
function openNav(){
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
function closeNav(){
    document.getElementById("discovery-menu").style.width = "0";
    document.getElementById('discovery').classList.remove('btn-active')
}

// Open and Close submenu Distribution
function openNavdist(){
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
function closeNavdist(){
    document.getElementById("distribution-menu").style.width = "0";
    document.getElementById('distribution').classList.remove('btn-active')
}

// Open and Close submenu Vector
function openNavVec (){
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
function closeNavVec (){
    document.getElementById('vector-menu').style.width = "0";
    document.getElementById('vector').classList.remove('btn-active')
}
// Open and Close submenu Climate
function openNavCli (){
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
function closeNavCli (){
    document.getElementById('climate-menu').style.width = "0";
    document.getElementById('climate').classList.remove('btn-active')
}

// Open and Close submenu Forest cover
function openNavFor (){
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
function closeNavFor (){
    document.getElementById('forestcover-menu').style.width = "0";
    document.getElementById('forest').classList.remove('btn-active')
}

// Open and Close submenu Land cover
function openNavLan (){
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
function closeNavLan (){
    document.getElementById('land-cover-menu').style.width = "0";
    document.getElementById('land').classList.remove('btn-active')
}

// Open and Close submenu Land cover
function openNavMob (){
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
function closeNavMob (){
    document.getElementById('mobility-menu').style.width = "0";
    document.getElementById('mobility').classList.remove('btn-active')
}

showChekedDis();
var i =0;
function showChekedDis(){
    document.getElementById('check1').textContent = document.querySelectorAll("input[name=discovery]:checked").length;
}
document.querySelectorAll("input[name=discovery]").forEach(i =>{
    i.onclick = function(){
        showChekedDis();
    }
});

showChekedDistri();
var i =0;
function showChekedDistri(){
    document.getElementById('check2').textContent = document.querySelectorAll("input[name=distribution]:checked").length;
}
document.querySelectorAll("input[name=distribution]").forEach(i =>{
    i.onclick = function(){
        showChekedDistri();
    }
});
showChekedVec();
var i =0;
function showChekedVec(){
    document.getElementById('check3').textContent = document.querySelectorAll("input[name=vector]:checked").length;
}
document.querySelectorAll("input[name=vector]").forEach(i =>{
    i.onclick = function(){
        showChekedVec();
    }
});
showChekedCli();
var i =0;
function showChekedCli(){
    document.getElementById('check4').textContent = document.querySelectorAll("input[name=climate]:checked").length;
}
document.querySelectorAll("input[name=climate]").forEach(i =>{
    i.onclick = function(){
        showChekedCli();
    }
});
//Timer selected
timeSelected();
var i = 0;
function timeSelected (){
    document.querySelectorAll("input[name=kp-amount]").forEach(i =>{
        i.onclick = function(){
            update_map(this);
        }    
    })
}
showChekedFor();
var i =0;
function showChekedFor(){
    document.getElementById('check5').textContent = document.querySelectorAll("input[name=forest]:checked").length; }
document.querySelectorAll("input[name=forest]").forEach(i =>{
    i.onclick = function(){
        showChekedFor();
        update_map(this)
    }
});
showChekedLand();
var i =0;
function showChekedLand(){
    document.getElementById('check6').textContent = document.querySelectorAll("input[name=land]:checked").length;
}
document.querySelectorAll("input[name=land]").forEach(i =>{
    i.onclick = function(){
        showChekedLand();
        update_map(this)
    }
});
showChekedMob();
var i =0;
function showChekedMob(){
    document.getElementById('check7').textContent = document.querySelectorAll("input[name=mobility]:checked").length;
}
document.querySelectorAll("input[name=mobility]").forEach(i =>{
    i.onclick = function(){
        showChekedMob();
    }
});
//Slider Js

var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

function filterBy(month) {
    var filters = ['==', 'month', month];


    // Set the label to the month
    document.getElementById('month').textContent = months[month];
}
filterBy(0);

document
    .getElementById('myRange')
    .addEventListener('input', function (e) {
        var month = parseInt(e.target.value, 10);
        filterBy(month);
    });

    const
    range = document.getElementById('range'),
    rangeV = document.getElementById('rangeV'),
    setValue = ()=>{
      const
        newValue = Number( (range.value - range.min) * 130 / (range.max - range.min) ),
        newPosition = 10 - (newValue * 0.13);
      rangeV.innerHTML = `<span>${range.value}</span>`;
      rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
    };

  document.addEventListener("DOMContentLoaded", setValue);
  range.addEventListener('input', setValue);
