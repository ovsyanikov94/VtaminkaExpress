"use strict";


;(function  (){
        
        let saveTextAbout = document.querySelector('#saveTextAbout');
        let messageBlock = document.querySelector('#message');

        if(saveTextAbout){

            saveTextAbout.addEventListener('click', async function  (){
             
                let textAbout = document.querySelector('#aboutText').value;

                let request = await fetch( `${window.ServerAddress}panel/about/update` , {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        'text': textAbout
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
                
            })
        }//if


})();
