var unirest = require("unirest");
const geocode = (address, callback ) =>
 {

	var req1 = unirest("GET", "https://opencage-geocoder.p.rapidapi.com/geocode/v1/json");

req1.query({
	"language": "en",
	"key": "d6c58bea0ea640cc8c0963ee045ba290",
	"q": address,
	"limit":1
});

req1.headers({
	"x-rapidapi-host": "opencage-geocoder.p.rapidapi.com",
	"x-rapidapi-key": "92fe120ce8msha4a60ff665cb07ap1b2322jsnd13b49cafaba",
	"useQueryString": true
});


req1.end((res) => {

	
	if (res.error) 
  	{
	callback('Unable to give the coordinates',undefined);
	 }
	 else if(res.body.results[0].geometry.lat.length === 0)
	 {
	 	callback('Unable to give the coordinate,try any other coordinates',undefined);
	 }
	 else
	 {
	 	const latitude = res.body.results[0].geometry.lat;
		const longitude = res.body.results[0].geometry.lng;
        const location = (res.body.results[0].formatted);
        const info = 
        {
            "latitude" :latitude,
            "longitude" :longitude,
            "location" :location
            
        }
		callback('undefined' ,info )
		   
	 }
  
});

 }

 module.exports = geocode;