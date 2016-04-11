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
      if(typeof routes[req.method][req.url] == "function")
	return routes[req.method][req.url](req, res)
      for( var l in routes.GET ){
	if(new RegExp(l).test(req.url)){
	  var matches = req.url.match(l)
	  matches.shift()
	  var params = {}
	  var op = routes.GET[l].params
	  matches.forEach(function(match,i){
	    params[op[i]] = match
	  })
	  routes[req.method][l]({params: params}, res)
	}
      }
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
      var p = path.split("/")
      var params = []
      var rgxp = p.map(function(e){
	if(e[0] == ":"){
	  params.push(e.substr(1))
	  return "(.*)"
	}
	return e
      }).join("/")
      routes.GET[rgxp] = callback
      routes.GET[rgxp].params = params
    }
  }
  return app;
}