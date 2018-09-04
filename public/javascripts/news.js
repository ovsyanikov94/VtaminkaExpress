"use strict";

;(function () {


    let addNewsButton = document.querySelector('#addNewsButton')

    let removweButton = document.querySelector('#revomeButton');

    if(removweButton){
        removweButton.addEventListener('click',async()=>{

            let parent = removweButton.closest('.card');

            let id = removweButton.dataset.newsId;

            let data = new FormData();
            data.append('id', id);


            try{

                let respone = await fetch(`${window.ServerAddress}panel/news/remove`,{
                    method: 'DELETE',
                    body: data

                })

                if(respone.code===200){
                    parent.innerHTML =+'';

                }
            }catch (es){
                console.log(es);
            }
        })


    }
    if(addNewsButton){
        addNewsButton.addEventListener('click',async()=>{
            let title = document.querySelector('#Title').value;
            let text = document.querySelector('#TextNews').value;
            let image = document.querySelector('#newsImage');

            let data = new FormData();

            console.log(image.files);
            data.append('image', image.files[0]);
            data.append('newsTitle' , title);
            data.append('newsText' , text);


            try{

                let respone = await fetch(`${window.ServerAddress}panel/news/add-new`,{
                    method: 'POST',
                    body: data

                })
            }catch (es){
                console.log(es);
            }

        })
    }

})();
