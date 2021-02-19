/*
    Will display incoming requests to our routes in the console
    and it will also display the access method.
*/

function incomingRequest(req,res,next){
    console.log(`Recieved request on path: '${req.path}'\nHTTP method: ${req.method}.`);
    next();
}

module.exports = {
    incomingRequest: incomingRequest,  
}