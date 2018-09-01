"use strict";

(function (){


    let addLanguageButton = document.querySelector('#addLanguageButton');
    let messageBlock = document.querySelector('#message');
    let langsTable = document.querySelector('#langsList');
    let updateLang = document.querySelector('#updateLang');

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

})();