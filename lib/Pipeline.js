var Middleware = require('./Middleware');

/**
 * Support for middleware/handler function
 */
class Pipeline extends Middleware {
    /**
     * Creates a new pipeline using given context
     * @param {Object} context 
     */
    constructor() {
        super();
        this.queue = [];
    }

    /**
     * run the middleware pipeline
     * @param {Object} context 
     * @param {function} next 
     */
    async invoke(context, next) {
        let stack = this.queue;
        function next() {
            let middleware = stack.shift();
            if (!middleware) { // empty/no more middleware
                return Promise.resolve();
            }

            return middleware.invoke(context, () => next());
        }

        return next();
    }

    /**
     * Add a middleware to the pipeline
     * @param {Middleware} middleware 
     */
    pipe(middleware) {
        if(!(middleware instanceof Middleware)) {
            throw new TypeError("middleware must be instance of Middleware.");
        }
        this.queue.push(middleware);
    }
}

module.exports = Pipeline;