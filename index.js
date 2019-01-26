var http = require('http')
var fs = require('fs')
var url = require('url')
var path = require('path')

function staticroot(staticpath, request, response){
  console.log(staticpath)
  console.log(request.url)
  var pathobj = url.parse(request.url, true)
  console.log(pathobj)
  if(pathobj.pathname === '/'){
    pathobj.pathname += 'test.html'
  }
  var filepath = path.join(staticpath, pathobj.pathname)
  fs.readFile(filepath, 'binary', function(err, data){
    if(err){
      response.writeHead(404, 'not found')
      console.log('404')
      response.end()
    }else{
      response.writeHead(200, 'ok')
      response.write(data,'binary')
      console.log('ok')
      response.end()
    }
  })
}

var server = http.createServer(function(request, response){
  staticroot(path.join(__dirname,'sample'), request, response)
})

server.listen(8080);
console.log('visit localhost:8080/test.html...')