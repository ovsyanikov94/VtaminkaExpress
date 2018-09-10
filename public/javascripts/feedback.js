"use strict";

;(function (){

    let responseButtons = document.querySelectorAll('#responseButton');
    let processedButtons = document.querySelectorAll('#processedButton');

    //Отметить сообщение как обработанное
    if( processedButtons ){

        processedButtons.forEach(btn => {
            btn.addEventListener('click' , async function (){

                let fBackId = btn.dataset.fbacksId;

                console.log(fBackId);
                let request = await fetch( `${window.ServerAddress}panel/feedback/${fBackId}` , {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({

                        'fProcessed': true
                    })
                });

                let responseJSON = await request.json();


                if( responseJSON.code === 200 ){


                }//if
                else{



                }//else

                console.log(responseJSON);


            });
        })




    }//if



})();
