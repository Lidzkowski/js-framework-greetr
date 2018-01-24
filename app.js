//make a new object
var g = G$('John', 'Doe');

//use chainable methods
g.greet().setLang('es').greet(true).log();

// use the Gritter object on the click event by jQuery
$('#login').click(function() {

  //create the new Greetr object
  var loginGrtr = G$('John', 'Doe');

  //hide the login on the screen
  $('#logindiv').hide();

  //show our greeting in order to the selected language
  loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greetings', true).log();

});