"use strict";

function AddRemoveAttributeListeners( attributes ){

    let buttons = document.querySelectorAll('#productAttributes .btn-danger');

    [].forEach.call( buttons , btn => {

        btn.addEventListener('click' , (  ) => {

            let attributeId =  +btn.dataset.attributeId;

            let attr = attributes.find( att => att.attributeID === attributeId );

            let index = attributes.indexOf( attr );

            if(index !== -1){

                attributes.splice(index , 1);

                let tr = btn.parentElement.parentElement;

                document.querySelector('#productAttributes').removeChild( tr );

            }//if

            console.log('attributes' , attributes );

        } );

    } );


}//AddRemoveAttributeListeners

(function (){

    let attributesSelect = document.querySelector('#attributesSelect');
    let attributesTable = document.querySelector('#productAttributes');
    let addAttributeValue = document.querySelector('#addAttributeValue');
    let attributeValueInput = document.querySelector('#currentAttributeValue');
    let addProductButton = document.querySelector('#addProductButton');
    //let pr = document.querySelector('#pr');

    let attributes = [];

    if( attributesSelect ){

        attributesSelect.addEventListener('change' , function (){

            //debugger;

            let attributeID = +this.value;
            let attributeTitle = this.querySelector(`option[data-attribute-id='${attributeID}']`).textContent;

            if(attributeID === -1){
                return;
            }//if

            let exist = attributes.find( ( attr )=> attr.attributeID === attributeID );

            if( exist ){
                return;
            }//if

            attributes.push( {
                attributeID: attributeID,
                attributeTitle: attributeTitle,
                attributeValue: ''
            } );

        });

    }//if

    if( addAttributeValue ){

        addAttributeValue.addEventListener('click' , function (){

            let attributeID = +attributesSelect.value;

            if( attributeID === -1 ){
                return;
            }//if

            let attribute = attributes.find( ( attr )=> attr.attributeID === attributeID );

            if(attribute){

                attribute.attributeValue = attributeValueInput.value;

            }//if

            while(attributesTable.firstChild){
                attributesTable.removeChild(attributesTable.firstChild);
            }//while

            attributes.forEach( ( attr )=>{

                attributesTable.innerHTML += `
                <tr align="middle">
                    <td>${attr.attributeID}</td>
                    <td>${attr.attributeTitle}</td>
                    <td>${attr.attributeValue}</td>
                    <td><div class="btn btn-danger" data-attribute-id=${attr.attributeID} >Удалить</div></td>
                </tr>
                `;

            } );

            AddRemoveAttributeListeners( attributes );

        });

    }//if

    if(addProductButton){

        addProductButton.addEventListener('click' ,async function (){

            let children = document.querySelector('#categoriesSelect').children;

            let selectedCategoriesOptions = [].filter.call(children , ( opt )=> { return opt.selected === true; });

            if( selectedCategoriesOptions.length === 0 ){
                alert('Категории не установлены!');
                return;
            }//if

            let categoriesIds = [].map.call(  selectedCategoriesOptions , ( opt )=> { return +opt.value; } );

            let productTitle = document.querySelector('#productTitle').value;
            let productPrice = document.querySelector('#productPrice').value;
            let productDescription = document.querySelector('#productDescription').value;

            let productImage = document.querySelector('#productImage');

            let data = new FormData();

            data.append('image', productImage.files[0]);
            data.append('categories', JSON.stringify(categoriesIds));
            data.append('attributes' , JSON.stringify(attributes));
            data.append('productTitle' , productTitle);
            data.append('productDescription' , productDescription);
            data.append('productPrice' , productPrice);


            try{

                let request = await fetch(`${window.ServerAddress}panel/products/new` , {
                    method: 'POST',
                    body: data
                });

                let response = await request.json();

                console.log(response);

            }//try
            catch(ex){

                console.log('ex' , ex);

            }//catch

        });

    }//if

    let productCategories = document.querySelector('#productCategories');
    let categoriesSelect = document.querySelector('#categoriesSelect');

    if( productCategories ){

        let categories = productCategories.querySelectorAll( 'option' );

        let ids = [].map.call( categories , ( opt )=>{
            return opt.value;
        } );

        ids.forEach( id => {

            let option = categoriesSelect.querySelector(`option[data-category-id='${id}']`)

            if( option ){
                option.selected = true;
            }//if

        } );

    }//if

    if(attributesTable && attributesTable.children.length !== 0){

        let rows = attributesTable.querySelectorAll('tr');

        [].forEach.call( rows , row => {

            let childRows = row.querySelectorAll('td');

            let attribute = {
                attributeID: +childRows[0].textContent,
                attributeTitle: childRows[1].textContent,
                attributeValue: childRows[2].textContent,
            };

            attributes.push( attribute );

        } );

        console.log('attributes' , attributes);

    }//if

    AddRemoveAttributeListeners( attributes );

    let updateProductButton = document.querySelector('#updateProduct');

    if( updateProductButton ){

        updateProductButton.addEventListener('click' , async ()=> {

            let productID = +document.querySelector('form').dataset.productId;

            let children = document.querySelector('#categoriesSelect').children;

            let selectedCategoriesOptions = [].filter.call(children , ( opt )=> { return opt.selected === true; });

            if( selectedCategoriesOptions.length === 0 ){
                alert('Категории не установлены!');
                return;
            }//if

            let categoriesIds = [].map.call(  selectedCategoriesOptions , ( opt )=> { return +opt.value; } );

            let productTitle = document.querySelector('#productTitle').value;
            let productPrice = document.querySelector('#productPrice').value;
            let productDescription = document.querySelector('#productDescription').value;

            let productImage = document.querySelector('#productImage');

            let data = new FormData();

            if( productImage.files.length !== 0 ){
                data.append('image', productImage.files[0]);
            }//if

            data.append('categories', JSON.stringify(categoriesIds));
            data.append('attributes' , JSON.stringify(attributes));
            data.append('productTitle' , productTitle);
            data.append('productDescription' , productDescription);
            data.append('productPrice' , productPrice);


            try{

                let request = await fetch(`${window.ServerAddress}panel/products/${productID}` , {
                    method: 'PUT',
                    body: data
                });

                let response = await request.json();

                console.log(response);

            }//try
            catch(ex){

                console.log('ex' , ex);

            }//catch

        });



    }//if

    //Удаление продукта
    let productID = -1;

    let removeButtons = document.querySelectorAll('.alert-danger');
    let modalBody = document.querySelector('#productName');

    [].forEach.call( removeButtons , ( button )=>{

        button.addEventListener('click' , async function (){

            let title = button.dataset.productTitle;
            productID = +button.dataset.productId;

            modalBody.textContent = title;
            $('#confirmRemoveProductModal').modal();

        });

    } );

    let confirmRemoveButton = document.querySelector('#confirmRemoveButton');

    if(confirmRemoveButton){

        confirmRemoveButton.addEventListener('click' , async function (){

            let data = new FormData();
            data.append('productID', productID);

            try{

                let request=await fetch( `${window.ServerAddress}panel/products/delete` , {
                    method: 'DELETE',
                    body: data
                });


                let response = await request.json();
                console.log(response);

                if(response.code === 200){

                    let table = document.querySelector(`#productTable`);
                    let row = document.querySelector(`#productTable tr[data-product-id='${productID}']`);

                    table.removeChild( row );

                }//if

            }//try
            catch (ex) {
                console.log(ex);
            }//catch

        });

    }//if

   // if(addProductJSONButton){

        //addProductJSONButton.addEventListener('click' , async ()=> {

            //let products = pr.data.products;
            //pr.innerHTML += `
                //<p>products</p>
                //`;

        //});
    //}

})();