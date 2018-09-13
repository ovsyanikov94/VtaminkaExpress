"use strict";


;(function (){

    let updateCoordButton = document.querySelector('#updateCoordButton');
    let messagelat = document.querySelector('#messagelat');
    let messagelng = document.querySelector('#messagelng');
    let message = document.querySelector('#message');
    let messageBlock = document.querySelector('#messageBlock');
    //Обновление координат
    if( updateCoordButton ){

        updateCoordButton.addEventListener('click' , async function (){

            let lat = document.querySelector('#lat').value;
            let lng = document.querySelector('#lng').value;
console.log(lat);
            if(!lat.match(RegularExpressions.CoordExpression)){

                if( messagelat.classList.contains('alert-success') ){
                    messagelat.classList.remove('alert-success');
                }//if

                messagelat.classList.add('alert-danger');

                messagelat.textContent = "Координата штроты некорректна!";
                messagelat.style.display = 'block';
                return;

            }//if
            if(!lng.match(RegularExpressions.CoordExpression)){

                if( messagelng.classList.contains('alert-success') ){
                    messagelng.classList.remove('alert-success');
                }//if

                messagelng.classList.add('alert-danger');

                messagelng.textContent = "Координата долготы некорректна!";
                messagelng.style.display = 'block';
                return;

            }//if
            let request = await fetch( `${window.ServerAddress}panel/coord-settings` , {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    'lat': lat,
                    'lng': lng,
                })
            });

            let responseJSON = await request.json();

            message.textContent = responseJSON.message;

            if( responseJSON.code === 200 ){

                message.classList.add('alert-success');

                message.style.display = 'block';

            }//if
            else{

                messageBlock.classList.add('alert-danger');

                messageBlock.style.display = 'block';

            }//else

            console.log(responseJSON);


        });


    }//if



})();