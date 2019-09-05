
// SMS Bot for trains
// Author: Srini Janarthanam

const express = require('express')
const bodyParser = require('body-parser')
const http = require('http');
const accountSid = 'AC68b8ee6abd130a02565d2ed0c285ba11';
const authToken = '79a4063f6c16a5d9f0d3cc67e1b4991f';
const client = require('twilio')(accountSid, authToken);

const MessagingResponse = require('twilio').twiml;


const app = express()



app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

app.use(express.static('public'))

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})

// Index route
app.get('/', function (req, res) {
    console.log('usman');
    client.messages.create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+12568184761',
     to: '+923360531514'
   })
  .then(message => console.log(message.sid));
})

//Twilio webhook
app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse.twiml();

  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});



