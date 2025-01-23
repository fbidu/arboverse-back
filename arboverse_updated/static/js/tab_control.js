function openTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("arbodash_tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();


  //count number
  
function count_arbv(){
    let counts=setInterval(updated);
        let upto=0;
        function updated(){
            var count= document.getElementById("n_arbovirus");
            count.innerHTML=++upto;
            if(upto===922)
            {
                clearInterval(counts);
            }
        }
}
function count_countries(){
    let counts=setInterval(updated, 30);
        let upto=0;
        function updated(){
            var count= document.getElementById("n_countries");
            count.innerHTML=++upto;
            if(upto===97)
            {
                clearInterval(counts);
            }
        }
}
function count_biomes(){
    let counts=setInterval(updated, 150);
        let upto=0;
        function updated(){
            var count= document.getElementById("n_biomes");
            count.innerHTML=++upto;
            if(upto===24)
            {
                clearInterval(counts);
            }
        }
}
function count_climate(){
    let counts=setInterval(updated, 500);
        let upto=0;
        function updated(){
            var count= document.getElementById("n_climate");
            count.innerHTML=++upto;
            if(upto===5)
            {
                clearInterval(counts);
            }
        }
}
function count_host(){
    let counts=setInterval(updated, 5);
        let upto=0;
        function updated(){
            var count= document.getElementById("n_host");
            count.innerHTML=++upto;
            if(upto===395)
            {
                clearInterval(counts);
            }
        }
}
window.addEventListener('load', count_arbv)
window.addEventListener('load', count_countries)
window.addEventListener('load', count_biomes)
window.addEventListener('load', count_climate)
window.addEventListener('load', count_host)
document.getElementById("defaultOpen").addEventListener('click', count_arbv)
document.getElementById("defaultOpen").addEventListener('click', count_countries)
document.getElementById("defaultOpen").addEventListener('click', count_biomes)
document.getElementById("defaultOpen").addEventListener('click', count_climate)
document.getElementById("defaultOpen").addEventListener('click', count_host)

function count_family(){
    let counts=setInterval(updated, 400);
        let upto=0;
        function updated(){
            var count = document.getElementById("n_families");
            count.innerHTML=++upto;
            if(upto===11)
            {
                clearInterval(counts);
            }
        }
}

function count_genus() {
    let counts = setInterval(updated,100);
    let upto = 0;
    function updated(){
        var count = document.getElementById("n_genus");
        count.innerHTML=++upto;
        if(upto===37){
            clearInterval(counts);
        }
    }
};
function count_species() {
    let counts = setInterval(updated,10);
    let upto = 0;
    function updated(){
        var count = document.getElementById("n_species");
        count.innerHTML=++upto;
        if(upto===467){
            clearInterval(counts);
        }
    }
};
function count_virus() {
    let counts = setInterval(updated);
    let upto = 0;
    function updated(){
        var count = document.getElementById("n_virus");
        count.innerHTML=++upto;
        if(upto===922){
            clearInterval(counts);
        }
    }
};
function count_sequence() {
    let counts = setInterval(updated, 5);
    let upto = 0;
    function updated(){
        var count = document.getElementById("n_sequence");
        count.innerHTML=++upto;
        if(upto===645){
            clearInterval(counts);
        }
    }
};
document.getElementById("taxonomy_btn").addEventListener('click', count_family)
document.getElementById("taxonomy_btn").addEventListener('click', count_genus)
document.getElementById("taxonomy_btn").addEventListener('click', count_species)
document.getElementById("taxonomy_btn").addEventListener('click', count_virus)
document.getElementById("taxonomy_btn").addEventListener('click', count_sequence)

function count_diptera(){
    let counts=setInterval(updated, 30);
        let upto=0;
        function updated(){
            var count = document.getElementById("n_diptera");
            count.innerHTML=++upto;
            if(upto===192)
            {
                clearInterval(counts);
            }
        }
}

function count_ixodida() {
    let counts = setInterval(updated,50);
    let upto = 0;
    function updated(){
        var count = document.getElementById("n_ixodida");
        count.innerHTML=++upto;
        if(upto===88){
            clearInterval(counts);
        }
    }
};
function count_habitat() {
    let counts = setInterval(updated,30);
    let upto = 0;
    function updated(){
        var count = document.getElementById("n_habitat");
        count.innerHTML=++upto;
        if(upto===197){
            clearInterval(counts);
        }
    }
};
function count_night() {
    let counts = setInterval(updated, 50);
    let upto = 0;
    function updated(){
        var count = document.getElementById("n_night");
        count.innerHTML=++upto;
        if(upto===88){
            clearInterval(counts);
        }
    }
};
function count_zoo() {
    let counts = setInterval(updated, 30);
    let upto = 0;
    function updated(){
        var count = document.getElementById("n_zoo");
        count.innerHTML=++upto;
        if(upto===179){
            clearInterval(counts);
        }
    }
};

document.getElementById("transmission_btn").addEventListener('click', count_diptera)
document.getElementById("transmission_btn").addEventListener('click', count_ixodida)
document.getElementById("transmission_btn").addEventListener('click', count_habitat)
document.getElementById("transmission_btn").addEventListener('click', count_night)
document.getElementById("transmission_btn").addEventListener('click', count_zoo)

function count_level(){
    let counts=setInterval(updated, 400);
        let upto=0;
        function updated(){
            var count = document.getElementById("n_level");
            count.innerHTML=++upto + '%';
            if(upto===6)
            {
                clearInterval(counts);
            }
        }
}

function count_fever() {
    let counts = setInterval(updated,50);
    let upto = 0;
    function updated(){
        var count = document.getElementById("n_fever");
        count.innerHTML=++upto;
        if(upto===103){
            clearInterval(counts);
        }
    }
};
function count_fatal() {
    let counts = setInterval(updated,150);
    let upto = 0;
    function updated(){
        var count = document.getElementById("n_fatal");
        count.innerHTML=++upto;
        if(upto===45){
            clearInterval(counts);
        }
    }
};
function count_human() {
    let counts = setInterval(updated, 50);
    let upto = 0;
    function updated(){
        var count = document.getElementById("n_human");
        count.innerHTML=++upto;
        if(upto===154){
            clearInterval(counts);
        }
    }
};
function count_vet() {
    let counts = setInterval(updated, 80);
    let upto = 0;
    function updated(){
        var count = document.getElementById("n_vet");
        count.innerHTML=++upto;
        if(upto===75){
            clearInterval(counts);
        }
    }
};

document.getElementById("disease_btn").addEventListener('click', count_level)
document.getElementById("disease_btn").addEventListener('click', count_fever)
document.getElementById("disease_btn").addEventListener('click', count_fatal)
document.getElementById("disease_btn").addEventListener('click', count_human)
document.getElementById("disease_btn").addEventListener('click', count_vet)