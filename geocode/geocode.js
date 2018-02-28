const request=require('request');
var geocodeAddress=(address,callback)=>{
		var encodedAddress=encodeURIComponent(address);
			request({
				url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyCENBExQ2fTyLrimLEsjgOOZsMD4U_WrG0`,
				json:true
			},(error,response,body)=>{
			if (error) {
				callback('Unable to connect google server');
			} else if (body.status==='ZERO_RESULTS') {
				callback('Sorry we are unable to find the address');
			} else if (body.status==='INVALID_REQUEST') {
				callback('Fuck!where is the address');
			} else if (body.status==='OK') {
				callback(undefined,{
					address: body.results[0].formatted_address,
					latitude: body.results[0].geometry.location.lat,
					longitude: body.results[0].geometry.location.lng
				})
			}
	});
};
module.exports.geocodeAddress=geocodeAddress;
