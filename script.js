/*
 *  yahiarefaiea-official-website-beta 1.0.0
 *  
 *  I’m a 21 years old handsome guy who grows up in a small town in Syria.
 *  http://beta.yahiarefaiea.com/
 *  hello@yahiarefaiea.com
 *  
 *  Last update on: 2018/10/24
 *  ©2018 Yahia Refaiea. all rights reserved.
 */

$(document).ready(function () {
  var input = $('.field').find('input, textarea');
  input.keyup(function () {
    inputTest(this);
  });
});

function inputTest(that) {
  var field = $(that).closest('.field');
  var form = $(that).closest('form, .form');
  var length = $.trim($(that).val()).length;

  //  FILLED
  if (length > 0) field.addClass('filled');else field.removeClass('filled');

  //  VALIDATED
  if (length >= 4) {
    field.addClass('validated');
    form.addClass('validated');
  } else {
    field.removeClass('validated');
    form.removeClass('validated');
  }
}
var Timer = {
  length: null,
  time: null,
  selector: null,
  interval: null,
  callback: null,

  //  RUN
  run: function (selector, callback, length) {
    Timer.length = length;
    Timer.time = Timer.length;
    Timer.selector = selector;
    Timer.callback = callback;
    $(Timer.selector).text(Timer.length);
    Timer.interval = setInterval(Timer.count, 1000);
  },

  //  COUNT
  count: function () {
    Timer.time = Timer.time - 1;
    $(Timer.selector).text(Timer.time);
    if (Timer.time <= 0) {
      if (typeof Timer.callback === 'function' && Timer.callback) Timer.callback();
      Timer.reset();
    }
  },

  //  RESET
  reset: function () {
    clearInterval(Timer.interval);
    Timer.length = null;
    Timer.time = null;
    Timer.selector = null;
    Timer.interval = null;
    Timer.callback = null;
  }
};
var Identity = {
  duration: 1400,
  delay: 500,
  iteration: 0,
  processing: false,
  enough: false,
  interval: null,
  callback: null,
  status: 'loading',
  id: '#identity',
  selector: '#identity div',
  classes: 'working rest robot',

  //  WORK
  work: function () {
    if (Identity.status != 'loading') Identity.status = 'working';
    Identity.wait(function () {
      $(Identity.id).addClass('working');
    });
  },

  //  ROBOT
  robot: function () {
    Identity.status = 'robot';
    Identity.wait(function () {
      $(Identity.id).addClass('robot');
    });
  },

  //  REST
  rest: function () {
    Identity.abort();
    Identity.status = 'rest';
    setTimeout(function () {
      Identity.abort();
      $(Identity.id).addClass('rest');
    }, Identity.delay);
  },

  //  WAIT
  wait: function (call) {
    if (Identity.processing != true) {
      Identity.abort();
      Identity.processing = true;

      setTimeout(function () {
        if (typeof call === 'function' && call) call();
        Identity.waiting();
        Identity.interval = setInterval(Identity.waiting, Identity.duration);
      }, Identity.delay);
    }
  },

  //  WAITING
  waiting: function () {
    if (Identity.enough != true) {
      ++Identity.iteration;
      return;
    }

    Identity.stopping();
  },

  //  STOP
  stop: function (callback) {
    setTimeout(function () {
      if (Identity.processing == true) {
        Identity.enough = true;
        Identity.callback = callback;

        $(Identity.selector).attr('style', 'animation-iteration-count: ' + Identity.iteration + '; -webkit-animation-iteration-count: ' + Identity.iteration + ';');
      }
    }, Identity.delay);
  },

  //  STOPPING
  stopping: function () {
    clearInterval(Identity.interval);
    Identity.rest();

    if (typeof Identity.callback === 'function' && Identity.callback) Identity.callback();
    Identity.reset();
  },

  //  ABORT
  abort: function () {
    if (Identity.status == 'robot') $(Identity.id).removeClass('robot');else if (Identity.status != 'loading' && Identity.processing != true) $(Identity.id).removeClass(Identity.classes + ' loading');else $(Identity.id).removeClass(Identity.classes);
  },

  //  RESET
  reset: function () {
    Identity.iteration = 0;
    Identity.processing = false;
    Identity.enough = false;
    Identity.interval = null;
    Identity.callback = null;

    $(Identity.selector).removeAttr('style');
  }
};
var Stars = {
  canvas: null,
  context: null,
  circleArray: [],
  colorArray: ['#4c1a22', '#4c1a23', '#5d6268', '#1f2e37', '#474848', '#542619', '#ead8cf', '#4c241f', '#d6b9b1', '#964a47'],

  mouseDistance: 50,
  radius: .5,
  maxRadius: 1.5,

  //  MOUSE
  mouse: {
    x: undefined,
    y: undefined,
    down: false,
    move: false
  },

  //  INIT
  init: function () {
    this.canvas = document.getElementById('stars');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.display = 'block';
    this.context = this.canvas.getContext('2d');

    window.addEventListener('mousemove', this.mouseMove);
    window.addEventListener('resize', this.resize);

    this.prepare();
    this.animate();
  },

  //  CIRCLE
  Circle: function (x, y, dx, dy, radius, fill) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = this.radius;

    this.draw = function () {
      Stars.context.beginPath();
      Stars.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      Stars.context.fillStyle = fill;
      Stars.context.fill();
    };

    this.update = function () {
      if (this.x + this.radius > Stars.canvas.width || this.x - this.radius < 0) this.dx = -this.dx;
      if (this.y + this.radius > Stars.canvas.height || this.y - this.radius < 0) this.dy = -this.dy;

      this.x += this.dx;
      this.y += this.dy;

      //  INTERACTIVITY
      if (Stars.mouse.x - this.x < Stars.mouseDistance && Stars.mouse.x - this.x > -Stars.mouseDistance && Stars.mouse.y - this.y < Stars.mouseDistance && Stars.mouse.y - this.y > -Stars.mouseDistance) {
        if (this.radius < Stars.maxRadius) this.radius += 1;
      } else if (this.radius > this.minRadius) {
        this.radius -= 1;
      }

      this.draw();
    };
  },

  //  PREPARE
  prepare: function () {
    this.circleArray = [];

    for (var i = 0; i < 1200; i++) {
      var radius = Stars.radius;
      var x = Math.random() * (this.canvas.width - radius * 2) + radius;
      var y = Math.random() * (this.canvas.height - radius * 2) + radius;
      var dx = (Math.random() - 0.5) * 1.5;
      var dy = (Math.random() - 1) * 1.5;
      var fill = this.colorArray[Math.floor(Math.random() * this.colorArray.length)];

      this.circleArray.push(new this.Circle(x, y, dx, dy, radius, fill));
    }
  },

  //  ANIMATE
  animate: function () {
    requestAnimationFrame(Stars.animate);
    Stars.context.clearRect(0, 0, Stars.canvas.width, Stars.canvas.height);

    for (var i = 0; i < Stars.circleArray.length; i++) {
      var circle = Stars.circleArray[i];
      circle.update();
    }
  },

  //  MOUSE MOVE
  mouseMove: function (event) {
    Stars.mouse.x = event.x;
    Stars.mouse.y = event.y;
  },

  //  RESIZE
  resize: function () {
    Stars.canvas.width = window.innerWidth;
    Stars.canvas.height = window.innerHeight;
  }
};
var renderer, scene, camera, ww, wh, particles;

