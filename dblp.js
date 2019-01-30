// XML to JSON mechanisms
const xml2js = require('xml2js');
const request = require('request');

// Local requests
const DBLPPerson = require('./dblp-person.js');

class DBLP {
  constructor() {
    this.nameBaseURL = 'https://dblp.org/pers/xx/';
    this.pidBaseURL = 'http://dblp.org/pid/';
  }

  getByName(first, last) {
    return new Promise((resolve, reject) => {
      // "r/Rodrigues:Rodrigo.xml"

      const xml = `${last.charAt(0).toLowerCase()}/${last}:${first}.xml`;
      const url = this.nameBaseURL + xml;

      DBLP.get(url).then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  getByPID(pid) {
    return new Promise((resolve, reject) => {
      const url = `${this.pidBaseURL}/${pid}.xml`;

      DBLP.get(url).then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  getByHomepage(homepage) {
    return new Promise((resolve, reject) => {
      const splitHomepage = homepage.split('/');
      const pid = `${splitHomepage[1]}/${splitHomepage[2]}`;
      const url = `${this.pidBaseURL}/${pid}.xml`;

      DBLP.get(url).then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  static get(url) {
    return new Promise((resolve, reject) => {
      // get dblp data
      request(url, (requestError, response, body) => {
        // check status code
        if (response.statusCode === 200) {
          const options = {
            charkey: '$value',
            // explicitCharkey: true,
            mergeAttrs: true,
            explicitArray: false,
          };

          const parser = new xml2js.Parser(options);

          // parse xml in body
          parser.parseString(body, (parseError, xml) => {
            const dblpp = new DBLPPerson(xml);
            resolve(dblpp);
          });
        } else {
          reject(requestError);
        }
      });
    });
  }
}

module.exports = DBLP;
