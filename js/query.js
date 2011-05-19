var Query = new function QueryStore () {

  var queryKey  = 'Query:',
      urlKey    = 'Url:';


  this.set = function (query, url) {

    // Don't try to set anything with an empty url or empty query
    if (query == '' || url == '') return;

    // Check for existing values for this url/query
    var oldUrl = localStorage[queryKey + query];
    if (oldUrl) delete localStorage[urlKey + oldUrl];
    var oldQuery = localStorage[urlKey + url];
    if (oldQuery) delete localStorage[queryKey + oldQuery];

    // Set the new values
    localStorage[queryKey + query] = url;
    localStorage[urlKey + url] = query;

  };

  this.getByQuery = function (query) {

    return localStorage[queryKey + query];

  };


  this.getByUrl = function (url) {

    return localStorage[urlKey + url];

  };


  this.removeByQuery = function (query) {

    var url = getByQuery(query);
    delete localStorage[queryKey + query];
    delete localStorage[urlKey + url];

  };


  this.removeByUrl = function (url) {

    var query = getByUrl(url);
    delete localStorage[urlKey + url];
    delete localStorage[queryKey + query];

  };

};
