module.exports = ( grunt ) ->

	grunt.initConfig
		pkg : grunt.file.readJSON 'package.json'

		browserify :
			init :
				files :
					'public/js/app.js' : 'public/js/application.js'
		
		connect : server : options :
					port : 3778
					host : 'micom.dev'
					base : 'public'

		haml : init : files :[
					expand	:  true
					cwd		: 'source/haml'   # From folder
					src 	: ['**/*.haml']   # Scan all directories
					dest 	: 'public'        # To folder
					ext 	: '.html'         # New file extension
				]

		coffee : init : files :[
					expand	:  true
					cwd		: 'source/coffee'   # From folder
					src 	: ['**/*.coffee']   # Scan all directories
					dest 	: 'public/js'       # To folder
					ext 	: '.js'         	# New file extension
				]

		transpile :
			init :
				type 	: 'cjs'
				files 	:[
					expand	:  true
					cwd		: 'source/cjs'	# From folder
					src 	: ['**/*.cjs']	# Scan all directories
					dest 	: 'public/js'	# To folder
					ext 	: '.js'			# New file extension
				]

		sass :
			init :
				options :
					compass : true

				files 	: [
					expand	:  true
					cwd		: 'source/sass'					# From folder
					src 	: ['**/*.scss' , '**/*.sass']	# Scan all directories
					dest 	: 'public/css'					# To folder
					ext 	: '.css'						# New file extension
				]

		watch :
			haml :
				files : [ 'source/haml/**/*.haml' ]
				tasks : [ 'haml:init' ]
			transpile  :
				files : [ 'source/cjs/**/*.cjs' ]
				tasks : [ 'transpile:init' , 'browserify:init' ]
			sass :
				files : [ 'source/sass/**/*.scss' , 'source/sass/**/*.sass' ]
				tasks : [ 'sass:init' ]
			coffee :
				files : [ 'source/coffee/**/*.coffee' ]
				tasks : [ 'coffee:init' , 'browserify:init' ]

	# Load taks
	grunt.loadNpmTasks 'grunt-haml2html'			# HAML -> HTML
	grunt.loadNpmTasks 'grunt-es6-module-transpiler'# ES6(cjs) -> JS(js)
	grunt.loadNpmTasks 'grunt-browserify'			# application.js -> app.js
	grunt.loadNpmTasks 'grunt-contrib-watch'		# Watch all source files
	grunt.loadNpmTasks 'grunt-contrib-sass'			# SASS,SCSS -> CSS	
	grunt.loadNpmTasks 'grunt-contrib-coffee'		# COFFEE -> JS
	grunt.loadNpmTasks 'grunt-contrib-connect'		# Virtual

	# Registering tasks	
	# Create new task -> "init", it's started created tasks -> "haml":grunt-haml2html with parameters from atribute "init"(grun.innitConfig({})
	grunt.registerTask 'init' 	, [ 'haml:init' , 'transpile:init' , 'browserify:init' , 'sass:init' , 'coffee:init' ]
	grunt.registerTask 'serve'	, [ 'connect' , 'watch' ]