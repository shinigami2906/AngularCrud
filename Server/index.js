let express = require('express');
let bodyParser = require('body-parser');
let   mongoose = require('mongoose');

require('./model/Sinhvien')

let app = express();
const cors = require('cors'); 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(require('./router/api'))


mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});


var server = app.listen(3000, function(){
    console.log('Listening on port ' + server.address().port);
  });

