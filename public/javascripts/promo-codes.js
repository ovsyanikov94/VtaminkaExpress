"use strict";

(function () {

        let addPromoCodeButton = document.querySelector('#addPromoCodeButton');
        let messageBlock = document.querySelector('#message');
        let promoCodesTable = document.querySelector('#codesList');

        if(addPromoCodeButton){

            addPromoCodeButton.addEventListener('click', async()=>{

                console.log('event');

                let promoCode = document.querySelector('#promoCodeInput').value;
                let percentageValue = document.querySelector('#percentageInput').value;
                let deliveryValue = document.querySelector('#deliveryInput').value;
                let promoCountValue = document.querySelector('#promoCountInput').value;
                let startDateValue = document.querySelector('#startDateInput').value;
                let expireDateValue = document.querySelector('#expireDateInput').value;

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

                let responceJSON = await request.json();

                if(responceJSON.code === 200){

                    let promoCode = responceJSON.data;

                    promoCodesTable.innerHTML += `
                        <tr align="middle">
                            <td>${promoCode.promoCodeID}</td>
                            <td>${promoCode.promoCode}</td>
                            <td>${promoCode.percentageValue}</td>
                            <td>${promoCode.deliveryValue}</td>
                            <td>${promoCode.promoCountValue}</td>
                            <td>${promoCode.startDateValue}</td>
                            <td>${promoCode.expireDateValue}</td>
                            <td >
                            <a style="display: inline-block;" class="alert alert-primary" href="/panel/locale/lang/${lang.languageID}" >Изменить</a>
                            </td>
                            <td>
                                <button 
                                    class="alert alert-danger" 
                                    data-lang-title=${lang.languageTitle}
                                    data-lang-id=${lang.languageID} >Удалить</button>    
                            </td>
                        </tr>
                    `;

                    if( messageBlock.classList.contains('alert-danger') ){
                        messageBlock.classList.remove('alert-danger');
                    }//if

                    messageBlock.classList.add('alert-success');

                    messageBlock.style.display = 'block';


                }//if
                else{

                    if( messageBlock.classList.contains('alert-success') ){
                        messageBlock.classList.remove('alert-success');
                    }//if

                    messageBlock.classList.add('alert-danger');

                    messageBlock.style.display = 'block';

                }//else

            });//addPromoCodeButton

        }//if



});