// Load CSV file and create the visualization
d3.csv('Employee List (5).csv').then(data => {
    // Extract unique countries and departments for the filters
    const countries = [...new Set(data.map(d => d.Country))];
    const departments = [...new Set(data.map(d => d.Department))];

    // Populate the country filter
    const countrySelect = d3.select('#countrySelect');
    countrySelect.append('option').text('All').attr('value', 'All');
    countries.forEach(country => {
        countrySelect.append('option').text(country).attr('value', country);
    });

    // Populate the department filter
    const departmentSelect = d3.select('#departmentSelect');
    departmentSelect.append('option').text('All').attr('value', 'All');
    departments.forEach(department => {
        departmentSelect.append('option').text(department).attr('value', department);
    });

    // Create the initial chart
    updateChart(data);

    // Add event listeners to the filters
    countrySelect.on('change', () => updateChart(data));
    departmentSelect.on('change', () => updateChart(data));
});

function updateChart(data) {
    const selectedCountry = d3.select('#countrySelect').property('value');
    const selectedDepartment = d3.select('#departmentSelect').property('value');

    // Filter the data based on the selected filters
    let filteredData = data;
    if (selectedCountry !== 'All') {
        filteredData = filteredData.filter(d => d.Country === selectedCountry);
    }
    if (selectedDepartment !== 'All') {
        filteredData = filteredData.filter(d => d.Department === selectedDepartment);
    }

    // Clear the previous chart
    d3.select('#chart').html('');

    // Create a new chart with the filtered data
    const width = 800;
    const height = 400;

    const svg = d3.select('#chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Create a simple bar chart as an example
    const x = d3.scaleBand()
        .domain(filteredData.map(d => d['Last Name']))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(filteredData, d => +d['Job Title'])])
        .nice()
        .range([height, 0]);

    svg.append('g')
        .selectAll('rect')
        .data(filteredData)
        .enter()
        .append('rect')
        .attr('x', d => x(d['Last Name']))
        .attr('y', d => y(+d['Job Title']))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(+d['Job Title']))
        .attr('fill', 'steelblue');
}
