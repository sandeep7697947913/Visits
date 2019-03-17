class CenterType{
    // centerTypeId;
    // centerType;

    constructor(){
        let len = arguments.length;
        switch(len){
            case(1):{
                this._construct1(arguments[0]);
                break;
            }
        }
    }

    _construct1(centerTypeId){
        this.centerTypeId = centerTypeId;
    }
}

module.exports = CenterType;