var mysql=require('mysql');
var session=require('cookie-session');
var express=require('express');

//locating/searching for suspicious scripts embedded inside the page.
var xss = require('xss-clean'); 
//Searching for suspicious scripts embedded in downloaded documents.
var xssFilter=require('x-xss-protection'); 
var expapp=express();
var expdate = new Date(Date.now() + 3 * 60 *1000);
var sesscookie={name : 'cookie1', keys : ['3306', 'localhost'], 
cookie : { secure : true, httpOnly : true, domain : 'localhost.com', expires : expdate}};
var temp=100; //You might not be using this variable anywhere in the program. Wastage of RAM space
const temp1=200;

expapp.use (session(sesscookie));
//This will automatically filter-out all suspicious scripts.
//Generally, any scripts which are not having any header info, is considered as suspicious
expapp.use (xss());
expapp.use(xssFilter({reportUri : '/storeReport'})); //Depth / Deep checking of virus/malwares/spyware scripts.
const mysqlconn=mysql.createConnection
({host:'localhost', port : '3306', user:'root', password:'temp@001', database : 'mysql'});

function testconn(err){
    console.log(err);
    if(err)
        console.log('Unable to connect to the database...');
    else
        console.log('Connected sussessfully....');

        //console.log(temp1);
        console.log(200);
        //This is the matter of time efficiency. Unnecessary 8000 cycles.
        /*for(i=2;i<process.argv[2];)*/
        for(i=2;i<2000;)
        //For loop has to generate all even numbers from 2 to 2000.
        {
            console.log(i);
            i=i+2;
        }
}
var req;
var res;
mysqlconn.connect(testconn);
function printEmployees(err,  rows){ //Call back function
    res.cookie('name', sesscookie.name, {expires: sesscookie.expires, 
    httpOnly: sesscookie.httpOnly, secure : sesscookie.secure, domain: sesscookie.domain});
    res.send(rows);
}
function getAllEmployee(request, response) //Call back function
{
    req=request;
    res=response;
    mysqlconn.query
        ('select * from employee', printEmployees); //Static SQL
}
function getEmployee(request, response) //Call back function
{
    req=request;
    res=response;
    
    mysqlconn.query
    ('select * from employee where emp_id = ' + request.params.empid, 
    printEmployees); //Static SQL
    //console.log(temp1);
    console.log(200); //better to use literals. Literals occupy less space than variables.
}
function getFewEmployee(request, response) //Call back function
{
    req=request;
    res=response;
    qry='select * from employee where emp_id > ' + request.params.empid1 + ' and emp_id < ' + 
        request.params.empid2;

    mysqlconn.query(qry, printEmployees); //Static SQL
}
expapp.get('/', getAllEmployee);
expapp.get('/:empid', getEmployee);
expapp.get('/:empid1/:empid2', getFewEmployee);
expapp.listen(8081);
console.log('Server started @ port 8081');