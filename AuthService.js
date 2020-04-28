var s=require('http');
var fsref=require('fs');
var exp=require('express');
var expapp=exp();

var uname='sanjay';
var pwd='tmp001';
function Login(request, response)
{
    console.log("In Login...");
    fsref.readFile('Login.html', function (err, data)
    {
        //response.writeHead(200, {'Content-Type' : 'text/html'}); 
        if(err){
            console.error('Unable to open the file...');
        } else
        {
            var filedata=data.toString();
            response.send(filedata);
            
            
        }
    });

}

function Authenticate(request, response){
    console.log("In Authenticate...");
        body='';
        request.on('data', chunk => { body += chunk.toString()}); //chunk will be in json format.
        request.on('end', () => { 
        console.log('Data : ' + body); 
        var pairs = body.split('&');
        var u=pairs[0].split('=');
        var p=pairs[1].split('=');

        if((uname == u[1]) && (pwd== p[1]))
        {
            var resstr='<html><body><b>Welcome Mr./Ms.  ' + uname + '</B>';
            resstr+='<BR><B>Today = ' +  new Date() + '</b></body></html>';
            today=new Date();
            var logdata=uname + ' logged in on ' + today;
            fsref.appendFile('Login.log', logdata, function(err){
                if(err)
                    console.error("Unable to write logs");
                else
                    console.log("userinfo logged successfully...");
            }
            );
            }else
            {
                var resstr='<html><body><b>Invalid username/password</b><br>';
                resstr += '<b><a href=\'http://localhost:8081/Login\'>Login again</a></b>';
                resstr+='</body></html>';
            }
            response.send(resstr);
        
        //response.send('OK'); 
    });
}
expapp.rawListeners({"type" : "text/html"});
expapp.get('/', Login);

expapp.post('/Authenticate/', Authenticate);

var server=expapp.listen(8081);
console.log('Started server at 8081');