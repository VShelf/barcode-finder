const axios = require('axios');
const cheerio = require('cheerio');

(async function () {
    try {

        const base_url = 'https://pt.product-search.net/?q=';
        const code = 'EAN_CODE';

        await axios.get(`${base_url}${code}`, {
           headers: {
               "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/114.0.5735.99 Mobile/15E148 Safari/604.1"
           }
        }).catch((err) => {
            if (err) {
                console.log('Produto não encontrado!')
                console.log(err);
                return;
            };
        }).then(response => {
            if (response) {
                const $ = cheerio.load(response.data);
                const product = $("h1").text().trim();

                if (product.length === 0) return console.log('Produto nao encontrado!');

                console.log(product);
            };
        });
    } catch (err) {
        console.log(err);
    };
})()
