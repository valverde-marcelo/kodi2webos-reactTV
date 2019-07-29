var Server = require('ws').Server;
var port = process.env.PORT || 9090;
var ws = new Server({ port: port });

var constants = require('./constants');

console.log("Listen on port: " + port);

ws.on('connection', function (w) {

    w.on('message', function (msg) {
        
        console.log('message from client');
        

        msg = JSON.parse(msg);

        let response = "";

        console.log(msg.method);

        switch (msg.method) {
            
            case "VideoLibrary.GetMovies":
            response = constants.getMovies(msg.id);
            break;
    
            case "VideoLibrary.GetTVShows":
            response = constants.getTVshows(msg.id);
            break;

                
            default:
                break;
        }

        delay(2000);
        w.send(response);
        
        response = null;
    });

    w.on('close', function () {
        console.log('closing connection');
    });

});

function delay(ms) {
    var cur_d = new Date();
    var cur_ticks = cur_d.getTime();
    var ms_passed = 0;
    while(ms_passed < ms) {
        var d = new Date();  // Possible memory leak?
        var ticks = d.getTime();
        ms_passed = ticks - cur_ticks;
        // d = null;  // Prevent memory leak?
    }
}