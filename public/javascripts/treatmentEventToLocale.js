"use strict";
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

                }//try
                catch(ex){
                    console.log('ex' , ex);
                }//catch
            })


    }

}//сохранение изменения в БД

let addEventToChange = function () {
    let buttonChange = document.querySelectorAll('.alert-primary');
        [].forEach.call(buttonChange,(btn)=>{
            let parentElement = btn.parentElement.parentElement;
            btn.addEventListener('click',()=>{

                let arreyChaild = parentElement.querySelectorAll('.td');


                parentElement.innerHTML ='';

                parentElement.innerHTML +=`
                <tr align="middle">
                    <td id="constId">${arreyChaild[0].textContent}</td>
                    <td ><input id="description" class="form-control" value='${arreyChaild[1].textContent}'></td>
                    <td ><input id="title" class="form-control" value='${arreyChaild[2].textContent}'></td>
                    <td><div style="cursor: pointer" class="btn btn-primary save-change"  data-const-id=${+arreyChaild[0].textContent} >сохранить</div></td>
                    <td><div style="cursor: pointer" class="btn btn-danger Annulment" data-const-description=${arreyChaild[1].textContent}  data-const-title=${arreyChaild[2].textContent} data-const-id=${arreyChaild[0].textContent}  >отменить</div></td>
                </tr>
                `;

                addEventToSaveChange(parentElement);
                addSaveChangeAnnulment(parentElement);
            })

    })
console.log('nenennnnnnnn');

  //


}//конопка изменить константу

let addEventInButton = function () {


    let button = document.querySelectorAll('#tableConst .alert-danger');

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

    }//кнопка удалить константу

let addSaveChangeAnnulment = function () {



}

;(function () {

    let addLengButton = document.querySelector('#addLanguageButton');//добавить обработку на кнопку добавить константу
    let tableConst = document.querySelector('#tableConst');

    let constant =[];


    if(addLengButton){

        addLengButton.addEventListener('click',async ()=>{
            try{

                let description = document.querySelector('#constDescription').value;
                let title = document.querySelector('#constTitle').value;
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
                        <td class="td">${con.constantID}</td>
                        <td class="td">${con.constantTitle}</td>
                        <td class="td">${con.description}</td>
                        <td><div class="alert alert-primary" data-attribute-id=${con.constantID} >Nзменить</div></td>
                        <td><div style="cursor: pointer" class="alert alert-danger"   data-const-title=${con.description} data-const-id=${con.constantID}  >Удалить</div></td>
                    </tr>
                    `;
                    })


            }//try
            catch(ex){

                console.log('ex' , ex);

            }//catch
            addEventInButton();
            addEventToChange();
    })
    }
    console.log('nen');
    addEventInButton();
    addEventToChange();
    addEventToSaveChange();
})();