(function($){
    // dependencies are 
    // jQuery - ^3.3.1
    // Bootstrap - ^4.3.1

    
    // keeper

    $.fn.uniqueValidate = function(){
        //ABCD123
        var flag = false;
        if($.trim($(this).val()).length){
            let div = $(this).next('.invalid-feedback,.valid-feedback');
            if(div.length){
                $(div).prop("display","block");
                let reg = new RegExp(/^[A-Z]{4}[0-9]{3}$/);
                flag = reg.test($(this).val());
                if(flag){
                    div.html('Proper unique Id').removeClass('invalid-feedback').addClass('valid-feedback').css('display','block');
                }else{
                    div.html('Improper unique id pattern').removeClass('valid-feedback').addClass('invalid-feedback').css('display','block');
                }               
            }else{
                $(this).after($('<div>').html('Improper unique id pattern').addClass('invalid-feedback').css('display','block'));
            }
        }else{
           //$(this).next('.invalid-feedback,.valid-feedback').remove();
           $(this).next('.invalid-feedback,.valid-feedback').prop("display","none");
        }
        return flag;
    }

    //keerp
    //name
    $.fn.nameValidate = function(){
        var flag = false;
        if($.trim($(this).val()).length){
            let div = $(this).next('.invalid-feedback,.valid-feedback');
            if(div.length){
                $(div).prop("display","block");
                let reg = new RegExp(/^[a-zA-Z ]{3,30}$/);
                flag = reg.test($(this).val());
                if(flag){
                    div.html('Nice Name').removeClass('invalid-feedback').addClass('valid-feedback').css('display','block');
                }else{
                    div.html('Improper Name').removeClass('valid-feedback').addClass('invalid-feedback').css('display','block');
                }               
            }else{
                $(this).after($('<div>').html('Improper Name').addClass('invalid-feedback').css('display','block'));
            }
        }else{
           //$(this).next('.invalid-feedback,.valid-feedback').remove();
           $(this).next('.invalid-feedback,.valid-feedback').prop("display","none");
        }
        return flag;
    }
    //* name

    //url 
    $.fn.urlValidate = function(){
        var flag = false;
        if($.trim($(this).val()).length){
            let div = $(this).next('.invalid-feedback,.valid-feedback');
            if(div.length){
                $(div).prop("display","block");
                let reg = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/);
                flag = reg.test($(this).val());
                if(flag){
                    div.html('valid URL').removeClass('invalid-feedback').addClass('valid-feedback').css('display','block');
                }else{
                    div.html('Invalid URL').removeClass('valid-feedback').addClass('invalid-feedback').css('display','block');
                }               
            }else{
                $(this).after($('<div>').html('Invalid URL').addClass('invalid-feedback').css('display','block'));
            }
        }else{
           //$(this).next('.invalid-feedback,.valid-feedback').remove();
           $(this).next('.invalid-feedback,.valid-feedback').prop("display","none");
        }
        return flag;
    };  
    //* url

    //isbn
    $.fn.isbnValidate = function(){
        var flag = false;
        if($.trim($(this).val()).length){
            let div = $(this).next('.invalid-feedback,.valid-feedback');
            if(div.length){
                $(div).prop("display","block");
                let reg = new RegExp(/^(97(8|9))?\d{9}(\d|X)$/);
                flag = reg.test($(this).val());
                if(flag){
                    div.html('valid ISBN number').removeClass('invalid-feedback').addClass('valid-feedback').css('display','block');
                }else{
                    div.html('Invalid ISBN Number').removeClass('valid-feedback').addClass('invalid-feedback').css('display','block');
                }               
            }else{
                $(this).after($('<div>').html('Invalid ISBN Number').addClass('invalid-feedback').css('display','block'));
            }
        }else{
           //$(this).next('.invalid-feedback,.valid-feedback').remove();
           $(this).next('.invalid-feedback,.valid-feedback').prop("display","none");
        }
        return flag;
    };
    //* isbn

    //gstin 
    $.fn.gstinValidate = function(){
        var flag = false;
        if($.trim($(this).val()).length){
            let div = $(this).next('.invalid-feedback,.valid-feedback');
            if(div.length){
                $(div).prop("display","block");
                let reg = new RegExp(/^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})$/);
                flag = reg.test($(this).val());
                if(flag){
                    div.html('valid gstin number').removeClass('invalid-feedback').addClass('valid-feedback').css('display','block');
                }else{
                    div.html('Invalid gstin Number').removeClass('valid-feedback').addClass('invalid-feedback').css('display','block');
                }               
            }else{
                $(this).after($('<div>').html('Invalid gstin Number').addClass('invalid-feedback').css('display','block'));
            }
        }else{
           //$(this).next('.invalid-feedback,.valid-feedback').remove();
           $(this).next('.invalid-feedback,.valid-feedback').prop("display","none");
        }
        return flag;
    };
    //* gstin

    //pancard
    $.fn.pancardValidate = function(){
        var flag = false;
        if($.trim($(this).val()).length){
            let div = $(this).next('.invalid-feedback,.valid-feedback');
            if(div.length){
                $(div).prop("display","block");
                let reg = new RegExp(/^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/);
                flag = reg.test($(this).val());
                if(flag){
                    div.html('valid pancard number').removeClass('invalid-feedback').addClass('valid-feedback').css('display','block');
                }else{
                    div.html('Invalid pancard Number').removeClass('valid-feedback').addClass('invalid-feedback').css('display','block');
                }               
            }else{
                $(this).after($('<div>').html('Invalid pancard Number').addClass('invalid-feedback').css('display','block'));
            }
        }else{
           //$(this).next('.invalid-feedback,.valid-feedback').remove();
           $(this).next('.invalid-feedback,.valid-feedback').prop("display","none");
        }
        return flag;
    };
    //*pancard

    // toll free
    $.fn.toolfreeValidate = function(){
        var flag = false;
        if($.trim($(this).val()).length){
            let div = $(this).next('.invalid-feedback,.valid-feedback');
            if(div.length){
                $(div).prop("display","block");
                let reg = new RegExp(/^[1][8][0][0]\d{7}$|^[8][0][0]\d{7}$/);
                flag = reg.test($(this).val());
                if(flag){
                    div.html('valid tollfree number').removeClass('invalid-feedback').addClass('valid-feedback').css('display','block');
                }else{
                    div.html('Invalid tollfree Number').removeClass('valid-feedback').addClass('invalid-feedback').css('display','block');
                }               
            }else{
                $(this).after($('<div>').html('Invalid tollfree Number').addClass('invalid-feedback').css('display','block'));
            }
        }else{
           //$(this).next('.invalid-feedback,.valid-feedback').remove();
           $(this).next('.invalid-feedback,.valid-feedback').prop("display","none");
        }
        return flag;
    };
    //* toll free

    // phone number
    $.fn.phoneValidate = function(){
        var flag = false;
        if($.trim($(this).val()).length){
            let div = $(this).next('.invalid-feedback,.valid-feedback');
            if(div.length){
                $(div).prop("display","block");
                let reg = new RegExp(/^[6-9]\d{9}$/);
                flag = reg.test($(this).val());
                if(flag){
                    div.html('valid phone number').removeClass('invalid-feedback').addClass('valid-feedback').css('display','block');
                }else{
                    div.html('Invalid Phone Number').removeClass('valid-feedback').addClass('invalid-feedback').css('display','block');
                }               
            }else{
                $(this).after($('<div>').html('Invalid Phone Number').addClass('invalid-feedback').css('display','block'));
            }
        }else{
           //$(this).next('.invalid-feedback,.valid-feedback').remove();
           $(this).next('.invalid-feedback,.valid-feedback').prop("display","none");
        }
        return flag;
    };
    //* phone number

    // password validate
    $.fn.passValidate = function(){
        var flag = false;
        $(this).prop({maxlength:12,minlength:8});
        let len = $.trim($(this).val()).length;
        if(len){
            let div = $(this).next('.invalid-feedback,.valid-feedback');
            if(div.length){
                $(div).prop("display","block");
                //let reg = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,12})/);
                let reg = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,12}$)/);
                // atleast 8-12
                // Strong Sandeep@123
                flag = reg.test($(this).val());
                if(flag){
                    div.html('Valid Password').removeClass('invalid-feedback').addClass('valid-feedback').css('display','block');
                }else{
                    if(len<8){
                        div.html('password length must be 8 - 12 characters').addClass('invalid-feedback').css('display','block');
                    }else{
                        div.html('Password must contain atleast one number,special character and lowercase,uppercase alphabet,one').removeClass('valid-feedback').addClass('invalid-feedback').css('display','block');
                    }
                }               
            }else{
                $(this).after($('<div>').html('password length must be 8 - 12 characters').addClass('invalid-feedback').css('display','block'));
            }
        }else{
           //$(this).next('.invalid-feedback,.valid-feedback').remove();
           $(this).next('.invalid-feedback,.valid-feedback').prop("display","none");

        }
        return flag;
    }
    //* password

    //email validation
    $.fn.emailValidate = function(){
        var flag = false;
        if($.trim($(this).val()).length){
            let div = $(this).next('.invalid-feedback,.valid-feedback');
            if(div.length){
                $(div).prop("display","block");
                let reg = new RegExp(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
                flag = reg.test($(this).val());
                if(flag){
                    div.html('Email-Validated').removeClass('invalid-feedback').addClass('valid-feedback').css('display','block');
                }else{
                    div.html('Invalid-Email').removeClass('valid-feedback').addClass('invalid-feedback').css('display','block');
                }               
            }else{
                $(this).after($('<div>').html('Invalid-Email').addClass('invalid-feedback').css('display','block'));
            }
        }else{
           //$(this).next('.invalid-feedback,.valid-feedback').remove();
           $(this).next('.invalid-feedback,.valid-feedback').prop("display","none");
        }
        return flag;
    };
    //* email validation

    // addres validation 
    $.fn.addressValidate = function(){
        var flag = false;
        if($.trim($(this).val()).length){
            let div = $(this).next('.invalid-feedback,.valid-feedback');
            if(div.length){
                $(div).prop("display","block");
                let reg = new RegExp(/^[a-zA-Z ]{10,200}$/);
                flag = reg.test($(this).val());
                if(flag){
                    div.html('Address-Validated').removeClass('invalid-feedback').addClass('valid-feedback').css('display','block');
                }else{
                    div.html('Invalid-Address').removeClass('valid-feedback').addClass('invalid-feedback').css('display','block');
                }               
            }else{
                $(this).after($('<div>').html('Invalid-Address').addClass('invalid-feedback').css('display','block'));
            }
        }else{
           //$(this).next('.invalid-feedback,.valid-feedback').remove();
           $(this).next('.invalid-feedback,.valid-feedback').prop("display","none");
        }
        return flag;
    };
    //addeess
}(jQuery));


//for all email,password,tel,url
var allInputValidate = function(){
    //for input type='email' automatically get applied
    $('input[type="email"]').keyup(function(){
        $(this).emailValidate();
    });

    //for input type='password' automatically get applied
    $('input[type="password"]').keyup(function(){
        $(this).passValidate();
    });

    //for input type='url' automatically get applied
    $('input[type="url"]').keyup(function(){
        $(this).urlValidate();
    });

    //for input type='tel' automatically get applied
    $('input[type="tel"]').keyup(function(){
        $(this).phoneValidate();
    });
};
