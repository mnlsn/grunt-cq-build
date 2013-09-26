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

## Package Options
The options area in `package.json` is the only area to edit to work with your project. Any directory path should end with a `/` but never start with one.

```js
  "options": {
    "host": "localhost",
    "author": "4502",
    "publish": "4503",
    "user": "admin",
    "password": "admin",
    "projectroot": "**THE LOCAL DIRECTORY PATH OF THE PROJECT**",
    "projectapps": "**THE APPS FOLDER FOR PROJECT IN JCR_ROOT**",
    "projectetc": "**THE ETC FOLDER FOR PROJECT IN JCR_ROOT**",
    "projectimg": "**THE IMG FOLDER FOR PROJECT IN CLIENTLIBS**",
    "cqroot": "**THE LOCAL PATH FOR CQ PUBLISH & AUTHOR JARS**",
    "mvnpublish": "**mvn clean install local-publish**",
    "mvnauthor": "**mvn clean install local-author**"
  }
```

* `projectroot` is the full path of the project files on your local machine.
* `projectapps` is the structure to your project apps files from the `jcr_root` folder - this has to be the same on both your local machine and in CRX
* `projectetc` is the structure to your project etc files from the `jcr_root` folder - this has to be the same on both your local machine and in CRX
* `projectimg` is the structure to your project images folder from the end of the `projectetc` folder
* `cqroot` is the path to your CQ publish and author JARs for the project - only need if you want to start your instances using Grunt
* `mvnpublish` and `mvnauthor` are the full maven commands you'd like to use to build to publish or author

## Tasks

Grunt has tons of plugins that we can use, but this is just a starter package that allows you to use sling to push changes done in the UI directory to CQ without having to do full builds. This doesn't fully replace maven builds, as you still do those for any changes in the core or files in UI that we are not watching for, dialogs and content.xml's for example. Grunt's [website](http://gruntjs.com) is well documented on how to set up your own tasks if you'd like to add more specialized tasks for your project.

These 3 main grunt commands use grunt's watch plugin to watch for changes made to JSP, JS, CSS, LESS and SASS files. Changes to these files result in an immediate push of the folder the changed file resides in. After pushing the changes, these tasks will also reload the currently open tab in Chrome.

* `grunt` will start watching for changes and push changes to both author and publish. Both of these instances have to be running.
* `grunt author` will start watching for changes and push those to only the author instance.
* `grunt publish` will do the same for the publish instance.


To keep this running as smooth as possible, I don't watch for images, image folders can get fairly large and could disrupt the quick builds of other changes. For that reason I set up two extra tasks just for images.

* `grunt publish-image` will push the entire image directory specified in the `package.json` options to the publish instance.
* `grunt author-image` will do the same for the author instance.

I've also added a few tasks to do maven builds and start CQ instances, these are more so I don't have to shuffle around terminal tabs, but if you'd like to use them, they are:

* `grunt mvn-author` & `grunt mvn-publish` do the maven command you specified in `package.json` file for each.
* `grunt start-author` & `grunt start-publish` start whichever CQ instance you'd like.
* `grunt stop-author` & `grunt stop-publish` kill the running java processes of each instance.

### Notes

* If you are running into EMFILE fatal errors, use `ulimit -n 10240` in the current session to boost the amount of open files allowed.
* I tested out doing a complete build of the apps and etc folders, but it's slower than a full maven build without any of the extras that maven has.
* Running a watch task and a maven build may take up all of your memory, mostly for larger projects. I recommend stopping the watch tasks with `control + c` before doing a maven build.
* Updates on files from GIT or SVN should trigger grunt, but I have not tested this and if anyone does find out for certain, please let me know.
* If you make edits to files while not running one of the grunt tasks, the changes will be lost unless you do a maven build.