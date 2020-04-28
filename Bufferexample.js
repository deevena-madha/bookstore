var b=new ArrayBuffer(300); //It can store 300 characters.
b.write("Nodejs is a light=weight platform.....");//save or writedata.
console.log( "Data in buffer :" +b.tostring());//red data from buffer..
//ASCII is 8 bits.Every chracter takes only 1 byte.
console.log("5-25 position :" + b.tostring('ascii',5,25));
 // UTF is 8 bits. every character occupies 16-bits in memory
console.log("5-25 position : " + b.tostring('utf',5,25));
console.log();
//var arr=new Array();
var str=new String('');

for (i=0;i<25;i++)
{
    //str += String.fromCharCode(b[i]);
}
Process.stdout.write('\n');
//console.log("str : " + str);

console.log("Hello How are you ?");
Proces.stdout.write("Hello How are you ?");
Process.stdout.write("Iam fine...");