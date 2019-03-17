var State = require('./State');

class City{
    // cityId;
    // name;
    // state;

    constructor(){
        let len = arguments.length;
        switch(len){
            case(1):{
                this._construct1(arguments[0]);
                break;
            }
            case(2):{

            }
        }
    }

    _construct1(cityId){
        this.cityId = cityId;
    }
}

module.exports = City;