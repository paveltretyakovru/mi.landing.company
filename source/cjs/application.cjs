import 'jquery-browserify';
import 'jquery-ui-browserify';

console.info( "Start Js Application test" );

var $showAboutTarget = $( '.js-button-show-about' );
var $about1			 = $( '.about:first' );

// Открытие окна с подробности iBeacons
$showAboutTarget.on( 'click' , function( event ){
	$about1.toggle( 'drop' , {} , 500 );
});