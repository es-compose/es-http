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
    let pipeline = new Pipeline();

    it("should throw error if middleware does not extend Middleware", () => {
        expect(() => { 
            pipeline.pipe(new NoMiddleware()) 
        }).to.throw("middleware must be instance of Middleware.");
    })

    it("should allow middleware to be piped", () => {
        expect(() => {
            pipeline.pipe(new Middleware1)
        }).not.to.throw;
    })


    it("pipeline chain working properly", async () => {
        let m1 = Middleware.fromClosure(async (c, n) => {
            return await n() + 1;
        })

        let m2 = Middleware.fromClosure(async (c, n) => {
            return await n(c) + 2;
        })

        let m3 = Middleware.fromClosure((c, n) => {
            return Promise.resolve(3);
        })
        pipeline.pipe(m1);
        pipeline.pipe(m2);
        pipeline.pipe(m3);
        expect(await pipeline.invoke()).to.be.eq(6);
    })

    it("error handler catching all errors", async () => {
        let pipe = new Pipeline();
        pipe.pipe(Middleware.fromClosure(async (c, n) => {
            try {
                await n();
            } catch(e) {
                console.log('catch error', e.message);
                return Promise.resolve(e.message);
            }
        }))

        pipe.pipe(Middleware.fromClosure((c, n) => {
            console.log('life is good.');
            return n();
        }))

        pipe.pipe(Middleware.fromClosure((c,n) => {
            console.log('error');
            throw new Error('error');
        }))


        expect(await pipe.invoke()).to.be.eq('error');
    })
})