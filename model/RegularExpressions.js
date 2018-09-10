"use strict";

class RegularExpressions{

    static get CategoryTitleExpression(){
        return /^[a-z0-9а-я\s_\-:]{2,50}$/i
    };

    static get ProductTitleExpression(){
        return /^[a-z0-9а-я\s_\-:]{2,75}$/i
    }

    static get ProductDescriptionExpression(){
        return /^[a-z0-9а-я\s_\-:,.;"'?!()]{2,1500}$/i
    }

    static get EmailExpression(){
        return /^[a-z0-9а-я\s_\-:,.;"'?!()]{2,25}@[a-z0-9а-я\s_\-:]{2,20}.[a-zа-я]{2,10}$/i
    }

    static get PhoneExpression(){
        return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/

    }

    static get UserNameExpression(){
        return /^[a-z0-9а-я\s_\-:,.;"'?!()]{1,75}$/i
    }

    static get NameOrderExpression(){
        return /^[A-ZА-Я]{1}[a-zа-я]{1,10}$/
    }
    static get EmaailOrderExpression(){
        return /^[a-z0-9\.\_\-]+@[a-z0-9]{2,6}(\.[a-z0-9]+)?\.[a-z]{2,5}$/ig;
    }

    static get PhoneOrderExpression(){
        return /^\+38\(0[0-9]{2}\)\-[0-9]{3}(\-[0-9]{2}){2}$/i
    }

    static get CardOrderExpression(){
        return /^([0-9]{4}-){3}[0-9]{4}$/i
    }

}

module.exports = RegularExpressions;