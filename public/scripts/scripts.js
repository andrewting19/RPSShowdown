<<<<<<< HEAD
// var players = JSON.parse(localStorage.getItem("players"));
// if(players==null){
//   players= new Object();
//   players.username_list=[];
//   players.password_list=[];
// }
// document.getElementById("log_in_button").addEventListener("click", function(){
//   username_input=document.getElementById("enter_name_input").value;
//   password_input=document.getElementById("enter_password_input").value;
//   if(username_input==""||password_input==""){
//     //give feedback and don't go to next page
//   }
//   if(players.username_list.includes(username_input)){
//     if(players.password_list[players.username_list.indexOf(username_input)]==password_input){
//       //log in successful
//     }
//     else{
//       showOrNot(document.getElementById("feeback"),true);
//       //give feeback
//     }
//   }
//   else{
//     players.username_list.push(username_input);
//     players.password_list.push(password_input);
//     localStorage.setItem("players",players);
//   }
//   localStorage.setItem(JSON.stringify("players"));
// });
// // var player_name = localStorage.getItem("player_name");
// //
// // if(!player_name){
// //   showOrNot(document.getElementById("enter_name"), true);
// // }else {
// //   updateNames(player_name);
// //   showOrNot(document.getElementById("throw_choice"), true);
// // }
// //
// // ///////////////////Event Listions//////////////////
// // toggleVisibility(document.getElementById("show_rules_button"), document.getElementById("rules"));
// // toggleVisibility(document.getElementById("show_stats_button"), document.getElementById("stats"));
// //
// // document.getElementById("enter_name_button").addEventListener("click", function(){
// //   var p_name=document.getElementById("enter_name_input").value;
// //   localStorage.setItem("player_name",p_name);
// //   showOrNot(document.getElementById("enter_name"), false);
// //   showOrNot(document.getElementById("throw_choice"), true);
// //   updateNames(p_name);
// // });
// //
// // ///////////////////Helper function//////////////////
// // function updateNames(name){
// //   var name_spots=document.getElementsByClassName("player_name_span");
// //   for(var i=0; i<name_spots.length;i++){
// //     console.log(name_spots[i]);
// //     name_spots[i].innerHTML = name;
// //   }
// // }
// //
// function showOrNot(div_element, show){
//   if(show && div_element.classList.contains("hidden")){
//     div_element.classList.remove("hidden");
//     div_element.classList.add("visible");
//   }else if(!show && div_element.classList.contains("visible")){
//     div_element.classList.remove("visible");
//     div_element.classList.add("hidden");
//     }
// }
// //
// // function toggleVisibility(button_element, div_element){
// //   button_element.addEventListener("click", function(){
// //     if(div_element.classList.contains("hidden")){
// //       div_element.classList.remove("hidden");
// //       div_element.classList.add("visible");
// //     }else{
// //       div_element.classList.remove("visible");
// //       div_element.classList.add("hidden");
// //       }
// //   });
// // }
=======
var players = JSON.parse(localStorage.getItem("players"));
if(players==null){
  players= new Object();
  players.username_list=[];
  players.password_list=[];
}
document.getElementById("log_in_button").addEventListener("click", function(){
  username_input=document.getElementById("enter_name_input").value;
  password_input=document.getElementById("enter_password_input").value;
  if(players.username_list.includes(username_input)){
    if(players.password_list[players.username_list.indexOf(username_input)]==password_input){
      //log in successful
    }
    else{
      showOrNot(document.getElementById("feeback"),true);
      //give feeback
    }
  }
  else{
    //add to players
  }
  localStorage.setItem(JSON.stringify("players"));
});

function tempReadCSV() {
  //load users.csv
  var users_file=fs.readFileSync("data/users.csv",'utf8');
  console.log(users_file);

  //parse csv user_data
  var rows = users_file.split("\n"); //every player in a new row

  var user_data=[]; //array for user objects

  for(var i=1; i<rows.length-1; i++) { //split every row into an array of values
    var user_d=rows[i].split(',');
    var user = {} //convert the array into an object and push to array of user objects
    user["name"]=user_d[0];
    user["games"]=user_d[1];
    user["wins"]=user_d[2];
    user["losses"]=user_d[3];
    user["ties"]=user_d[4];

    user_data.push(user);
  }
  console.log("An array of user objects");
  console.log(user_data);
}

var player_name = localStorage.getItem("player_name");

if(!player_name){
  showOrNot(document.getElementById("enter_name"), true);
}else {
  updateNames(player_name);
  showOrNot(document.getElementById("throw_choice"), true);
}

///////////////////Event Listions//////////////////
toggleVisibility(document.getElementById("show_rules_button"), document.getElementById("rules"));
toggleVisibility(document.getElementById("show_stats_button"), document.getElementById("stats"));

document.getElementById("enter_name_button").addEventListener("click", function(){
  var p_name=document.getElementById("enter_name_input").value;
  localStorage.setItem("player_name",p_name);
  showOrNot(document.getElementById("enter_name"), false);
  showOrNot(document.getElementById("throw_choice"), true);
  updateNames(p_name);
});

///////////////////Helper function//////////////////
function updateNames(name){
  var name_spots=document.getElementsByClassName("player_name_span");
  for(var i=0; i<name_spots.length;i++){
    console.log(name_spots[i]);
    name_spots[i].innerHTML = name;
  }
}

