var unirest = require("unirest");
const forecast = (latitude , longitude , callback) =>
{
var req = unirest("GET", "https://geocodeapi.p.rapidapi.com/GetNearestCities");
req.query({
	"latitude": latitude,
	"longitude": longitude,
	"range": "0"
});
req.headers({
	"x-rapidapi-host": "geocodeapi.p.rapidapi.com",
	"x-rapidapi-key": "92fe120ce8msha4a60ff665cb07ap1b2322jsnd13b49cafaba",
	"useQueryString": true
});
req.end(function (res) {
	
	 if(res.error)
	 {
	 	callback('ERROR IN DELIVERING INFORMATION',res.error)
	 }
	 else
	 {
         
            const COUNTRY =  res.body[0].Country
            const POPULATION = res.body[0].Population
         
     callback('undefined',
     {
        "Country" : COUNTRY,
        "POPULATION" : POPULATION
     });

     }
           

});
}

module.exports = forecast;