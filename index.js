const http = require('http');
const PORT = process.env.PORT || 80;


http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write("SET UP SUCCESS!");
    res.end();
}).listen(PORT)