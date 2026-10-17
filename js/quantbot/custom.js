(() => {
    // HERO SLIDER
    jQuery('.js-hero').owlCarousel({
        loop: true,
        nav: true,
        dots: true,
        lazyLoad: true,
        autoplay: true,
        autoplayTimeout: 6000,
        items: 1
    });

    jQuery('.js-logo-carousel').owlCarousel({
        loop: true,
        nav: true,
        dots: true,
        lazyLoad: true,
        autoplay: true,
        autoplayTimeout: 6000,
        margin: 20,
        responsive: {
            0 : {
                items: 2,
                center: true,
                stagePadding: 50
            },
            768 :  {
                items: 3,
            },
            1024 : {
                items: 5,
                stagePadding: 0,
                margin: 40
            }
        }
    });

    // Mobile Menu
    const _mobileMenu = jQuery('.mobile-navigation');
    jQuery('.js-mobile-open').click(function(){
        _mobileMenu.addClass('open');
    });

    jQuery('.js-mobile-close').click(function(){
        _mobileMenu.removeClass('open');
    });

    if(jQuery('.faq-list').find('noncollapsible')){
        jQuery('.faq-list__item').addClass('active');
    }

    if(jQuery('.faq-list').find('timeline')){
        jQuery('.faq-list__item').addClass('active');
    }

    jQuery('.red-more-button').on('click', function(){
        jQuery(this).toggleClass('active')
        jQuery(this).prev().prev().toggleClass('hidden')
    })

    const _faqs = document.querySelectorAll('.faq-list');
    if( _faqs ) {
        _faqs.forEach( _faq => {
            const _question = _faq.querySelectorAll('.faq-question');

            _question.forEach( _toggle => {
                _toggle.addEventListener('click', e => {
                    e.preventDefault();
                    const _target = e.currentTarget;
                    const _parent = _target.parentNode;

                    _parent.classList.toggle('active');
                });
            });
        });
    }

    // LAZY LOAD IMAGES
    const _images = document.querySelectorAll('img');

	[].forEach.call( _images, image => {
	
        let _source = image.getAttribute('data-src');
		
		console.log("_source", _source);
		
		if (_source != null) {

	         image.setAttribute('src', _source);

             image.onload = () => {

                 image.removeAttribute('data-src');
				 
             }

		}
	
	});

    // Module Tab
    jQuery('.sidebar-layout button:first-child').trigger('click')
    jQuery('.sidebar-layout button:first-child').addClass('active')

    jQuery('section:not(.module--internship) .tab button.tablinks:first-child').addClass('active')
    jQuery('section:not(.module--internship) .tab button.tablinks:first-child').trigger('click')

    jQuery('#grid-content-inner').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        dots:true,
        prevArrow: false,
        nextArrow: false,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1000,
                settings: 'unslick'
            }
        ]
      });

    jQuery('.grid-layout--container').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
       loop:true,
        mobileFirst: true,
        dots:false,
        prevArrow: false,
        nextArrow: false,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 767,
                settings: 'unslick'
            }
        ]
      });

    jQuery(".mobile-navigation li.menu-item-has-children a + ul").css('display', 'none')
    jQuery(".mobile-navigation li.menu-item-has-children a").on('click',function(){
        jQuery(this).toggleClass('open-sub-menu');
       jQuery(this).next().toggle();
    });

    jQuery('.js-mobile-open').on('click', function(){
        jQuery(this).toggleClass('hidden')  
        jQuery(this).prev().toggleClass('hidden')  
    })

    jQuery('.js-mobile-close').on('click', function(){
        jQuery(this).toggleClass('hidden')  
        jQuery(this).next().toggleClass('hidden')  
    })
	
	$("body .btn").click(function(e) {
          //e.preventDefault();
          $([document.documentElement, document.body]).animate({
              scrollTop: $("#whatMakesDifferent").offset().top - 80 
          }, 1000);
      });
	
	size_li = jQuery(".wp-block-archives-list.wp-block-archives li").length;
	x_first = 8; 

	jQuery('.wp-block-archives-list.wp-block-archives li:lt('+x_first+')').show();


	
	
	jQuery( document ).ready(function() {
		 jQuery(".load-more").click(function(e) 
		 {
				 x_first = (x_first+8 <= size_li) ? x_first+8 : size_li;

				 jQuery('.wp-block-archives-list.wp-block-archives li:lt('+x_first+')').show();
				if(x_first == size_li){
					jQuery('a.load-more').hide();
				}

			   return false;
		 });
		
		  var links = document.links;
		  for (let i = 0, linksLength = links.length ; i < linksLength ; i++) {
			  if (links[i].hostname !== window.location.hostname) {
				links[i].target = '_blank';
				links[i].rel = 'noreferrer noopener';
			  }
		  }

		  if (window.location.hash === '#hero') {
			  history.replaceState(null, '', window.location.pathname + window.location.search);
		  }
	});
	

})();