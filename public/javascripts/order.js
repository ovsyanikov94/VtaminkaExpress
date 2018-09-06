"use strict";


;(function (){

    let statusSelect = document.querySelector('#statusSelect');


    if(statusSelect) {

        statusSelect.addEventListener('change', async function () {

            let statusID = +this.value;
            let orderID = +this.value;
            let statusTitle = this.querySelector(`option[data-attribute-id='${statusID}']`).textContent;

            if (statusID === -1) {
                return;
            }//if

            let request = await fetch( `${window.ServerAddress}panel/category/${orderID}` , {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    'statusID': statusID,

                })
            });

            let responseJSON = await request.json();

            messageBlock.textContent = responseJSON.message;

            if( responseJSON.code === 200 ){

                if( messageBlock.classList.contains('alert-danger') ){
                    messageBlock.classList.remove('alert-danger');
                }//if

                messageBlock.classList.add('alert-success');

                messageBlock.style.display = 'block';

            }//if
            else{

                if( messageBlock.classList.contains('alert-success') ){
                    messageBlock.classList.remove('alert-success');
                }//if

                messageBlock.classList.add('alert-danger');

                messageBlock.style.display = 'block';

            }//else



        });
    }//if









})();