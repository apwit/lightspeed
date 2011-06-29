chrome.extension.sendRequest({ method: "allQueries", arguments: [] }, j(function (response) {

  $queryTable = $('#query_table'),
  $template   = $('#query_template').remove();

  $.each(response, function (_, record) {

    var $record     = $template.clone(),
        $queryInput = $record.find(':input[name=query]'),
        $urlInput   = $record.find(':input[name=url]'),
        $deleteLink = $record.find('a');

    // Seed the values
    $queryInput.val(record.query);
    $urlInput.val(record.url);

    $record.bind('focusin focusout', toggleEditMode)
           .bind('keyup paste', saveQuery);

    $deleteLink.click(deleteQuery);

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



function deleteQuery (event) {

  var $row  = $(this).closest('tr'),
      query = $row.find(':input[name=query]').val();

  // Tell the background page to delete this query
  chrome.extension.sendRequest({ method: "saveQuery", arguments: [query, ''] }, $.noop);

  // Remove the query's row from the table
  $row.remove();

  event.preventDefault();

}
