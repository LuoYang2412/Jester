String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\%'+i+'\\', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

//============Promo Banner Translate==============
jQuery(window).load(function(){
    Translator.add('Hide Current Deal','隐藏目前交易');
    Translator.add('Show Current Deal','显示目前交易');
    Translator.add("ZIP doesn't match selected State","邮政编码与所选州份不符");
    Translator.add("%d0 characters entered | %d1 characters remaining","已输入 %d0 字 | 还可以输入 %d1 字");
});

