var $notifElem;

$( function() {

  var $container = $('.isotope').isotope({
    itemSelector: '.item',
    masonry: {
      columnWidth: 100
    }
  });

  $notifElem = $('#notification');
  
  $container.isotope( 'on', 'layoutComplete', function( isoInstance, laidOutItems ) {
    notify( 'Isotope layout completed with ' + laidOutItems.length + ' items' );
  });
  
  $container.on( 'click', '.item', function() {
    // change size of item by toggling gigante class
    $( this ).toggleClass('gigante');
    $container.isotope('layout');
  });
  
});


// --------- timestamp ----------- //

function timeStamp() {
  var now = new Date();
  var min = now.getMinutes();
  min = min < 10 ? '0' + min : min;
  var seconds = now.getSeconds();
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return [ now.getHours(), min, seconds ].join(':');
}

// -------------------------- notify -------------------------- //

var transitionProp = getStyleProperty('transition');

var notifyTimeout;
var hideTime = transitionProp ? 1000 : 1500;

function notify( message ) {
  message += ' at ' + timeStamp();
  $notifElem.text( message );

  var style = {};
  
  if ( transitionProp ) {
    style[ transitionProp ] = 'none';
  }
  style.display = 'block';
  style.opacity = 1;
  $notifElem.css( style );

  // hide the notification after a second
  if ( notifyTimeout ) {
    clearTimeout( notifyTimeout );
  }

  notifyTimeout = setTimeout( hideNotify, hideTime );
}

function hideNotify() {
  var style = {};
  if ( transitionProp ) {
    style[ transitionProp ] = 'opacity 1.0s';
    style.opacity = '0';
  } else {
    style.display = 'none';
  }
  $notifElem.css( style );
}