ww = window.innerWidth, wh = window.innerHeight;

var centerVector = new THREE.Vector3(0, 0, 0);
var previousTime = 0;
speed = 10;
isMouseDown = false;

var getImageData = function (image) {

	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;

	var ctx = canvas.getContext("2d");
	ctx.drawImage(image, 0, 0);

	return ctx.getImageData(0, 0, image.width, image.height);
};

function getPixel(imagedata, x, y) {
	var position = (x + imagedata.width * y) * 4,
	    data = imagedata.data;
	return { r: data[position], g: data[position + 1], b: data[position + 2], a: data[position + 3] };
}

var drawTheMap = function () {

	var geometry = new THREE.Geometry();
	var material = new THREE.PointCloudMaterial();
	material.vertexColors = true;
	material.transparent = true;
	for (var y = 0, y2 = imagedata.height; y < y2; y += 1) {
		for (var x = 0, x2 = imagedata.width; x < x2; x += 1) {
			if (imagedata.data[x * 4 + y * 4 * imagedata.width] > 0) {

				var vertex = new THREE.Vector3();
				vertex.x = x - imagedata.width / 2 + (500 - 440 * .5);
				vertex.y = -y + imagedata.height / 2;
				vertex.z = -Math.random() * 500;

				vertex.speed = Math.random() / speed + 0.015;

				var pixelColor = getPixel(imagedata, x, y);
				var color = "rgb(" + pixelColor.r + ", " + pixelColor.g + ", " + pixelColor.b + ")";
				geometry.colors.push(new THREE.Color(color));
				geometry.vertices.push(vertex);
			}
		}
	}
	particles = new THREE.Points(geometry, material);

	scene.add(particles);

	requestAnimationFrame(render);
};

