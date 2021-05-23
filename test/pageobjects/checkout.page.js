class CheckoutPage {
    /*GETTERS*/
    /*Header*/
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
    get backpackItemPrice () { return $('.inventory_item_price')}
    get removeBackPackFromCart () { return $('#remove-sauce-labs-backpack') }
    get backpackItemPrice () { return $('.inventory_item_price') }
    get cartQuantity () { return $('.cart_quantity') }
    /*Navigation*/
    get continueShopping () { return $('#continue-shopping') }    
    get checkOutBtn () { return $('#checkout') }
    get cartQuantity () { return $('.cart_quantity') }    
    /*Form*/
    get errorMessageContainer () { return $('.error-message-container') }
    get firstNameInput () { return $('#first-name') }
    get lastNameInput () {return $('#last-name') }
    get zipCodeInput () { return $('#postal-code') }
    get continueBtn () {return $('#continue') }
    get cleanErrorMessage () { return $('.error-button') }
    get wrongUserInput () { return $('.fa-times-circle') }
    get cancelCheckout () { return $('#cancel') }
    /*Part 2*/    
    get sumaryInfoLevelPaymentInformation () { return $('//*[@id="checkout_summary_container"]/div/div[2]/div[1]') }    
    get sumaryInfoLevelPaymentValue () { return $('//*[@id="checkout_summary_container"]/div/div[2]/div[2]') }
    get sumaryInfoLevelShippingInformation () { return $('//*[@id="checkout_summary_container"]/div/div[2]/div[3]') }
    get sumaryInfoLevelShippingValue () { return $('//*[@id="checkout_summary_container"]/div/div[2]/div[4]') }
    get sumarySubTotal () { return $('//*[@id="checkout_summary_container"]/div/div[2]/div[5]') }
    get sumaryTax () { return $('//*[@id="checkout_summary_container"]/div/div[2]/div[6]') }
    get sumaryTotal () { return $('//*[@id="checkout_summary_container"]/div/div[2]/div[7]') }
    get finishBtn () { return $('#finish') }
    get cartCancel () { return $('.cart_cancel_link').$('#cancel') }
    /*Final part*/
    get completeTitle()  { return $('//*[@id="header_container"]/div[2]/span') }
    get completeHeader ()  { return $('h2') }
    get completeText ()  { return $('//*[@id="checkout_complete_container"]/div') }
    get ponyExpress ()  { return $('.pony_express').getAttribute('src') }
    get backHome () { return $('#back-to-products') }
    /*SETTERS*/
    setFirstName (firstname) {
        this.firstNameInput.setValue(firstname);
        browser.keys('Tab');        
    }
    setLastName (lastname) {
        this.lastNameInput.setValue(lastname);
        browser.keys('Tab');        
    }
    setZipCode(zipcode) {
        this.zipCodeInput.setValue(zipcode);
        browser.keys('Tab');        
    }
    /* METHODS*/
    testCheckoutForm (firstname, lastname, zipcode) {
        this.setFirstName(firstname);
        this.setLastName(lastname);
        this.setZipCode(zipcode);
        this.continueBtn.click();
    }
    cleanErrorMessages () {
        this.cleanErrorMessage.click();
    }
}    
module.exports = new CheckoutPage();