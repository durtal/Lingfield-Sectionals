### Lingfield Park Sectionals

This is a work in progress, but it aims to build a simple, single page web app to display the Turftrax sectionals for races run at Lingfield Park.  This repo is the app in development and contains the necessary files for others to clone the repo, run the app locally, and contribute if they so wish.  The app will be built using open source tools, [AngularJS](http://angularjs.org) for app framework, [Bootswatch](http://bootswatch.com/) for styles, and [D3js](http://d3js.org) for visualisations.

I have in mind, something similar to [this](http://durtal.github.io/d3-pages/sectionals-d3.html), but ever so slightly more complex and thorough.  Some quick and dirty ideas:

* parallel coordinates is a good way to compare and contrast different horses and the times they run,
* simple histograms and/or density plots of sectionals, and finishing speeds, to highlight fast/slow sectionals,
* view a single race,
* view a single horse and all its races

### Clone and Contribute

To run this app locally, "simply"

* Install [NodeJS](http://www.nodejs.org)
* Open terminal or command prompt and navigate to the directory of the forked repo (should be called **Lingfield-Sectionals**)
* run `npm install -g bower`
* run `npm install -g grunt-cli` (you may need to run `npm install -g grunt` too)
* run `npm install`
* run `bower install`
* finally run `grunt serve` which should launch a browser with the current version of the app

(if you encounter issues, let me know and I'll try my best to help)
