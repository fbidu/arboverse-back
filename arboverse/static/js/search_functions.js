/*
const arbovirus = document.getElementById('arbovirus-search');
const vector = document.getElementById('vector-search');
const arboAutocomplete = document.getElementById('arbo-autocomplete');
const vectorAutocomplete = document.getElementById('vector-autocomplete');

let viruses = fetch('/api/virus');
let vectors = fetch('/api/vector-species');

alert("script loaded")
console.log("script loaded")
function getData(source) {
    // Get a set of the data for which source we want
    if (source === 'arbovirus') {

    } else if (source === 'vector') {

    }
}

function searchDB(submit_id) {
    if (submit_id === 'arbovirus-submit') {
        alert(arbovirus.value);
        let request = arbovirus.value;
    }
    else if (submit_id === 'vector-submit') {
        alert(vector.value);
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
*/

const arbovirus = document.getElementById('arbovirus-search');
const vector = document.getElementById('vector-search');
const arboAutocomplete = document.getElementById('arbo-autocomplete');
const vectorAutocomplete = document.getElementById('vector-autocomplete');

let viruses = [];
let vectors = [];

console.log('search functions loaded.')

// Fetch the data for viruses and vectors from the API with error handling
fetch('/api/virus')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        viruses = data;
    })
    .catch(error => {
        console.error('Error fetching viruses:', error);
    });

fetch('/api/vector-species')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        vectors = data;
    })
    .catch(error => {
        console.error('Error fetching vectors:', error);
    });


console.log("script loaded");

// Helper function to filter data based on input
function filterData(query, dataArray) {
    return dataArray.filter(item => item.toLowerCase().includes(query.toLowerCase()));
}

// Function to populate autocomplete suggestions
function autocomplete(source, input, array) {
    const autocompleteBox = source === 'arbovirus' ? arboAutocomplete : vectorAutocomplete;
    autocompleteBox.innerHTML = ''; // Clear any previous suggestions

    // Get matching suggestions
    const suggestions = filterData(input, array);

    // Add suggestions to the autocomplete box
    suggestions.forEach(suggestion => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('autocomplete-item');
        suggestionItem.textContent = suggestion;
        suggestionItem.addEventListener('click', () => {
            if (source === 'arbovirus') {
                arbovirus.value = suggestion;
            } else {
                vector.value = suggestion;
            }
            autocompleteBox.innerHTML = ''; // Clear suggestions after selection
        });
        autocompleteBox.appendChild(suggestionItem);
    });
}

// Function to handle input events and trigger autocomplete
function getData(source) {
    const input = source === 'arbovirus' ? arbovirus.value : vector.value;
    const dataArray = source === 'arbovirus' ? viruses : vectors;

    // Call autocomplete function with the appropriate source and input
    autocomplete(source, input, dataArray);
}

// Function to handle search submission
function searchDB(submit_id) {
    alert(submit_id)
    if (submit_id === 'arbovirus-submit') {
        alert(`Searching for arbovirus: ${arbovirus.value}`);
        // Perform a search or send a request based on arbovirus.value
    } else if (submit_id === 'vector-submit') {
        alert(`Searching for vector: ${vector.value}`);
        // Perform a search or send a request based on vector.value
    }
}

// Add event listeners to trigger autocomplete on input
arbovirus.addEventListener('input', () => getData('arbovirus'));
vector.addEventListener('input', () => getData('vector'));

