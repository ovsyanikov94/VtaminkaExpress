"use strict";

;(function () {

    let addLengButton = document.querySelector('#addLanguageButton');
    let selected = document.querySelector('#categoriesSelect');

    if(selected){

        selected.addEventListener('change',async()=>{
            let leng = document.querySelector('#categoriesSelect').children;

            let selectLeng = [].filter.call(leng,(l)=>{

                return l.selected ===true
            })

            let Leng = [].map.call(selectLeng,(item)=>{
                return +item.textContent;
            })
            let request = await fetch( `${window.ServerAddress}panel/locale/const-list/${Leng}`);

            console.log(request);
        })
    }

    if(addLengButton){

        addLengButton.addEventListener('click',async ()=>{
            try{
            let description = document.querySelector(' #constDescription').value;
            let title = document.querySelector(' #constTitle').value;
            let transletion = document.querySelector(' #constTranslation').value;
            let leng = document.querySelector('#categoriesSelect').children;

            let selectLeng = [].filter.call(leng,(l)=>{

                return l.selected ===true
            })

            let idLeng = [].map.call(selectLeng,(item)=>{
                return +item.value;
            })
            console.log(idLeng);
            let data = new FormData();

            data.append('description',description);
            data.append('title',title);
            data.append('transletion',transletion);
            data.append('lengId',idLeng)

                let request = await fetch(`${window.ServerAddress}panel/locale/new` , {
                    method: 'POST',
                    body: data
                });

                let response = await request;

                console.log(response);

            }//try
            catch(ex){

                console.log('ex' , ex);

            }//catch

    })
    }

})();