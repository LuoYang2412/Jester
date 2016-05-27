var DropDown = {
    self : null,
    sort_timeout : null,
    sort_display : false,

    filter_timeout : null,
    filter_display : false,

    change_filter_timeout : null,

    init : function()
    {
        //no need to popup!
       // return ;

        var self = this;
        //====================== sort by init ============================
        jQuery('.sort-by-title').on('click', function(){
            clearTimeout(self.sort_timeout);
            if(self.sort_display){
                self.sort_hide();
            } else{
                self.sort_show();
            }
        });

        jQuery('.sort-by-title').on('mouseover', function() {
            clearTimeout(self.sort_timeout);
            self.sort_timeout = setTimeout(function(){
                self.sort_show();
            }, 500);
        });

        jQuery('.sort-by-title').on('mouseleave', function() {
            clearTimeout(self.sort_timeout);
            self.sort_timeout = setTimeout(function(){
                self.sort_hide();
            }, 100);
        });

        jQuery('.sort-by').on('mouseover', function() {
            clearTimeout(self.sort_timeout);
        });

        jQuery('.sort-by').on('mouseleave', function() {
            clearTimeout(self.sort_timeout);
            self.sort_timeout = setTimeout(function(){
                self.sort_hide();
            }, 100);
        });

        // ===================== filter by init ===============================

        jQuery('.block-subtitle').on('click', function(){
            clearTimeout(self.filter_timeout);
            if(self.filter_display){
                self.filter_hide();
            }
            else{
                self.filter_show(1);
            }
        });

        //jQuery('.block-subtitle').on('mouseover', function() {
        //    clearTimeout(self.filter_timeout);
        //    self.filter_timeout = setTimeout(function(){
        //        self.filter_show(1);
        //    }, 500);
        //});

        //jQuery('.block-subtitle').on('mouseleave', function() {
        //    clearTimeout(self.filter_timeout);
        //    self.filter_timeout = setTimeout(function(){
        //        self.filter_hide();
        //    }, 100);
        //});

        jQuery('.block-layered-nav #narrow-by-list').on('mouseover', function() {
            clearTimeout(self.filter_timeout);
        });

        //jQuery('.block-layered-nav #narrow-by-list').on('mouseleave', function() {
        //    clearTimeout(self.filter_timeout);
        //    self.filter_timeout = setTimeout(function(){
        //        self.filter_hide();
        //    }, 100);
        //});
    },

    // ===================== filter by functions ===============================
    sort_show : function ()
    {
        var self = this;
        jQuery('.sort-by-title').addClass('active');
        //jQuery('#site-hidder').fadeIn();
        jQuery('.sort-by-holder').stop(true, true).slideDown('normal', function(){
            self.sort_display = true;
        });
    },

    sort_hide : function()
    {
        var self = this;
        jQuery('.sort-by-title').removeClass('active');
        jQuery('.sort-by-holder').stop(true, true).slideUp('normal', function(){
            self.sort_display = false;
        });
        //jQuery('#site-hidder').fadeOut();
    },

    // ===================== filter by functions ===============================
    filter_show : function (animate)
    {
        var self = this;
        if(!animate)
        {
            jQuery('.block-subtitle').addClass('active');
            jQuery('#site-hidder').show('fast');
            jQuery('.block-layered-nav .block-content').css('display','block');
        }
        else
        {
            jQuery('.block-subtitle').addClass('active');
            jQuery('#site-hidder').fadeIn();
            jQuery('.block-layered-nav .block-content').stop(true, true).slideDown('normal', function(){self.filter_display = true});
        }
        self.filter_display = true;
        //self.filter_timeout = setTimeout(function(){
        //    self.filter_hide();
        //}, 30000);
    },

    filter_hide : function()
    {
        var self = this;
        jQuery('.block-subtitle').removeClass('active');
        jQuery('.block-layered-nav .block-content').stop(true, true).slideUp('normal', function(){self.filter_display = false;});
        jQuery('#site-hidder').fadeOut();
    },

    changeFilter : function(url)
    {
        setLocation(url);
        //toDo disable checkbox ?
    }
};

jQuery(function($){

    //loader
    //jQuery('.col-main').css({'opacity':0}); //moved to CSS
    jQuery('.site-loader').show();
    // filters and sorters init //
    DropDown.init();

    // =============== quick navigation buttons behavior ================
    jQuery('.explore-more-btn').on('click', function(){
        jQuery('html,body').stop(true, false).animate({scrollTop : '+=' + jQuery(window).height()},'slow');
    });
    jQuery('.back-btn').on('click', function(){
        jQuery('html,body').stop(true, false).animate({scrollTop : '-=' + jQuery(window).height()},'slow');
    });

    $(window).load(function(){
        $('.explore-more-btn').fadeIn('slow');
    });

    // ================= product grid image ========================
    if(!Mobile.yes){
		jQuery(".products-grid, .products-list, .mini-products-list").on("mouseenter", ".item", function() {
			if(jQuery(this).find(".img-1").css('background-image') != 'none') {
				jQuery(this).find(".img-1 img").css("opacity","0");
			}
		}).on("mouseleave", ".item", function() {
			jQuery(this).find(".img-1 img").css("opacity","1");
		});
    }
    // =================================================================

    $(window).scroll(function(){
        if(window.pageYOffset > 100){
            $('.explore-more-btn').addClass('little');
            $('.back-btn').fadeIn(100);
        }
        else{
            $('.explore-more-btn').removeClass('little');
            $('.back-btn').fadeOut(100);
        }
        if(window.pageYOffset == jQuery(document).height() - jQuery(window).height())
        {
            jQuery('.explore-more-btn').hide();
        }
        else
        {
            jQuery('.explore-more-btn').show();
        }
    });

});

jQuery(window).load(function(){
    //loader
    jQuery('.col-main').stop(true, true).animate({opacity: 1}, 'fast');
    jQuery('.site-loader').fadeOut('fast');
});


//Javascript to expand parent categories
jQuery(window).load(function(){
    try {
        if ($$('.categorymenu_entity_' + category_menu_page).first().innerHTML == "New Arrivals") {
            $$('.categorymenu_entity_' + category_menu_page).first().up('.level1').next().down().simulate('click');
        }
        else {
            $$('.categorymenu_entity_' + category_menu_page).first().up('.level1').down().simulate('click');
            $$('.categorymenu_entity_' + category_menu_page).first().up().simulate('click');
            jQuery('.categorymenu_entity_' + category_menu_page).parent().parent().parent().children('a').click()
        }
    }
    catch(Err) {
        console.log("Error in expanding category");
        console.log(Err);
    }
});
