"use strict";

let addEventInButton = function () {

    let button = document.querySelectorAll('#tableConst .alert-danger');
    console.log(button);
    [].forEach.call(button,(but)=>{
        let idInButton =but.dataset.constId;
            but.addEventListener('click',async()=>{
                let data = new FormData();
                data.append('constID', idInButton);
                try{

                    let request = await fetch(`${window.ServerAddress}panel/locale/remove` , {
                        method: 'DELETE',
                        body: data
                    });

                    let response = await request.json();
                    if(response.code ==200){

                        let id = response.data
                        let parent = but.parentElement
                        let parentParent = parent.parentNode
                        let table = document.querySelector('#tableConst');
                        table.removeChild(parentParent)
                    }
                }//try
                catch(ex){
                    console.log('ex' , ex);
                }//catch

        });
    });

    }

;(function () {

    let addLengButton = document.querySelector('#addLanguageButton');
    let tableConst = document.querySelector('#tableConst');

    let constant =[];


    if(addLengButton){

        addLengButton.addEventListener('click',async ()=>{
            try{
            let description = document.querySelector(' #constDescription').value;
            let title = document.querySelector(' #constTitle').value;
            let data = new FormData();
            data.append('description',description);
            data.append('title',title);
                let request = await fetch(`${window.ServerAddress}panel/locale/new` , {
                    method: 'POST',
                    body: data
                });
                let response = await request.json();
                constant.push(response.data)
                constant.forEach((con)=>{
                    tableConst.innerHTML  += `
                <tr align="middle">
                    <td>${con.constantID}</td>
                    <td>${con.constantTitle}</td>
                    <td>${con.description}</td>
                    <td><a style="display: inline-block;"class="alert alert-primary"href="/panel/products/" + con.constantID  data-attribute-id=${con.constantID} >Nзменить</a></td>
                    <td><div style="display: inline-block cursor: pointer"class="alert alert-danger"   data-const-title=${con.description} data-const-id=${con.constantID}  >Удалить</div></td>
                </tr>
                `;
                })
                addEventInButton();

            }//try
            catch(ex){

                console.log('ex' , ex);

            }//catch

    })
    }
    console.log('nen');
    addEventInButton();
})();