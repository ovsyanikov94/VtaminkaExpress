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

    // oтправка сообщения
    if(responseButtons){

        responseButtons.forEach(btn => {

            btn.addEventListener('click' , async function (){

                let fBackId = +btn.dataset.fbacksId;
                console.log('fBackId: %s', fBackId);
                let responseText = document.querySelector('#ResponseText').value;
                console.log(`responseText: ${responseText} `);

                let data = new FormData();
                let id = fBackId.toString();
                data.append('responseText', responseText);
                data.append('fBackId', id);

                //console.log(fBack);
                let request = await fetch( `${window.ServerAddress}panel/feedback-response` , {
                    method: 'POST',

                    body: data
                });

                let responseJSON = await request.json();
                window.location = `${window.ServerAddress}panel/feedbacks-list`;
                if(responseJSON.code === 200){
                    window.location = `${window.ServerAddress}panel/feedbacks-list`;
                }//if

                //console.log(responseJSON);




            });//addEventListener
    })//forEach
    }//if responseButton

    //Удаление категории

    let feedbackID = -1;
    let title = -1;
    let removeButtons = document.querySelectorAll('#removeFBButton');
    let modalBody = document.querySelector('#categoryName');

    [].forEach.call( removeButtons , ( button )=>{

        button.addEventListener('click' , async function (){

            title = button.dataset.feedbackTitle;
            feedbackID = +button.dataset.feedbackId;

            modalBody.textContent = title;
            $('#confirmRemoveMessageModal').modal();

        });

    } );

    let confirmRemoveButton = document.querySelector('#confirmRemoveButton');

    if(confirmRemoveButton){

        confirmRemoveButton.addEventListener('click' , async function (){

            console.log(feedbackID + title);

        });

    }//if

})();
