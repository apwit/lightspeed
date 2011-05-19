var currentTab,
    oldValue;

chrome.tabs.getSelected(null, function (tab) {

  currentTab = tab;

  chrome.extension.sendRequest({method: "getQueryForTab", arguments: [tab.id]}, j(function (response) {

    $('#query').val(response);
    saveQuery();

  }));

});


$(function () {

  $('#query_form').submit(queryFormSubmit);

  var $query = $('#query');
  $query.bind('keyup paste', saveQuery);

});


function queryFormSubmit () {

  saveQuery();

  //window.close();

  return false;

}


function saveQuery () {

  var query = $('#query').val();

  chrome.extension.sendRequest({method: "saveQuery", arguments: [query, currentTab.url]});

}
