"use strict";

(function (){

    let addLanguageButton = document.querySelector('#addLanguageButton');
    let messageBlock = document.querySelector('#message');
    let langsTable = document.querySelector('#langsList');
    let importButton = document.querySelector('#importButton');
    let file = document.querySelector('#sendFile');

    if( addLanguageButton ){

        addLanguageButton.addEventListener('click' , async ()=>{

            let title = document.querySelector('#languageTitle').value;

            let request = await fetch( `${window.ServerAddress}panel/locale/new-lang` , {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    'languageTitle': title,
                })
            });

            let responseJSON = await request.json();

            messageBlock.textContent = responseJSON.message;

            if( responseJSON.code === 200 ){

                let lang = responseJSON.data;

                langsTable.innerHTML += `
                    <tr align="middle">
                        <td>${lang.languageID}</td>
                        <td>${lang.languageTitle}</td>
                        <td>${lang.languageImage || ''}</td>
                        <td >
                            <a style="display: inline-block;" class="alert alert-primary" href="/panel/locale/lang/${lang.languageID}" >Изменить</a>
                        </td>
                        <td>
                            <button 
                                class="alert alert-danger" 
                                data-lang-title=${lang.languageTitle}
                                data-lang-id=${lang.languageID} >Удалить</button>    
                        </td>
                    </tr>
                `;

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

    if(importButton){

        importButton.addEventListener('click', async function () {

            let data = new FormData();

            data.append('file', file.files[0]);

            data.append('langID', importButton.dataset.langId);

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

    }//if

})();