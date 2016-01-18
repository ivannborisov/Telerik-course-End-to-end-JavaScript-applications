module.exports = function(grunt) {
    grunt.initConfig({
        connect:{
            options:{
                port:9578 ,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options:{
                    open:true,
                    base: ['DEV']
                }
            }
        },
        stylus: {
            compile: {
                files:{
                    'DEV/styles/main.css':[
                        'APP/styles/main.styl',
                        'APP/styles/second.styl'
                    ]
                }
            }
        },
        watch:{
            stylus:{
                files:['APP/styles/**/*.styl'],
                tasks:['stylus'],
                options:{
                    livereload: true
                }
            },
            jade: {
                files:['APP/**/*.jade'],
                tasks:['jade'],
                options:{
                    livereload: true
                }
            },
            coffee: {
                files:['APP/scripts/**/*.coffee'],
                tasks:['coffee'],
                options:{
                    livereload: true
                }
            },
            livereload:{
                options:{
                    livereload:'35729'
                },
                files:[
                    'DEV/**/*.js',
                    'DEV/**/*.css',
                    'DEV/**/*.html'
                ]
            }
        },
        jade: {
            compile:{
                files: {
                    'DEV/index.html': 'APP/index.jade'
                }
            }
        },
        coffee: {
            compile:{
                files: {
                    'DEV/scripts/main.js': 'APP/scripts/main.coffee'
                }
            }
        },
        copy: {

            serve: {
                files: [
                    {expand: true, flatten: true, src: ['APP/images/**'], dest: 'DEV/images/', filter: 'isFile'}
                ]
            },
            build: {

                files: [
                    {expand: true, flatten: true, src: ['APP/images/**'], dest: 'DIST/images/', filter: 'isFile'}
                ]

            }

        },
        uglify: {
            my_target: {
                files: {
                    'DIST/scripts/main.js': ['DEV/scripts/main.js']
                }
            }
        },
        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'DIST/index.html': 'DEV/index.html',

                }
            }
        }


    });

    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');


    grunt.registerTask('serve', ['stylus','coffee','jade','copy:serve','connect','watch']);
    grunt.registerTask('build', ['copy:build','uglify','htmlmin:build']);
}