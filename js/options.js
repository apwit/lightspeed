chrome.extension.sendRequest({ method: "allQueries", arguments: [] }, j(function (response) {

  $queryTable = $('#query_table'),
  $template   = $('#query_template').remove();

  $.each(response, function (_, record) {

    var $record = $template.clone(),
        $queryInput = $record.find(':input[name=query]'),
        $urlInput = $record.find(':input[name=url]');

    // Seed the values
    $queryInput.val(record.query);
    $urlInput.val(record.url);

    // Bind the necessary events to the row
    $record.bind('focusin focusout', toggleEditMode)
           .bind('keyup paste', saveQuery);

    // Add the record to the table
    $record.appendTo($queryTable);

  });

}));


function toggleEditMode (event) {

  $(this).toggleClass('not_editing editing');

}



function saveQuery (input) {

  var query = $(this).find(':input[name=query]').val(),
      url   = $(this).find(':input[name=url]').val();

  chrome.extension.sendRequest({ method: "saveQuery", arguments: [query, url] }, $.noop);

}
