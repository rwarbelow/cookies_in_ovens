// Your JavaScript here
function Cookie (recipe, bakeTime) {
    this.recipe = recipe;
    this.bakeTime = +bakeTime;
    this.state = "raw";
    this.timeInOven = 0;
}

function Oven() {
  this.contents = [];
}

function PrepTable() {
  this.owner = "prepTable";
  this.contents = [];
}

PrepTable.prototype.cookieToOven = function(cookie, oven) {
  oven.contents.push(cookie);
};

Oven.prototype.bake = function() {
  for (var i = 0; i < oven.contents.length; i++) {
    var cookie = oven.contents[i];
    cookie.timeInOven += 1;
    if (cookie.timeInOven < cookie.bakeTime) {
      cookie.state = "gooey";
    }
    else if (cookie.timeInOven === cookie.bakeTime){
      cookie.state = "just right";
    }
    else {
      cookie.state = "crispy";
    }
  }
};

var prepTable = new PrepTable();
var oven = new Oven();


var prepCookie = function() {
  var cookieInfo = $('form').serializeArray();
  var cookieType = cookieInfo[0].value;
  var cookieBakeTime = cookieInfo[1].value;
  var cookie = new Cookie(cookieType, cookieBakeTime);
  prepTable.contents.push(cookie);
  $('#prep_batches').append('<li>' + cookie.recipe + '<form><input type="submit" value="Add to oven"></form>' + '</li>');
};

var prepTableView = {
  initialize: function(){
    $('#new_batch').on('submit', function(e) {
      e.preventDefault();
      prepCookie();
    });
  }
};

$(document).ready(function(){
  prepTableView.initialize();
  // ----------
  $('#prep_batches').on('submit', 'form', function(e){
    e.preventDefault();
    var batchNumber = $(this).parent().index();
    var cookie = $(this).parent();
    alert("Cookies are in the oven!");
    $(cookie).remove();
    removedCookie = prepTable.contents.splice(batchNumber,1);
    prepTable.cookieToOven(removedCookie[0], oven);
    var ovenPosition = ((oven.contents.length)-1);
    $('#rack_' + ovenPosition.toString()).html('<span id="cookie_name">' + oven.contents[ovenPosition].recipe + '</span>' + ' <span class="cookie_state">' + '[' + oven.contents[ovenPosition].state + ']');
    $('#rack_' + ovenPosition.toString()).css('background', 'red');
    $('.cookie_state').css('font-style', 'italic');
  });
  // -----------
  $('#bake').on('click', function(e){
    oven.bake();
    for (var i = 0; i < oven.contents.length; i++){
      var ovenPosition = i;
      var cookieState = oven.contents[ovenPosition].state;
      $('#rack_' + ovenPosition.toString()).html('<span id="cookie_name">' + oven.contents[ovenPosition].recipe + '</span>' + ' <span class="cookie_state">' + '[' + oven.contents[ovenPosition].state + ']');

      switch (cookieState){
        case "gooey": $('#rack_' + ovenPosition.toString()).css('background', 'yellow');
        break;
        case "just right": $('#rack_' + ovenPosition.toString()).css('background', 'green');
        break;
        case "crispy": $('#rack_' + ovenPosition.toString()).css('background', 'black').css('color', 'white');
        break;
      }
    }
  });
});





