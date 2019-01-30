const DBLPRequest = require('./dblp-request.js');

function printJS(jsObject) {
  console.log(JSON.stringify(jsObject, null, 2));
}


const dblp = new DBLPRequest();
dblp.getByName('Tiago', 'Brito').then((dblpperson) => {
  printJS(dblpperson.getJSON());
}, (error) => {
  printJS(error);
});