$(document).ready(function(){
    $('.btngone').click(function(){
        var button = this;
        $.post({
            url:'visitorGone.do',
            data:{
                visid : $(this).attr('visid')
            },
            success :function(data){
                switch(data){
                    case("sessiongone"):{
                        location.href='../index';
                        break;
                    }
                    default:{
                        $(button).parent().html(data);
                        break;
                    }
                }
            }
        });
    });
});