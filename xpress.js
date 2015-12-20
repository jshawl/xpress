var http = require("http");
module.exports = function(){
  var server = http.createServer(handler)
  var routes = {GET:{}}
  function handler(req, res){
    res.send = function( data ){
      res.end(data); 
    }
    res.json = function( data ){
      res.end(JSON.stringify(data))
    }
    try {
    routes[req.method][req.url](req, res);
    } catch (e) {
      res.send(e.stack)
    }
  }
  var app = {
    listen: function(port, callback){
      server.listen(port) 
      callback()
    },
    get: function( path, callback){
      routes.GET[path] = callback
    }
  }
  return app;
}