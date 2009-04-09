(function($) {
  var currentRadius, multiplier;
  
  function parseOptions(options) {
    return {
      RADIUS:     (options.radius    || 20),
      DURATION:   (options.duration  || 500),
      TEXT_COLOR: (options.textColor || '#fff'),
      HALO_COLOR: (options.haloColor || '#777')
    }
  }
  
  function currentRadius(elem) {
    if (prop = elem.style['text-shadow']) {
      return parseInt(prop.match(/0 0 (\d+)px/));
    } else {
      return 0;
    }
  }
  
  function stepTextShadow(fx) {
		if (fx.state == 0) {
			fx.start = currentRadius(fx.elem);
		}

		with(fx.end) {
      updatedRadius = begin ?
        parseInt(radius * fx.pos) :
        parseInt(radius - (radius * fx.pos))
  		fx.elem.style['text-shadow'] = color + ' 0 0 ' + updatedRadius + 'px';
		}
  }
  
  function addGlow(opts) {
    var opts = parseOptions(opts || { });

    function startGlow() {
      $(this).stop();
      $(this).animate({
        color: opts.TEXT_COLOR,
        textShadow: {
          begin: true,
          color: opts.HALO_COLOR,
          radius: opts.RADIUS
        }
      }, opts.DURATION);
    }

    function startFade() {
      $(this).stop();
      $(this).animate({
        color: $(this).data('glow.originColor'),
        textShadow: {
          begin: false,
          color: opts.HALO_COLOR,
          radius: opts.RADIUS
        }
      }, opts.DURATION);
    }
    
    with($(this)) {
      bind('mouseenter', startGlow);
      bind('mouseleave', startFade);
      data('glow.originColor', css('color'));
    }
    
    return this;
  }
  
  $.fx.step['textShadow'] = stepTextShadow;
  $.fn.addGlow = addGlow;
})(jQuery);