$(document).ready(function(){

    $('#kl').click(function(){
        $('.opt').each(function(){
            $(this).removeClass('active');
        });
        $('.form').each(function(){
            $(this).hide();
        });
        $(this).addClass('active');
        $('#keeperlistform').show('clip');       
    });    

    $('#keeppassupd').click(function(){
        $.post({
            url:'keeperPassChange.do',
            data:{
                Keepuni : $('#Keepuni').val(),
                password : $('#pass2').val(),
            },
            success : function(data){
                switch(data){
                    case("sessiongone"):{
                        location.href='../index';
                        break;
                    }
                    default:{
                        $('#chpkeeppasstext').html(data);
                        $('#Keepuni,#pass2').val('');
                        $('.valid-feedback').css({display:"none"});
                        break;
                    }
                }
            }
        });
    });

    $('#Keepuni').keyup(function(){
        $(this).uniqueValidate();
    });

    $('#cp').click(function(){
        $('.opt').each(function(){
            $(this).removeClass('active');
        });
        $('.form').each(function(){
            $(this).hide();
        });
        $(this).addClass('active');
        $('#changepassform').show('clip');       
    });

    $('#Keepuni,#pass2').keyup(function(){
        if(
            ($('#Keepuni').uniqueValidate())
            &&($('#pass2').passValidate())
        ){
            $('#keeppassupd').prop("disabled",false).removeClass("disabled");
        }else{
            $('#keeppassupd').prop("disabled",true).addClass("disabled");
        }
    });

    $('#adke').click(function(){
        $('.opt').each(function(){
            $(this).removeClass('active');
        });
        $('.form').each(function(){
            $(this).hide();
        });
        $(this).addClass('active');
        $('#addkeepform').show('clip');       
    });

    allInputValidate();

    $('#name').keyup(function(){
        $(this).nameValidate();
    });

    $('#name,#pass1,#contact').keyup(function(){
        if(
            ($('#name').nameValidate())
            &&($('#pass1').passValidate())
            &&($('#contact').phoneValidate())
        ){
            $('#addkeepsub').prop("disabled",false).removeClass("disabled");
        }else{
            $('#addkeepsub').prop("disabled",true).addClass("disabled");
        }
    });

    $('#addkeepsub').click(function(){
        $.post({
            url:'registerKeeper.do',
            data:{
                name : $('#name').val(),
                password : $('#pass1').val(),
                contact : $('#contact').val()
            },
            success : function(data){
                switch(data){
                    case("sessiongone"):{
                        location.href='../index';
                        break;
                    }
                    default:{
                        $('#addkeepformtext').html("Last Added Keeper Id = "+data);
                        $('#name,#pass1,#contact').val('');
                        $('.valid-feedback').css({display:"none"});
                        break;
                    }
                }
            }
        });
    });
});