$(document).ready(function(){

    $('#cpsubbtn').click(function(){
        $.post('cppasscenter.do',{oldpass:$('#oldpass').val(),newpass:$('#newpass').val()},function(data){
            switch(data){
                case('sessiongone'):{
                    location.href='../index';
                    break;
                }
                case('incorrect'):{
                    $('#notice').hide();
                    $('#notice').hide().removeClass('text-success').html('* Old Password is Wrong').addClass('text-danger').show('slide');
                    break;
                }
                case('successfull'):{
                    $('#notice').hide().removeClass('text-danger').html('* Password is changed Successfully. <br/> You will be Logout in after 3 seconds !').addClass('text-success').show('slide');
                    setTimeout(function(){
                        location.href='../index';
                    },3000);
                    break;
                }
            }
        });
    });

    $('#oldpass,#newpass').keyup(function(){
        $(this).passValidate();
        if(
            ($('#oldpass').passValidate())&&($('#newpass').passValidate())
        ){
            $('#cpsubbtn').prop('disabled',false).removeClass('disabled');
        }else{
            if(!$('#cpsubbtn').hasClass('disabled')){
                $('#cpsubbtn').prop('disabled',true).addClass('disabled');
            }
        }
    });

    $('#cpbtn').click(function(){
        $('#dtfbtn').removeClass('active');
        $(this).addClass('active');
        $('#detailform').hide('bounce',function(){
            $('#cpform').show('bounce');
        });
    });

    $('#dtfbtn').click(function(){
        $('#cpbtn').removeClass('active');
        $(this).addClass('active');
        $('#cpform').hide('bounce',function(){
            $('#detailform').show('bounce');
        });
    });

});