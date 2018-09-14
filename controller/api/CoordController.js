
const Response = require('../../model/Response');

const fs = require('fs');

const RegularExpressions = require('../../model/RegularExpressions');

module.exports.GetCoords = async ( req , res )=> {


    let response = new Response();

    try {

        let path = `public/settings/coord.json`;


        if (!fs.existsSync(path)) {
            console.log("Файл 'Coord' на сервере отсутствует!");
            return
        }//if


        let fileSize = new Object();
        fs.stat(path, function (err, stats) {
            if (!err) {
                fileSize = stats;
            }
        })
        console.log(fileSize);


        if (fileSize.size != 0) {

            var coordObj = JSON.parse(fs.readFileSync(path, 'utf8'));

            //let latitude = coordObj.lat;
            //let longitude = coordObj.lng;

            response.code = 200;
            response.data = coordObj;

        }//if
        else {
            response.code = 400;
            response.data = "Внесите в файл координаты объета!";


        }//else


    }//try
    catch (ex) {

        response.code = 500;
        response.data = null;
        response.message = "Внутренняя ошибка сервера!";

    }//catch

    res.status(response.code);
    res.send(response);
}
