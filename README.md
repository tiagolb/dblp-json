# dblp-json

[![Build Status](https://travis-ci.com/tiagolb/dblp-json.svg?token=xhsWaHogffxMqjsFW8Ap&branch=master)](https://travis-ci.com/tiagolb/dblp-json)

dblp-json is a nodejs package for parsing dblp user pages ([dblp.org](https://dblp.org/)) to JSON format.

## What is dblp?

dblp is a service that provides bibliographic information on major computer science journals and proceedings. dblp is maintained by [Schloss Dagstuhl](https://www.dagstuhl.de/) and has been originally founded at the [University of Trier](https://www.uni-trier.de/) in 1993 (dblp is also available at [dblp.uni-trier.de](https://dblp.uni-trier.de/)). For more information check out their [F.A.Q.](https://dblp.org/faq/)

## How to use dblp-json

dblp-json started from the necessity of accessing dblp data from within node applications.

It has an easy to use API that allows users to request dblp information for published computer science authors/researchers.

### Requiring the package

To use dblp-json just require the package like so:

```js 
const DBLP = require('dblp-json/dblp');

const dblp = new DBLP();

// some dblp-json functions called
```

### Using custom parsing options

There is an option for allowing you to set a custom charkey.
After creating a new DBLP instance set the charkey value for the parser parser.

Check the example bellow (which actually corresponds to the default options set in dblp-json):

```js
const DBLP = require('dblp-json/dblp');

const dblp = new DBLP();

dblp.setCharkey('_value');

// some dblp-json functions called
```

Then you can use the package as explained next.

### Requesting data

There are three ways for requesting information from dblp using dblp-json:

* getByName
* getByPID
* getByHomepage

#### getByName

*getByName* requires the first and last name of the researcher according to dblp.

```js
const DBLP = require('dblp-json/dblp');

const dblp = new DBLP();

async function extractInfo() {
  const tiago_json = await dblp.getByName('Tiago', 'Brito');
}

extractInfo();

```

Note: Some researchers may have their surname appended by some numbers to uniquely identify researchers with the same name. For example, if there were two researchers named *Tiago Brito*, then you could have *Tiago Brito_0001* and *Tiago Brito_0002*.

#### getByPID

*getByPID* requires the PID of the researcher according to dblp (e.g. '188/5658').

```js
const DBLP = require('dblp-json/dblp');

const dblp = new DBLP();

async function extractInfo() {
  const tiago_json = await dblp.getByPID('188/5658');
}

extractInfo();

```

#### getByHomepage

*getByHomepage* requires the key of the researcher according to dblp (e.g. 'homepages/188/5658').

```js
const DBLP = require('dblp-json/dblp');

const dblp = new DBLP();

async function extractInfo() {
  const tiago_json = await dblp.getByHomepage('homepages/188/5658');
}

extractInfo();

```

### Parsing information

After requesting the information using the functions above, there are several functions that parse the dblp data:

* getRawJSON
* getJSON
* getPerson
* getPublications
* getCoauthors

#### Parsing options applied

dblp-json leverages `xml2js` to parse XML data from dblp to JSON format. The parsing options used are as follows:

```js
const options = {
  charkey: '$value',
  mergeAttrs: true,
  explicitArray: false,
};
```

#### getRawJSON

*getRawJSON* returns a JSON object after parsing dblp with `xml2js` parser (without modification/standardization).

```js
const DBLP = require('dblp-json/dblp');

const dblp = new DBLP();

async function extractInfo() {
  const tiago_json = await dblp.getByName('Tiago', 'Brito');
  console.log(JSON.stringify(tiago_json.getRawJSON(), null, 2));
}

extractInfo();

```

#### getJSON

*getJSON* returns a JSON object after modification.

```js
const DBLP = require('dblp-json/dblp');

const dblp = new DBLP();

async function extractInfo() {
  const tiago_json = await dblp.getByName('Tiago', 'Brito');
  console.log(JSON.stringify(tiago_json.getJSON(), null, 2));
}

extractInfo();

```

#### getPerson

*getPerson* returns a JSON object with personal information about the researcher.

```js
const DBLP = require('dblp-json/dblp');

const dblp = new DBLP();

async function extractInfo() {
  const tiago_json = await dblp.getByName('Tiago', 'Brito');
  console.log(JSON.stringify(tiago_json.getPerson(), null, 2));
}

extractInfo();

```

#### getPublications

*getPublications* returns a JSON object with a list of publications by the researcher.

```js
const DBLP = require('dblp-json/dblp');

const dblp = new DBLP();

async function extractInfo() {
  const tiago_json = await dblp.getByName('Tiago', 'Brito');
  console.log(JSON.stringify(tiago_json.getPublications(), null, 2));
}

extractInfo();

```

#### getCoauthors

*getCoauthors* returns a JSON object with all co-authors of all publications by the researcher.

```js
const DBLP = require('dblp-json/dblp');

const dblp = new DBLP();

async function extractInfo() {
  const tiago_json = await dblp.getByName('Tiago', 'Brito');
  console.log(JSON.stringify(tiago_json.getCoauthors(), null, 2));
}

extractInfo();

```

### Code examples

Within the `examples/` folder there are several examples corresponding to the API calls showed here.
