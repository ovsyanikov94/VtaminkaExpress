"use strict";

;(function () {


    let addNewsButton = document.querySelector('#addNewsButton')

    let removweButton = document.querySelector('#revomeButton');

    let updateNewsButtona = document.querySelector('#updateNewsButtona');

    if(updateNewsButtona){

        updateNewsButtona.addEventListener('click',async()=>{

            let title = document.querySelector('#titleNews').value;
            let text = document.querySelector('#textNews').value;
            let image = document.querySelector('#newsImage');

            let id = updateNewsButtona.dataset.newsID
            console.log(image.files);
            data.append('image', image.files[0]);
            data.append('newsTitle' , title);
            data.append('newsText' , text);
            data.append('id',id);
            try{

                let request = await fetch(`${window.ServerAddress}panel/news/update`,{
                    method: 'PUT',
                    body: data

                })

                let respone = await request.json();

                console.log(respone.code);
                if(respone.code===200){
                    let imageNew = document.querySelector('#newsImg');
                    imageNew.src = respone.image
                    title.value = respone.newsTitle
                    text.value = respone.newsText;


                }


            }catch (es){
                console.log(es);
            }


        })
    }
    if(removweButton){
        removweButton.addEventListener('click',async()=>{

            let parent = removweButton.closest('.card');

            let id = removweButton.dataset.newsId;
            console.log(parent);

            let data = new FormData();
            data.append('id', id);


            try{

                let request = await fetch(`${window.ServerAddress}panel/news/remove`,{
                    method: 'DELETE',
                    body: data

                })

                let respone = await request.json();
                if(respone.code===200){

                    let parentElem = document.querySelector('#mainform');
                    parentElem.removeChild(parent)

                }
            }
            catch (es){
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

            data.append('image', image.files[0]);
            data.append('newsTitle' , title);
            data.append('newsText' , text);


            try{

                let request = await fetch(`${window.ServerAddress}panel/news/add-new`,{
                    method: 'POST',
                    body: data

                })



            }catch (es){
                console.log(es);
            }

        })
    }

})();
