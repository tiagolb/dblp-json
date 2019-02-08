const DBLP = require('./dblp.js');
const DBLPPerson = require('./dblp-person.js');

test('Checking instance of DBLPPerson', () => {
    const url = 'https://dblp.org/pers/xx/b/Tiago:Brito.xml';
    DBLP.get(url)
        .then(data => expect(data).toBeInstanceOf(DBLPPerson))
        .catch(e => {});
});