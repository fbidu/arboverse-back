
// --- Existing logic to handle clicking sidebar menu buttons ---
const buttons = document.querySelectorAll('.item-button');
const menus = document.querySelectorAll('.map-menu-drawer');

buttons.forEach(button => {
    button.addEventListener('click', function () {
        const targetMenuId = this.getAttribute('data-target');
        const targetMenu = document.getElementById(targetMenuId);
        
        if (targetMenu && targetMenu.classList.contains('is-open')) {
            targetMenu.classList.remove('is-open');
            this.classList.remove('btn-active');
            return;
        }

        buttons.forEach(btn => btn.classList.remove('btn-active'));
        menus.forEach(menu => menu.classList.remove('is-open'));

        this.classList.add('btn-active');
        if (targetMenu) targetMenu.classList.add('is-open');
    });
});

// --- NEW: Handle internal close buttons inside the drawers ---
const closeButtons = document.querySelectorAll('.closebtn');

closeButtons.forEach(closeBtn => {
    closeBtn.addEventListener('click', function () {
        const menuIdToClose = this.getAttribute('data-close');
        const menuToClose = document.getElementById(menuIdToClose);
        
        if (menuToClose) {
            // Close the menu drawer
            menuToClose.classList.remove('is-open');
            
            // Find the sidebar button that opens this menu and turn off its active style
            const correspondingBtn = document.querySelector(`[data-target="${menuIdToClose}"]`);
            if (correspondingBtn) {
                correspondingBtn.classList.remove('btn-active');
            }
        }
    });
});

