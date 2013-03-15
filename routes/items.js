exports.get = function(req, res) {

    url = 'http://socrat:3141'+req.url.replace('/items', '/docs')
    //url = 'http://sa8463:3141'+req.url.replace('/items', '/docs')

    /* extjs support */

    url = url
            .replace('start=', 'skip=').replace('iDisplayStart=', 'skip=')
            .replace('limit=', 'take=').replace('iDisplayLength=', 'take=')

    if (url.indexOf('page=') == -1) url = url + '&page=0'

    console.log(url)
    res.setHeader( 'Content-Type', 'text/html' )
    spawn = require('child_process').spawn
    proc = spawn('curl', ['--user', 'utah\\administrator:utah', url])
    //proc = spawn('curl', ['--user', 'atchild\\administrator:1', url])

    results = ''
    proc.stdout.on( 'data', function(chunk){
        //console.log('stdout: ' + chunk)
        res.write(chunk)
        //results += chunk
    })
    proc.stderr.on( 'data', function(err){
        //console.log('stderr: ' + err)
    })
    proc.on( 'close', function(){
        //console.log('close')
        //res.end(results)
        res.end()
    })
};
