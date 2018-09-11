"use strict";


;(function (){

    let selectes = document.querySelectorAll('select');
    let currentStatusLabels = document.querySelectorAll('.label-info');
    let updateStatusButtons = document.querySelectorAll('.btn-wrapper');
    let rows = document.querySelectorAll('tr');

    let messageBlock = document.querySelector('#message');
    let addStatusButton = document.querySelector("#addStatusButton");

    [].forEach.call( updateStatusButtons , ( button )=>{

        button.addEventListener('click' , async function (){

            let orderId = +button.dataset.orderId;

            let selectOrderStatus = [].filter.call(selectes , ( sel )=> { return +sel.dataset.orderId === orderId; });


            let ind = selectOrderStatus[0].selectedIndex;
            let newStatusId = selectOrderStatus[0].options[ind].value;

            let request = await fetch( `${window.ServerAddress}panel/orders/${orderId}` , {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    'newStatusId': newStatusId,
                })
            });

            let responseJSON = await request.json();


            let labelOrderStatus = [].filter.call(currentStatusLabels , ( sel )=> { return +sel.dataset.orderId === orderId; });
            if( responseJSON.code === 200){


                labelOrderStatus[0].textContent = responseJSON.statusTitle;


            }//if
            else{
                labelOrderStatus[0].textContent = "Не удалось изменить статус заказа";

            }//else

            console.log(responseJSON);


        });

    } );

    if(addStatusButton){

        addStatusButton.addEventListener('click' , async function (){

            let statusTitle = document.querySelector('#statusTitle').value;

            if(!statusTitle.match(RegularExpressions.CategoryTitleExpression)){

                if( messageBlock.classList.contains('alert-success') ){
                    messageBlock.classList.remove('alert-success');
                }//if

                messageBlock.classList.add('alert-danger');

                messageBlock.textContent = "Название статуса некорректно!";
                messageBlock.style.display = 'block';
                return;

            }//if

            let request = await fetch( `${window.ServerAddress}panel/orders/status/new` , {
                method: 'POST',
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

        } );

    }//if


    let modalBody = document.querySelector('#orderId');
    let removeButtons = document.querySelectorAll('.alert-danger');

    let orderId = -1;
    [].forEach.call( removeButtons , ( button )=>{

        button.addEventListener('click' , async function (){

            let orderNumber = button.dataset.orderId;
            orderId = orderNumber;
            console.log(orderNumber);
            modalBody.textContent = orderNumber;
            $('#confirmRemoveOrderModal').modal();

        });

    } );

    let confirmRemoveButton = document.querySelector('#confirmRemoveOrderButton');

    if(confirmRemoveButton){

        confirmRemoveButton.addEventListener('click' , async function (){


            let request = await fetch( `${window.ServerAddress}panel/orders` , {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    'orderID': orderId,
                })
            });

            let responseJSON = await request.json();



            if( responseJSON.code === 200 ){

                let row = [].filter.call(rows , ( sel )=> { return +sel.dataset.orderId == orderId; });

                document.querySelector('#orders').removeChild( row[0]);

            }//if
            else{



            }//else

            console.log(responseJSON);

        });

    }//if








})();