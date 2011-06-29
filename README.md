# Lightspeed

Lightspeed is an experimental Chrome extension which serves as an alternative to native bookmarking. Rather than maintaining folders of bookmarks, you simply catalog pages with a query which is triggered from the Omnibar.

Lightspeed watches your browsing history for each tab (all data is stored locally, we don't use any of it) and automatically extracts queries for tabs that navigated through Google at some point. This means if you search for "cats" and land on a cat adoption page, clicking the lightspeed icon will use the query "cats" by default.

## Installation

1. Visit chrome://flags in Chrome and enable the "Experimental Extension APIs" feature:
   ![Flags page](http://i.imgur.com/KLdUp.png)
2. Download and install the latest version: [Lightspeed v0.1](#)
3. ??????
4. Profit

## Caveats

* Uses an experimental extension API
* Doesn't intercept requests until after DNS resolution (I think) due to the API used, so crappy internet connections will yield latency.
* Only supports one query per URL

## License

Lightspeed is released under the MIT license.
