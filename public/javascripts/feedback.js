"use strict";

;(function (){

    let responseButton = document.querySelector('#responseButton');
    let processedButton = document.querySelector('#processedButton');

    //Отметить сообщение как обработанное
    if( processedButton ){

        processedButton.addEventListener('click' , async function (){

            let fBackId = processedButton.dataset.fbacksId;

            console.log(fBackId);
            let request = await fetch( `${window.ServerAddress}panel/feedback/${fBackId}` , {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    'feedbackId': fBackId,
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


    }//if

    //Добавление категории
    let addCategoryButton = document.querySelector("#addCategoryButton");

    if(addCategoryButton){

        addCategoryButton.addEventListener('click' , async function (){

            let categoryTitle = document.querySelector('#categoryTitle').value;

            if(!categoryTitle.match(RegularExpressions.CategoryTitleExpression)){

                if( messageBlock.classList.contains('alert-success') ){
                    messageBlock.classList.remove('alert-success');
                }//if

                messageBlock.classList.add('alert-danger');

                messageBlock.textContent = "Название категории некорректно!";
                messageBlock.style.display = 'block';
                return;

            }//if

            let request = await fetch( `${window.ServerAddress}panel/category/new` , {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    'categoryTitle': categoryTitle,
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

    //Удаление категории

    let categoryID = -1;

    let removeButtons = document.querySelectorAll('.alert-danger');
    let modalBody = document.querySelector('#categoryName');

    [].forEach.call( removeButtons , ( button )=>{

        button.addEventListener('click' , async function (){

            let title = button.dataset.categoryTitle;
            categoryID = +button.dataset.categoryId;

            modalBody.textContent = title;
            $('#confirmRemoveCategoryModal').modal();

        });

    } );


})();
