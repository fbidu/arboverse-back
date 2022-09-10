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
            if(upto===124)
            {
                clearInterval(counts);
            }
        }
}
function count_biomes(){
    let counts=setInterval(updated, 500);
        let upto=0;
        function updated(){
            var count= document.getElementById("n_biomes");
            count.innerHTML=++upto;
            if(upto===9)
            {
                clearInterval(counts);
            }
        }
}
function count_climate(){
    let counts=setInterval(updated, 300);
        let upto=0;
        function updated(){
            var count= document.getElementById("n_climate");
            count.innerHTML=++upto;
            if(upto===15)
            {
                clearInterval(counts);
            }
        }
}
window.addEventListener('load', count_arbv)
window.addEventListener('load', count_countries)
window.addEventListener('load', count_biomes)
window.addEventListener('load', count_climate)