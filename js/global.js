function isSearchUrl (url) {

  return url.indexOf('http://www.google.com/search') == 0;

}


// Returns a DOM-ready wrapped callback
function j (callback) {

  return function () {

    var args = arguments;

    $(function () {

      callback.apply(window, args);

    });

  };

}


/*function backgroundMethods () {

  var argLen = arguments.length;

  for (var i = 0; i != argLen; i++) {

    window[arguments[i]] = function () {

      // Doesn't work: var args = [].concat(arguments).shift();

      chrome.extension.sendRequest({method: arguments[i], arguments: args}, function (response) {

        console.log(respose);

      }); 

    }

  }

}*/
