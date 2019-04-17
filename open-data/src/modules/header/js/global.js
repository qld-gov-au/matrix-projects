
(function(){
    'use strict';

    $('.header__mobile-button').find('button').click(function(e){
        
        e.preventDefault();
        var $cur = $(this),
            $nav = $('.navigation').find('nav');

        if(!$cur.hasClass('active')){
            $cur.addClass('active');
            $nav.slideDown(300);
            
        }else {
            $cur.removeClass('active');
            $nav.slideUp(300);
        }

    });


    $('html,body').click(function(e){
        
    })

}());
