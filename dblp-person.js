const util = require('util');

class DBLPPerson {
  constructor(xml) {
    this.xml = xml;

    const xmlHasDblpPerson = Object.prototype.hasOwnProperty.call(xml, 'dblpperson');
    if (xmlHasDblpPerson) {
      this.dblpperson = xml.dblpperson;

      const dblppersonHasPerson = Object.prototype.hasOwnProperty.call(this.dblpperson, 'person');
      if (dblppersonHasPerson) {
        this.person = DBLPPerson.getFirstElement(this.dblpperson.person);
      }

      const dblppersonHasR = Object.prototype.hasOwnProperty.call(this.dblpperson, 'r');
      if (dblppersonHasR) {
        this.r = this.dblpperson.r;
      }

      const dblppersonHasCoauthors = Object.prototype.hasOwnProperty.call(this.dblpperson, 'coauthors');
      if (dblppersonHasCoauthors) {
        this.coauthors = this.dblpperson.coauthors;
      }
    }
  }

  /**
   * Function to get one element from a specific object
   * @param  {array || object} element
   * @return {object}
   */
  static getFirstElement(element) {
    // check if element is array
    return util.isArray(element) ? element[0] : element;
  }

  /**
   * name
   * key
   * @return {[type]} [description]
   */
  getPerson() {
    // return person
    const person = {};
    let nameSet = false;

    const dblppersonHasName = Object.prototype.hasOwnProperty.call(this.dblpperson, 'name');
    if (dblppersonHasName) {
      person.name = this.dblpperson.name;
      nameSet = true;
    }

    const dblppersonHasN = Object.prototype.hasOwnProperty.call(this.dblpperson, 'n');
    if (dblppersonHasN) {
      person['n-publications'] = this.dblpperson.n;
    } else {
      person['n-publications'] = this.dblpperson.r.length.toString();
    }

    if (this.person) {
      Object.keys(this.person).forEach((key, prop) => {
        if (prop === 'author') {
          if (!nameSet) {
            person.name = this.person.author;
            nameSet = true;
          }
        } else {
          person[prop] = this.person[prop];
        }
      });
    } else {
      console.log('[getPerson] person not set');
    }

    return person;
  }

  getPublications() {
    const publications = {};

    if (this.r) {
      const pubs = [];

      Object.keys(this.r).forEach((rKey, i) => {
        const pub = this.r[i];
        const publication = {};

        Object.keys(pub).forEach((pubKey) => {
          publication.type = pubKey;
          const paper = pub[pubKey];

          Object.keys(paper).forEach((paperKey) => {
            publication[paperKey] = paper[paperKey];
          });
        });

        pubs.push(publication);
      });

      publications.n = pubs.length.toString();
      publications.pubs = pubs;
    } else {
      console.log('[getPublications] r not set');
    }

    return publications;
  }


  getCoauthors() {
    const coauthors = {};

    if (this.coauthors) {
      const coauthorList = [];

      const coauthorsHasCo = Object.prototype.hasOwnProperty.call(this.coauthors, 'co');
      if (coauthorsHasCo) {
        const { co } = this.coauthors;

        Object.keys(co).forEach((key, i) => {
          const coiHasNa = Object.prototype.hasOwnProperty.call(co[i], 'na');
          if (coiHasNa) {
            const na = DBLPPerson.getFirstElement(co[i].na);
            coauthorList.push(na);
          }
        });
      }

      const coauthorsHasN = Object.prototype.hasOwnProperty.call(this.coauthors, 'n');
      if (coauthorsHasN) {
        coauthors.n = this.coauthors.n;
      } else {
        coauthors.n = coauthorList.length.toString();
      }

      if (coauthorList.length > 0) {
        coauthors.co = coauthorList;
      }
    }

    return coauthors;
  }

  getJSON() {
    const returnObj = {};

    returnObj.person = this.getPerson();
    returnObj.publications = this.getPublications();
    returnObj.coauthors = this.getCoauthors();

    return returnObj;
  }

  getRawJSON() {
    return this.xml;
  }
}

module.exports = DBLPPerson;