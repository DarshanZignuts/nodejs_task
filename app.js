const http = require('http');
const fs = require('fs');

let server = http.createServer(function (req, res) {
    console.log('req from: ' + req.url);
    if(req.url === '/create' || req.url === '/read' || req.url === '/')
    {
        res.writeHead(200, {'content-type' : 'text/txt'});
            fs.open('demo.txt', 'w', (err)=> {
            if(err) throw err;
            console.log("It's Use For Create File Or Use If Already Created(Use For Open)");
        })
        fs.createReadStream(__dirname+ '/demo.txt').pipe(res);
    }
    else if(req.url === '/write')
    {
        let myWriteStream = fs.createWriteStream(__dirname + '/demo.txt');
        myWriteStream.write('Node.js is an open source server environment.');
        fs.createReadStream(__dirname+ '/demo.txt').pipe(res);
    }
    else if(req.url === '/update')
    {
        fs.appendFile('demo.txt', '=> Node.js allows you to run JavaScript on the server.', (err)=>{
            if (err) throw err;
            else console.log('code of updatation is worked Properly');
        })
        fs.createReadStream(__dirname+ '/demo.txt').pipe(res);
    }
    else if(req.url === '/rename')
    {
        fs.rename('demo.txt', 'final_demo.txt', (err)=>{
            if (err) throw err;
            else console.log('file name was changed...!');
        })
        res.end('file_renamed');
    }
    else if(req.url === '/delete')
    {
        fs.unlink('final_demo.txt', (err)=> {
            if (err) throw err;
            else console.log('file deleted');
        })
        res.end('File Deleted');
    }
    
});
server.listen(3000, '127.0.0.1');
console.log('its listen perfecly')