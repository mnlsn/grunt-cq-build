grunt-cq-build
==============

Watch files edited and automatically deploy them to CRX.

## Getting Started

If you haven't used [grunt](http://gruntjs.com) before, you can visit the website and read up on its use and how to install it.

To start using grunt for CQ's UI purposes, place the `package.json` & `Gruntfile.js` files in the `jcr_root` folder in your projects UI folder. Once those two files are in the directory. Edit the `package.json` options to match your projects directory structure, this is important, if the directory structure is off, grunt will not recognize any changes or sling the content into the directories. I made the assumption that our local files have the same structure as in CQ, if this isn't so, you'll have to do some more editing in the `Gruntfile.js`. Once you've updated the options, in the `jcr_root` folder in your terminal run:

```shell
    npm install
```

That will install the grunt plugins needed for our Gruntfile to work.

## Tasks

Grunt has tons of plugins that we can use, but this is just a starter package that allows you to use sling to push changes done in the UI directory to CQ without having to do full builds. This doesn't fully replace maven builds, as you still do those for any changes in the core or files in UI that we are not watching for, dialogs and content.xml's for example. Grunt's [website](http://gruntjs.com) is well documented on how to set up your own tasks if you'd like to add more specialized tasks for your project.

These 3 main grunt commands use grunt's watch plugin to watch for changes made to JSP, JS, CSS, LESS and SASS files. Changes to these files result in an immediate push of the folder the changed file resides in.

* `grunt` will start watching for changes and push changes to both author and publish. Both of these instances have to be running.
* `grunt author` will start watching for changes and push those to only the author instance.
* `grunt publish` will do the same for the publish instance.


To keep this running as smooth as possible, I don't watch for images, image folders can get fairly large and could disrupt the quick builds of other changes. For that reason I set up two extra tasks just for images.

* `grunt publish-image` will push the entire image directory specified in the `package.json` options to the publish instance.
* `grunt author-image` will do the same for the author instance.


### Notes

Right now, if you make edits to files while not running one of the grunt tasks, the changes will be lost unless you do a maven build. Grunt can't tell what files have changed if it is not running and when first launched again, can't see the changes that have been made since it last ran. I am working on a way to run a task to push all files when you first start grunt again, but I am running into issues with the size and amount of files having to be pushed. So, with that said, either run grunt while you're editing UI files, or do a maven build before starting to use grunt again. Grunt shouldn't interfere with maven at all, so you can run maven while grunt is watching for file chances, since it's only looking for file changes locally. Also, updates on files from GIT or SVN should trigger grunt, but I have not tested this and if anyone does find out for certain, please let me know.