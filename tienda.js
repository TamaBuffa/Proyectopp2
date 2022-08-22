const addToShoppingCartButtons=document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach(addToCartButton => {
    addToCartButton.addEventListener('click',addToCartClicked);
});

const shoppingCartItemsContainer= document.querySelector('.shoppingCartItemsContainer');//declaro en forma global


function addToCartClicked(event) {//accedo a cada elemento que necesito,titulo, imagen, precio
    const button =event.target;
    const item=button.closest('.item');

    const itemTitle=item.querySelector('.item-title').textContent;
    const itemPrice=item.querySelector('.item-price').textContent;
    const itemImg=item.querySelector('.item-img').src;

addItemToShoppingCart(itemTitle,itemPrice,itemImg)
}

function addItemToShoppingCart (itemTitle,itemPrice,itemImg){
    const elementsTitle= shoppingCartItemsContainer.getElementsByClassName('shoppingCartItemTitle');

    for(let i=0; i< elementsTitle.length;i++){ //hago un for para que recorra los elementos de titulo
        if(elementsTitle[i].innerText=== itemTitle){
            let elementQuantity= elementsTitle[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity');
            elementQuantity.value++;
           // $('.toast').toast('show'); no funciona, bootstrap 4, utilizando 5.0
            updateShoppingCartTotal();
            return;
        } 
        
    } 
    
    const shoppingCartRow=document.createElement('div');
    const shoppingCartContent=`
    <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src= ${itemImg} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>

        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
    
        <div class="col-4">
            <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;

    shoppingCartRow.innerHTML= shoppingCartContent
    shoppingCartItemsContainer.append(shoppingCartRow)
    shoppingCartRow.querySelector('.buttonDelete').addEventListener('click',removeShoppingCartItem);
    shoppingCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('change',quantityChanged);

    updateShoppingCartTotal()

}
    function updateShoppingCartTotal(){
        let total=0;
        const shoppingCartTotal= document.querySelector('.shoppingCartTotal');
        const shoppingCartItems= document.querySelectorAll('.shoppingCartItem');
        
        shoppingCartItems.forEach((shoppingCartItem) => {
        const shoppingCartItemPriceElement= shoppingCartItem.querySelector('.shoppingCartItemPrice');
        const shoppingCartItemPrice=Number(shoppingCartItemPriceElement.textContent.replace('$',''));
        const shoppingCartItemQuantityElement=shoppingCartItem.querySelector('.shoppingCartItemQuantity');
        const shoppingCartItemQuantity=Number(shoppingCartItemQuantityElement.value);
        
        total=total+shoppingCartItemPrice*shoppingCartItemQuantity;
    });
    
    shoppingCartTotal.innerHTML=`${total.toFixed(2)}$`;

    }
    //Funcionalidad Borrar un producto
    function removeShoppingCartItem(event){
        const buttonClicked=event.target;
        buttonClicked.closest('.shoppingCartItem').remove();
        updateShoppingCartTotal();
    }
    
    //Cuando se agregue cantidad manualmente, y tmb no pueda ser negativa
    function quantityChanged (event){
        const input= event.target;
        //valores menores a 0
        input.value<=0 ? (input.value=1):null;
        //o puede ser asi tambien
        //if(input.value<=0){
            //input.value=1: }
        
        //actualice el precio cada vez que cambiemos la cantidad
        updateShoppingCartTotal();
    }

    //No duplicar imagen del producto, solo cambiar la cantidad cuadno se hace click

    //console.log("hola: addToCartClicked ->itemPrice", itemTitle,itemPrice,itemImg);
    //console.log("hola: updateShoppingCartTotal->
    //console.log("hola: removeShoppingCartItem->buttonClicked", buttonClicked);
    //console.log("hola: quantityChanged-> input",  input);