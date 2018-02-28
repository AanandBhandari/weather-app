const request = require('request');
const axios = require('axios');
const yargs=require('yargs');
var argv=yargs
	.option({
		a:{
			demand:true,
			alias:'address',
			description:'address to fetch weather for',                                            
			string:true
		}
	}) 
	.help()
	.alias('help','h')
	.argv;
var encodedAddress=encodeURIComponent(argv.address);
var geocodeUrl=`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyCENBExQ2fTyLrimLEsjgOOZsMD4U_WrG0`;
axios.get(geocodeUrl).then((response)=>{
	if (response.data.status==='ZERO_RESULT') {
		throw new Error('Unable to find that address');
	}
	var lat=response.data.results[0].geometry.location.lat;
	var lng=response.data.results[0].geometry.location.lng;
	var weatherUrl=`https://api.darksky.net/forecast/e1ff327d46955dd47d23205367d827e6/${lat},${lng}`;
	console.log(response.data.results[0].formatted_address);
	return axios.get(weatherUrl);
}).then((response)=>{
	var temperature=response.data.currently.temperature;
	var apparentTemperature=response.data.currently.apparentTemperature;
	console.log(`It is ${temperature}. It feels like ${apparentTemperature}`);
}).catch((e)=>{
	if (e.code==='ENOTFOUND') {
		console.log('Unable to connect geocode API server');
	} else {
			console.log(e.message);
	}
});