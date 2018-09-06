"use strict";

(function (){


    let addLanguageButton = document.querySelector('#addLanguageButton');
    let messageBlock = document.querySelector('#message');
    let langsTable = document.querySelector('#langsList');
    let updateLang = document.querySelector('#updateLang');
    let currentInputTranslate = document.querySelector('#currentTranslate');

    let addConst = document.querySelector('#addConctAndLeng');
    let addTranslateButton = document.querySelector('#addTranslateButton');

    if(addTranslateButton){

        addTranslateButton.addEventListener('click',async()=>{


            let lang = document.querySelector('#languageSelected').value;
            let wordConst = document.querySelector('#constantSelected').value;
            let currentTranslate = document.querySelector('#currentTranslate').value;

            console.log(lang);
            console.log(wordConst);
            console.log(currentTranslate);

            let request = await fetch( `${window.ServerAddress}panel/locale/new-translate` , {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    'languageID': +lang,
                    'constantID': +wordConst,
                    'translation': currentTranslate
                })
            });

        })
    }

    if(addConst){
        addConst.addEventListener('click',async()=>{

            let leng = addConst.dataset.leng;
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

let addEventToSaveChange = async function (elem) {

    if(elem){

        let buttonSaveChange = elem.querySelector('.save-change');
        console.log('elem11111',elem);

        let parentDiv = buttonSaveChange.parentElement.parentElement;
        buttonSaveChange.addEventListener('click',async()=>{

            console.log('element',elem);
            let idChange = +elem.querySelector('#constId').innerText;

            console.log('id',idChange);

            let descriptionChange =elem.querySelector('#description').value;
            console.log('description',descriptionChange);

            let titleChange = elem.querySelector('#title').value;
            console.log('title',titleChange);

            let data = new FormData();

            data.append('id', +idChange);
            data.append('description', descriptionChange);
            data.append('title', titleChange);

            try{

                let request = await fetch(`${window.ServerAddress}panel/locale/update` , {
                    method: 'PUT',
                    body: data
                });

                let response = await request.json();

                console.log(response);

            } // try

            catch(ex){
                console.log('ex' , ex);
            } // catch

        })


    }

} // Cохранение изменения в БД

let addEventToChangeTranslate = function () {

    let buttonChange = document.querySelectorAll('.alert-primary');

    [].forEach.call(buttonChange, (btn) => {

        let parentElement = btn.parentElement.parentElement;

        btn.addEventListener('click',()=>{

            console.log('elem5555555', parentElement);
            let arrayChild = parentElement.querySelectorAll('.td');

            console.log(arrayChild[1].textContent);
            parentElement.innerHTML ='';

            parentElement.innerHTML +=`
                <tr align="middle">
                    <td id="constId">${arrayChild[0].textContent}</td>
                    <td ><input id="description" class="form-control" value='${arrayChild[1].textContent}'></td>
                    <td ><input id="title" class="form-control" value='${arrayChild[2].textContent}'></td>
                    <td><div style="cursor: pointer" class="btn btn-primary save-change"  data-const-id=${+arrayChild[0].textContent} >Cохранить</div></td>
                    <td><div style="cursor: pointer" class="btn btn-danger Annulment" data-const-description=${arrayChild[1].textContent}  data-const-title=${arrayChild[2].textContent} data-const-id=${arrayChild[0].textContent} >Отменить</div></td>
                </tr>
                `;

            addEventToSaveChange(parentElement);

        })

    });

} // addEventToChangeTranslate - Изменить