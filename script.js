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

  while (players.length < 10000) {

    newPlayer = getPlayer();

    if(!isPresent(newPlayer, players)) {

      players.push(newPlayer);
    }
  }

  return players;
}

function clearInput() {
  $("#usr-input").val("");

  $("span.content").text("");
}

function addPlayersToDatalist(players) {

  for (var i = 0; i < players.length; i++) {

    var opt = document.createElement("option");

    opt.value = players[i].id;

    $("#players").append(opt);
  }
}

function getPlayerById(selectedPlayerId, players) {

  for (var i = 0; i < players.length; i++) {

    if (players[i].id == selectedPlayerId) {

      return players[i];
    }
  }
}

function updateData(players) {

  var me = $("input");
  var selectedPlayerId = me.val();

  var player = getPlayerById(selectedPlayerId, players);

  $("#id > span.content").text(player.id);
  $("#points > span.content").text(player.points);
  $("#bounce > span.content").text(player.bounce);
  $("#mistake > span.content").text(player.mistake);
  $("#twoPerc > span.content").text(player.twoP + "%");
  $("#threePerc > span.content").text(player.threeP + "%");
}

function init () {

  var players = getPlayers();

  addPlayersToDatalist(players);

  $("input").on("change", function() {
    updateData(players)
  });

  var clearBtn = $("#clear-btn");
  clearBtn.click(clearInput);
}

$(init);
