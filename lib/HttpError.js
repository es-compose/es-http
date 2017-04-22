
/**
 * Http Error type hint class
 * 
 * Can be used to know how to response in case of error (404, 500, etc)
 */
class HttpError extends Error
{
    constructor(code, message) {
        super(message);
        this.code = code;
    }

    get status() {
        return this.code;
    }

    set status(code) {
        this.code = code;
    }
}

module.exports = HttpError;