const req = require("./requster");
const config = require("../config.json")


async function getGas()
{
    var options = {
        'method': 'GET',
        'url': 'https://api.bscscan.com//api?module=gastracker&action=gasoracle&apikey=YourApiKeyToken',
        'headers': {
          'user-agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
          'Content-Type': 'application/json'
        },
      };
      return req.doRequest(options);
}


module.exports = {
    getGas,
}