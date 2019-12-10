const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const assert = require('assert');
const request = require('supertest');
import 'mocha';

// import * as dotenv from 'dotenv'
// dotenv.config();
require('dotenv').config()

import { App } from '../lib/app';

describe('App tests', () => {
  class AppTest extends App {
    public util;
    public server;
  }
  const app: AppTest = new AppTest();

  it('should send a request as a promise', () => {
    // this doesn't actuall work to test the api.
    // it's only to teset the code.
    return app.util.promisifyRequest({
      url: 'http://localhost:8080/api/get-endpoint',
    })
  })

  it('should send a request as a promise and fail', () => {
    // this doesn't actuall work to test the api.
    // it's only to teset the code.
    return app.util.promisifyRequest({
      url: 'http://localhost:8081/api/get-endpoint',
    })
    .catch(() => {
      // catching the failure and saying that it's ok to fail here.
      return Promise.resolve()
    })
  })

  it('should start the api, send a get req and send a post req', (done) => {
    app.start()
    .then(() => {
      // get request
      request(app.server).get('/api/get-endpoint')
      .end((err, res) => {
        expect(res.text).to.be.equal('ok!')
        if (err) return done(err);

        // post request
        request(app.server).post('/api/post-endpoint')
        .send({prop: 'value'})
        .end((err, res) => {
          expect(res.body.data.prop).to.be.equal('value')
          if (err) return done(err);

          // front end
          request(app.server).get('/')
          .end((err, res) => {
            expect(res.text).to.be.equal('j4ys0n.net works!\n')
            if (err) return done(err)
            done();
          })
        })
      });
    });
  });

});
