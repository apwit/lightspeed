# Lightspeed

Lightspeed is an experimental Chrome extension which serves as an alternative to native bookmarking. Rather than maintaining folders of bookmarks, you simply bookmark pages with a keyword which can be triggered from the Omnibar.

Initially it was made as a way to skip Google when a search term always lands you on the same page. Simply search for something that you search for often, navigate to the page you'd like that search to go to and click the lightning bolt in the Omnibar. Next time you make that search, Lightspeed will take you directly to the page you set up.

## Installation

Lightspeed depends on experimental Chrome APIs, which you have to enable before you can install it. Follow the instructions below to install Lightspeed:

1. Visit chrome://flags in Chrome and enable the "Experimental Extension APIs" feature
   ![Flags page](http://i.imgur.com/KLdUp.png)
2. Download and install the latest version: [Lightspeed v0.1](#)
3. ??????
4. Profit

## Caveats

* Uses an experimental extension API
* Doesn't intercept requests until after DNS resolution (I think) due to a bug in the API, so crappy internet connections will yield crappy lightspeed results.
* Only supports one keyword per URL

## License

Lightspeed is released under the MIT license.
