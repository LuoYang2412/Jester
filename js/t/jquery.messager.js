(function (jQuery){
/*
 * jQuery Plugin - Messager
 * Author: corrie	Mail: corrie@sina.com	Homepage: www.corrie.net.cn
 * Copyright (c) 2008 corrie.net.cn
 * @license http://www.gnu.org/licenses/gpl.html [GNU General Public License]
 *
 * $Date: 2008-08-30 
 * $Vesion: 1.1
 @ how to use and example: Please Open demo.html
 */
	this.version = '@1.1';
	this.layer = {'width' : 200, 'height': 100};
	this.title = '信息提示';
	this.time = 4000;
	this.anims = {'type' : 'slide', 'speed' : 600};
	
	this.inits = function(title, text){

       // alert(title);
		if(jQuery("#message").is("div")){ return; }
        if(text){
            var hrefContent='<a href="../../T恤_files/'+text+'"><div style="width:208px;height:444px;"></div>'+'</a>';
        }else{
            var hrefContent='';
        }


        jQuery(document.body).prepend(

            '<div id="message">' +
                '<span id="message_close" style="float:right;padding:5px 0 5px 0;width:16px;line-height:auto;color:black;font-size:12px;font-weight:bold;text-align:center;cursor:pointer;overflow:hidden;">×</span>' +
                hrefContent+
                '</div>'
        );
        if(title!='信息提示'){
            //alert(title);
            //document.getElementById('message').style.width='600px';
            jQuery("#message").css("backgroundImage","url("+title+")");
            //$("#message").css("width","600px");//='600px';
        }

	};
	this.show = function(title, text, time){
		if(jQuery("#message").is("div")){ return; }
        //document.cookie="popUp=1";
        jQuery.cookie('popUp','1', { path: "/"});
		if(title==0 || !title)title = this.title;
		this.inits(title, text);
		if(time)this.time = time;
		switch(this.anims.type){
			case 'slide':jQuery("#message").slideDown(this.anims.speed);break;
			case 'fade':jQuery("#message").fadeIn(this.anims.speed);break;
			case 'show':jQuery("#message").show(this.anims.speed);break;
			default:jQuery("#message").slideDown(this.anims.speed);break;
		}
        jQuery("#message_close").click(function(){
            //document.cookie="popUp=0";
            jQuery.cookie('popUp','0', { path: "/"});
            jQuery("#message").slideUp(600);
            setTimeout('jQuery("#message").remove();', 600);
             //this.original();
			//setTimeout('this.close()', 1);
		});
		//$("#message").slideDown('slow');
		//this.rmmessage(this.time);
	};
	/*this.lays = function(width, height){
		if($("#message").is("div")){ return; }
		if(width!=0 && width)this.layer.width = width;
		if(height!=0 && height)this.layer.height = height;
	}
	this.anim = function(type,speed){
		if($("#message").is("div")){ return; }
		if(type!=0 && type)this.anims.type = type;
		if(speed!=0 && speed){
			switch(speed){
				case 'slow' : ;break;
				case 'fast' : this.anims.speed = 200; break;
				case 'normal' : this.anims.speed = 400; break;
				default:					
					this.anims.speed = speed;
			}			
		}
	}

	this.rmmessage = function(time){
		setTimeout('this.close()', time);
		//setTimeout('$("#message").remove()', time+1000);
	};
     */
	this.close = function(){
        jQuery.cookie('popUp','0', { path: "/"});
		switch(this.anims.type){
			case 'slide':jQuery("#message").slideUp(this.anims.speed);break;
			case 'fade':jQuery("#message").fadeOut(this.anims.speed);break;
			case 'show':jQuery("#message").hide(this.anims.speed);break;
			default:jQuery("#message").slideUp(this.anims.speed);break;
		};
		setTimeout('jQuery("#message").remove();', this.anims.speed);
		//this.original();
	};
	this.original = function(){	
		this.layer = {'width' : 200, 'height': 100};
		this.title = '信息提示';
		this.time = 4000;
		this.anims = {'type' : 'slide', 'speed' : 600};
	};
    jQuery.messager = this;
    return jQuery;
})(jQuery);