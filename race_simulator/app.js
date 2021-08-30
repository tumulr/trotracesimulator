const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const env = require('./config/dev.json');

const Simulator = require('./app/classes/simulator');

const UserController = require('./app/controllers/user');
const WorkerController = require('./app/controllers/worker');

let userCtrl = new UserController(env);
let workerCtrl = new WorkerController();

const conn = mongoose.connect(`${env.db.url}`, (err) => {
  if (err) {
    console.log('Connection error. Mongo Service may be down.');
    process.exit(1);
  }
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  let pathname = req.url.split('?')[0];
  if (pathname !== '/auth') {
    if (req.get('Authorization') === undefined) {
      res.status(400).json({message: 'INVALID_USER'});

      next('INVALID_USER');
    } else {
      let token = req.get('Authorization').split(' ')[1];

      let jwtPayload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

      let expiryTime = jwtPayload.exp;
      let jwtTime = new Date(parseInt(expiryTime) * 1000);

      if (new Date().getTime() > jwtTime.getTime()) {
        res.status(400).json({message: 'TOKEN_EXPIRED'});
        next('TOKEN_EXPIRED');
      }
    }
  }

  next();
});

app.post('/fill', (req, res) => workerCtrl.fillData(req, res));
app.post('/auth', (req, res) => userCtrl.login(req, res));
app.get('/fetch', (req, res) => workerCtrl.fetchActiveRaces(req, res));

function initApp() {
  let simulator = new Simulator();

  return simulator.runEvery1min()
    .catch(err => console.log(err));
}
// Uncomment it after successfully calling /fill method
// initApp();

app.listen(env.port, () => {
  console.log(`The simulator has started at port ${env.port}`);
});
