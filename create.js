
var projectName;
var topic;
var quest;
var hypo;
var url;
var object = new Object();


function func1(a,b,c,d,e) {

    projectName = a;
    topic = b;
    ques = c;
    hypo = d;
    url = e;


};
var pg = require(‘pg’);

var connectionString = "postgres://userName:password@serverName/ip:port/nameOfDatabase";

var pgClient = new pg.Client(connectionString);

pgClient.connect();

var query = pgClient.query("select * from users");

query.on("row", function(row,result){
result.addRow(row);
}); 


query.on("end", function(result){
if(result.rows[0] === undefined){
return;
}
else{
var id = result.rows[0].id;
var query = "delete from CustomerAddress where customer_id = " + id ;
pgClient.query(query);
}
pgClient.end();
});
window.globalVar = projectName;
