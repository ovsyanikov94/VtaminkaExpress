"use strict";
let updataButton = function () {
    let removeButton = document.querySelectorAll(' #updataTranslationButton');

}

let removeButton = function () {

    let removeButton = document.querySelectorAll(' #removeTranslationButton');

    [].forEach.call(removeButton,(btn)=>{

        btn.addEventListener('click',async()=>{

            let id = btn.dataset.translationId;
            let data = new FormData();
            data.append('id', id);
            try{

                let request = await fetch(`${window.ServerAddress}panel/locale/remove-translation` , {
                    method: 'DELETE',
                    body: data
                });

                let response = await request.json();
                if(response.code === 200){
                  let table = document.querySelector('#tableBody');
                  let parent = btn.closest('tr');

                  table.removeChild(parent);


                }
            }//try
            catch(ex){
                console.log('ex' , ex);
            }//catch


        });
    })
};


(function () {


    let addTranslationButton = document.querySelector('#addTranslationButton');

    if(addTranslationButton){

        addTranslationButton.addEventListener('click',async()=>{

            let idleng= document.querySelector('#lengSelect').value;
            let idConst= document.querySelector('#constSelect').value;
            let translation= document.querySelector('#translationText').value;

            let data = new FormData();
            data.append('idConst', idConst);
            data.append('idleng', idleng);
            data.append('translation', translation);
            try{

                let request = await fetch(`${window.ServerAddress}panel/locale/add-translation` , {
                    method: 'POST',
                    body: data
                });

                let response = await request.json();
                if(response.code ==200){

                    console.log(response);
                    let table= document.querySelector('#tableBody');


                    table.innerHTML +=`
                    <tr align="middle">
                        <td class="td">${response.ID}</td>
                        <td class="td">${response.titleConst}</td>
                        <td class="td">${response.titleLeng}</td>
                        <td class="td">${response.translation}</td>
                        <td><div style="display: inline-block;"class="alert alert-primary" data-attribute-id=${response.ID} >Nзменить</div></td>
                        <td><div style="cursor: pointer" class="alert alert-danger"  data-const-id=${response.ID}  >Удалить</div></td>
                    </tr>
                    `
                }
                removeButton();
            }//try
            catch(ex){
                console.log('ex' , ex);
            }//catch

        })
    }
    removeButton();
})();