grunt-cq-build
==============

Watch files edited and automatically deploy them to CRX.

# Install

* Place the Gruntfile and package.json into the jcr_root folder.
* Edit the package.json options to fit your project
* In jcr_root folder in terminal, run npm install
* grunt will watch for changes and "should" deploy to both author and publish - UNTESTED
* grunt author will watch for file changes and deploy those to your author instance
* grunt publish will do the same for your publish instance

More documentation as I hash out the rest of what this can do.