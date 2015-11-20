window.$ = require 'jquery'
require 'jquery-ui'

$( document ).ready ->
	console.info 'Start Js Application'

	$trgShowAbout 	= $ '.js-button-show-about'
	$firstAbout 	= $ '.about:first'

	# Открытие окна с подробности iBeacons
	$trgShowAbout.on 'click' , ( event ) ->
		$firstAbout.toggle 'drop' , {} , 500