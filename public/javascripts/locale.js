"use strict";

(function (){

    let addLanguageButton = document.querySelector('#addLanguageButton');
    let messageBlock = document.querySelector('#message');
    let langsTable = document.querySelector('#langsList');
    let updateLang = document.querySelector('#updateLang');
    let files = document.querySelectorAll('.file-import');

    let exportButtons = document.querySelectorAll('.btn-export');

    if(files){

        files.forEach( file => {

            file.addEventListener('change', async function () {

                let data = new FormData();

                data.append('file', file.files[0]);

                data.append('langID', file.dataset.langId);

                try{

                    let request = await fetch(`${window.ServerAddress}panel/locale/lang/import/` , {
                        method: 'POST',
                        body: data
                    });

                    let response = await request.json();

                    console.log(response);

                }//try
                catch(ex){

                    console.log('ex' , ex);

                }//catch

            });

        } );

    }//if

    if(exportButtons){

        exportButtons.forEach( exportButton => {

            exportButton.addEventListener('click', async function () {
                try{

                    let data = new FormData();

                    data.append('langID', exportButton.dataset.langId);

                    let request = await fetch(`${window.ServerAddress}panel/locale/lang/export/` , {
                        method: 'POST',
                        body: data
                    });

                    let response = await request.json();

                    console.log(response);

                }//try
                catch(ex){

                    console.log('ex' , ex);

                }//catch

            });

        } );



    }//if

    let addConst = document.querySelector('#addConctAndLeng');

    if(addConst){
        addConst.addEventListener('click',async()=>{

            let leng =addConst.dataset.leng
            let request = await fetch( `${window.ServerAddress}panel/locale/const-list` , {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    'language': leng,
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

    if(updateLang){

        updateLang.addEventListener('click' , async ()=> {

            let langID = +document.querySelector('form').dataset.langId;

            let langTitle = document.querySelector('#languageTitle').value;

            let langImage = document.querySelector('#languageImage');

            let data = new FormData();

            if( langImage.files.length !== 0 ){
                data.append('image', langImage.files[0]);
            }//if

            data.append('langTitle', langTitle);


            try{

                let request = await fetch(`${window.ServerAddress}panel/locale/lang/${langID}` , {
                    method: 'PUT',
                    body: data
                });

                let response = await request.json();

                if(response.code===200){
                    let imageLang = document.querySelector('#imageLang');
                    imageLang.src= `/images/langs/${langID}/${langImage.files[0].name}`;

                    let label = document.querySelector('#lableImagePath');
                    label.textContent= `/images/langs/${langID}/${langImage.files[0].name}`;
                }
                console.log(response);

            }//try
            catch(ex){

                console.log('ex' , ex);

            }//catch

        });

    }//if

    //Проверка языка на сущ.

    let languageTitleInput = document.querySelector('#languageTitle');

    if(languageTitleInput) {

        languageTitleInput.addEventListener('blur' , async () => {


            let request = await fetch( `${window.ServerAddress}panel/locale/lang/exist?languageTitle=${languageTitleInput.value}` , {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            let responseJSON = await request.json();

            if( responseJSON.code !== 200 ){

                document.querySelector('.invalid-feedback').style.display = 'block';

            }//if
            else{
                document.querySelector('.invalid-feedback').style.display = 'none';
            }//else


        });

    }//if

})();