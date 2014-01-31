path = require('path');

module.exports = function(grunt) {
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time after tasks run
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell: {
      startPublish: {
        options: {
          stdout: true,
        },
        command: '/./<%= pkg.options.cqroot %>publish/crx-quickstart/bin/start'
      },
      startAuthor: {
        options: {
          stdout: true
        },
        command: '/./<%= pkg.options.cqroot %>author/crx-quickstart/bin/start'
      },
      mvnpublish: {
        options: {
          stdout: true,
          execOptions: {
            cwd: '/<%= pkg.options.project %>'
          }
        },
        command: '<%= pkg.options.mvnpublish %>'
      },
      mvnauthor: {
        options: {
          stdout: true,
          execOptions: {
            cwd: '/<%= pkg.options.project %>'
          }
        },
        command: '<%= pkg.options.mvnauthor %>'
      },
      killauthor: {
        command: 'kill $(ps aux | grep "author" | grep -v \'grep\' | awk \'{print $2}\')'
      },
      killpublish: {
        command: 'kill $(ps aux | grep "publish" | grep -v \'grep\' | awk \'{print $2}\')'
      },
      ps: {
        options: {
          stdout: true
        },
        command: 'ps -ef | grep java'
      }
    },
    macreload: {
      reload: {
        browser: 'chrome'
      }
    },
    watch: {
      author: {
        files: ['/<%= pkg.options.project %>src/main/content/jcr_root/**/*.{css,html,js,jsp,less,sass,scss,txt}'],
        tasks: ['slingPost:author', 'macreload'],
        options: {
          spawn: false,
        },
      },
      publish: {
        files: ['/<%= pkg.options.project %>src/main/content/jcr_root/**/*.{css,html,js,jsp,less,sass,scss,txt}'],
        tasks: ['slingPost:publish', 'macreload'],
        options: {
          spawn: false,
        },
      },
    },
    slingPost: {
      author: {
        options: {
          host: '<%= pkg.options.host %>',
          port: '<%= pkg.options.author %>',
          user: '<%= pkg.options.user %>',
          pass: '<%= pkg.options.password %>',
          exclude: ['.DS_Store']
        },
        src: "apps/",
        dest: "/apps/"
      },
      publish: {
        options: {
          host: '<%= pkg.options.host %>',
          port: '<%= pkg.options.publish %>',
          user: '<%= pkg.options.user %>',
          pass: '<%= pkg.options.password %>',
          exclude: ['.DS_Store']
        },
        src: "apps/",
        dest: "/apps/"
      }
    }
  });

  grunt.event.on('watch', function(action, filepath, target) {
    var destination;
    if (path.dirname(filepath).indexOf("jcr_root/") !== -1) {
      destination = '/' + path.dirname(filepath).substring(path.dirname(filepath).indexOf("jcr_root/") + 9);
    } else {
      destination = '/' + path.dirname(filepath);
    }

    grunt.config.set(['slingPost', 'author', 'src'], [path.dirname(filepath) + '/']);
    grunt.config.set(['slingPost', 'author', 'dest'], [destination]);
    grunt.config.set(['slingPost', 'publish', 'src'], [path.dirname(filepath) + '/']);
    grunt.config.set(['slingPost', 'publish', 'dest'], [destination]);
  });

  grunt.registerTask('start-author', 'shell:startAuthor');
  grunt.registerTask('start-publish', 'shell:startPublish');
  grunt.registerTask('stop-author', 'shell:killauthor');
  grunt.registerTask('stop-publish', 'shell:killpublish');
  grunt.registerTask('mvn-publish', 'shell:mvnpublish');
  grunt.registerTask('mvn-author', 'shell:mvnauthor');
  grunt.registerTask('publish-image', 'slingPost:publishImg');
  grunt.registerTask('author-image', 'slingPost:authorImg');
  grunt.registerTask('author', ['watch:author']);
  grunt.registerTask('publish', ['watch:publish']);
  grunt.registerTask('default', ['watch']);
};