exports.get = function(req, res) {

    url = 'http://dallas:3141'+req.url.replace('/items', '/docs')

    /* extjs support */

    url = url
            .replace('start=', 'skip=')
            .replace('limit=', 'take=')

    console.log(url)
    res.setHeader( 'Content-Type', 'text/html' )
    spawn = require('child_process').spawn
    proc = spawn('curl', ['--user', 'utah\\administrator:utah', url])
    proc.stdout.on( 'data', function(chunk){
        //console.log('stdout: ' + chunk)
        res.write(chunk)
    })
    proc.stderr.on( 'data', function(err){
        //console.log('stderr: ' + err)
    })
    proc.on( 'close', function(){
        console.log('close')
        res.end()
    })
};
