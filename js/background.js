Backstack.record();

chrome.experimental.webRequest.onBeforeRequest.addListener(function(details) {

  var queryUrl    = details.url,
      query       = queryForUrl(queryUrl),
      redirectUrl = Query.lookup(query);

  if (redirectUrl) {

    return {

      redirectUrl: redirectUrl

    };

  }

}, {

  urls: ["*://*.google.com/search*"],
  types: ["main_frame"]

}, ["blocking"]);


chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {

  if (info.status == "loading") {

    var storedQuery = Query.reverseLookup(tab.url);
    var iconType = storedQuery ? 'saved' : 'none';
    chrome.pageAction.setIcon({ tabId: tabId, path: '/images/action_' + iconType + '.png' });

    chrome.pageAction.show(tabId);

  }

});


chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {

  var response = window[request.method].apply(window, request.arguments);
  sendResponse(response);

});


function queryForUrl(url) {

  var url = $.url(url),
      query;

  switch (url.attr('host')) {
    case "www.google.com":
      query = url.param('q');
      break;
  }

  return decodeURIComponent(query).replace(/\+/g, ' ').toLowerCase();

}


// Returns the saved query for the URL given if one exists, otherwise will try
// to formulate a recommended key
function getQueryForTab (tabId, url) {

  var storedQuery = Query.reverseLookup(url);

  if (storedQuery) {

    return storedQuery;

  } else {

    var url = Backstack.getSearchUrlByTabId(tabId);
    return url ? queryForUrl(url) : undefined;

  }

}


function saveQuery (query, url) {

  Query.set(query, url);

}
