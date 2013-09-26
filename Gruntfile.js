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
      killauthor: {
        command: 'kill $(ps aux | grep "author" | grep -v \'grep\' | awk \'{print $2}\')'
      },
      killpublish: {
        command: 'kill $(ps aux | grep "publish" | grep -v \'grep\' | awk \'{print $2}\')'
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
          tasks: ['slingPost:author', 'macreload'],
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
          tasks: ['slingPost:publish', 'macreload'],
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
      },
      publishImg: {
        options: {
          host: '<%= pkg.options.host %>',
          port: '<%= pkg.options.publish %>',
          user: '<%= pkg.options.user %>',
          pass: '<%= pkg.options.password %>',
          exclude: ['.DS_Store']
        },
        src: "<%= pkg.options.projectetc %><%= pkg.options.projectimg %>",
        dest: "/<%= pkg.options.projectetc %><%= pkg.options.projectimg %>"
      },
      authorImg: {
        options: {
          host: '<%= pkg.options.host %>',
          port: '<%= pkg.options.author %>',
          user: '<%= pkg.options.user %>',
          pass: '<%= pkg.options.password %>',
          exclude: ['.DS_Store']
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