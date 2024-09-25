const citiesByDistrict = {
    Colombo: ["Colombo", "Kotte", "Dehiwala", "Moratuwa", "Nugegoda"],
    Negombo: ["Kandy", "Peradeniya", "Gampola", "Katugastota", "Pilimathalawa"],
    Galle: ["Galle", "Hikkaduwa", "Ambalangoda", "Unawatuna", "Elpitiya"],
    Matara: ["Matara", "Weligama", "Deniyaya", "Hakmana"],
    Jaffna: ["Jaffna", "Chavakachcheri", "Nallur", "Karainagar"],
    Trinco: ["Trincomalee", "Kinniya", "Mutur", "Kuchchaveli"]
};

const routesByCity = {
    Kotte: ["a", "b", "c", "d"],
    Dehiwala: ["a", "b", "c", "d"],
    Moratuwa: ["a", "b", "c", "d"],
    Nugegoda: ["a", "b", "c", "d"],
    Peradeniya: ["a", "b", "c", "d"],

};

// Function to populate cities based on selected district
function populateCities() {
    const districtSelect = document.getElementById("district");
    const citySelect = document.getElementById("city");
    const selectedDistrict = districtSelect.value;

    // Clear any previous city options
    citySelect.innerHTML = '<option value="" disabled selected>Select City</option>';

    // Populate cities based on selected district
    if (selectedDistrict in citiesByDistrict) {
        citiesByDistrict[selectedDistrict].forEach(function(city) {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }
}

function populateRoutes() {
    const citySelect = document.getElementById("city");
    const routeSelect = document.getElementById("route");
    const selectedRoute = citySelect.value;

    // Clear any previous city options
    routeSelect.innerHTML = '<option value="" disabled selected>Select Route</option>';

    // Populate cities based on selected district
    if (selectedRoute in routesByCity) {
        routesByCity[selectedRoute].forEach(function(route) {
            const option = document.createElement("option");
            option.value = route;
            option.textContent = route;
            routeSelect.appendChild(option);
        });
    }
}