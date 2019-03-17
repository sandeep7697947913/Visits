$(document).ready(function(){
    allInputValidate();

    $('#name').keyup(function(){
        $(this).nameValidate();
    });


    $('#name,#purpose,#contact,#email').keyup(function(){
        if(($('#name').nameValidate())&&
            ($('#email').emailValidate())&&
            ($('#contact').phoneValidate())&&
            ($('#purpose').val()!='')
            ){
            $('#subbtn').removeClass('disabled').prop('disabled',false);
        }else{
            if(!$('#subbtn').hasClass('disabled')){
                $('#subbtn').addClass('disabled').prop('disabled',true);;
            }
        }
    });

    // $('#dist').hide('clip',function(){
    //     $('#updatemessage').show('clip',function setTimeout(function(){
    //         $('#updatemessage').hide('clip',function(){
    //             $('#dist').show('clip');
    //         });
    //     }, 3000))
    // });

    $('#subbtn').click(
        
    );

    
    
    $('#subbtn').click(function(){
        $.post({
            url:'addVisitors.do',
            data:{
                name : $('#name').val(),
                purpose : $('#purpose').val(),
                contact : $('#contact').val(),
                email : $('#email').val()
            },
            success : function(data){
                switch(data){
                    case("sessiongone"):{
                        location.href='../index';
                        break;
                    }
                    case("good"):{
                        $('#dist').hide('clip',function(){
                            $('#updatemessage').show('clip',setTimeout(function(){
                                $('#updatemessage').hide('clip',function(){
                                    $('#name,#purpose,#contact,#email').val('');
                                    $('#dist').show('clip');
                                });
                            },3000));
                        }); 
                        break;
                    }
                    default:{
                        alert('error');
                        break;
                    }
                }
            }
        });
    });
});