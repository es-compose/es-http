const Middleware = require('../').Middleware;
const chai = require('chai');
const sinon = require('sinon');
let expect = chai.expect;

class M extends Middleware {
    async invoke(context, next) {
        console.log('M');
        await next();
    }
}


describe("Middleware", function() {
    let context = {};
    it("invoke() should call next", function() {
        let middleware = new Middleware();
        let spy = sinon.spy();
        middleware.invoke(context, spy);
        expect(spy.called).to.be.true;
    })

    it("should work handle()", () => {
        let connect = require('connect')();
        
        connect.use(function(req, res, next) {
            console.log('hello');
            next();
        })
        connect.use()
    })
    
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