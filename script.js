function rand(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randChar() {
  return String.fromCharCode(rand(65, 90));
}

function getId() {
  var id = "";

  var nums = "";
  var chars = "";

  for(var i = 0; i < 3; i++ ) {
    nums += rand(0, 9);
    chars += randChar();
  }

  id = chars + nums;

  return id;
}

function getPlayer() {

  var per1 = rand(0, 100);
  var per2 = 100 - per1;

  var player = {
    id: getId(),
    points: rand(0, 100),
    bounce: rand(100, 200),
    mistake: rand(1, 30),
    twoP: per1,
    threeP: per2
  }

  return player;
}

function isPresent(player, players) {

  for (var i = 0; i < players.length; i++) {

    if(players[i].id == player.id){

      return true;
    }
  }

  return false;
}

function getPlayers() {
  var players = [];
  var newPlayer;

  while (players.length < 1000) {

    newPlayer = getPlayer();

    if(!isPresent(newPlayer, players)) {

      players.push(newPlayer);
    }
  }

  return players;
}

function addPlayersToList(players) {

  for (var i = 0; i < players.length; i++) {

    var li = document.createElement("li");

    li.innerHTML = players[i].id;

    $("#players").append(li);
  }
}

function getPlayerById(selectedPlayerId, players) {

  for (var i = 0; i < players.length; i++) {

    if (players[i].id == selectedPlayerId) {

      return players[i];
    }
  }
}

function updateData(players, selID) {

  var player = getPlayerById(selID, players);

  $("#id.content").text(player.id);
  $("#points > span.content").text(player.points);
  $("#bounce > span.content").text(player.bounce);
  $("#mistake > span.content").text(player.mistake);
  $("#twoPerc > span.content").text(player.twoP + "%");
  $("#threePerc > span.content").text(player.threeP + "%");
}

function init () {

  var players = getPlayers();

  addPlayersToList(players);

  $("#players > li").on("click", function() {
    var me = $(this);
    var selID = me.text();

    updateData(players, selID)
  });
}

$(init);
