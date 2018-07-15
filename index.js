var http = require('http'),
    fs = require('fs'),
    opn = require('opn'),
    port = 8080;

function generateHtml(req) {
    var header = '';
    var body = '';
    var sections = [{
        title: 'SVG',
        dirPath: ''
    }];

    // concatenate header string
    header = '<title>Asset Doc</title><style> .img{  }</style>';

    // concatenate body string
    sections.forEach(function(section, i){
        var result = ['<div><h1>' + section.title + '</h1>', '' ,'</div>'];

        fs.readdirSync(section.dirPath, function(filename, i){
            filename.forEach(function(data, i){
                result[1] += '<span><img src="' + section.dirPath + '/' + data + '"/><span>' + data + '</span></span>';
            })
        });

        body+= result.join('');
    })
  
    return '<!DOCTYPE html>'
         + '<html><head>' + header + '</head><body>' + body + '</body></html>';
  };


http.createServer(function (req, res) {
    var html = buildHtml(req);
  
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': html.length,
      'Expires': new Date().toUTCString()
    });
    res.end(html);
}).listen(port);


// specify the app to open in 
opn('localhost:' + port, {app: 'chrome'});