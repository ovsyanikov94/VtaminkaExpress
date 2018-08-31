"use strict";

;(function () {

    let addLengButton = document.querySelector('#addLanguageButton');
    let tableConst = document.querySelector('#tableConst');

    let constant =[];

    if(tableConst){




    }

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
                    <td><a style="display: inline-block;"class="alert alert-danger" data-attribute-id=${con.constantID} >Удалить</a></td>
                </tr>
                `;
                })


            }//try
            catch(ex){

                console.log('ex' , ex);

            }//catch

    })
    }

})();