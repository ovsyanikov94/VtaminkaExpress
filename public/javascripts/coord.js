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

    let confirmRemoveButton = document.querySelector('#confirmRemoveButton');

    if(confirmRemoveButton){

        confirmRemoveButton.addEventListener('click' , async function (){

            console.log(categoryID);

        });

    }//if

})();