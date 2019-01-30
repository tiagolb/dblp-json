const DBLP = require('./dblp.js');

function printJS(jsObject) {
  console.log(JSON.stringify(jsObject, null, 2));
}


const dblp = new DBLP();
dblp.getByName('Tiago', 'Brito').then((dblpperson) => {
  printJS(dblpperson.getJSON());
}, (error) => {
  printJS(error);
});

/*dblp.getByHomepage('homepages/07/967-1').then((dblpperson) => {
  printJS(dblpperson.getJSON());
}, (error) => {
  printJS(error);
});*/