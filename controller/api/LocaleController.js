const Langs = require('../../model/defenitions').Langs;
const Response = require('../../model/Response');

module.exports.GetLangs = async function (req , res) {

    let response = new Response();

    try{

        let langs = await Langs.findAll();

        response.code = 200;
        response.data = langs;

    }//try
    catch(ex){

        response.code = 500;
        response.data = null;
        response.message = "Внутренняя ошибка сервера!";

    }//catch
    
    res.status(response.code);
    res.send( response );

};