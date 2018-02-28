const request= require('request');
const yargs=require('yargs');
const geocode=require('./geocode/geocode.js');
const weather=require('./weather/weather.js');
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
geocode.geocodeAddress(argv.address,(errorMessage,results)=>{
	if (errorMessage) {
		console.log(errorMessage);
	}else {
		console.log(JSON.stringify(results,undefined,2));
		weather.getWeather(results.latitude,results.longitude,(errorWeather,weatherResults)=>{
			if (errorWeather) {
				console.log(errorWeather);
			} else { 
			console.log(`Its currently is ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
		}
	});
	}
});

