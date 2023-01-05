const axios = require('axios');
require('dotenv').config()
const NetworkCtrl = require('./NetworkCtrl');
const url = process.env.ORGANA_URL;
network = new NetworkCtrl()
console.log(network.getIPList()['wlp2s0'][0]);
healthCheck();

function healthCheck() {
    axios.get(url + '/health')
        .then(function (response) {
            // handle success
            console.log(response.data);
            login(process.env.ORGANA_USER, process.env.ORGANA_PASSWORD)
        }).catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}

function login(user, password) {
    axios.post(url + '/api/login', {
        email: process.env.ORGANA_USER,
        password: process.env.ORGANA_PASSWORD
    })
        .then(function (response) {
            console.log(response.data);
            let access_token = response.data.access_token;
            getEventTypes(access_token)
            getEventItems(access_token)
        })
        .catch(function (error) {
            console.log(error);
        });

}

function createEventType(access_token, eventType) {
    //create type
    axios.post(url + '/api/eventType',
        eventType, //{"title":"my machines","key":"machine"},
        { headers: { 'Authorization': 'Bearer ' + access_token } })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

}

function createEventItem(access_token, eventItem) {
    //create type
    axios.post(url + '/api/eventItem',
        eventItem, //{"title":"my machines","key":"machine"},
        { headers: { 'Authorization': 'Bearer ' + access_token } })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

}

function getEventTypes(access_token) {
    //get all types
    axios.get(url + '/api/eventType',
        
        { headers: { 'Authorization': 'Bearer ' + access_token } })
        .then(function (response) {
            console.log(response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        });


}

function getEventItems(access_token) {
    //get all items
    axios.get(url + '/api/eventItem',
       
        { headers: { 'Authorization': 'Bearer ' + access_token } })
        .then(function (response) {
            console.log(response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        });

}
