; // in case of if not ended in previus files
(function(global, $) { //IIFE to make it safe

  //when calling Greetr it returns NEW object Greeter.init
  var Greetr = function(firstname, lastname, language) {
    return new Greetr.init(firstname, lastname, language);
  }

  //not exposed outside vars = local
  var supportedLangs = ['en', 'es'];

  //informal greetings
  var greetings = {
    en: 'Hello',
    es: 'Holla'
  };

  //formal greetings
  var formalGreetings = {
    en: 'Greetings',
    es: 'Saludos'
  };

  //logger
  var logMessages = {
    en: 'Log in',
    es: 'Incio sesion'
  };

  //prototype object
  Greetr.prototype = {
    // methods on Greetr object

    //show full name
    fullName: function() {
      return this.firstname + ' ' + this.lastname;
    },
     //validate lang
    validate: function() {
      if (supportedLangs.indexOf(this.language) === -1) {
        throw "Invalid language";
      }
    },
    // informal greeting method
    greeting: function() {
      return greetings[this.language] + ' ' + this.firstname + '!';
    },
    // formal greeting method
    formalGreeting: function() {
      return formalGreetings[this.language] +', ' + this.fullName();
    },

    // show the greeting method
    greet: function(formal) {
      var msg;

      //if undefined or null it will be coerced to 'false'
      if  (formal) {
        msg = this.formalGreeting();
      }
      else {
        msg = this.greeting()
      }

      if (console) {
        console.log(msg);
      }

      //'this' refers to the calling object at execution time
      //make the method chainable

      return this;
    },
    // show logged name
    log: function() {
      if (console) {
        console.log(logMessages[this.language] + ': ' + this.fullName());
      }

      return this;
    },
    //set the lang as a param
    setLang: function(lang) {
      this.language = lang;

      this.validate();

      return this;
    },
    //method to support jQuery
    HTMLGreeting: function(selector, formal) {

      //check for Jquery
      if(!$) {
        throw 'jQuery not loaded';
      }
      //check for selector
      if(!selector) {
        throw 'missing jQuery selector';
      }
      //set if formal greeting
      var msg;
      if (formal) {
        msg = this.formalGreeting();
      }
      else {
        msg = this.greeting();
      }
      // jQuery support
      $(selector).html(msg);
      //make it chainable
      return this;

    }

  };

  //function constructor that build an object and its properties
  Greetr.init = function(firstname, lastname, language) {

      var self = this;
      self.firstname = firstname || '';
      self.lastname = lastname || '';
      self.language = language || 'en';

      self.validate();
  }
  
  //set up a reference to prototype, dont need use 'new'
  Greetr.init.prototype = Greetr.prototype;
  //set up G$ to call Grettr
  global.Greetr = global.G$ = Greetr;

}(window, jQuery));