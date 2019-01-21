var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');

var indexError;
var username;
var password;

var app = express();
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/logo.png'));

//making some global variables
var villainThrow = Math.floor(Math.random()*3)+1;

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
  response.render('index', {user:user_data, indexError:0});
});

app.get('/login', function(request, response){
  var user_data = [];
  user_data["name"]=request.query.name;
  user_data["password"]=request.query.password;
  username=request.query.name;
  password=request.query.password;
  var csv_data = loadCSV('data/players.csv');
  if(user_data["name"]=="" || user_data["password"]==""){
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('index', {user:user_data, indexError:1});
  }
  checkCSV(user_data,csv_data,request,response);
});

function checkCSV(user_data, csv_data, request, response){
  console.log("username input: "+user_data["name"]);
  console.log("password input: "+user_data["password"]);

  console.log("Name and password filled out");
  for (var i = 0; i < csv_data.length; i++) {
    if (csv_data[i].name == user_data["name"]) {
      if (csv_data[i].password == user_data["password"]) {//if name and password match
        console.log("Log in successful.")
        response.status(200);
        response.setHeader('Content-Type', 'text/html')
        response.render('game', {user:user_data});
        return true;
        break;
      }
      else{//wrong password
        console.log("Log in unsuccessful: wrong password.")
        // user_data["failure"] = true;
        response.status(200);
        response.setHeader('Content-Type', 'text/html')
        response.render('index', {indexError:2});
        return false;
        break;
      }
    }
  }
  console.log("New user: "+user_data.name);
  initUser(user_data);
  csv_data.push(user_data);
  writeCSV(csv_data, "data/players.csv");
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('game', {user:user_data});
  return false;
}
function loadCSV(csv){
  var players_file = fs.readFileSync(csv,'utf8'); //load the csv
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
    user["rock"]=players_stats[6];
    user["paper"]=players_stats[7];
    user["scissors"]=players_stats[8];
    // console.log(JSON.stringify(user));
    players_data.push(user);
  }
  return players_data
}
function writeCSV(csv_data, csv){
  var players_data_string = "name,password,games played,games won,games tied,games lost,rock,paper,scissors\n";
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
  fs.writeFile(csv,players_data_string,'utf8',function(){});
}
function initUser(user_data) {
  user_data["games played"]=0;
  user_data["games won"]=0;
  user_data["games tied"]=0;
  user_data["games lost"]=0;
  user_data["rock"]=0;
  user_data["paper"]=0;
  user_data["scissors"]=0;
  //rock, paper, scissors
}

app.get('/:user/results', function(request, response){
  var user_data={
      name: request.params.user,
      weapon: request.query.weapon
  };
  var players_csv = loadCSV("data/players.csv");

  if(parseInt(user_data.weapon)==0) {
    console.log("Nothing selected try again");
    return response.redirect('/playAgain');
  }
  else {//game logic
    user_data["result"] = rpsLogic(user_data.weapon);
    user_data["response"] = toText(villainThrow);
    console.log("Player throw: "+toText(user_data.weapon));
    console.log("Villain throw: "+toText(villainThrow));
    console.log("Player "+user_data["result"]);
  }

  for (var i = 0; i < players_csv.length; i++) {
    if (players_csv[i]["name"] == user_data.name){
      if(user_data["result"]=="win"){
        players_csv[i]["games won"]=parseInt(players_csv[i]["games won"])+1;
      }
      else if(user_data["result"]=="loss") {
        players_csv[i]["games lost"]=parseInt(players_csv[i]["games lost"])+1;
      }
      else {
        players_csv[i]["games tied"]=parseInt(players_csv[i]["games tied"])+1;
      }
      if(user_data.weapon==1){
        players_csv[i]["rock"]=parseInt(players_csv[i]["rock"])+1;
      }
      if(user_data.weapon==2){
        players_csv[i]["paper"]=parseInt(players_csv[i]["paper"])+1;
      }
      if(user_data.weapon==3){
        players_csv[i]["scissors"]=parseInt(players_csv[i]["scissors"])+1;
      }
      players_csv[i]["games played"]=parseInt(players_csv[i]["games played"])+1;
      // switch(user_data["result"]){
      //   case "won":
      //   players_csv[i]["wins"] +=1;
      //   break;
      //   case "lost":
      //   players_csv[i]["losses"] +=1;
      //   break;
      // }
    }
  }
  writeCSV(players_csv, "data/players.csv");
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.redirect('/playAgain');
  // response.send(JSON.stringify(user_data));
});
app.get('/playAgain', function(request, response){
    var user_data={};
    user_data["name"] = username;
    user_data["password"] = password;
    console.log(user_data["name"])
    if (user_data["name"] == undefined) {
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render('index',{user:user_data, indexError:0});
    }
    else{
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render('game',{user:user_data});
    }
});
app.get('/rules', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('rules');
});

app.get('/stats', function(request, response){
  var players_data = loadCSV('data/players.csv');
  var villains_data = loadCSV('data/villains.csv');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('stats', {players:players_data, villains: villains_data});
});
app.get('/about', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('about');
});

function rpsLogic(playerThrow) {
  villainThrow = Math.floor(Math.random()*3)+1;
  switch(parseInt(playerThrow)) {
    case villainThrow:
      return("tie");
    case beats(villainThrow):
      return("win");
    case losesTo(villainThrow):
      return("loss");
  }
}

//returns the player throw that will beat the input villain throw
function beats(weapon){
    switch(parseInt(weapon)){
        case 1: //rock is 1, paper is 2, scissors is 3
            return 2;
        case 2:
            return 3;
        case 3:
            return 1;
    }
}

//returns the player throw that will lose to the villain throw
function losesTo(weapon){
  switch(parseInt(weapon)){
      case 1: //rock is 1, paper is 2, scissors is 3
          return 3;
      case 2:
          return 1;
      case 3:
          return 2;
  }
}

function toText(throwChoice) {
  switch (parseInt(throwChoice)) {
    case 1: //rock is 1, paper is 2, scissors is 3
      return "rock";
    case 2:
      return "paper";
    case 3:
      return "scissors";
  }
}