function showOrNot(div_element, show){
  if(show && div_element.classList.contains("hidden")){
    div_element.classList.remove("hidden");
    div_element.classList.add("visible");
  }else if(!show && div_element.classList.contains("visible")){
    div_element.classList.remove("visible");
    div_element.classList.add("hidden");
    }
}

function toggleVisibility(button_element, div_element){
  button_element.addEventListener("click", function(){
    if(div_element.classList.contains("hidden")){
      div_element.classList.remove("hidden");
      div_element.classList.add("visible");
    }else{
      div_element.classList.remove("visible");
      div_element.classList.add("hidden");
      }
  });
}

function rpsLogic(rpsButton, game_results, villainID) {
  rpsButton.addEventListener("click",function() {
    var computer_throw = Math.floor(Math.random()*3)+1;
    var throw_choice = dropdown_options[dropdown_options.selectedIndex].value;

    if(computer_throw==1) {computer_throw_text="Rock";}
    else if(computer_throw==2) {computer_throw_text="Paper";}
    else if(computer_throw==3){computer_throw_text="Scissors";}

    winner_text = document.getElementById("winner");
    explanation_text = document.getElementById("explanation");
    var throw_text;



    console.log("Player throw: "+throw_choice);
    console.log("Computer throw: " +computer_throw);
    if(throw_choice==0) { //IF DID NOT SELECT A THROW
      feedback_message.innerHTML = "Choose your throw choice. Or else...";
      feedback.classList.add("negative");
      feedback.classList.remove("positive");
    } else {
      feedback_message.innerHTML = "Good choice!";
      feedback.classList.add("positive");
      feedback.classList.remove("negative");
      player["games"]++;

      if(throw_choice==3) { //IF PLAYER THROWS SCISSORS
        throw_text = "Scissors";
        if(computer_throw==1) {
          console.log("Computer win: scissors < rock");
          winner_text.innerHTML = "Not you ;c";
          explanation_text.innerHTML = "You chose "+throw_text+". B(r)owser chose "+computer_throw_text+". "+throw_text+" loses to "+computer_throw_text+".";
        } else if(throw_choice>computer_throw) {
          console.log("Player win: scissors > paper");
          winner_text.innerHTML = player_name;
          explanation_text.innerHTML = "You chose "+throw_text+". B(r)owser chose "+computer_throw_text+". "+throw_text+" wins against "+computer_throw_text+".";
        } else {
          console.log("Tie: scissors = scissors");
          winner_text.innerHTML = "Everyone! It's a tie! :D";
          explanation_text.innerHTML = "You both chose "+throw_text+" and as a result decide to be friends.";
        }
      } else if(throw_choice==2) { //IF PLAYER THROWS PAPER
        throw_text = "Paper";
        if(computer_throw>throw_choice) {
          console.log("Computer win: paper < scissors");
          winner_text.innerHTML = "Not you ;c";
          explanation_text.innerHTML = "You chose "+throw_text+". B(r)owser chose "+computer_throw_text+". "+throw_text+" loses to "+computer_throw_text+".";
        } else if(throw_choice>computer_throw) {
          console.log("Player win: paper > rock");
          winner_text.innerHTML = player_name;
          explanation_text.innerHTML = "You chose "+throw_text+". B(r)owser chose "+computer_throw_text+". "+throw_text+" wins against "+computer_throw_text+".";
        } else {
          console.log("Tie: paper = paper");
          winner_text.innerHTML = "Everyone! It's a tie! :D";
          explanation_text.innerHTML = "You both chose "+throw_text+", and as a result decide to be friends.";
        }
      } else { //IF PLAYER THROWS ROCK
        throw_text = "Rock";
        if(computer_throw==3) {
          console.log("Player win: rock > scissors");
          winner_text.innerHTML = player_name;
          explanation_text.innerHTML = "You chose "+throw_text+". B(r)owser chose "+computer_throw_text+". "+throw_text+" wins against "+computer_throw_text+".";
        } else if(throw_choice<computer_throw) {
          console.log("Computer win: rock < paper");
          winner_text.innerHTML = "Not you ;c";
          explanation_text.innerHTML = "You chose "+throw_text+". B(r)owser chose "+computer_throw_text+". "+throw_text+" loses to "+computer_throw_text+".";
        } else {
          console.log("Tie: rock = rock");
          winner_text.innerHTML = "Everyone! It's a tie! :D";
          explanation_text.innerHTML = "You both chose "+throw_text+", and as a result decide to be friends.";
        }
      }

      $("#player_img").attr("src", "images/player"+throw_text+".jpg");
      $("#computer_img").attr("src", "images/computer"+computer_throw_text+".jpg");
      console.log(player_throws);
      player_throws[throw_choice]++;
      console.log(player_throws);

      computer_throws[computer_throw]++;
      console.log(computer_throws);

      if(winner_text.innerHTML==player_name) {
        player["wins"]++;
        player["winrate"]=100*player["wins"]/(player["wins"]+player["losses"]);
      } else if (winner_text.innerHTML=="Not you ;c") {
        player["losses"]+=1;
        player["winrate"]=100*player["wins"]/(player["wins"]+player["losses"]);
      } else {
        player["ties"]+=1;
        if(player["winrate"]) {}
        else { player["winrate"]=0;}
      }

      calculateStats();

      if(game_results.classList.contains("hidden")) {
        game_results.classList.remove("hidden");
        game_results.classList.add("visible");
      }

    } //still inside ELSE statement

  }); //end of button pressed function
}
>>>>>>> d643d2a89de153f58ccb2be0668cafbe2876739c
