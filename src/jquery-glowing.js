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

    updatedRadius = fx.end.begin ?
      Math.max(Math.min(parseInt(fx.end.radius * fx.pos))) :
      Math.max(Math.min(parseInt(fx.end.radius - (fx.end.radius * fx.pos))))

    if (fx.end.begin || (fx.state < 1)) {
      fx.elem.style['text-shadow'] = fx.end.color + ' 0 0 ' + updatedRadius + 'px';
    } else {
      fx.elem.style['text-shadow'] = 'none';
    }
  }

  function addGlow(opts) {
    var opts = parseOptions(opts || { });

    function startGlow() {
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
