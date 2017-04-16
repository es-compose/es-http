const chai = require('chai');
const sinon = require('sinon');
let expect = chai.expect;
var Middleware = require('../').Middleware;

class NoMiddleware {

}

class Middleware1 extends Middleware {
    
}

describe("Pipeline", function() {
    const Pipeline = require('../').Pipeline;
    let context = {
    }
    let pipeline = new Pipeline(context);

    it("should throw error if middleware does not extend Middleware", () => {
        expect(() => { pipeline.pipe(new NoMiddleware()) }).to.throw(TypeError, "middleware must be an instance of Middleware class.");
    })

    it("should allow middleware to be piped", () => {
        expect(() => {
            pipeline.pipe(new Middleware1)
        }).not.to.throw;
    })
})