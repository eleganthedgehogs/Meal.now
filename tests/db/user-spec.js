'use strict';

const mocha = require('mocha');
const expect = require('chai').expect;
const User = require('../../db/models/userModel.js');

const describe = mocha.describe;
const it = mocha.it;
const before = mocha.before;
// // const beforeEach = mocha.beforeEach;
const after = mocha.after;
// // const afterEach = mocha.afterEach;

describe('User Schema', () => {
  const username = 'gold';
  const password = 'hahaha';
  const shoppingList = [{
    food: 'apple',
    quantity: 1,
    measure: 'g',
    weight: 1234,
  }];

  before((done) => {
    User.remove({ username }).exec();
    done();
  });

  after((done) => {
    User.remove({ username }).exec();
    done();
  });

  describe('User creation: ', () => {
    it('Invalidates invalid users', (done) => {
      const newUser = new User({ username });
      newUser.validate((err) => {
        expect(err.errors.password).to.exist; // eslint-disable-line
        done();
      });
    });

    it('Validates valid users', (done) => {
      const newUser = new User({ username, password, shoppingList });
      newUser.validate((err) => {
        console.log(err);
        expect(err).to.not.exist; // eslint-disable-line
        done();
      });
    });
  });
});
