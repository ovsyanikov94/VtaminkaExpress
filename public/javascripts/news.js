"use strict";

;(function () {


    let addNewsButton = document.querySelector('#addNewsButton')

    let updateButton = document.querySelector('#updateButtona');
    let removweButton = document.querySelector('#updateButtona');

    if(removweButton){


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

            }

        })
    }

})();
