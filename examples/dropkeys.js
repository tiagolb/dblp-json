const DBLP = require('../dblp.js');

function printJS(jsObject) {
  console.log(JSON.stringify(jsObject, null, 2));
}

const dblp = new DBLP();

dblp.setCharkey('_value');
dblp.setDropKeys('inproceedings', ['ee', 'crossref']);
dblp.setKeyTranslation('inproceedings', {
  booktitle: 'event',
  type: 'template',
});

async function extractInfo() {
  const tiagoJson = await dblp.getByName('Tiago', 'Brito');
  printJS(tiagoJson.getPublications());
}

extractInfo();
