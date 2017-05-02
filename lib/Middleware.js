/**
 * Middleware class
 * 
 * Provides simple interface for middleware
 */
class Middleware 
{
    constructor() {}

    /**
     * Middleware invoke method
     * 
     * Override this method to provide middleware functionality
     * If not overriden, it will just call the next middleware in the stack
     * @param {Object} context 
     * @param {function} next 
     */
    async invoke(context, next = null) {
        if(next) {
            await next(context);
        }
    }

    handler(context) {
        return async (req, res, next) => {
            context.request = req;
            context.response = res;
            context.next = next;
            
            await this.invoke(context, next);
        }
    }
    
    /**
     * Create a new middleware from closure
     * @param {function} closure 
     */
    static fromClosure(closure) {
        let instance = new Middleware();
        instance.invoke = closure;

        return instance;
    }
}

module.exports = Middleware;