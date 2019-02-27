const DBLP = require('../dblp.js');

function printJS(jsObject) {
  console.log(JSON.stringify(jsObject, null, 2));
}

const dblp = new DBLP();

dblp.setCharkey('_value');

async function extractInfo() {
  const tiagoJson = await dblp.getByName('Tiago', 'Brito');
  printJS(tiagoJson.getRawJSON());
}

extractInfo();
