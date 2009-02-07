(function() {
  var currentRadius, multiplier;
  
  function parseOptions(options) {
    return {
      RADIUS:     (options.radius    || 20),
      DURATION:   (options.duration  || .5),
      TEXT_COLOR: (options.textColor || '#0af'),
      HALO_COLOR: (options.haloColor || '#059')
    }
  }
  
  function currentRadius(elem) {
    if (prop = elem.style['text-shadow']) {
      return parseInt(prop.match(/0 0 (\d+)px/));
    } else {
      return 0;
    }
  }
  
  jQuery.fx.step['textShadow'] = function(fx){
		if (fx.state == 0) {
			fx.start = currentRadius(fx.elem);
		}
		
		with(fx.end) {
      updatedRadius = begin ?
        parseInt(radius * fx.pos) :
        parseInt(radius - (radius * fx.pos))
  		fx.elem.style['text-shadow'] = color + ' 0 0 ' + updatedRadius + 'px';
  		console.info(updatedRadius)
		}
	}
  
  $.fn.addGlow = function addGlow(opts) {
    var opts = parseOptions(opts || { });

    function startGlow() {
      $(this).animate({
        color: opts.TEXT_COLOR,
        textShadow: {
          begin: true,
          color: opts.HALO_COLOR,
          radius: opts.RADIUS
        }
      }, opts.DURATION * 1000);
    }

    function startFade() {
      $(this).animate({
        color: $(this).data('glow.originColor'),
        textShadow: {
          begin: false,
          color: opts.HALO_COLOR,
          radius: opts.RADIUS
        }
      }, opts.DURATION * 1000);
    }
    
    with($(this)) {
      bind('mouseenter', startGlow);
      bind('mouseleave', startFade);
      data('glow.originColor', css('color'));
    }
    
    return this;
  }
  
})()