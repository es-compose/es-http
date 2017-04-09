var http = require('http');
const Pipeline = require('../lib/Pipeline');
const Middleware = require('../lib/Middleware');

const PORT = 3000;

class HelloMiddleware extends Middleware
{
    invoke(context, next) {
        context.msg += 'Hello'
        super.invoke(context, next);
    }
}

// 1. create the application context
let context = {
    msg: 'World '
}

// 2. create pipeline
let pipeline = new Pipeline(context);

// 3. add middleware to the pipeline
pipeline.pipe(new HelloMiddleware()); // will set msg
pipeline.pipe('/', Middleware.fromClosure((context, next) => { //will use msg
    console.log('inside');
    context.response.end(context.msg);
}))

// 4. execute the middleware, or attache to another listener
var server = http.createServer(pipeline.handler(context));
server.listen(PORT, err => console.log('serving'));