path = require('path');

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sling-content');
  grunt.loadNpmTasks('grunt-macreload');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell: {
      startPublish: {
        options: {
          stdout: true,
        },
        command: '/./<%= pkg.options.cqroot %>publish/crx-quickstart/bin/start &'
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
            cwd: '/<%= pkg.options.projectroot %>'
          }
        },
        command: '<%= pkg.options.mvnpublish %>'
      },
      mvnauthor: {
        options: {
          stdout: true,
          execOptions: {
            cwd: '/<%= pkg.options.projectroot %>'
          }
        },
        command: '<%= pkg.options.mvnauthor %>'
      },
      kill: {
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
          files: ['<%= pkg.options.projectapps %>/**/*.js',
                  '<%= pkg.options.projectapps %>/**/*.jsp',
                  '<%= pkg.options.projectapps %>/**/*.css',
                  '<%= pkg.options.projectapps %>/**/*.scss',
                  '<%= pkg.options.projectetc %>/**/*.css',
                  '<%= pkg.options.projectetc %>/**/*.js',
                  '<%= pkg.options.projectetc %>/**/*.scss'],
          tasks: ['slingPost:author'],
          options: {
            nospawn: true
          }
        },
        publish: {
          files: ['<%= pkg.options.projectapps %>/**/*.js',
                  '<%= pkg.options.projectapps %>/**/*.jsp',
                  '<%= pkg.options.projectapps %>/**/*.css',
                  '<%= pkg.options.projectapps %>/**/*.scss',
                  '<%= pkg.options.projectetc %>/**/*.css',
                  '<%= pkg.options.projectetc %>/**/*.js',
                  '<%= pkg.options.projectetc %>/**/*.scss'],
          tasks: ['slingPost:publish'],
          options: {
            nospawn: true
          }
        }
    },
    slingPost: {
      author: {
        options: {
          host: '<%= pkg.options.host %>',
          port: '<%= pkg.options.author %>',
          user: '<%= pkg.options.user %>',
          pass: '<%= pkg.options.password %>'
        },
        src: "apps/",
        dest: "/apps/"
      },
      publish: {
        options: {
          host: '<%= pkg.options.host %>',
          port: '<%= pkg.options.publish %>',
          user: '<%= pkg.options.user %>',
          pass: '<%= pkg.options.password %>'
        },
        src: "apps/",
        dest: "/apps/"
      },
      publishImg: {
        options: {
          host: '<%= pkg.options.host %>',
          port: '<%= pkg.options.publish %>',
          user: '<%= pkg.options.user %>',
          pass: '<%= pkg.options.password %>'
        },
        src: "<%= pkg.options.projectetc %><%= pkg.options.projectimg %>",
        dest: "/<%= pkg.options.projectetc %><%= pkg.options.projectimg %>"
      },
      authorImg: {
        options: {
          host: '<%= pkg.options.host %>',
          port: '<%= pkg.options.author %>',
          user: '<%= pkg.options.user %>',
          pass: '<%= pkg.options.password %>'
        },
        src: "<%= pkg.options.projectetc %><%= pkg.options.projectimg %>",
        dest: "/<%= pkg.options.projectetc %><%= pkg.options.projectimg %>"
      }
    }
  });

  grunt.event.on('watch', function(action, filepath, target) {
    grunt.config.set(['slingPost', 'author', 'src'], [path.dirname(filepath) + '/']);
    grunt.config.set(['slingPost', 'author', 'dest'], ['/' + path.dirname(filepath)]);
    grunt.config.set(['slingPost', 'publish', 'src'], [path.dirname(filepath) + '/']);
    grunt.config.set(['slingPost', 'publish', 'dest'], ['/' + path.dirname(filepath)]);
  });

  grunt.registerTask('start-author', 'shell:startAuthor');
  grunt.registerTask('start-publish', 'shell:startPublish');
  grunt.registerTask('mvn-publish', 'shell:mvnpublish');
  grunt.registerTask('mvn-author', 'shell:mvnauthor');
  grunt.registerTask('publish-image', 'slingPost:publishImg');
  grunt.registerTask('author-image', 'slingPost:authorImg');
  grunt.registerTask('author', ['watch:author', 'macreload']);
  grunt.registerTask('publish', ['watch:publish', 'macreload']);
  grunt.registerTask('default', ['watch', 'macreload']);
};