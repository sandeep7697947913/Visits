$(document).ready(function(){
    let a=5;
   var interval = setInterval(function(){
       if((--a)==1){
        location.href = '/';
        clearInterval(interval);
       }else{
           $('#time').html(a);
       }
   },1000); 

});