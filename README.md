grunt-cq-build
==============

Watch files edited and automatically deploy them to CRX.

## Getting Started
If you haven't used [grunt](http://gruntjs.com) before, you can visit the website and read up on its use and how to install it.

To start using grunt for CQ's UI purposes, download the `package.json` & `Gruntfile.js` files anywhere. Edit the `package.json` options to match your projects directory structure. The only assumption made now is that somewhere there is a `jcr_root` folder and that you're editing files inside that `jcr_root` folder. Once you've updated the options, in the folder you downloaded the `package.json` & `Gruntfile.js` files, in your terminal run:

```shell
    npm install
```

That will install the grunt plugins needed for all this magic to work.

## Package Options
The options area in `package.json` is the only area to edit to work with your project. Any directory path should end with a `/` but never start with one.

```js
  "options": {
    "host": "localhost",
    "author": "4502",
    "publish": "4503",
    "user": "admin",
    "password": "admin",
    "project": "** LOCAL PATH TO PROJECT UI FOLDER - EX: Users/mnlsn/projects/project/project-ui/ **",
    "cqroot": "** THE LOCAL PATH FOR CQ PUBLISH & AUTHOR JARS - EX: Users/mnlsn/projects/cq56/ **",
    "mvnpublish": "** EX: mvn clean install local-publish**",
    "mvnauthor": "** EX: mvn clean install local-author**"
  }
```

* `project` is the full path of the project UI files on your local machine.
* `cqroot` is the path to your CQ publish and author JARs for the project, completely optional if you don't want to use grunt to start and stop your instances.
* `mvnpublish` and `mvnauthor` are the full maven commands you'd like to use to build to publish or author, completely optional if you don't want to use grunt to run maven.

## Tasks

Grunt has tons of plugins, but this is just a starter package that allows you to use sling to push changes done in the UI directory to CQ without having to do full builds. This doesn't fully replace maven builds, as you still do those for any changes in the core or files in UI that we are not watching for, images, dialogs and content.xml's for example. Grunt's [website](http://gruntjs.com) is well documented on how to set up your own tasks if you'd like to add more specialized tasks for your project.

These 3 main grunt commands use grunt's watch plugin to watch for changes made to JSP, HTML, JS, CSS, LESS and SASS files. Changes to these files result in an immediate push of the folder the changed file resides in. After pushing the changes, these tasks will also reload the currently open tab in Chrome (which may or may not be the page you want reloaded).

* `grunt` will start watching for changes and push changes to both author and publish. Both of these instances have to be running.
* `grunt author` will start watching for changes and push those to only the author instance.
* `grunt publish` will do the same for the publish instance.

I've also added a few tasks to do maven builds and start and stop instances, these are more out of my own laziness, but if you'd like to use them, they are:

* `grunt mvn-author` & `grunt mvn-publish` do the maven command you specified in `package.json` file for each.
* `grunt start-author` & `grunt start-publish` start whichever CQ instance you'd like.
* `grunt stop-author` & `grunt stop-publish` kill the running java processes of each instance.

If you’d like to ensure that the devDependencies are up-to-date run `grunt check`, which will print out a list of dependencies that can be updated.

### Notes

* If you are running into EMFILE fatal errors, use `ulimit -n 10240` in the current session to boost the amount of open files allowed.
* To verify that you’re watching the correct directories, run either of your watch tasks (`grunt author` or `grunt publish`) with the `--verbose` flag.
* Running a watch task and a maven build may take up all of your memory, mostly for larger projects. I recommend stopping the watch tasks with `control + c` before doing a maven build.
* If you make edits to files while not running one of the grunt tasks, the changes will be lost unless you do a maven build.