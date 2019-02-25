# dblp-json

[![Build Status](https://travis-ci.com/tiagolb/dblp-json.svg?token=xhsWaHogffxMqjsFW8Ap&branch=master)](https://travis-ci.com/tiagolb/dblp-json)

dblp-json is a nodejs package for parsing dblp user pages ([dblp.org](https://dblp.org/)) to JSON format.

## What is dblp?

dblp is a service that provides bibliographic information on major computer science journals and proceedings. dblp is maintained by [Schloss Dagstuhl](https://www.dagstuhl.de/) and has been originally founded at the [University of Trier](https://www.uni-trier.de/) in 1993 (dblp is also available at [dblp.uni-trier.de](https://dblp.uni-trier.de/)). For more information check out their [F.A.Q.](https://dblp.org/faq/)

## How to use dblp-json

dblp-json started from the necessity of accessing dblp data from within node applications.

It has an easy to use API that allows users to request dblp information for published computer science authors/researchers.

### Requesting data

There are three ways for requesting information from dblp using dblp-json:

* by name
* by PID
* by homepage

#### getByName

*getByName* requires the first and last name of the researcher according to dblp.

```js
const DBLP = require('dblp-json/dblp');

const dblp = new DBLP();

function extractInfo() async {
  const tiago-json = await dblp.getByName('Tiago', 'Brito');
  console.log(JSON.stringify(tiago-json, null, 2));
}

extractInfo();

```



