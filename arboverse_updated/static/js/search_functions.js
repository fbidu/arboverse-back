const arbovirus = document.getElementById('arbovirus-search');
const vector = document.getElementById('vector-search');
const arboAutocomplete = document.getElementById('arbo-autocomplete');
const vectorAutocomplete = document.getElementById('vector-autocomplete');

let viruses = [];
let vectors = [];

function getData(source) {
    // Get a set of the data for which source we want
    if (source === 'arbovirus') {

    } else if (source === 'vector') {

    }
}

function searchDB(submit_id) {
    if (submit_id === 'arbovirus-submit') {
        let request = arbovirus.value;
    }
    else if (submit_id === 'vector-submit') {
        let request = vector.value;
    }
}

function autocomplete(source, input, array) {
    // Check which of the two searchbar autocompletes we want to append data to
    if (source === 'arbovirus') {

    }
    else if (source === 'vector') {

    }
}