var init = function () {
	renderer = new THREE.WebGLRenderer({
		canvas: document.getElementById("yahia"),
		antialias: true,
		alpha: true
	});
	renderer.setSize(ww, wh);

	scene = new THREE.Scene();

	camera = new THREE.OrthographicCamera(ww / -2, ww / 2, wh / 2, wh / -2, 1, 1000);
	camera.position.set(0, -20, 4);
	camera.lookAt(centerVector);
	scene.add(camera);
	camera.zoom = 1;
	camera.updateProjectionMatrix();

	imagedata = getImageData(image);
	drawTheMap();

	window.addEventListener('mousemove', onMousemove, false);
	window.addEventListener('mousedown', onMousedown, false);
	window.addEventListener('mouseup', onMouseup, false);
	window.addEventListener('resize', onResize, false);
};
var onResize = function () {
	ww = window.innerWidth;
	wh = window.innerHeight;
	renderer.setSize(ww, wh);
	camera.left = ww / -2;
	camera.right = ww / 2;
	camera.top = wh / 2;
	camera.bottom = wh / -2;
	camera.updateProjectionMatrix();
};

var onMouseup = function () {
	isMouseDown = false;
};
var onMousedown = function (e) {
	isMouseDown = true;
	lastMousePos = { x: e.clientX, y: e.clientY };
};
var onMousemove = function (e) {
	if (isMouseDown) {
		camera.position.x += (e.clientX - lastMousePos.x) / 100;
		camera.position.y -= (e.clientY - lastMousePos.y) / 100;
		camera.lookAt(centerVector);
		lastMousePos = { x: e.clientX, y: e.clientY };
	}
};

var render = function (a) {

	requestAnimationFrame(render);

	particles.geometry.verticesNeedUpdate = true;
	if (!isMouseDown) {
		camera.position.x += (0 - camera.position.x) * 0.06;
		camera.position.y += (0 - camera.position.y) * 0.06;
		camera.lookAt(centerVector);
	}

	renderer.render(scene, camera);
};

var imgData = 'data:image/png;base64, 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'

