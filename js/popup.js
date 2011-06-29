var currentTab;

chrome.tabs.getSelected(null, function (tab) {

  currentTab = tab;

  chrome.extension.sendRequest({ method: "getQueryForTab", arguments: [tab.id, tab.url] }, j(function (response) {

    $('#query').val(response);
    saveQuery();

  }));

});


$(function () {

  $('#query_form').submit(queryFormSubmit);

  $('#query').bind('keyup paste', saveQuery);

});


function queryFormSubmit () {

  saveQuery(function () {

    window.close();

  });

  return false;

}


function saveQuery (callback) {

  var query     = $('#query').val(),
      callback  = typeof callback == "function" ? callback : function () {};

  console.log(query);

  chrome.extension.sendRequest({ method: "saveQuery", arguments: [query, currentTab.url] }, callback);

  var iconPath = query ? '/images/action_saved.png' : '/images/action_none.png';
  chrome.pageAction.setIcon({ tabId: currentTab.id, path: iconPath });

}
