(function() {
  var currentRadius, multiplier, Options = {
    RADIUS: 20,
    DURATION: .5,
    ORIGINAL_COLOR: '#777',
    GLOW_COLOR: '#0af',
    HALO_COLOR: '#059'
  }
  
  function currentRadius(elem) {
    if (s = elem.style['text-shadow']) {
      return parseInt(s.match(/0 0 (\d+)px/));
    } else {
      return 0;
    }
  }
  
  jQuery.fx.step['textShadow'] = function(fx){
		if ( fx.state == 0 ) {
			fx.start = currentRadius(fx.elem);
			fx.end = fx.end;
		}
		
		with(fx.end) {
		  multiplier = begin ? 1 : -1;
      updatedRadius = parseInt(radius * fx.pos) * multiplier;
  		fx.elem.style['text-shadow'] = color + ' 0 0 ' + updatedRadius + 'px';
		}
	}
  
  $.fn.addGlow = function addGlow(options) {
    function startGlow() {
      var element = $(this);
      element.animate({
        color: Options.GLOW_COLOR,
        textShadow: {
          begin: true,
          color: Options.HALO_COLOR,
          radius: Options.RADIUS
        }
      }, Options.DURATION * 1000);
    }

    function startFade() {
      var element = $(this);
      element.animate({
        color: Options.ORIGINAL_COLOR,
        textShadow: {
          begin: false,
          color: 0,
          radius: 0
        }
      }, Options.DURATION * 1000);
    }    
    
    $(this).bind('mouseenter', startGlow);
    $(this).bind('mouseleave', startFade);
  }
  
})()