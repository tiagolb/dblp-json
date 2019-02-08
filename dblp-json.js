const DBLP = require('./dblp.js');

function printJS(jsObject) {
  console.log(JSON.stringify(jsObject, null, 2));
}

const dblp = new DBLP();
dblp.getByName('Tiago', 'Brito').then((dblpperson) => {
  try {
    printJS(dblpperson.getRawJSON());
  } catch (e) {
    console.error(e);
  }
}, (error) => {
  console.error(error);
});

/*const url = 'https://dblp.org/pers/xx/b/Tiago:Brito.xml';
DBLP.get(url).then((dblpperson) => {
  console.log('here');
  printJS(dblpperson.getJSON());
}, (error) => {
  console.error(error);
});*/