const DBLP = require('./dblp.js');
const DBLPPerson = require('./dblp-person.js');

// Check instance of every get return in DBLP

describe('Checking DBLP function return instances', () => {
  test('Checking instance of DBLP.get return', async () => {
    const url = 'https://dblp.org/pers/xx/b/Brito:Tiago.xml';
    const data = await DBLP.get(url);
    return expect(data).toBeInstanceOf(DBLPPerson);
  });

  test('Checking instance of DBLP.getByName return', async () => {
    const dblp = new DBLP();
    const data = await dblp.getByName('Tiago', 'Brito');
    return expect(data).toBeInstanceOf(DBLPPerson);
  });

  test('Checking instance of DBLP.getByHomepage return', async () => {
    const dblp = new DBLP();
    const data = await dblp.getByHomepage('homepages/188/5658');
    return expect(data).toBeInstanceOf(DBLPPerson);
  });

  test('Checking instance of DBLP.getByPID return', async () => {
    const dblp = new DBLP();
    const data = await dblp.getByPID('188/5658');
    return expect(data).toBeInstanceOf(DBLPPerson);
  });
});

describe('Checking DBLP functions with invalid input', () => {
  test('Checking DBLP.get with invalid URI', async () => {
    const url = 'google.com';
    return expect(DBLP.get(url)).rejects.toThrow();
  });

  test('Checking DBLP.get with wrong URL', async () => {
    const url = 'https://dblp.org/pers/xx/b/Tiago:Brito.xml';
    return expect(DBLP.get(url)).rejects.toThrow();
  });

  test('Checking DBLP.getByName with non-existing user', async () => {
    const dblp = new DBLP();
    return expect(dblp.getByName('Google', 'Google')).rejects.toThrow();
  });

  test('Checking DBLP.getByHomepage with wrong homepage', async () => {
    const dblp = new DBLP();
    return expect(dblp.getByHomepage('google.com')).rejects.toThrow();
  });

  test('Checking DBLP.getByPID with wrong PID', async () => {
    const dblp = new DBLP();
    return expect(dblp.getByPID('google.com')).rejects.toThrow();
  });
});

// Check DBLPPerson functions

describe('Testing DBLPPerson constructor', () => {
  test('Checking for the dblpperson property', () => {
    return expect(() => {
      new DBLPPerson({});
    }).toThrow('[DBLPPerson constructor] Schema error');
  });

  test('Checking for the person property', () => {
    const testingObject = {
      dblpperson: {}
    };
    return expect(() => {
      new DBLPPerson(testingObject);
    }).toThrow('[DBLPPerson constructor] Schema error');
  });

  test('Checking for the r property', () => {
    const testingObject = {
      dblpperson: {
        person: {
          key: "key",
        },
        coauthors: {},
      }
    };
    return expect(() => {
      new DBLPPerson(testingObject);
    }).toThrow('[DBLPPerson constructor] Schema error');
  });

  test('Checking for the r property with empty array', () => {
    const testingObject = {
      dblpperson: {
        person: {
          key: "key",
        },
        r: [],
        coauthors: {},
      }
    };
    return expect(() => {
      new DBLPPerson(testingObject);
    }).toThrow('[DBLPPerson constructor] Schema error');
  });

  test('Checking for the r property with invalid array', () => {
    const testingObject = {
      dblpperson: {
        person: {
          key: "key",
        },
        r: [
          {},
        ],
        coauthors: {},
      }
    };
    return expect(() => {
      new DBLPPerson(testingObject);
    }).toThrow('[DBLPPerson constructor] Schema error');
  });

  test('Checking for the coauthors property', () => {
    const testingObject = {
      dblpperson: {
        person: {
          key: "key",
        },
        r: [
          {
            article: {}
          },
        ],
      }
    };
    return expect(() => {
      new DBLPPerson(testingObject);
    }).toThrow('[DBLPPerson constructor] Schema error');
  });

  test('Checking a valid input', () => {
    const testingObject = {
      dblpperson: {
        person: {
          key: "key",
        },
        r: [
          {
            article: {}
          },
        ],
        coauthors: {},
      }
    };
    const person = new DBLPPerson(testingObject); 
    return expect(person).toBeInstanceOf(DBLPPerson);
  });
});

describe('Testing getFirstElement in DBLPPerson', () => {
  test('Testing with a list', () => {
    const testingList = [0, 1, 2, 3, 4];
    const element = DBLPPerson.getFirstElement(testingList);
    return expect(element).toBe(testingList[0]);
  });

  test('Testing with an object', () => {
    const testingObject = {prop: 'value'};
    const element = DBLPPerson.getFirstElement(testingObject);
    return expect(element).toBe(testingObject);
  });

  test('Testing with a string', () => {
    const testingString = "hello";
    const element = DBLPPerson.getFirstElement(testingString); 
    return expect(element).toBe(testingString);
  });

  test('Testing with null', () => {
    return expect(DBLPPerson.getFirstElement(null)).toBe(null);
  });
});