//Checked Discovery
showChekedDis();
var i = 0;
function showChekedDis() {
    document.getElementById('check1').textContent = document.querySelectorAll("input[name=discovery]:checked").length;
}
document.querySelectorAll("input[name=discovery]").forEach(i => {
    //console.log('yar land ho')
    i.onclick = function () {
        showChekedDis();
        update_map(this);
    }
});
//Checked Distribution
showCheckedDistri();
var i = 0;
function showCheckedDistri() {
    document.getElementById('check2').textContent = document.querySelectorAll("input[name=distribution]:checked").length;
}
document.querySelectorAll("input[name=distribution]").forEach(i => {
    i.onclick = function () {
        ////console.log(this);
        showCheckedDistri();
        update_map(this);
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

//Checked climate
showChekedCli();
var i = 0;
function showChekedCli() {
    document.getElementById('check4').textContent = document.querySelectorAll("input[name=climate]:checked").length;
}
document.querySelectorAll("input[name=climate]").forEach(i => {
    i.onclick = function () {
        showChekedCli();
        update_map(this);
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
//Population density
function population_switch() {
    prefix = "pop"
    year = document.querySelector('input[name=pop_year]').value;

    return[year, prefix]
}
document.querySelectorAll("input[name=pop_year]").forEach (i => {
    i.onchange = function() {
        cb = document.querySelector("input[name=socioeconomics][id=population_switch]")
        if(cb.checked){
            //console.log(this.value);
            var[year, prefix] = population_switch();
            update_map_only_time(cb, year, prefix)
        }
    }
});
//GDP
function gdp_switch() {
    prefix = "gdp"
    year = document.querySelector('input[name=gdp_year]').value;

    return[year, prefix]
}
document.querySelectorAll("input[name=gdp_year]").forEach (i => {
    i.onchange = function() {
        cb = document.querySelector("input[name=socioeconomics][id=gdp_switch]")
        if(cb.checked){
            //console.log(this.value);
            var[year, prefix] = gdp_switch();
            update_map_only_time(cb, year, prefix)
        }
    }
});
//HDI
function hdi_switch() {
    prefix = "hdi"
    year = document.querySelector('input[name=hdi_year]').value;

    return[year, prefix]
}
document.querySelectorAll("input[name=hdi_year]").forEach (i => {
    i.onchange = function() {
        cb = document.querySelector("input[name=socioeconomics][id=hdi_switch]")
        if(cb.checked){
            //console.log(this.value);
            var[year, prefix] = hdi_switch();
            update_map_only_time(cb, year, prefix)
        }
    }
});
document.querySelectorAll("input[name=socioeconomics]").forEach(i => {
    //console.log(i.id);
   if(i.id == "population_switch") {
       i.onclick = function() {
           showChekedSoc();
           var[year, prefix] = population_switch();
           update_map_only_time(this,year,prefix);
       }
   }else if (i.id == 'gdp_switch'){
    i.onclick = function() {
        showChekedSoc();
        var[year, prefix] = gdp_switch();
        update_map_only_time(this,year,prefix);
    }
   }else if (i.id == 'hdi_switch'){
    i.onclick = function() {
        showChekedSoc();
        var[year, prefix] = hdi_switch();
        update_map_only_time(this,year,prefix);
    }
   }else {
       i.onclick = function() {
           showChekedSoc();
           update_map(this);
       }
   }
});
//Checked biodiversity
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
//Forecast mosquito climate Condition
var i=0;
var livestockSwitchbtn = document.getElementById('livestock_switch')
function enablelivestockRadio() {
    document.getElementById("arboverse.livestock_goat_2010_da_10km").disabled = true;
    document.getElementById("arboverse.livestock_catle_2010_da_10km").disabled = true;
    document.getElementById("arboverse.livestock_sheep_2010_da_10km").disabled = true;
    document.getElementById("arboverse.livestock_bufalo_2010_da_10km").disabled = true;
    document.getElementById("arboverse.livestock_chicken_2010_da_10km").disabled = true;
    document.getElementById("arboverse.livestock_horse_2010_da_10km").disabled = true;
    document.getElementById("arboverse.livestock_pig_2010_da_10km").disabled = true;
    document.getElementById("arboverse.livestock_duck_2010_da_10km").disabled = true;
    var dev = document.getElementById('livestock_switch').checked;
    if (dev === true) {
        document.getElementById("arboverse.livestock_goat_2010_da_10km").disabled = false;
        document.getElementById("arboverse.livestock_catle_2010_da_10km").disabled = false;
        document.getElementById("arboverse.livestock_sheep_2010_da_10km").disabled = false;
        document.getElementById("arboverse.livestock_bufalo_2010_da_10km").disabled = false;
        document.getElementById("arboverse.livestock_chicken_2010_da_10km").disabled = false;
        document.getElementById("arboverse.livestock_horse_2010_da_10km").disabled = false;
        document.getElementById("arboverse.livestock_pig_2010_da_10km").disabled = false;
        document.getElementById("arboverse.livestock_duck_2010_da_10km").disabled = false;
    } else if (dev !== true) {
        document.getElementById("arboverse.livestock_goat_2010_da_10km").disabled = true;
        document.getElementById("arboverse.livestock_catle_2010_da_10km").disabled = true;
        document.getElementById("arboverse.livestock_sheep_2010_da_10km").disabled = true;
        document.getElementById("arboverse.livestock_bufalo_2010_da_10km").disabled = true;
        document.getElementById("arboverse.livestock_chicken_2010_da_10km").disabled = true;
        document.getElementById("arboverse.livestock_horse_2010_da_10km").disabled = true;
        document.getElementById("arboverse.livestock_pig_2010_da_10km").disabled = true;
        document.getElementById("arboverse.livestock_duck_2010_da_10km").disabled = true;
    };
    var j = 0;
    document.querySelectorAll("input[name=model_livestock]").forEach(j => {
        j.checked = false;
        update_map(j)
    })
}
livestockSwitchbtn.onchange = enablelivestockRadio;
var i = 0;
document.querySelectorAll("input[name=model_livestock]").forEach(i => {
    i.onchange = function () {
        var j = 0;
        document.querySelectorAll("input[name=model_livestock]").forEach(j => {
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

//Mammals
var i=0;
var mammalsSwitchbtn = document.getElementById('mammals_switch')
function enableMammalsRadio() {
    document.getElementById("mammals_placeholder").disabled = true;
    var dev = document.getElementById('mammals_switch').checked;
    if (dev == true) {
    document.getElementById("mammals_placeholder").disabled = false;
    } else if (dev != true) {
    document.getElementById("mammals_placeholder").checked = false;
    document.getElementById("arboverse.bio_mammals_primates_10km").checked = false;
    document.getElementById("arboverse.bio_mammals_threatened_10km").checked = false;
    document.getElementById("arboverse.bio_mammals_marsupialia_10km").checked = false;
    document.getElementById("arboverse.bio_mammals_data_deficient_10km").checked = false;
    document.getElementById("arboverse.bio_mammals_richness_10km").checked = false;
    document.getElementById("arboverse.bio_mammals_eulipotyphla_10km").checked = false;
    document.getElementById("arboverse.bio_mammals_rodentia_10km").checked = false;
    document.getElementById("arboverse.bio_mammals_carnivora_10km").checked = false;
    document.getElementById("arboverse.bio_mammals_small_ranged_10km").checked = false;
    document.getElementById("arboverse.bio_mammals_cetartiodactyla").checked = false;
    document.getElementById("arboverse.bio_mammals_chiroptera_10km").checked = false;
    };
    var j = 0;
    document.querySelectorAll("input[name=option_mammals]").forEach(j => {
        j.checked = false;
        update_map(j)
    });
}
var i = 0;
mammalsSwitchbtn.onchange = enableMammalsRadio;
document.querySelectorAll("input[name=option_mammals]").forEach(i =>{
    i.onchange = function () {
        var target = document.querySelector(".mammals_new_value");
        var newValue = i.value;
        if(newValue == 20 || newValue == 30|| newValue == 40){
            target.innerHTML =`≥${newValue} species`
        } else if (newValue == 31 || newValue == 26 || newValue == 120 || newValue == 25 || newValue == 62 || newValue == 35 || newValue == 212 || newValue == 4){
            target.innerHTML = `${newValue} species`;
        } else {
            target.innerHTML = `select data`
        }
        var j = 0;
        document.querySelectorAll("input[name=option_mammals]").forEach(j => {
            j.checked = false;
            update_map(j);
        });
        i.checked = true;
        update_map(this)
    }
})

//Amphibians
var i=0;
var amphibiansSwitchbtn = document.getElementById('amphibians_switch')
function enableAmphibiansRadio() {
    document.getElementById("amphibians_placeholder").disabled = true;
    var dev = document.getElementById('amphibians_switch').checked;
    if (dev == true) {
    document.getElementById("amphibians_placeholder").disabled = false;
    } else if (dev != true) {
    document.getElementById("amphibians_placeholder").checked = false;
    document.getElementById("arboverse.bio_amp_caudata_10km").checked = false;
    document.getElementById("arboverse.bio_amp_anura_10km").checked = false;
    document.getElementById("arboverse.bio_amp_gymnophiona_10km").checked = false;
    document.getElementById("arboverse.bio_amp_richness_10km").checked = false;
    document.getElementById("arboverse.bio_amp_smal_range_10km").checked = false;
    document.getElementById("arboverse.bio_amp_threatened_10km").checked = false;
    document.getElementById("arboverse.bio_amp_data_def_10km").checked = false;
    };
    var j = 0;
    document.querySelectorAll("input[name=option_amphibians]").forEach(j => {
        j.checked = false;
        update_map(j)
    });
}
var i = 0;
amphibiansSwitchbtn.onchange = enableAmphibiansRadio;
document.querySelectorAll("input[name=option_amphibians]").forEach(i =>{
    i.onchange = function () {
        var target = document.querySelector(".other_value");
        var newValue = i.value;
        if(newValue < 35){
            target.innerHTML =`≥${newValue} species`
        } else if (newValue > 100){
            target.innerHTML = `${newValue} species`;
        } else {
            target.innerHTML = `select data`
        }
        var j = 0;
        document.querySelectorAll("input[name=option_amphibians]").forEach(j => {
            j.checked = false;
            update_map(j);
        });
        i.checked = true;
        update_map(this)
    }
})

//Birds
var i=0;
var birdsSwitchbtn = document.getElementById('birds_switch_diversity')
function enableBirdsRadio() {
    document.getElementById("birds_placeholder").disabled = true;
    var dev = document.getElementById('birds_switch_diversity').checked;
    if (dev == true) {
    document.getElementById("birds_placeholder").disabled = false;
    } else if (dev != true) {
    document.getElementById("birds_placeholder").checked = false;
    document.getElementById("arboverse.biodiversity_birds_richness_10km").checked = false;
    document.getElementById("arboverse.bio_birds_small_ranged_10km").checked = false;
    document.getElementById("arboverse.bio_birds_non_passeriformes").checked = false;
    document.getElementById("arboverse.bio_birds_passeriformes_10km").checked = false;
    document.getElementById("arboverse.bio_birds_nonbreeding_10km").checked = false;
    document.getElementById("arboverse.bio_birds_threatened_bird").checked = false;
    document.getElementById("arboverse.bio_birds_psittaciformes_10km").checked = false;
    document.getElementById("arboverse.bio_birds_trochilidae_10km").checked = false;
    document.getElementById("arboverse.bio_birds_breeding_range_10km").checked = false;
    document.getElementById("arboverse.bio_birds_threatened_small").checked = false;
    document.getElementById("arboverse.bio_birds_data_deficient_10km").checked = false;
    };
    var j = 0;
    document.querySelectorAll("input[name=option_birds]").forEach(j => {
        j.checked = false;
        update_map(j)
    });
}
var i = 0;
birdsSwitchbtn.onchange = enableBirdsRadio;
document.querySelectorAll("input[name=option_birds]").forEach(i =>{
    i.onchange = function () {
        var target = document.querySelector(".other_value_birds");
        var newValue = i.value;
            target.innerHTML = `${newValue} species`
        var j = 0;
        document.querySelectorAll("input[name=option_birds]").forEach(j => {
            j.checked = false;
            update_map(j);
        });
        i.checked = true;
        update_map(this)
    }
})

//healthcare access Condition
var i=0;
var healthSwitchbtn = document.getElementById('health_switch')
function enableHealthRadio() {
    document.getElementById("arboverse.healthcare_time_walking_5km_2020").disabled = true;
    document.getElementById("arboverse.healthcare_time_motorized").disabled = true;
    var dev = document.getElementById('health_switch').checked;
    if (dev == true) {
        document.getElementById("arboverse.healthcare_time_walking_5km_2020").disabled = false;
        document.getElementById("arboverse.healthcare_time_motorized").disabled = false;
    } else if (dev != true) {
        document.getElementById("arboverse.healthcare_time_walking_5km_2020").checked = false;
        document.getElementById("arboverse.healthcare_time_motorized").checked = false;
    };
    var j = 0;
    document.querySelectorAll("input[name=type-locomotion]").forEach(j => {
        j.checked = false;
        update_map(j)
    })
}
healthSwitchbtn.onchange = enableHealthRadio;
var i = 0;
document.querySelectorAll("input[name=type-locomotion]").forEach(i => {
    i.onchange = function () {
        var j = 0;
        document.querySelectorAll("input[name=type-locomotion]").forEach(j => {
            j.checked = false;
            update_map(j)
        });
        i.checked = true;
        update_map(this);
    }
})
//slider
//Slider time response for climate
var dryspellsYear = document.querySelector('input[name=dry_spells_annual]');
var dryspellsValue = function(){
    var newValue = dryspellsYear.value;
    var endValue = Number(newValue) + 30;
    var target = document.querySelector('.dryspells_value');
    target.innerHTML = `${newValue} - ${endValue}`
}
dryspellsYear.addEventListener("input", dryspellsValue);

var extremeYear = document.querySelector('input[name=extreme_precipitation_annual]');
var extremeValue = function(){
    var newValue = extremeYear.value;
    var endValue = Number(newValue) + 30;
    var target = document.querySelector('.extreme_value');
    target.innerHTML = `${newValue} - ${endValue}`
}
extremeYear.addEventListener("input", extremeValue);

var precipitation = document.querySelector('input[name=precipitation_year]');
var precipitationValue = function() {
    var newValue = precipitation.value;
    var endValue = Number(newValue) + 30;
    var target = document.querySelector('.precipitation_value');
    target.innerHTML = `${newValue} - ${endValue}`
}
precipitation.addEventListener("input", precipitationValue);

var annual = document.querySelector('input[name=annual]');
var annualValue = function() {
    var newValue = annual.value;
    var endValue = Number(newValue) + 30;
    var target = document.querySelector('.annual_value');
    target.innerHTML = `${newValue} - ${endValue}`
}
annual.addEventListener("input", annualValue);
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

var pop_year = document.querySelector('input[name=pop_year]');
var popValuesYear = function() {
    var newValue = pop_year.value;
    var target = document.querySelector('.pop_value');
    target.innerHTML = newValue;
}
pop_year.addEventListener("input", popValuesYear);

var gdp_year = document.querySelector('input[name=gdp_year]');
var gdpValuesYear = function() {
    var newValue = gdp_year.value;
    var target = document.querySelector('.gdp_value');
    target.innerHTML = newValue;
}
gdp_year.addEventListener("input", gdpValuesYear);

var hdi_year = document.querySelector('input[name=hdi_year]');
var hdiValuesYear = function() {
    var newValue = hdi_year.value;
    var target = document.querySelector('.hdi_value');
    target.innerHTML = newValue;
}
hdi_year.addEventListener("input", hdiValuesYear);

// OPACITY SLIDE RESPONSE NUMBER %
document.addEventListener('input', function (event) {
  // 1. Check if the element being changed is a range slider
  if (event.target && event.target.type === 'range') {
    const slider = event.target;
    
    // 2. Grab the element that sits immediately after this slider in the HTML
    const targetSpan = slider.nextElementSibling;
    
    // 3. If that next element is a span, update its text
    if (targetSpan && targetSpan.tagName === 'SPAN') {
      targetSpan.textContent = slider.value;
    }
  }
});


// --- 1. MASTER CLIMATE COUNTER ---
// Corrected the spelling casing to match 'showChekedCli' used in your modules
function showChekedCli() {
    const counterDisplay = document.getElementById('check4');
    if (!counterDisplay) return;

    // Counts any master input with name="climate" that is currently checked
    const activeMasters = document.querySelectorAll("input[name=climate]:checked").length;
    
    counterDisplay.textContent = activeMasters;
}

// Run once immediately on script load to set initial counter string
showChekedCli();

// Attach counter events safely to your master climate checkboxes
document.querySelectorAll("input[name=climate]").forEach(masterCheckbox => {
    // FIX: Using addEventListener prevents overwriting map modules!
    masterCheckbox.addEventListener('change', function () {
        
        // 1. Update the counter UI
        showChekedCli();
        
        // 2. Safely trigger your secondary counter if it exists
        if (typeof showChekedFor === 'function') {
            showChekedFor();
        }
        
        // 3. Fire map visibility updater if explicitly needed
        if (typeof update_map === 'function') {
            update_map(this);
        }
    });
});


// --- 2. ANNUAL TEMPERATURE MODULE ---
const annualMaster = document.getElementById('annual_switch');

if (annualMaster) {
    const syncAnnualTemp = () => {
        if (!annualMaster.checked) return;

        // Force 'Average' as default if nothing is checked
        if (!document.querySelector('input[name="annual_time"]:checked')) {
            document.getElementById('temp_average').checked = true;
        }
        // Force 'RCP 4.5' as default if nothing is checked
        if (!document.querySelector('input[name="model_selector"]:checked')) {
            document.getElementById('model_1').checked = true;
        }

        // Get values specifically for temperature
        const model = document.querySelector('input[name="model_selector"]:checked').value;
        const year = document.querySelector('input[name="annual"]').value;
        const prefix = document.querySelector('input[name="annual_time"]:checked').value;

        update_map_time(annualMaster, model, year, prefix);
    };

    // Switched to 'change' to match standard checkbox behaviors symmetrically
    annualMaster.addEventListener('change', function() {
        showChekedCli(); // Keep counter synced when changed natively
        if (this.checked) {
            syncAnnualTemp();
        } else {
            // Uncheck sub-radios when turned off
            document.querySelectorAll('input[name="annual_time"], input[name="model_selector"]')
                .forEach(r => r.checked = false);
            // Hide layer
            update_map_time(this, null, null, "temp_");
        }
    });

    // Listen to changes on sub-radios and slider
    document.querySelectorAll('input[name="annual_time"], input[name="model_selector"], input[name="annual"]')
        .forEach(input => {
            input.addEventListener('change', () => {
                if (annualMaster.checked) syncAnnualTemp();
            });
        });
}


// --- 3. 2-INPUT CLIMATE MODULE ---
function setupClimateTwoInputs(masterId, modelName, yearName, prefix) {
    const master = document.getElementById(masterId);
    if (!master) return;

    const sync = () => {
        if (!master.checked) return;
        if (!document.querySelector(`input[name="${modelName}"]:checked`)) {
            const defaultModel = document.querySelector(`input[name="${modelName}"]`);
            if (defaultModel) defaultModel.checked = true;
        }
        
        const checkedModel = document.querySelector(`input[name="${modelName}"]:checked`);
        if (!checkedModel) return;

        const model = checkedModel.value;
        const year = document.querySelector(`input[name="${yearName}"]`).value;
        update_map_time(master, model, year, prefix);
    };

    master.addEventListener('change', function() {
        showChekedCli(); // Keep counter synced when changed natively
        
        if (this.checked) {
            sync();
        } else {
            document.querySelectorAll(`input[name="${modelName}"]`).forEach(r => r.checked = false);
            update_map_time(this, null, null, prefix);
        }
    });

    document.querySelectorAll(`input[name="${modelName}"], input[name="${yearName}"]`)
        .forEach(el => el.addEventListener('change', () => { if (master.checked) sync(); }));
}


// --- 4. MAPBOX EVENT INITIALIZATION ---
map.on('load', function() {
    setupClimateTwoInputs('hotdays_switch', 'hotdays_model', 'hotdays_year', 'hot_days_yr');
    setupClimateTwoInputs('precipitation_switch', 'model_precipitation', 'precipitation_year', 'prec');
    setupClimateTwoInputs('extreme_switch', 'model_extreme', 'extreme_precipitation_annual', 'extreme');
    setupClimateTwoInputs('dryspells_switch', 'model_dry', 'dry_spells_annual', 'dryspells_ch');
    
    // Catch any pre-checked conditions from the HTML rendering
    showChekedCli();
});