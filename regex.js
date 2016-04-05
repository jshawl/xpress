var listeners = {}

function get(path, cb){
  var p = path.split("/")
  var params = []
  var rgxp = p.map(function(e){
    if(e[0] == ":"){
      params.push(e.substr(1))
      return "(.*)"
    }
    return e
  }).join("/")
  listeners[rgxp] = cb
  listeners[rgxp].params = params
}


function got(path){
  if(typeof listeners[path] == "function")
    return listeners[path]()
  for( var l in listeners ){
    if(new RegExp(l).test(path)){
      var matches = path.match(l)
      matches.shift()
      var params = {}
      var op = listeners[l].params
      matches.forEach(function(match,i){
        params[op[i]] = match
      })
      listeners[l]({params: params})
    }
  }
}

get("/hello", function(req, res){
  console.log("got hello")
})

get("/users/:pizza/:jam/:dude", function(req, res){
  console.log(req.params)
})

got("/users/1/jesse/wowiw")