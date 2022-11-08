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
window.addEventListener('load', count_arbv)
window.addEventListener('load', count_countries)
window.addEventListener('load', count_biomes)
window.addEventListener('load', count_climate)

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

document.getElementById("taxonomy_btn").addEventListener('click', count_family)
document.getElementById("taxonomy_btn").addEventListener('click', count_genus)
document.getElementById("taxonomy_btn").addEventListener('click', count_species)
document.getElementById("taxonomy_btn").addEventListener('click', count_virus)