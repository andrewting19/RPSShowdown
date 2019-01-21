var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');


var app = express();
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/logo.png'));

var port = 3000;
app.listen(port, function(){
  console.log('Server started at '+ new Date()+', on port ' + port+'!');
});

app.get('/', function(request, response){
  var user_data={};
  username = "";
  password = "";
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index', {user:user_data});
});

// app.get('/', function(request, response){
//   response.status(200);
//   response.setHeader('Content-Type', 'text/html')
//   response.render('index')
//   // if(user_data==null){
//   //   user_data["name"]="";
//   //   user_data["password"]="";
//   // }
//   // // response.render('index', {user:user_data});
//   username = "";
//   password = "";
// });

app.get('/login', function(request, response){
  var user_data = [];
  user_data["name"]=request.query.name;
  user_data["password"]=request.query.password;
  username = request.query.name;
  password = request.query.password;
  var csv_data = loadCSV('data/players.csv');
  checkCSV(user_data,csv_data,request,response);
  // if (checkCSV(user_data,csv_data,request,response)==false){
  //       initUser(user_data);
  //       csv_data.push(user_data);
  //       writeCSV(csv_data, "data/players.csv");
  //       response.status(200);
  //       response.setHeader('Content-Type', 'text/html')
  //       response.render('game', {user:user_data});
  // }
});

app.get('/:user/results', function(request, response){
  var user_data={
      name: request.params.user,
      weapon: request.query.weapon
  };
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.send(JSON.stringify(user_data));
});

app.get('/rules', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('rules');
});

app.get('/stats', function(request, response){
  var players_data = loadCSV('data/players.csv');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('stats', {players:players_data});
});
app.get('/about', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('about');
});

function checkCSV(user_data, csv_data, request, response){
  for (var i = 0; i < csv_data.length; i++) {
    if (csv_data[i].name == user_data["name"]) {
      if (csv_data[i].password == user_data["password"]) {//if name and password match
        console.log("Log in successful.")
        response.status(200);
        response.setHeader('Content-Type', 'text/html')
        response.render('game', {user:user_data});
        return true;
        break;}
      else {//wrong password
        console.log("Log in unsuccessful: wrong password.")
        // user_data["failure"] = true;
        response.status(200);
        response.setHeader('Content-Type', 'text/html')
        response.render('index');
        return true;
        break;
      }
    }
  }
  console.log("New user: "+user_data.name)
  initUser(user_data);
  csv_data.push(user_data);
  writeCSV(csv_data, "data/players.csv");
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('game', {user:user_data});
  return false;
}
function loadCSV(csv){
  var players_file = fs.readFileSync(csv,'utf8')//load the csv
  //parse the csv
  var players_rows = players_file.split("\n");
  var players_data=[];
  for(var i=1; i<players_rows.length; i++){
    var players_stats=players_rows[i].split(",");
    // players_stats[players_stats.length]=players_stats[players_stats.length].substring(0,players_stats[players_stats.length].length-1);
    var user = {}
    user["name"]=players_stats[0];
    user["password"]=players_stats[1];
    user["games played"]=players_stats[2];
    user["games won"]=players_stats[3];
    user["games tied"]=players_stats[4];
    user["games lost"]=players_stats[5];
    // console.log(JSON.stringify(user));
    players_data.push(user);
  }
  return players_data
}
function writeCSV(csv_data, csv){
  var players_data_string = "name,password,games played,games won,games tied,games lost\n";
  for(var i=0; i<csv_data.length; i++){
    var csv_data_rows = Object.keys(csv_data[i]);
    for(var j=0; j<csv_data_rows.length; j++){
      if(j == csv_data_rows.length-1){
        players_data_string+=csv_data[i][csv_data_rows[j]];}
      else{
        players_data_string+=csv_data[i][csv_data_rows[j]]+",";
      }
    }
    if (i!=csv_data.length-1){
        players_data_string+="\n";
    }
  }
  // console.log(players_data_string);
  fs.writeFile(csv,players_data_string,'utf8',function(){});
}
function initUser(user_data) {
  user_data["games played"]=0;
  user_data["games won"]=0;
  user_data["games tied"]=0;
  user_data["games lost"]=0;
  //rock, paper, scissors
}
