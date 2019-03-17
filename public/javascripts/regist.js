$(document).ready(function(){

    $('#prbtn').click(function(){
        if(!$('#prbtn').hasClass('disabled')){
            $.ajax({
                method:'post',
                url:'ajax/sendOTP.do',
                data:{
                    email:$('#email').val()
                },
                success:function(data){ 
                    $('#form1').slideUp(function(){
                        $('#form2').slideDown();
                    });
                }
            });
        }
    });

    allInputValidate();

    $('input,select').on('change keyup',function(){
        vallidateForm1();
    });

    $('#otp').keyup(function(){
        if($.trim($(this).val()).length==6){
            $('#sub').prop('disabled',false);
        }else{
            $('#sub').prop('disabled',true);
        }
    });

    $('#cn').keyup(function(){
        $(this).nameValidate();
    });

    $('#addr').keyup(function(){
        $(this).addressValidate();
    });

    function vallidateForm1(){
        if(($('#cn').nameValidate())&&
            ($('#pass').passValidate())&&
            ($('#email').emailValidate())&&
            ($('#centerTypeId').val()!='0')&&
            ($('#cities').val()!='0')&&
            ($('#states').val()!='0')&&
            ($('#addr').addressValidate())&&
            ($('#tel').phoneValidate())
            ){
            $('#prbtn').removeClass('disabled');
        }else{
            if(!$('#prbtn').hasClass('disabled')){
                $('#prbtn').addClass('disabled');
            }
        }
    }

    $('#states').change(function(){
        $.ajax({
            method:'post',
            url:'ajax/collectCities.do',
            data : {stateId :$(this).val()},
            success : function(data){
                var opt = $('#cities').children().get(0);
                $('#cities').html('').append(opt);
                for(city of data){
                    $('#cities').append($('<option>').html(city.city_name).val(city.city_id));
                }
            }
        });
    });

});