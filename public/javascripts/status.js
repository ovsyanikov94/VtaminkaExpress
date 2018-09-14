"use strict";


;(function (){


    let updateStatusButton = document.querySelector("#updateStatusButton");
    let RemoveStatus = document.querySelectorAll('#RemoveStatus');
    let modalBodyStatus = document.querySelector('#statusName');

    let messageBlock = document.querySelector('#message');

    let statusID = -1;


    [].forEach.call( RemoveStatus , ( button )=>{

        button.addEventListener('click' , async function (){

            let title = button.dataset.statusTitle;
            statusID = +button.dataset.statusId;

            modalBodyStatus.textContent = ` ${title}`;
            $('#confirmRemoveStatusModal').modal();

        });

    } );

    let confirmRemoveButtonStatus = document.querySelector('#confirmRemoveButtonStatus');

    if(confirmRemoveButtonStatus){

        confirmRemoveButtonStatus.addEventListener('click' , async function (){

            let request = await fetch( `${window.ServerAddress}panel/orders/status/delete` , {
                method: 'DELETE',
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

                let tr = document.querySelector(`tr[data-status-id ="${statusID}"]`);
                console.log(tr);
                //console.log(`data-status-id =${statusID}`);

                tr.style.display = 'none';
                
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

    if( updateStatusButton ){

        updateStatusButton.addEventListener('click' , async function (){

            let statusTitle = document.querySelector('#statusTitle').value;

            let statusID = updateStatusButton.dataset.statusId;

            if(!statusTitle.match(RegularExpressions.CategoryTitleExpression)){

                if( messageBlock.classList.contains('alert-success') ){
                    messageBlock.classList.remove('alert-success');
                }//if

                messageBlock.classList.add('alert-danger');

                messageBlock.textContent = "Название категории некорректно!";
                messageBlock.style.display = 'block';
                return;

            }//if

            let request = await fetch( `${window.ServerAddress}panel/orders/status/${statusID}` , {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    'statusTitle': statusTitle,
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

            console.log(responseJSON);


        });


    }//if



})();