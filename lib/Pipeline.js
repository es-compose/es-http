var connect = require('connect');
var Middleware = require('./Middleware');

/**
 * Support for middleware/handler function
 */
class Pipeline extends Middleware
{
    /**
     * Creates a new pipeline using given context
     * @param {Object} context 
     */
    constructor() {
        super();
        this.connect = connect();
    }

    /**
     * @param {Object} context 
     * @param {*} next 
     */
    invoke(context, next) {
        try {
            this.connect.handle(context.request, context.response, next);
        } catch(err) {
            next(err);
        }
    }

    /**
     * add a middleware to the stack
     * @param {*} args 
     */
    pipe(...args) {
        let path, middleware;
        if(args.length == 2) [path, middleware] = args;
        else if(args.length == 1) [middleware] = args;
        else {
            throw new Error("Invalid # or Args passed");
        }

        // now check if handler is instance of middleware
        if(!(middleware instanceof Middleware)) {
            throw new TypeError("middleware must be an instance of Middleware class.");
        }

        let handler = middleware.handler(this.context);
        let params = [];
        if(path) params.push(path);
        params.push(handler);

        this.connect.use(...params);
    }
}

module.exports = Pipeline;