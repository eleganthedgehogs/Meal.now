'use strict';

const mocha = require('mocha');
const request = require('supertest');
const expect = require('chai').expect;
// const db = require('../../server/config/connection.js');
const server = require('../../server/server.js');
const Recipe = require('../../db/models/recipeModel.js');

const describe = mocha.describe;
const it = mocha.it;
const before = mocha.before;
// const beforeEach = mocha.beforeEach;
const after = mocha.after;
// const afterEach = mocha.afterEach;

// Need to unit test schemas

describe('Node Recipe Server', () => {
  const q = 'chicken';
  const label = 'bananananananna';
  const ingredients = [{
    food: 'apple',
    quantity: 1,
    measure: 'g',
    weight: 1234,
  }];
  const calories = 1234;

  before((done) => {
    Recipe.remove({ q }).exec();
    done();
  });

  after((done) => {
    Recipe.remove({ q }).exec();
    done();
  });

  describe('Recipe creation: ', () => {
    it('Only adds valid recipes db, return 404 for invalid recipes', (done) => {
      request(server)
        .post('/api/recipe')
        .send({ q })
        .expect(404)
        .expect(() => {
          Recipe.find({ q })
            .exec((err, recipes) => {
              if (err) { console.err(err); }
              expect(recipes.length).to.equal(0);
            });
        })
        .end(done);
    });

    it('Should insert valid posted recipes to the DB', (done) => {
      request(server)
        .post('/api/recipe')
        .send({ q, label, ingredients, calories })
        .expect(200)
        .expect(() => {
          Recipe.find({ q })
            .exec((err, recipes) => {
              if (err) { console.err(err); }
              expect(recipes.length).to.equal(1);
              expect(recipes[0].q).to.equal(q);
            });
        })
        .end(done);
    });

    it('Should return an instance of the new recipe', (done) => {
      const newRecipe = { q, label, ingredients, calories };
      request(server)
        .post('/api/recipe')
        .send(newRecipe)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include.keys('q', 'label', 'ingredients', 'calories');
        })
        .end(done);
    });
  });


  describe('Recipe querying: ', () => {
    describe('GET requests to /api/recipe/<query>: ', () => {
      let requestRecipes = [];

      before((done) => {
        Recipe.remove({ q }).exec();
        request(server)
          .get(`/api/recipe/${q}`)
          .expect(200)
          .expect((res) => {
            requestRecipes = res.body;
          })
          .end(done);
      });

      it('First GET request should perform API call', (done) => {
        done(); // need to add
      });

      it('First GET request should store recipes to db', (done) => {
        Recipe.find({ q })
          .exec((err, recipes) => {
            if (err) { console.err(err); }
            expect(recipes).to.have.length.above(0);
            done();
          });
      });

      it('GET request should return an array of recipes', (done) => {
        expect(requestRecipes).to.be.instanceof(Array);
        if (requestRecipes.length > 0) {
          expect(requestRecipes[0]).to.include.keys('q', 'label', 'ingredients', 'calories');
        }
        done();
      });

      it('Second GET request should return recipes from db', (done) => {
        Recipe.find({ q })
          .exec((err, recipes) => {
            if (err) { console.err(err); }
            request(server)
              .get(`/api/recipe/${q}`)
              .expect(200)
              .expect((res2) => {
                // expect(res2.body).to.deep.equal(recipes);
                expect(res2.body.length).to.deep.equal(recipes.length);
              })
              .end(done);
          });
      });
    });

    describe('GET requests to /api/recipe: ', () => {
      it('should return an array of recipes in db', (done) => {
        Recipe.find({})
          .exec((err, recipes) => {
            if (err) { console.err(err); }
            request(server)
              .get(`/api/recipe/${q}`)
              .expect(200)
              .expect((res) => {
                expect(res.body).to.be.instanceof(Array);
                if (res.body.length > 0) {
                  expect(res.body[0]).to.include.keys('q', 'label', 'ingredients', 'calories');
                }
                expect(res.body.length).to.deep.equal(recipes.length);
              })
              .end(done);
          });
      });
    });
  });
});
