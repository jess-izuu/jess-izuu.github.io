'use strict';

const yelp = require('yelp-fusion');

const clientId = 'Rq23kRL_5RQVu_MQxfqhXA';
const clientSecret = '81F1is2ogGCckToVHP2Lp83mrbHXYOKJKbffnw8kzbPqbruGTM2vh8Qv78jX5h31';

const searchRequest = {
  term:'food',
  location: 'san francisco, ca'
};


yelp.accessToken(clientId, clientSecret).then(response => {
  const client = yelp.client(response.jsonBody.access_token);

  client.search(searchRequest).then(response => {
    //result is an object
    const result = response.jsonBody.businesses;
    
    let name = [];
    let location = [];
    let price = [];
    let rating = [];
    let phone = [];
    let url = [];


    for (var i in result){
    	name.push(result[i].name)
    	location.push(result[i].location.address1)
    	price.push(result[i].price)
    	rating.push(result[i].rating)
    	phone.push(result[i].phone)
    	url.push(result[i].url)
    }
        console.log(name);
        console.log(location);
        console.log(price);
        console.log(rating);
        console.log(phone);
        console.log(url);        
  });
})
//error response
.catch(e => {
  console.log(e);
});
