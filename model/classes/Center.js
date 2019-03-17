let City = require('./City')
let CenterType = require('./CenterType');

class Center{
    // centerId = null;
    // name = null;
    // email = null;
    // password = null;
    // address = null;
    // city = null;
    // centerType = null;
    // phoneNo = null;

    constructor(){
        let len = args.length;
        switch(len){
            case(6):{
                this._construct7(args);
                break;
            }
        }
    }

    _construct7(...arg){
        [name,email,password,cityId,address,centerTypeId,phoneNo] = arg;
        this.name = name;
        this.email = email;
        this.password = password;
        this.city = new City(cityId);
        this.address = address;
        this.centerType = new CenterType(centerTypeId);
        this.phoneNo = phoneNo;
    }

    registCenter(){
        
    }
}