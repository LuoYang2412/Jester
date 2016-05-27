var flx1=function(cnf){var dataQueue=[];var flushDataTimeout=null;var pixelBacklog=[];function placePixel(e){if(typeof navigator.onLine!=="undefined"&&navigator.onLine===false){pixelBacklog.push(e);return}if(pixelBacklog.length>0){for(var k in pixelBacklog){if(pixelBacklog.hasOwnProperty(k)){_placePixel(pixelBacklog[k])}}pixelBacklog=[]}return _placePixel(e)}function _placePixel(e){var t=document,n=t.createElement("script");n.async=!0,n.defer=!0,n.src=e,t.getElementsByTagName("head")[0].appendChild(n);return true}function pxl(e){var url=_getUrl(e);placePixel(url)}function _getUrl(e){var url="//"+flx1.cnf.d+e+getAdditionalParams()+"&r="+encodeURIComponent(document.referrer)+"&eurl="+encodeURIComponent(document.location.href)+"&rndm="+Math.random()*1e16;return url}function sendData(k,v,customData,onFlush){dataQueue.push({k:k,v:v,custom:typeof customData==="undefined"||customData===null?false:customData});if(flushDataTimeout!==null){clearTimeout(flushDataTimeout)}flushDataTimeout=setTimeout(function(){flushData();if(typeof onFlush==="function"){onFlush()}},100)}function flushData(){var url=flushDataUrl();if(url!==null){flx1.pxl(url)}}function flushDataUrl(){flushDataTimeout=null;if(dataQueue!==null&&dataQueue.length>0){var maxUrlLen=2048;var baseUrl="/px?id="+flx1.cnf.id+"&m="+flx1.cnf.m;var url=baseUrl;var customData={};var customDataStr="";for(var k in dataQueue){if(dataQueue.hasOwnProperty(k)){try{var elm=dataQueue[k];if(elm.custom===true){customData[elm.k]=elm.v;customDataStr="&data="+encodeURIComponent(toJson(customData))}else{url+="&"+elm.k+"="+encodeURIComponent(elm.v)}if(url.length+customDataStr.length>=maxUrlLen){flx1.pxl(url+customDataStr);url=baseUrl}}catch(e){flx1.log(e)}}}dataQueue=[];if(url!==baseUrl||customDataStr!==""){return url+customDataStr}}return null}function toJson(obj){if(window.Prototype){var toJSON=Array.prototype.toJSON;delete Array.prototype.toJSON}var json=JSON.stringify(obj);if(window.Prototype){Array.prototype.toJSON=toJSON}return json}function log(e){window.console&&console.log&&console.log(e);try{var errData={};if(typeof e!=="undefined"&&typeof e!==null){errData["err_msg"]=e.toString();if(typeof e["stack"]!=="undefined"&&e["stack"]!==null){errData["err_stack"]=e.stack.toString()}errData["err_pixel_id"]=cnf.id;errData["err_customer_id"]=cnf.m}_placePixel("https://go.flx1.com/px?id=6864&m=11&data="+encodeURIComponent(toJson(errData)))}catch(forwardE){window.console&&console.log&&console.log(forwardE)}}function findCurrentScriptUrl(){var ret="";var scripts=document.getElementsByTagName("script");var searchString="/"+cnf.m+"-"+cnf.id+".js";for(var i=0,j=scripts.length;i<j;i++){if(scripts[i].src&&scripts[i].src.indexOf(searchString)!==-1){return scripts[i].src}}return ret}function getUrlParams(url){var urlParams={};if(!url){url=findCurrentScriptUrl()}if(url&&url.indexOf("?")!==-1){var match,pl=new RegExp("[+]","g"),search=new RegExp("([^&=]+)=?([^&]*)","g"),decode=function(s){return decodeURIComponent(s.replace(pl," "))},query=url.split("?")[1];while(match=search.exec(query)){urlParams[decode(match[1])]=decode(match[2])}}return urlParams}function getAdditionalParams(){var additionalParams="";var urlParams=getUrlParams();var paramsToSkip={m:1,id:1,d:1};for(var p in urlParams){if(urlParams.hasOwnProperty(p)){if(!paramsToSkip[p]){additionalParams+="&"+p+"="+encodeURIComponent(urlParams[p])}}}return additionalParams}function loadScript(a,b){var c=document.createElement("script");c.async=true,c.readyState?c.onreadystatechange=function(){if(c.readyState==="loaded"||c.readyState==="complete")c.onreadystatechange=null,b&&b()}:c.onload=function(){b&&b()},c.src=a,document.getElementsByTagName("head")[0].appendChild(c)}function loadjQuery(callback){if(typeof jQuery!=="undefined"){try{var version=jQuery.fn.jquery;var versionSplit=version.split(".");if(versionSplit.length>=2&&parseInt(versionSplit[0],10)===1&&parseInt(versionSplit[1],10)>=6){window.flx1_jQuery=window.jQuery}}catch(e){flx1.log(e)}}if(typeof window.flx1_jQuery==="undefined"){loadScript("//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js",function(){window.flx1_jQuery=jQuery.noConflict(true);callback(window.flx1_jQuery)})}else{callback(window.flx1_jQuery)}}if(typeof window.navigator.sendBeacon==="function"){var finalFlush=function(){try{var dataUrl=flushDataUrl();if(dataUrl!==null){var url=_getUrl(dataUrl);if(url!==null){navigator.sendBeacon(url)}}}catch(e){flx1.log(e)}};window.addEventListener("unload",finalFlush,false)}var registeredModules={};function registerModule(id,func){try{if(typeof registeredModules[id]!=="undefined"){flx1.log("Module "+id+" already registered, overwriting with new instance")}if(typeof func!=="function"){flx1.log("Not a function for "+id);return}registeredModules[id]=func}catch(e){flx1.log(e)}}function loadModule(id){try{if(typeof registeredModules[id]!=="function"){flx1.log("No function registered for "+id);return}registeredModules[id]()}catch(e){flx1.log(e)}}return{pxl:pxl,_pxl:placePixel,cnf:cnf,log:log,data:sendData,getUrlParams:getUrlParams,jQuery:loadjQuery,loadScript:loadScript,registerModule:registerModule,loadModule:loadModule}}({id:"5009",m:"4",d:"go.flx1.com"});flx1.pxl("/px?id="+flx1.cnf.id+"&m="+flx1.cnf.m);(function(){function getTextContentExceptScript(element){var text=[];var self=arguments.callee;var el,els=element.childNodes;var nodeType={element:1,text:3};for(var i=0,iLen=els.length;i<iLen;i++){el=els[i];if(el.nodeType===nodeType.element&&el.tagName&&el.tagName.toLowerCase()!=="script"&&el.tagName.toLowerCase()!=="noscript"&&el.tagName.toLowerCase()!=="style"){text.push(self(el))}else if(el.nodeType===nodeType.text){text.push(el.data)}}return text.join(" ").replace(/\s{2,}/g," ").replace(/^\s\s*/,"").replace(/\s\s*$/,"")}function getCookie(key,def){var name=key+"=";var ca=document.cookie.split(";");for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)===" ")c=c.substring(1);if(c.indexOf(name)===0)return c.substring(name.length,c.length)}return def}function setCookie(key,value,expires){var cookie=key+"="+value+";path=/";if(expires!==undefined){cookie+=";expires="+expires}document.cookie=cookie}function loadScript(a,b){return flx1.loadScript(a,b)}function loadImage(source){!function(n){n.onload=function(){},n.src=source}(new Image)}function loadIframe(source){var iframe=document.createElement("iframe");iframe.src=source;iframe.width=1;iframe.height=1;iframe.frameBorder=0;iframe.style.display="none";document.getElementsByTagName("body")[0].appendChild(iframe)}function loadjQuery(callback){return flx1.jQuery(callback)}function executeAfter(times,callback){return{count:0,seen:[],next:function(id){if(typeof id!=="undefined"){if(window.flx1_jQuery.inArray(id,this.seen)!==-1){return}this.seen.push(id)}this.count++;if(this.count===times){callback()}}}}var _mutationObserverInstance=null;var _mutationObserverCallbacks={};function getMutationObserver(key,callback){if(_mutationObserverCallbacks.hasOwnProperty(key)===false){_mutationObserverCallbacks[key]=callback}if(_mutationObserverInstance===null){try{var MutationObserver=window.MutationObserver||window.WebKitMutationObserver;_mutationObserverInstance=new MutationObserver(function(){for(var i in _mutationObserverCallbacks){_mutationObserverCallbacks[i]()}}).observe(document,{subtree:true,attributes:true,childList:true})}catch(e){flx1.log(e)}}return _mutationObserverInstance}function getInteractionValue(options){var interactionValue="0";if(options.hasOwnProperty("assign_value")){interactionValue=options.assign_value;if(typeof interactionValue==="string"){interactionValue=interactionValue.replace(/,/g,".")}}return interactionValue}function getExpirationValue(options){var expiration=false;if(options.hasOwnProperty("expiration")){expiration=options.expiration}var expirationValue=0;if(expiration){if(options.hasOwnProperty("expiration_value")&&options.hasOwnProperty("expiration_unit")){expirationValue=parseInt(options.expiration_value,10);var expirationUnit=options.expiration_unit;switch(expirationUnit){case"minutes":expirationValue=expirationValue*60;break;case"hours":expirationValue=expirationValue*60*60;break;case"days":expirationValue=expirationValue*60*60*24;default:break}}}return expirationValue}function populateExternalPixels(options,type){window.flx1_jQuery(function(){if(options.populate_external_pixels){document.write=document.writeln=function(html){var hiddenElement=window.flx1_jQuery("body").find("#flx1");if(hiddenElement.length===0){hiddenElement=window.flx1_jQuery('<div id="flx1" style="display: none;"></div>');window.flx1_jQuery("body").append(hiddenElement)}hiddenElement.append(html)};try{if(options.hasOwnProperty("external_pixel_url")){var externalPixelUrl=options.external_pixel_url;if(externalPixelUrl.length>0){var externalPixelUrlType=options.external_pixel_url_type;if(externalPixelUrlType==="script"){loadScript(externalPixelUrl)}else if(externalPixelUrlType==="image"){loadImage(externalPixelUrl)}else if(externalPixelUrlType==="iframe"){loadIframe(externalPixelUrl)}}}if(options.hasOwnProperty("external_pixel_script")){var externalPixelScript=options.external_pixel_script;if(externalPixelScript.length>0){try{if(externalPixelScript.trim().indexOf("<script")===-1){externalPixelScript="<script>"+externalPixelScript+"</script>"}window.flx1_jQuery("head").append(externalPixelScript)}catch(e){flx1.log(e)}}}}catch(e){flx1.log(e)}if(options.hasOwnProperty("externalPixels")){var pixels=options.externalPixels;for(var i in pixels){if(pixels.hasOwnProperty(i)){var pixel=pixels[i];if(options.hasOwnProperty("platform")){var platform=options.platform;switch(platform){case"appnexus":if(type==="segment"){loadScript("https://secure.adnxs.com/seg?add="+pixel+"&t=1")}else if(type==="conversion"){loadScript("https://secure.adnxs.com/px?id="+pixel+"&t=1")}break;case"google":var axel=Math.random()+"";var a=axel*1e13;var source="https://"+pixel+".fls.doubleclick.net/activityi;src="+pixel+";type=invmedia;cat=wnvjf0w9;ord="+a+"?";loadIframe(source);break;default:flx1.log("Unsupported platform: "+platform);break}}}}}}})}function checkAndDropConversionCountCookie(conversionCountKey,options){var firePixel=true;var conversionCountExpiresKey=conversionCountKey+"_expires";var conversionCount=parseInt(getCookie(conversionCountKey,0),10);var conversionCountType=options.conversion_count_type;switch(conversionCountType){case"one_per_user":if(conversionCount>0){firePixel=false}else if(conversionCount===0){var date=new Date;date.setFullYear(date.getFullYear()+1);setCookie(conversionCountKey,1,date.toUTCString())}break;case"all_per_user":break;case"custom_per_user":if(options.hasOwnProperty("custom_conversion_count_per")&&options.hasOwnProperty("custom_conversion_count_number")&&options.hasOwnProperty("custom_conversion_count_unit")){var conversionCountPer=parseInt(options.custom_conversion_count_per,10);var conversionCountNumber=parseInt(options.custom_conversion_count_number,10);var conversionCountUnit=options.custom_conversion_count_unit;switch(conversionCountUnit){case"minutes":conversionCountNumber=conversionCountNumber*60;break;case"hours":conversionCountNumber=conversionCountNumber*60*60;break;case"days":conversionCountNumber=conversionCountNumber*60*60*24;default:break}if(conversionCount>conversionCountPer){firePixel=false}else{var date=new Date;date.setTime(date.getTime()+conversionCountNumber*1e3);if(conversionCount===0){setCookie(conversionCountExpiresKey,date.getTime(),date.toUTCString())}else{date.setTime(getCookie(conversionCountExpiresKey,date.getTime()))}setCookie(conversionCountKey,conversionCount+1,date.toUTCString())}}break}return firePixel}function doCheck(checks){try{for(var x in checks){if(checks.hasOwnProperty(x)){var check=checks[x];if(check.hasOwnProperty("options")){for(var y in check.options){if(check.options.hasOwnProperty(y)){try{check.options[y].check()}catch(e){flx1.log(e)}}}}}}}catch(e){flx1.log(e)}}loadjQuery(function($){var FLXurl={contains:function(query){return window.location.href.toLowerCase().indexOf(query.toLowerCase())!==-1},doesNotContain:function(query){return!FLXurl.contains(query)},equals:function(query){return window.location.href.toLowerCase()===query.toLowerCase()},doesNotEqual:function(query){return!FLXurl.equals(query)},startsWith:function(query){return window.location.href.toLowerCase().substring(0,query.length)===query.toLowerCase()},endsWith:function(query){return window.location.href.toLowerCase().substring(window.location.href.length-query.length)===query.toLowerCase()},regex:function(query){return new RegExp(query,"i").test(window.location.href)}};var FLXpagesource={contains:function(query){return document.documentElement.innerHTML.toLowerCase().indexOf(query.toLowerCase())!==-1},doesNotContain:function(query){return!FLXpagesource.contains(query)},regex:function(query){return new RegExp(query,"i").test(document.documentElement.innerHTML)}};(function(){var executor=executeAfter(1,function(){var options={rule_name:"Segment",populate_external_pixels:true,platform:"custom",segment_pixel_advertiser:"",external_pixel_url:"",external_pixel_script:"(function() {\n	var loadScript = function (a,b){var c=document.createElement(\"script\");c.async=true,c.readyState?c.onreadystatechange=function(){if(c.readyState==\"loaded\"||c.readyState==\"complete\")c.onreadystatechange=null,b&&b()}:c.onload=function(){b&&b()},c.src=a,document.getElementsByTagName(\"head\")[0].appendChild(c)};\n	var waitUntilLoaded = function(toTest, callback) {\n		var count = 0;\n		var waitUntilLoadedInner = function(toTest, callback) {\n			var val = toTest();\n			if(!val) {\n				count++;\n				if(count < 100) { // 10 seconds\n					setTimeout(function(){ waitUntilLoadedInner(toTest, callback); }, 100);\n				}\n				return;\n			}\n			callback(val);\n		};\n		waitUntilLoadedInner(toTest, callback);\n	};\n	function getValueInner($, cssPath, getImage) {\n		if(cssPath) {\n			var el = $(''+cssPath);\n			if(el && el.length) {\n				if(el[0].tagName && el[0].tagName.toLowerCase() == 'embed') { // this is flash, try to extract image from flash vars\n					var f = el.attr('flashvars');\n					if(f && f.indexOf('http') != -1) {\n						return f.match(/(http|https)(?:(?!\\&).)*/g)[0];\n					}\n				}\n				if(el.attr('src')) { // this is probably an image\n					return el[0].src;\n				}\n				if(getImage) { // we always want an image\n					var patt=/\\\"|\\'|\\)|\\(|url/g; //regex to remove enclosing url()\n\n					if(el.css('background-image') && el.css('background-image') != \"none\") {\n						return el.css('background-image').replace(patt,'');\n					} else if($(el[0].parentNode).css('background-image') && $(el[0].parentNode).css('background-image') != \"none\") {\n						return $(el[0].parentNode).css('background-image').replace(patt,'');\n					}\n				}\n				if(el.find('sup')) {\n					el = el.clone();\n					el.html(el.html().replace('<sup>', '.').replace('</sup>', ''));\n				}\n				if(!getImage && el[0].className && el[0].className.indexOf('sIFR-flash') != -1 && el[0].id) {\n					var tmpEl = $('#' + el[0].id);\n					var el2 = tmpEl.siblings('.sIFR-alternate');\n					if(el2.length) {\n						el = el2;\n					}\n				}\n				var text = el[0].textContent||el[0].innerText;\n				return $.trim(text).replace(/\\u00a0/g, \" \");\n			}\n		}\n		return '';\n	};\n\n	var exec = function($) {\n\n		var getValue = function(cssPath, getImage) { return getValueInner($, cssPath, getImage);};\n\n\n		// Change BELOW only!\n		iatDomain = '451574-evisu'; // place domain you want to use here, leave default if not sure\n\n		iatProd = {\n			prodId: '', 						// product id\n			imageUrl:  getValue('.more-views a img'), 					// url of the product image\n			destUrl: window.location.href, 	// landing page url\n			prodName: getValue('.product-main-info .product-second-name'), 					// product name\n			prodPrice: getValue('.product-main-info .special-price .price'),\n			desc: getValue('.product-collateral .tab-content'), 						// additional short description (optional)\n			logo: '', 						// product brand logo (optional)\n			custom1: getValue('.product-main-info .old-price .price'), 						// BEFORE PRICE\n			custom2: getValue('.product-main-info .special-price .price'), // custom value\n			availability: 1, 					// is the product in stock?, 1 - yes, 0 - no (optional)\n			category: '', 					// product category (optional)\n			useCookies: 1,				// if set to 0, it won't set any cookies\n			remove: 0					// if set, it will remove the products defined in prodId from the visitor's cookie (optional)\n		};\n\n		if(!iatProd.prodId) {\n			if(iatProd.imageUrl) {\n				iatProd.prodId = iatProd.imageUrl;\n			} else if(iatProd.prodName && iatProd.prodPrice) {\n				iatProd.prodId = iatProd.prodName + \"__\" + iatProd.prodPrice;\n			} else {\n				iatProd.prodId = iatProd.destUrl;\n			}\n		}\n\n		if(!iatProd.imageUrl) {\n			return;\n		}\n\n		if(!iatProd.destUrl) {\n			return;\n		}\n\n		if(!iatProd.prodPrice) {\n			return;\n		}\n\n\n		(function(a){var c=document.createElement(\"script\");c.async=true,c.defer=true,c.src=a,document.getElementsByTagName(\"head\")[0].appendChild(c)})\n		(\"//dq5tha3wemxik.cloudfront.net/prod.js\");\n	}\n\n	if(window.jQuery) {\n		exec(window.jQuery);\n	} else {\n		if (typeof $ != 'undefined' && $ != null && $.toString().indexOf('[native code]') == -1) {\n            var tmpLib = $;\n        }\n		loadScript(\"//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js\", function() {\n			var jqNoConflict = jQuery.noConflict();\n            if (typeof tmpLib != 'undefined' && tmpLib !== null) {\n                $ = tmpLib;\n                tmpLib = null;\n            }\n            if(jqNoConflict) {\n                exec(jqNoConflict);\n            }\n		});\n	}\n})();",external_pixel_url_type:"image",expiration_value:""};var type="segment";try{var path=null;switch(type){case"conversion":var interactionValue=getInteractionValue(options);var expirationValue=getExpirationValue(options);var firePixel=true;if(options.hasOwnProperty("conversion_count_type")){var conversionCountKey="flx1_conversion_count_1732";firePixel=checkAndDropConversionCountCookie(conversionCountKey,options)}if(firePixel){path="/ia?id="+flx1.cnf.id+"&m="+flx1.cnf.m+"&itst=1732&it=10&iv="+interactionValue;if(expirationValue>0){path=path+"&exp="+expirationValue}}break;case"segment":path="/ia?id="+flx1.cnf.id+"&m="+flx1.cnf.m+"&itst=1732&it=15";break}if(path!==null){flx1.pxl(path)}}catch(e){flx1.log(e)}if(options.hasOwnProperty("populate_external_pixels")){populateExternalPixels(options,type)}});var checks=[];checks[0]={exec:executeAfter(1,function(){executor.next(0)}),options:[{check:function(){if(true){checks[0].exec.next(0)}}}]};if(false){try{var hasMutations=false;getMutationObserver("observer_1732",function(){hasMutations=true});setInterval(function(){if(hasMutations){doCheck(checks);hasMutations=false}},1e3)}catch(e){flx1.log(e)}}doCheck(checks)})();(function(){var executor=executeAfter(1,function(){var options={rule_name:"HOMEPAGE",populate_external_pixels:true,platform:"appnexus",segment_pixel_advertiser:"",search:"",value:"2486285","":false,external_pixel_url:"",external_pixel_script:"",external_pixel_url_type:"image",externalPixels:["2486285"],expiration_value:""};var type="segment";try{var path=null;switch(type){case"conversion":var interactionValue=getInteractionValue(options);var expirationValue=getExpirationValue(options);var firePixel=true;if(options.hasOwnProperty("conversion_count_type")){var conversionCountKey="flx1_conversion_count_1733";firePixel=checkAndDropConversionCountCookie(conversionCountKey,options)}if(firePixel){path="/ia?id="+flx1.cnf.id+"&m="+flx1.cnf.m+"&itst=1733&it=10&iv="+interactionValue;if(expirationValue>0){path=path+"&exp="+expirationValue}}break;case"segment":path="/ia?id="+flx1.cnf.id+"&m="+flx1.cnf.m+"&itst=1733&it=15";break}if(path!==null){flx1.pxl(path)}}catch(e){flx1.log(e)}if(options.hasOwnProperty("populate_external_pixels")){populateExternalPixels(options,type)}});var checks=[];checks[0]={exec:executeAfter(1,function(){executor.next(0)}),options:[{check:function(){if(true){checks[0].exec.next(0)}}}]};if(false){try{var hasMutations=false;getMutationObserver("observer_1733",function(){hasMutations=true});setInterval(function(){if(hasMutations){doCheck(checks);hasMutations=false}},1e3)}catch(e){flx1.log(e)}}doCheck(checks)})();(function(){var executor=executeAfter(2,function(){var options={rule_name:"Product page Segment",populate_external_pixels:true,platform:"appnexus",segment_pixel_advertiser:"",search:"",value:"2486284","":false,external_pixel_url:"",external_pixel_script:"",external_pixel_url_type:"image",externalPixels:["2486284"],expiration_value:""};var type="segment";try{var path=null;switch(type){case"conversion":var interactionValue=getInteractionValue(options);var expirationValue=getExpirationValue(options);var firePixel=true;if(options.hasOwnProperty("conversion_count_type")){var conversionCountKey="flx1_conversion_count_1795";firePixel=checkAndDropConversionCountCookie(conversionCountKey,options)}if(firePixel){path="/ia?id="+flx1.cnf.id+"&m="+flx1.cnf.m+"&itst=1795&it=10&iv="+interactionValue;if(expirationValue>0){path=path+"&exp="+expirationValue}}break;case"segment":path="/ia?id="+flx1.cnf.id+"&m="+flx1.cnf.m+"&itst=1795&it=15";break}if(path!==null){flx1.pxl(path)}}catch(e){flx1.log(e)}if(options.hasOwnProperty("populate_external_pixels")){populateExternalPixels(options,type)}});var checks=[];checks[0]={exec:executeAfter(1,function(){executor.next(0)}),options:[{check:function(){if(FLXurl.contains("evisu.com")){checks[0].exec.next(0)}}}]};checks[1]={exec:executeAfter(1,function(){executor.next(1)}),options:[{check:function(){if(FLXpagesource.contains("product-sku no-mobile")){checks[1].exec.next(0)}}}]};if(false){try{var hasMutations=false;getMutationObserver("observer_1795",function(){hasMutations=true});setInterval(function(){if(hasMutations){doCheck(checks);hasMutations=false}},1e3)}catch(e){flx1.log(e)}}doCheck(checks)})()})})();
