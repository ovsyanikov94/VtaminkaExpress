"use strict";

(function (){


    let addLanguageButton = document.querySelector('#addLanguageButton');
    let messageBlock = document.querySelector('#message');
    let langsTable = document.querySelector('#langsList');

    let addConst = document.querySelector('#addConctAndLeng');

    if(addConst){
        addConst.addEventListener('click',async()=>{

            let lang =addConst.dataset.lang
            let request = await fetch( `${window.ServerAddress}panel/locale/const-list` , {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    'language': lang,
                })
            });

            console.log(request);
        })
    }
    if( addLanguageButton ){

        addLanguageButton.addEventListener('click' , async ()=>{

            let title = document.querySelector('#languageTitle').value;

            let data = new FormData();

            let langImage = document.querySelector('#langImage');

            data.append('image', langImage.files[0]);
            data.append('languageTitle', title);


            let request = await fetch( `${window.ServerAddress}panel/locale/new-lang` , {
                method: 'POST',
                body: data
            });

            let responseJSON = await request.json();

            messageBlock.textContent = responseJSON.message;

            if( responseJSON.code === 200 ){

                let lang = responseJSON.data;

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

    let langID = -1;

    let removeButtons = document.querySelectorAll('.alert-danger');
    let modalBody = document.querySelector('#languageName');

    [].forEach.call( removeButtons , ( button )=>{

        button.addEventListener('click' , async function (){

            let title = button.dataset.languageTitle;
            langID = +button.dataset.langId;

            modalBody.textContent = title;
            $('#confirmRemoveLangModal').modal();

        });

    } );

    let confirmRemoveButton = document.querySelector('#confirmRemoveButton');

    if(confirmRemoveButton){

        confirmRemoveButton.addEventListener('click' , async function (){

            console.log(langID);

        });

    }//if


})();




