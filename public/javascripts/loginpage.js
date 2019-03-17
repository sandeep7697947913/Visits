$(document).ready(function(){

    $('#email1,#pass1').on('keyup',function(){
        vallidateForm1();
    });

    $('#keepuni,#pass2').on('keyup',function(){
        vallidateForm2();
    });

    function vallidateForm1(){
        if(($('#email1').emailValidate())&&
            ($('#pass1').passValidate())
            ){
            $('#sub1').removeClass('disabled').prop('disabled',false);
        }else{
            if(!$('#sub1').hasClass('disabled')){
                $('#sub1').addClass('disabled').prop('disabled',true);
            }
        }
    }

    function vallidateForm2(){
        if(($('#keepuni').uniqueValidate())&&
            ($('#pass2').passValidate())
            ){
            $('#sub2').removeClass('disabled').prop('disabled',false);
        }else{
            if(!$('#sub2').hasClass('disabled')){
                $('#sub2').addClass('disabled').prop('disabled',true);
            }
        }
    }

});