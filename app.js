const apiUrl = 'https://api.exchangeratesapi.io';
const currencies = [];
const ctx = document.querySelector('#chart').getContext('2d');
const selectBaseElement = document.querySelector('.select-base');
const selectSymbolElement = document.querySelector('.select-symbol');
let chart;

(() => {
    fetch(`${apiUrl}/latest`)
        .then(response => response.json())
        .then(response => {
            currencies.push(response.base, ...Object.keys(response.rates));
            createSelectionOptions();
            selectBaseElement.value = response.base;
            selectSymbolElement.value = "PLN";
            reFetchData();
        })
})();

function createSelectionOptions() {
    let selectionOptionsHtml = '';
    currencies.forEach(currency => selectionOptionsHtml += `<option>${currency}</option>`);
    selectBaseElement.innerHTML = selectionOptionsHtml;
    selectSymbolElement.innerHTML = selectionOptionsHtml;
    [selectBaseElement, selectSymbolElement].forEach(element => element.addEventListener('change', () => reFetchData()));
}

function reFetchData() {
    fetch(`${apiUrl}/history?start_at=2020-01-01&end_at=2020-08-01&base=${selectBaseElement.value}&symbols=${selectSymbolElement.value}`)
        .then(response => response.json())
        .then(response => generateChart(response))
}

function generateChart(response) {
    if (!!chart) {
        chart.destroy();
    }
    const dates = Object.keys(response.rates);
    dates.sort();
    const data = [];
    dates.forEach(date => data.push(response.rates[date][selectSymbolElement.value]));
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates, // dates
            datasets: [{
                label: selectSymbolElement.value, // currency symbol
                data: data, // rates
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false
        }
    });
}
