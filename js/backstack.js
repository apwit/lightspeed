var Backstack = new function Backstack () {

  // Arrays of URLs by tabId
  var stacks  = {},

  // Stores tabId sources by url
      forks   = {};

  this.record = function () {

    // Monitor navigations
    chrome.experimental.webNavigation.onBeforeNavigate.addListener(addStackItem);

    // Monitor navigational forks (opening links in a new tab/window)
    chrome.experimental.webNavigation.onBeforeRetarget.addListener(addFork);

    // Remove a tab's stack when it closes
    chrome.tabs.onRemoved.addListener(removeStackItem);

  };


  // Returns the first search found in the backstack for the given tabId
  this.getSearchUrlByTabId = function (tabId) {

    var stack = stacks[tabId] || [];

    for (var i = stack.length - 1; i != -1; i--) {

      if (isSearchUrl(stack[i])) return stack[i];

    }

    return null;

  };


  // Adds a URL to the stack for the tab which is identified in `details`
  function addStackItem (details) {

    var url   = details.url,
        tabId = details.tabId;

    // No need to record the backstack of subframes
    if (details.frameId != 0) return;

    // Manage the backstack
    if (stacks[tabId]) {

      stacks[tabId].push(url);

    } else {

      var sourceTabId = forks[url];

      if (sourceTabId) {

        stacks[tabId] = stacks[sourceTabId].concat(url);
        delete forks[url];

      } else {

        stacks[tabId] = [url];

      }

    }

  }


  function addFork (details) {

    forks[details.url] = details.sourceTabId;

  }


  function removeStackItem (tabId) {

    delete stacks[tabId];

  }


};
