const apiUrl = 'https://api.exchangeratesapi.io';
const currencies = [];
const mainContainer = document.querySelector('.container');
const selectElement = document.querySelector('.select');

(() => {
    fetch(`${apiUrl}/latest`)
        .then(response => response.json())
        .then(response => {
            currencies.push(response.base, ...Object.keys(response.rates));
            generateRows(response);
            createSelectionOptions();
            selectElement.value = response.base;
        })
})();

function createSelectionOptions() {
    let selectionOptionsHtml = '';
    currencies.forEach(currency => selectionOptionsHtml += `<option>${currency}</option>`);
    selectElement.innerHTML = selectionOptionsHtml;
    selectElement.addEventListener('change', evt => {
        fetch(`${apiUrl}/latest?base=${evt.target.value}`)
            .then(response => response.json())
            .then(response => generateRows(response))
    });
}

function generateRows(response) {
    let mainContent = '';
    for (const property in response.rates) {
        if (response.rates.hasOwnProperty(property)) {
            const row = `1${response.base} = ${response.rates[property]}${property}`;
            const rowHtml = `<p>${row}</p>`;
            mainContent += rowHtml;
        }
    }
    mainContainer.innerHTML = mainContent;
}
