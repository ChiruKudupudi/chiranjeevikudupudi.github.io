// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([20, 0], 2); // Centered on the world

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const countrySelect = document.getElementById('countrySelect');
    const regionSelect = document.getElementById('regionSelect');
    const departmentSelect = document.getElementById('departmentSelect');

    const uniqueCountries = [...new Set(employeeData.map(emp => emp.country))];
    const uniqueRegions = [...new Set(employeeData.map(emp => emp.region))];
    const uniqueDepartments = [...new Set(employeeData.map(emp => emp.department))];

    uniqueCountries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });

    uniqueRegions.forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        regionSelect.appendChild(option);
    });

    uniqueDepartments.forEach(department => {
        const option = document.createElement('option');
        option.value = department;
        option.textContent = department;
        departmentSelect.appendChild(option);
    });

    function updateMap() {
        map.eachLayer((layer) => {
            if (!!layer.toGeoJSON) {
                map.removeLayer(layer);
            }
        });

        const filteredData = employeeData.filter(emp => {
            return (!countrySelect.value || emp.country === countrySelect.value) &&
                   (!regionSelect.value || emp.region === regionSelect.value) &&
                   (!departmentSelect.value || emp.department === departmentSelect.value);
        });

        filteredData.forEach(emp => {
            // Assuming we have lat and lon for each country/region
            const lat = 0; // Replace with actual latitude
            const lon = 0; // Replace with actual longitude

            L.marker([lat, lon])
                .bindPopup(`<b>${emp.country}</b><br>${emp.region}<br>${emp.department}: ${emp.count}`)
                .addTo(map);
        });
    }

    countrySelect.addEventListener('change', updateMap);
    regionSelect.addEventListener('change', updateMap);
    departmentSelect.addEventListener('change', updateMap);

    updateMap();
});
