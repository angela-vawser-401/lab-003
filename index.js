const DocumentCollection = require('./lib/document-collection');
const Model = require('./lib/model');
const Database = require('./lib/database');

const documents = new DocumentCollection('./documents');

const objectA = { key1: 'valueA' };
const objectB = { key2: 'valueB' };
const personSchema = {
  firstName: {
    type: 'string',
    required: true,
  },
  lastName: {
    type: 'string',
    required: true,
  },
  married: {
    type: 'boolean',
    required: true,
  },
  kids: {
    type: 'number',
    required: true,
  },
};
const person = {
  firstName: 'Chris',
  lastName: 'Sample',
  married: true,
  kids: 3,
};

documents.save(objectA);
documents.save(objectB);

documents.get(objectA.id)
  .then((result) => {
    console.log(result);
  });
documents.get(objectB.id)
  .then((result) => {
    console.log(result);
  });

documents.getAll()
  .then((result) => {
    console.log(result);
  });

Database.connect('savedObjects');
const model = new Model ('person', personSchema);
model.create(person)
  .then(() => {
    console.log(model.findById(''));
    console.log(model.find());
  });