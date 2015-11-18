module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg     : grunt.file.readJSON('package.json') ,

    connect: {
      server: {
        options: {
          port: 3777 ,
          host : 'mi.dev' ,
          base : 'public'
        }
      }
    } ,

    haml  : {

      dist  : {
        files   : [
          { expand: true, cwd:'public', src: 'source/haml/**/*.haml', dest: 'public', ext : '.html' }
        ]
      } ,

      watch : {
        files : {}
      }

    } ,

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'source/sass',
          src: ['*.scss'],
          dest: 'public/css',
          ext: '.css'
        }]
      } 
    },

    watch : {
      coffee : {
        files : 'source/coffee/**/*.coffee' ,
        tasks : ['coffee']
      } ,

      haml  : {
        files : 'source/haml/**/*.haml' ,
        tasks : ['haml:watch'] ,
        options: {
          spawn: false
        }
      } ,

      scss   : {
        files: ['source/sass/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
          livereload: true,
        }
      } ,
      
      compass : {
        files : ['source/sass/**/*.sass'] ,
        tasks : ['compass:dist']
      }

    } ,

    coffee  : {
      options : {
        bare : true
      } ,

      build : {
        expand  : true            , 
        cwd     : 'source/coffee' ,
        src     : '**/*.coffee'   ,
        dest    : 'public'           ,
        ext     : '.js'
      }
    } ,

    compass : {
      dist : {
        options : {          
          config : 'config.rb'
        }
      }
    }

  });

  grunt.event.on('watch', function(action, filepath) {
    
    var replace , root;

    if(filepath.indexOf('.haml') === -1) return;

    var proto       = ( filepath.indexOf('design_prototypes') !== -1 ) ? true : false

    if ( filepath.indexOf( '/' ) !== -1 ){
      replace = (proto) ? 'source/haml/design_prototypes/'    : 'source/haml'
    } else {
      replace = (proto) ? 'source\\haml\\design_prototypes\\' : 'source\\haml'
    }

    root            = (proto) ? '' : 'public'
    
    var file        = {};    
    var destfile    = filepath.replace( '.haml','.html' );
    destfile        = destfile.replace(  replace , root );
    file[destfile]  = filepath;

    console.log('Parts: ' , replace , root);
    console.log('Compile file ' + filepath + ' to ' + destfile );
    
    grunt.config('haml.watch.files', file);
  });

  grunt.loadNpmTasks( 'grunt-haml2html'       );
  grunt.loadNpmTasks( 'grunt-contrib-coffee'  );
  grunt.loadNpmTasks( 'grunt-contrib-watch'   );
  grunt.loadNpmTasks( 'grunt-contrib-compass' );
  grunt.loadNpmTasks( 'grunt-contrib-sass'    );
  grunt.loadNpmTasks( 'grunt-contrib-connect' );
  
  grunt.registerTask( 'default', [ 'connect' , 'haml' , 'sass' , 'coffee' , 'watch'] );

};