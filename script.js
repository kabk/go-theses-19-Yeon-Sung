
	function makeNewPosition() {
		 // Get viewport dimensions (remove the dimension of the div)
		 var h = $(window).height() - 50;
		 var w = $(window).width() - 50;
		 var nh = Math.floor(Math.random() * h);
		 var nw = Math.floor(Math.random() * w);
		 return [nh, nw];
	}

	function animateDiv(element) {
		 var newq = makeNewPosition();
		 var oldq = $(element).offset();
		 var speed = calcSpeed([oldq.top, oldq.left], newq);
		 $(element).animate({
			  top: newq[0],
			  left: newq[1]
		 }, speed, function() {
			  animateDiv(element);
		 });
	};

	function calcSpeed(prev, next) {
		 var x = Math.abs(prev[1] - next[1]);
		 var y = Math.abs(prev[0] - next[0]);
		 var greatest = x > y ? x : y;
		 var speedModifier = 0.1;
		 var speed = Math.ceil(greatest / speedModifier);
		 return speed;
	}

	$(document).ready(function() {

		$('img').unveil(0, function() {
			$(this).closest('.divtoshow').css('display', 'none');
		});

		 // Images on Hover (thanks Christian)
		 if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
			  $('.divtoshow img').css('width', '100vw');
			  $('.word').on('click', function() {
					divName = '.divtoshow[data-image="' + $(this).data('image') + '"]';
					$(divName).css('position', 'static');
					// Affichage / cacher
					if ($(divName).hasClass('clicked')) {
						 $(divName).removeClass('clicked');
						 $(divName).css('display', 'none');
					} else {
						 $(divName).addClass('clicked');
						 $(divName).css('display', 'block');
					}
			  });
			  $('.divtoshow').on('click', function() {
					$(this).removeClass('clicked');
					$(this).css('display', 'none');
			  });


			  	$(".section").click(function (event) {
			  		function goToAnchor(element) {
			  			anchorTop = $(element).offset().top;
						$('.main').stop().animate({
			            	scrollTop: anchorTop + $('.main').scrollTop()
			         	}, 1000);
			         	event.preventDefault();
				 	}

				 	if ($(this).hasClass('menu')) {
				 		sections = $('.section[data-menu="'+$(this).data('menu')+'"]:not(.menu)');
						if (sections.hasClass('fold')) {
							// Je déplie un menu
							sections.removeClass('fold').addClass('unfold').fadeIn(200);
							$('.footer').removeClass('footer-extended');
							goToAnchor(this);
							$("img").trigger("unveil");
						} else {
							// Je plie un menu
							sections.addClass('fold').removeClass('unfold').fadeOut(200, function() {
								allFold = true;
								$('.section:not(.header-section):not(.menu)').each(function() {
									if ($(this).hasClass('unfold')) {
										allFold = false;
										return false;
									};
								});
								if (allFold) {
									$('.footer').addClass('footer-extended');
								}
							});
						}
				 	} else {
				 		/*goToAnchor(this);*/
				 	}
				 	e.preventDefault();
			 	});


			  // Verticalscroll
			  $('.main .part li').click(function() {
					$('.main .part li').removeClass('selected');
					$(this).addClass('selected');
			  });
			  
			  $('.main').mousewheel(function(e, delta) {
					this.scrollTop -= (delta * 130);
					e.preventDefault();
			  });



			// BACK TO TOP
			$('.c').on('click', function() {
				$('.main').stop().animate({
					scrollTop: 0
				}, 1000);
			});

		 } else {
			  var divName = '.divtoshow'; // div that is to follow the mouse (must be position:absolute)
			  var offX = 15; // X offset from mouse position
			  var offY = 15; // Y offset from mouse position
			  function mouseX(evt) {
					if (!evt) evt = window.event;
					if (evt.pageX) return evt.pageX;
					else if (evt.clientX) return evt.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
					else return 0;
			  }

			  function mouseY(evt) {
					if (!evt) evt = window.event;
					if (evt.pageY) return evt.pageY;
					else if (evt.clientY) return evt.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
					else return 0;
			  }
			  // Mouseover
			  $('.word').on('mouseover', function() {
					divName = '.divtoshow[data-image="' + $(this).data('image') + '"]';
					$(divName).css('display', 'block');
			  });
			  // Mouseout
			  $('.word').on('mouseout', function() {
					$(divName + ':not(.clicked)').css('display', 'none');
			  });
			  // Mousemove
			  $(document).on('mousemove', function(event) {
					$(divName + ':not(.clicked)').css('left', mouseX(event) + offX);
					$(divName + ':not(.clicked)').css('top', mouseY(event) + offY);
			  });
			  // Horizontalscroll
			  $('.section').click(function() {
					$('.section').removeClass('selected');
					$(this).addClass('selected');
			  });
			  $('.main').mousewheel(function(e, delta) {
					this.scrollLeft -= (delta * 50);
					e.preventDefault();
			  });

			// Retour au début
			$('.c').on('click', function() {
				$('.main').stop().animate({
					scrollLeft: 0
				}, 1000);
			});

			  	$(".section").click(function (event) {

			  		function goToAnchor(element) {
			  			anchorLeft = $(element).offset().left;
						$('.main').stop().animate({
			            	scrollLeft: anchorLeft + $('.main').scrollLeft()
			         	}, 1000);
			         	event.preventDefault();
			  		}

			  		if ($(this).hasClass('menu')) {
				 		sections = $('.section[data-menu="'+$(this).data('menu')+'"]:not(.menu)');
						if (sections.hasClass('fold')) {
							// Je déplie un menu
							sections.removeClass('fold').addClass('unfold').fadeIn(200);
							$('.footer').removeClass('footer-extended');
							goToAnchor(this);
							$("img").trigger("unveil");
						} else {
							// Je plie un menu
							sections.addClass('fold').removeClass('unfold').fadeOut(200, function() {
								allFold = true;
								$('.section:not(.header-section):not(.menu)').each(function() {
									if ($(this).hasClass('unfold')) {
										allFold = false;
										return false;
									};
								});
								if (allFold) {
									$('.footer').addClass('footer-extended');
								}
							});
						}
				 	} else {
				 		goToAnchor(this);
				 	}
			 	});
		 	}

	 	$('.link').on('click', function(event) {
	 		event.stopImmediatePropagation();
	 	});

	 	animateDiv('.a');
		animateDiv('.b');
		animateDiv('.c');
	});