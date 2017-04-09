const chai = require('chai');
const sinon = require('sinon');
let expect = chai.expect;


describe("Middleware", function() {
    const Middleware = require('../').Middleware;
    let middleware = new Middleware();
    let context = {};

    it("invoke() should call next", function() {
        let spy = sinon.spy();
        middleware.invoke(context, spy);
        expect(spy.called).to.be.true;
    })
    
    it("handler() should return a function", function() {
        let handler = middleware.handler(context);
        expect(handler).to.be.a('function');
    })
})

describe("Pipeline", function() {
    const Pipeline = require('../').Pipeline;
})

describe("HttpError", function() {
    const HttpError = require('../').HttpError;
    let error = new HttpError(404, "File Not Found");

    it("should be an instance of Error", function() {
        expect(error).to.be.instanceof(Error);
    })

    it("can read message + code", function() {
        expect(error.message).to.be.eq('File Not Found');
        expect(error.code).to.be.eq(404);
    })
})