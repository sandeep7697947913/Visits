
$(document).ready(function(){
    allInputValidate();

    $('#extra').click(function(){
        $(this).addClass('active');
        $('#fp').removeClass('active');
        $('#forgetform').hide('clip',function(){
            $('#video').show('clip');
        });
    });

    $('#fp').click(function(){
        $(this).addClass('active');
        $('#extra').removeClass('active');
        $('video').get(0).pause();
        $('#video').hide('clip',function(){
            $('#forgetform').show('clip');
        });
    });

    $('#email').keyup(function(){
        if($('#email').emailValidate()){
            $('#fndbtn').removeClass('disabled');
        }else{
            $('#fndbtn').addClass('disabled');
        }
    });

    $('#otp,#password').keyup(function(){
        if(($.trim($('#otp').val()).length==6)&&($('#password').passValidate())){
            $('#cpsub').prop('disabled',false).removeClass('disabled');
        }else{
            $('#cpsub').prop('disabled',true).addClass('disabled');
        }
    });

    $('#cpsub').click(function(){
        $.post('ajax/changepasscenter.do',{email:$('#email').val(),otp:$('#otp').val(),password:$('#password').val()},function(data){
            switch(data){
                case('otpiswrong'):{
                    $('#forgetform2').hide('clip',function(){
                        $('#otp,#password,#email').val('');
                        $('#message').html('* OTP is wrong');
                        $('#tempbox').show('clip',function(){
                            $('#message').show('slide');
                            $('#email').prop('readonly',false);
                        });
                    });
                    break;
                }
                case('passwordchanged'):{
                    $('#otp,#password,#email').val('');
                    $('#forgetform2').hide('clip',function(){
                        $('#email').prop('readonly',false);
                        $('#message').html('').hide();
                        $('#tempbox').show('clip');
                        $('#smessage').show('slide');
                        setTimeout(function(){
                            $('#smessage').hide('slide',5000);
                        },3000);
                    });
                    
                    break;
                }
                case('servererror'):{
                    alert('ji');
                    break;
                }
            }
        });
    });

    $('#fndbtn').click(function(){
        $('#message').hide();
        if(!$(this).hasClass('disabled')){
            $.post('ajax/findcenteraccount.do',{email:$('#email').val()},function(data){
               switch(data){
                    case('notfound'):{
                        $('#message').html('* Unable to find Your Account').show('slide');
                        break;
                    }
                    case('emailSended'):{
                        $('#tempbox').hide('clip',function(){
                            $('#forgetform2').show('clip');
                            $('#email').prop('readonly',true);
                        });
                        break;
                    }
               } 
            });
        }
    });
});