var xpress = require("./xpress");
var app = xpress();

app.get("/", function(req, res){
  res.send("pizza jam")
})

app.get("/json", function(req, res){
  res.json({one:"two"})
})

app.get("/users/:name", function(req, res){
  res.send(req.params.name);
})

app.listen(3000, function(){
  console.log("listenening on http://localhost:3000")
})
