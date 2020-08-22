const apiUrl = 'https://api.exchangeratesapi.io/latest';

(() => {
    fetch(apiUrl)
        .then(response => response.json())
        .then(response => {
            let innerHtml = '';
            for (const property in response.rates) {
                if (response.rates.hasOwnProperty(property)) {
                    const row = `1${response.base} = ${response.rates[property]}${property}`;
                    const rowHtml = `<p>${row}</p>`;
                    innerHtml += rowHtml;
                }
            }
            document.querySelector('.container').innerHTML = innerHtml;
        })
})();
