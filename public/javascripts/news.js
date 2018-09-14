"use strict";

;(function () {


    let addNewsButton = document.querySelector('#addNewsButton')

    let removeButtons = document.querySelectorAll('#revomeButton');

    let updateNewsButtona = document.querySelector('#updateNewsButtona');

    if(updateNewsButtona){

        updateNewsButtona.addEventListener('click',async()=>{

            let title = document.querySelector('#titleNews').value;
            let text = document.querySelector('#textNews').value;
            let image = document.querySelector('#newsImage');

            let id = updateNewsButtona.dataset.newsId;

            let data = new FormData();

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

                    if( respone.data ){

                        let imageNew = document.querySelector('#newsImg');
                        imageNew.src = "/" + respone.data;

                    }//if

                }//if


            }catch (es){
                console.log(es);
            }


        })
    }

    if(removeButtons){

        removeButtons.forEach( btn => {

            btn.addEventListener('click',async()=>{

                let parent = btn.closest('.card');

                let id = btn.dataset.newsId;

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
            });

        } );

    }//if

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

                let response = await request.json();
                let message = document.querySelector('#message');
                message.textContent = response.message;
                if(response.code ===200){

                    if( message.classList.contains('alert-danger') ){
                        message.classList.remove('alert-danger');
                    }//if

                    message.classList.add('alert-success');

                    message.style.display = 'block';

                }//if
                else{

                    if( message.classList.contains('alert-success') ){
                        message.classList.remove('alert-success');
                    }//if

                    message.classList.add('alert-danger');

                    message.style.display = 'block';

                }//else


            }catch (es){
                console.log(es);
            }

        })
    }

})();