var image = document.createElement("img");
image.src = imgData;
var Submit = {

  //  DATA
  data: function (template, fields) {
    var data = {};
    for (i = 0; i < fields.length; i++) {
      var field = $(fields[i]);
      var name = field.attr('name');
      var value = field.val().replace(/(?:\r\n|\r|\n)/g, '<br>');
      data[name] = value;
    }

    return data;
  },

  //  PUSH
  push: function (form) {
    var template = $('.template[data-template=' + form + ']');
    var fields = template.find('.field input, .field textarea');

    //  WAITING
    Submit.view('[data-status=waiting]', template);

    //  AJAX
    $.ajax({
      type: 'POST',
      url: 'includes/php/' + form + '.php',
      data: { dd: JSON.stringify(Submit.data(template, fields)) },
      dataType: 'json',
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        Submit.callback('error', form, template, fields);
      },
      success: function (data) {
        Submit.callback('success', form, template, fields);
      }
    });
  },

  //  CALLBACK
  callback: function (status, form, template, fields) {
    setTimeout(function () {

      //  SUCCESS
      if (status == 'success') {
        template.find('.form .status').removeClass('current');
        fields.closest('.field').fadeOut(700);
        fields.closest('.form').find('.submit').fadeOut(700);
        Identity.stop();

        if (form == 'secret') secretAvailability = false;else if (form == 'opinion') opinionAvailability = false;

        setTimeout(function () {
          fields.closest('.form').find('.submit').remove();
          fields.closest('.field').remove();
          template.find('.form .status[data-status=success]').addClass('current');
        }, 750);
      }

      //  ERROR
      else {
          Submit.view('[data-status=error]', template);
          setTimeout(function () {
            Submit.view(':not([data-status])', template);
          }, 6000);
        }
    }, 4000);
  },

  //	VIEW
  view: function (selector, template) {
    template.find('.form .status').removeClass('current');
    template.find('.form .status' + selector).addClass('current');
  },

  //	LISTEN
  listen: function (selector) {
    $(selector).on('click', function (e) {
      if ($(this).closest('.form').hasClass('validated')) {
        var form = $(this).attr('data-form');
        Submit.push(form);
      }

      e.preventDefault();
    });
  }
};
var Router = {
	wrapper: [],
	location: null,

	//	ROUTE
	route: function (location, callback) {
		Identity.work();
		Router.location = Router.processLocation(location);

		//	ROUTES
		Router.routes(callback);
	},

	//	PROCESS LOCATION
	processLocation: function (location) {
		if (location === undefined) location = window.location.hash;

		return location.replace('#', '');
	},

	//	CALLBACK
	callback: function (callback) {
		setTimeout(function () {
			Identity.stop();
      Router.updateWrapper();
      Router.updateTemplate(Router.wrapper[0]);
      window.location.hash = Router.location;
      Router.location = null;

      //  CALLBACKS
      Router.callbacks(Router.wrapper[0]);
      if (typeof callback === 'function' && callback) callback();
		}, 200);
	},

	//	UPDATE TEMPLATE
	updateTemplate: function (template) {
		var templates = $('.template');
		var current = $('.template[data-template=' + template + ']');

		templates.removeClass('current');
		setTimeout(function () {
			templates.hide();
			current.show().addClass('current');
		}, 1120);
	},

	//	UPDATE WRAPPER
	updateWrapper: function (push, pull) {
		if (push) Router.push(push);
		if (pull) Router.pull(pull);

		var wrapper = Router.wrapper.toString().replace(/,/g, ' ');
		$('.wrapper').attr('class', 'wrapper ' + wrapper);
	},

	//	PUSH
	push: function (items) {
		items = items.split(' ');

		for (i = 0; i < items.length; i++) {
			if (!Router.wrapper.includes(items[i]) && items[i] != '') Router.wrapper.push(items[i]);
		}
	},

	//	PULL
	pull: function (items) {
		items = items.split(' ');

		for (i = 0; i < items.length; i++) {
			if (Router.wrapper.includes(items[i]) && items[i] != '') Router.wrapper.splice(Router.wrapper.indexOf(items[i]), 1);
		}
	},

	//	LISTEN
	listen: function () {
		$('.wrapper').on('click', '.router', function (e) {
			Router.route($(this).attr('href'), window[$(this).attr('data-callback')]);
			e.preventDefault();
		});

		window.addEventListener('popstate', function (e) {
			Router.route(undefined);
		});
	}
};
Router.routes = function (callback) {
  Router.wrapper = [];
  var location = Router.location.split('/').filter(Boolean);

  //  HOME
  Router.push('home');

  //  CALLBACK
  Router.callback(callback);
};
Router.callbacks = function (wrapper) {
  if (wrapper == 'secret') secret();else if (wrapper == 'opinion') opinion();else if (wrapper == 'bucketAll') bucketAll();else if (wrapper == 'notFound') notFound();
};
var secretAvailability = true;
function secret() {
  if (secretAvailability == true) {
    setTimeout(function () {
      var input = $('.template[data-template=secret] .field').find('input, textarea');

      input.focus();
      Identity.robot();
    }, Identity.duration * 1.25);
  }
}
var opinionAvailability = true;
function opinion() {
  if (opinionAvailability == true) {
    setTimeout(function () {
      var input = $('.template[data-template=opinion] .field').find('input, textarea');

      input.focus();
      Identity.robot();
    }, Identity.duration * 1.25);
  }
}
function bucketAll() {
  var list = $('.template[data-template=bucketAll] .bucketList');
  var link = list.find('li.archived a');

  //  LISTEN
  link.hover(function () {
    list.addClass('hover');
  }, function () {
    list.removeClass('hover');
  });
}
function notFound() {
  setTimeout(function () {
    Timer.run('.template[data-template=notFound] time', function () {
      Router.route('#');
    }, 5);
  }, Identity.duration * 1.25);
}

function notFoundCallback() {
  Timer.reset();
}
var md = new MobileDetect(window.navigator.userAgent);

$(document).ready(function () {
  Identity.work();
  $('.template main').mCustomScrollbar({
    theme: 'dark'
  });
});

function loadProject() {
  Router.route(undefined, function () {

    //  CALLBACK
    Router.listen();
    Submit.listen('.submit');
    if (!md.mobile()) {
      Stars.init();
      init();
    }
    setTimeout(function () {
      $('#signature').removeClass('loading');
    }, Identity.delay * 1.5);
  });
};

loadProject();