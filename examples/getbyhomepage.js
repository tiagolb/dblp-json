const DBLP = require('../dblp.js');

function printJS(jsObject) {
  console.log(JSON.stringify(jsObject, null, 2));
}

const dblp = new DBLP();

async function extractInfo() {
  // const tiagoJson = await dblp.getByHomepage('homepages/188/5658');
  const tiagoJson = await dblp.getByHomepage('homepages/31/1396');
  printJS(tiagoJson.getJSON());
}

extractInfo();
