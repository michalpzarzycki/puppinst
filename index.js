const http = require('http');
const instagram = require('./instagram');
require('dotevn').congif();
const PORT = process.env.PORT || 80;
async function partyStarter() {
    await instagram.initialize();
    await instagram.login(process.env.LOGIN, process.env.PASSWORD);
    await instagram.page.waitFor(5000);
    
    let likes = 0;
    while (likes <= 12) {
        await instagram.likeTagsProcess(["l4l"], likes);
        likes += 3;
       
    };
};

partyStarter();


http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var data = fs.readFileSync('messages.txt', 'utf8');
    res.write(data);
    res.end();
}).listen(PORT)