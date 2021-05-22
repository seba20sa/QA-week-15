class CartPage {
    /*Header*/
    get inventoryTitle () { return $('.title') }
    get shoppingCartLink () { return $('.shopping_cart_link') }
    get cartItemsCounter () { return $('.shopping_cart_badge') }
    /*Menu*/
    get burgerMenuBtn () { return $('#react-burger-menu-btn') }
    get closeMenuBtn () { return $('#react-burger-cross-btn') }
    get allItemsBtn () { return $('#inventory_sidebar_link') }
    get logOutBtn () { return $('#logout_sidebar_link') }
    get resetAppStateBtn () { return $('#reset_sidebar_link') }
    get closeMenuBtn () { return $('#react-burger-cross-btn') }
    /*Item*/
    get backpackItemImg () { return $('.inventory_item_img') }
    get backpackItemtName () { return $('.inventory_item_name') }    
    get backpackItemDescription () { return $('.inventory_item_desc') }
    get addBackPackToCart () { return $('#add-to-cart-sauce-labs-backpack') }
    get removeBackPackFromCart () { return $('#remove-sauce-labs-backpack') }
    get backpackItemPrice () { return $('.inventory_item_price') }
    get continueShopping () { return $('#continue-shopping') }    
    get checkOutBtn () { return $('#checkout') }
    get cartQuantity () { return $('.cart_quantity') }
    /*SETTERS*/
    burgerMenuOption (option) {
        this.burgerMenuBtn.click();
        browser.pause(1000);
        option.click();
    }

           
       
    /* METHODS */

   
}    
module.exports = new CartPage();
