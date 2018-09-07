"use strict";

(function () {


        let messageBlock = document.querySelector('#message');
        let promoCodesTable = document.querySelector('#promoCodesList');

        //ищем кнопку добавления нового промо-кода на форме
        let addPromoCodeButton = document.querySelector('#addPromoCodeButton');
        //по найденной кнопке...
        if(addPromoCodeButton){

            //...вешаем евент на кнопку
            addPromoCodeButton.addEventListener('click', async()=>{

                //получаем данные из полей формы
                let promoCode = document.querySelector('#promoCodeInput').value;
                let percentageValue = document.querySelector('#percentageInput').value;
                let deliveryValue = document.querySelector('#deliveryInput').value;
                let promoCountValue = document.querySelector('#promoCountInput').value;
                let startDateValue = document.querySelector('#startDateInput').value;
                let expireDateValue = document.querySelector('#expireDateInput').value;

                //добавляем данные в базу данных промо-кодов
                let request = await fetch(`${window.ServerAddress}panel/promo-codes/new`,{
                    method: 'POST',
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        promoCode: promoCode,
                        percentageValue: percentageValue,
                        deliveryValue: deliveryValue,
                        promoCountValue: promoCountValue,
                        startDateValue: startDateValue,
                        expireDateValue: expireDateValue,
                    })
                });

                //формируем ответ в формат JSON
                let responceJSON = await request.json();

                //меняем статус сообщения
                messageBlock.textContent = responceJSON.message;

                //если успешно меняем HTML таблички на форме
                if(responceJSON.code === 200){

                    let promoCode = responceJSON.data;

                    console.log(promoCode);

                    promoCodesTable.innerHTML += `
                        <tr align="middle">
                            <td>${promoCode.promoCodeID}</td>
                            <td>${promoCode.discountCode}</td>
                            <td>${promoCode.discount}</td>
                            <td>${promoCode.delivery}</td>
                            <td>${promoCode.promoCount}</td>
                            <td>${promoCode.startAtDate}</td>
                            <td>${promoCode.expireAtDate}</td>
                            <td >
                            <a style="display: inline-block;" class="alert alert-primary" href="/panel/promo-codes/single/${promoCode.promoCodeID}" >Изменить</a>
                            </td>
                            <td>
                                <button 
                                    class="alert alert-danger" 
                                    data-promo-id=${promoCode.promoCodeID}
                                    >Удалить</button>    
                            </td>
                        </tr>
                    `;

                    //убираем сообщение об ошибке на форме
                    if( messageBlock.classList.contains('alert-danger') ){
                        messageBlock.classList.remove('alert-danger');
                    }//if

                    //меняем на успешное добавление
                    messageBlock.classList.add('alert-success');

                    //выводим сообщение на форме
                    messageBlock.style.display = 'block';


                }//if
                else{

                    //изменение успешного значения сообщения на неудачное
                    if( messageBlock.classList.contains('alert-success') ){
                        messageBlock.classList.remove('alert-success');
                    }//if

                    messageBlock.classList.add('alert-danger');

                    messageBlock.style.display = 'block';

                }//else

            });//addPromoCodeButton

        }//if


        //ищем кнопку обновления на форме обновления промо-кода
        let updatePromoCodeButton = document.querySelector('#updatePromoCodeButton');
        //по найденной кнопке...
        if(updatePromoCodeButton){

            //...вешаем евент на кнопку
            updatePromoCodeButton.addEventListener('click', async ()=>{

                //в дата аттрибуте получаем ID промо-кода
                let promoCodeID = +document.querySelector('form').dataset.promoCodeId;

                //получаем новые значения промо-кодов
                let newPromoCodeValue = document.querySelector('#newPromoCodeInput').value;
                let newPercentageValue = document.querySelector('#newPercentageInput').value;
                let newDeliveryValue = document.querySelector('#newDeliveryInput').value;
                let newPromoCountValue = document.querySelector('#newPromoCountInput').value;
                let newStartDateValue = document.querySelector('#newStartDateInput').value;
                let newExpireDateValue = document.querySelector('#newExpireDateInput').value;

                //формируем объект данных
                let data = new FormData();

                //добавляем полученные данные
                data.append('newPromoCodeValue', newPromoCodeValue);
                data.append('newPercentageValue', newPercentageValue);
                data.append('newDeliveryValue', newDeliveryValue);
                data.append('newPromoCountValue', newPromoCountValue);
                data.append('newStartDateValue', newStartDateValue);
                data.append('newExpireDateValue', newExpireDateValue);

                try{

                    //обновляем данные по промо-коду
                    let request = await fetch(`${window.ServerAddress}panel/promo-codes/single/${promoCodeID}`,{
                        method:'PUT',
                        body: data
                    });

                    //убираем сообщение об ошибке на форме
                    if( messageBlock.classList.contains('alert-danger') ){
                        messageBlock.classList.remove('alert-danger');
                    }//if

                    let response = await request.json();

                    messageBlock.textContent = response.message;

                    if(response.code === 200){

                        //убираем сообщение об ошибке на форме
                        if( messageBlock.classList.contains('alert-danger') ){
                            messageBlock.classList.remove('alert-danger');
                        }//if

                        //меняем на успешное добавление
                        messageBlock.classList.add('alert-success');

                        //выводим сообщение на форме
                        messageBlock.style.display = 'block';

                        setTimeout( () => { window.location.href = "/promo-codes/promo-codes-list";} , 1500);

                    }//if
                    else{

                        //изменение успешного значения сообщения на неудачное
                        if( messageBlock.classList.contains('alert-success') ){
                            messageBlock.classList.remove('alert-success');
                        }//if

                        messageBlock.classList.add('alert-danger');

                        messageBlock.style.display = 'block';

                    }//else

                }//try
                catch(ex){
                    console.log('ex' , ex);
                }//catch
            });
        }//if updateButton

})();


