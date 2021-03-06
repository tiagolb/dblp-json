// XML to JSON mechanisms
const xml2js = require('xml2js');
const request = require('request');

// Local requests
const DBLPPerson = require('./dblp-person.js');

/**
 * DBLP class
 * It is responsible for requesting the XML file containing
 * the user data.
 *
 * It also parses the XML data to JSON and does some data cleaning
 * procedures to enhance the JSON object.
 */
class DBLP {
  /**
   * DBLP constructor
   * @return {object} The DBLP object
   */
  constructor() {
    this.nameBaseURL = 'https://dblp.org/pers/xx/';
    this.pidBaseURL = 'http://dblp.org/pid';
    this.options = {
      charkey: '_value',
      mergeAttrs: true,
      explicitArray: false,
    };
  }

  /**
   * Function that requests the user data by name
   * @param  {string} first First name of the dblp person according to dblp user page
   * @param  {string} last Last name of the dblp person according to dblp user page
   * @return {object} DBLPPerson object
   */
  getByName(first, last) {
    return new Promise((resolve, reject) => {
      // Create the xml file name to request from the function parameters
      // TODO: sanitize
      const xml = `${last.charAt(0).toLowerCase()}/${last}:${first}.xml`;

      // Build the request url
      const url = this.nameBaseURL + xml;

      // Get the data in the url
      DBLP.get(url, this.options).then((result) => {
        resolve(result);
      }, () => {
        reject(new Error(`[DBLP getByName] Bad request - check requested user name - ${url}`));
      });
    });
  }

  /**
   * Function that requests the user data by personal ID
   * @param  {string} pid Personal ID string
   * @return {object} DBLPPerson object
   */
  getByPID(pid) {
    return new Promise((resolve, reject) => {
      // Build the request url
      // TODO: sanitize
      const url = `${this.pidBaseURL}/${pid}.xml`;

      // Get the data in the url
      DBLP.get(url, this.options).then((result) => {
        resolve(result);
      }, () => {
        reject(new Error(`[DBLP getByPID] Bad request - check requested PID - ${url}`));
      });
    });
  }

  /**
   * Function that requests the user data by homepage (homepages/pid)
   * @param  {string} homepage Homepage string that includes the pid
   * @return {object} DBLPPerson object
   */
  getByHomepage(homepage) {
    return new Promise((resolve, reject) => {
      // Split the homepage string
      const splitHomepage = homepage.split('/');
      const pid = `${splitHomepage[1]}/${splitHomepage[2]}`;

      // Build the request url
      // TODO: sanitize
      const url = `${this.pidBaseURL}/${pid}.xml`;

      // Get the data in the url
      DBLP.get(url, this.options).then((result) => {
        resolve(result);
      }, () => {
        reject(new Error(`[DBLP getByHomepage] Bad request - check requested homepage - ${url}`));
      });
    });
  }

  /**
   * Function that requests the user data from the url
   * @param  {string} url The url that points to the XML file
   * @return {object} DBLPPerson object
   */
  static get(url, parseOptions) {
    return new Promise((resolve, reject) => {
      request(url, (requestError, response, body) => {
        // Check response status code
        if (response && response.statusCode === 200) {
          // Create parser instance
          const parser = new xml2js.Parser(parseOptions);

          // Parse XML
          parser.parseString(body, (parseError, xml) => {
            try {
              // console.log(JSON.stringify(xml, null, 2));
              // Create a DBLPPerson object from the raw json
              const dblpp = new DBLPPerson(xml);
              resolve(dblpp);
            } catch (e) {
              console.error(e);
              reject(e);
            }
          });
        } else {
          reject(new Error(`[DBLP get] Bad request - check requested URI - ${url}`));
        }
      });
    });
  }
}

module.exports = DBLP;