describe('Testing getPerson in DBLPPerson', () => {
  test('Checking without name/author properties', () => {
    const testingObject = {
      dblpperson: {
        person: {
          key: "key",
        },
        r: [
          {
            article: {}
          },
        ],
        coauthors: {},
      }
    };

    const person = new DBLPPerson(testingObject);
    return expect(() => {
      person.getPerson();
    }).toThrow('[getPerson] Person object has no name/author property.');
  });

  test('Checking for the name property', () => {
    const testingObject = {
      dblpperson: {
        name: "Tiago",
        person: {
          key: "key",
        },
        r: [
          {
            article: {}
          },
        ],
        coauthors: {},
      }
    };

    const person = new DBLPPerson(testingObject);
    const author = person.getPerson();
    return expect(author.name).toBe('Tiago');
  });

  test('Checking for the author property', () => {
    const testingObject = {
      dblpperson: {
        person: {
          key: "key",
          author: 'Tiago'
        },
        r: [
          {
            article: {}
          },
        ],
        coauthors: {},
      }
    };

    const person = new DBLPPerson(testingObject);
    const author = person.getPerson();
    return expect(author.name).toBe('Tiago');
  });

  test('Checking with both the name and author properties', () => {
    const testingObject = {
      dblpperson: {
        name: 'Tiago',
        person: {
          key: "key",
          author: 'IgnoredName'
        },
        r: [
          {
            article: {}
          },
        ],
        coauthors: {},
      }
    };

    const person = new DBLPPerson(testingObject);
    const author = person.getPerson();
    return expect(author.name).toBe('Tiago');
  });


  test('Checking for the n property', () => {
    const publications = "5";
    const testingObject = {
      dblpperson: {
        n: publications,
        person: {
          key: "key",
          author: "Tiago",
        },
        r: [
          {
            article: {}
          },
        ],
        coauthors: {},
      }
    };

    const person = new DBLPPerson(testingObject);
    const author = person.getPerson();
    return expect(author['n-publications']).toBe(publications);
  });

  test('Checking without the n property', () => {
    const testingObject = {
      dblpperson: {
        person: {
          key: "key",
          author: "Tiago",
        },
        r: [
          {
            article: {}
          },
          {
            article: {}
          },
          {
            article: {}
          },
          {
            article: {}
          },
          {
            article: {}
          },
        ],
        coauthors: {},
      }
    };

    const person = new DBLPPerson(testingObject);
    const author = person.getPerson();
    return expect(author['n-publications']).toBe("5");
  });

});

describe('Testing getPublications in DBLPPerson', () => {
  test('Checking correct publication number in property n', () => {
    const testingObject = {
      dblpperson: {
        person: {
          key: "key",
          author: "Tiago",
        },
        r: [
          {
            article: {}
          },
          {
            article: {}
          },
          {
            article: {}
          },
          {
            article: {}
          },
          {
            article: {}
          },
        ],
        coauthors: {},
      }
    };

    const person = new DBLPPerson(testingObject);
    const publications = person.getPublications();
    return expect(publications['n']).toBe("5");
  });

  test('Checking correct publication number by length', () => {
    const testingObject = {
      dblpperson: {
        person: {
          key: "key",
          author: "Tiago",
        },
        r: [
          {
            article: {}
          },
          {
            article: {}
          },
          {
            article: {}
          },
          {
            article: {}
          },
          {
            article: {}
          },
        ],
        coauthors: {},
      }
    };

    const person = new DBLPPerson(testingObject);
    const publications = person.getPublications();
    return expect(publications['pubs'].length).toBe(5);
  });

  test('Checking correct function output', () => {
    const testingObject = {
      dblpperson: {
        person: {
          key: "key",
          author: "Tiago",
        },
        r: [
          {
            inproceedings: {
              key: "conf/srds/BritoD016",
              author: [
                "Tiago Brito",
                "Nuno O. Duarte",
                {
                  "$value": "Nuno Santos 0001",
                  "orcid": "0000-0001-9938-0653"
                }
              ],
              title: "ARM TrustZone for Secure Image Processing on the Cloud.",
              pages: "37-42",
              year: "2016",
              booktitle: "SRDS Workshop",
              url: "db/conf/srds/srds2016w.html#BritoD016"
            }
          },
          {
            inproceedings: {
              key: "conf/secrypt/BarradasBD0R17",
              author: [
                "Diogo Barradas",
                "Tiago Brito",
                "David Duarte",
                "Nuno Santos 0001",
                "Luís Rodrigues"
              ],
              title: "Forensic Analysis of Communication Records of Web-based Messaging Applications from Physical Memory.",
              pages: "43-54",
              year: "2017",
              booktitle: "SECRYPT",
              url: "db/conf/secrypt/secrypt2017.html#BarradasBD0R17"
            }
          },
        ],
        coauthors: {},
      }
    };

    const validPubs = {
      n: "2",
      pubs: [
        {
          type: "inproceedings",
          key: "conf/srds/BritoD016",
          author: [
            "Tiago Brito",
            "Nuno O. Duarte",
            {
              "$value": "Nuno Santos 0001",
              "orcid": "0000-0001-9938-0653"
            }
          ],
          title: "ARM TrustZone for Secure Image Processing on the Cloud.",
          pages: "37-42",
          year: "2016",
          booktitle: "SRDS Workshop",
          url: "db/conf/srds/srds2016w.html#BritoD016"
        },
        {
          type: "inproceedings",
          key: "conf/secrypt/BarradasBD0R17",
          author: [
            "Diogo Barradas",
            "Tiago Brito",
            "David Duarte",
            "Nuno Santos 0001",
            "Luís Rodrigues"
          ],
          title: "Forensic Analysis of Communication Records of Web-based Messaging Applications from Physical Memory.",
          pages: "43-54",
          year: "2017",
          booktitle: "SECRYPT",
          url: "db/conf/secrypt/secrypt2017.html#BarradasBD0R17"
        },
      ]
    }

    const person = new DBLPPerson(testingObject);
    const publications = person.getPublications();
    return expect(publications).toMatchObject(validPubs);
  });

  test('Checking without r object', () => {
    const testingObject = {
      dblpperson: {
        person: {
          key: "key",
          author: "Tiago",
        },
        r: [
          {
            article: {}
          },
        ],
        coauthors: {},
      }
    };

    const person = new DBLPPerson(testingObject);
    person.r = undefined;
    return expect(() => {
      person.getPublications();
    }).toThrow('[DBLPPerson getPublications] R object is not set.');
  });

});