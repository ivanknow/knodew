const axios = require('axios');
require('dotenv').config()
const NetworkCtrl = require('./NetworkCtrl');
const url = process.env.ORGANA_URL;
network = new NetworkCtrl()
console.log(network.getIPList()['wlp2s0'][0]);

axios.get(url + '/health')
    .then(function (response) {
        // handle success
        console.log(response.data);

        axios.post(url + '/api/login', {
            email: process.env.ORGANA_USER,
            password: process.env.ORGANA_PASSWORD
        })
            .then(function (response) {
                console.log(response.data);
                let access_token = response.data.access_token;

                //get items
                axios.get(url + '/api/eventItem', 
                {headers: { 'Authorization': 'Bearer ' + access_token }})
                    .then(function (response) {
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                 //create type
                /* axios.post(url + '/api/eventType', 
                 {"title":"my machines","key":"machine"},
                 {headers: { 'Authorization': 'Bearer ' + access_token }})
                     .then(function (response) {
                         console.log(response.data);
                     })
                     .catch(function (error) {
                         console.log(error);
                     });*/

                //get types
                axios.get(url + '/api/eventType', 
                {headers: { 'Authorization': 'Bearer ' + access_token }})
                    .then(function (response) {
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });


            })
            .catch(function (error) {
                console.log(error);
            });

    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });

