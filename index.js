const DocumentCollection = require('./lib/document-collection');

const documents = new DocumentCollection('./documents');

// write some code to exercise your document collection

const sample = {
  key = 'happy',
  truth = false
};

documents.save(sample);