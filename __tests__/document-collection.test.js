const DocumentCollection = require('../lib/document-collection');
const path = require('path');

jest.mock('../lib/files.js', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  readdir: jest.fn(),
}));

// for setting up mock expectations
const { readFile, writeFile, readdir } = require('../lib/files');

describe('Document Collection', () => {
  // TODO
  it('writes an object to a new file', () => {
    const sample = {
      key: 'happy',
      truth: false
    };

    const writePromise = Promise.resolve(sample);
    writeFile.mockReturnValueOnce(writePromise);

    const dir = 'documents';
    const documents = new DocumentCollection(dir);

    return documents.save(sample)
      .then(object => {
        expect(path.dirname(writeFile.mock.calls[0][0])).toBe(dir);
        expect(writeFile.mock.calls[0][1]).toBe(JSON.stringify(sample));
        expect(object._id).toEqual(expect.any(String));
    });
  });

  it('reads an object from a file', () => {
    const sample = {
      key: 'happy',
      truth: false,
      _id: 'finger'
    };

    const readPromise = Promise.resolve(JSON.stringify(sample));
    readFile.mockReturnValueOnce(readPromise);

    const dir = 'documents';
    const documents = new DocumentCollection(dir);

    const id = sample._id;

    return documents.get(id)
      .then(object => {
        expect(readFile.mock.calls[0][0]).toBe(`${dir}/${id}.json`);
        expect(object._id).toBe('finger');
      });
  });

  it('reads all objects from a directory', () => {
    const sample = {
      key: 'happy',
      truth: false,
      _id: 'finger'
    };

    const readDirPromise = Promise.resolve(['finger.json']);
    readdir.mockReturnValueOnce(readDirPromise);

    const readPromise = Promise.resolve(JSON.stringify(sample));
    readFile.mockReturnValueOnce(readPromise);

    const directory = 'documents';
    const documents = new DocumentCollection(directory);

    return documents.getAll()
      .then(array => {
        expect(readdir.mock.calls[0][0]).toBe(directory);
        expect(readFile.mock.calls[0][0]).toBe( `${directory}/${sample._id}.json`);
        expect(array[0]._id).toBe(sample._id);
      });
  });
});
