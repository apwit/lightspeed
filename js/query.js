var Query = new function () {

  var QUERY_KEY  = 'Query:',
      URL_KEY    = 'Url:';


  this.set = function (query, url) {

    // Don't try to set anything with an empty url or empty query
    if (query == '' || url == '') return;

    // Check for existing values for this url/query
    var oldUrl = this.lookup(query);
    if (oldUrl) localStorage.removeItem(URL_KEY + oldUrl);
    var oldQuery = this.reverseLookup(url);
    if (oldQuery) localStorage.removeItem(QUERY_KEY + oldQuery);

    // Set the new values
    localStorage[QUERY_KEY + query] = url;
    localStorage[URL_KEY + url] = query;

  };

  this.lookup = function (query) {

    return localStorage[QUERY_KEY + query];

  };


  this.reverseLookup = function (url) {

    return localStorage[URL_KEY + url];

  };


  this.destroy = function (query) {

    var url = this.lookup(query);
    delete localStorage[QUERY_KEY + query];
    delete localStorage[URL_KEY + url];

  };


  this.reverseDestroy = function (url) {

    var query = this.reverseLookup(url);
    localStorage.removeItem(QUERY_KEY + query);
    localStorage.removeItem(URL_KEY + url);

  };


  this.each = function (callback) {

    var all       = this.all(),
        lastIndex = all.length -1;

    for (i = 0; i < lastIndex; i++) {

      callback(all[i][0], all[i][1]);

    }

  };


  this.all = function () {

    var all = [];

    // Iterate through all the keys in localStorage
    for (var i = 0; i != localStorage.length - 1; i++) {

      var key = localStorage.key(i);

      // Skip any non-query keys
      if (key.indexOf(QUERY_KEY) != 0) continue;

      // Extract the query from the key
      var query = key.slice(6);

      all.push({
        query: query,
        url:   this.lookup(query)
      });

    }

    // Sort by query alphabetically
    return all.sort(function (a, b) {

      return a.query < b.query ? -1 : 1;

    });

  };

};
