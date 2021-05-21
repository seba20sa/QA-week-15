class InventoryPage {
    /*GETTERS*/
    /*Header*/
    get inventoryTitle () { return $('.title') }
    get peekBot () { return $('.peek') }
    get appLogo () { return $('.app_logo') }
    get shoppingCartLink () { return $('.shopping_cart_link') }
    get cartItemsCounter () { return $('.shopping_cart_badge') }
    /*Menu*/
    get burgerMenuBtn () { return $('#react-burger-menu-btn') }
    get closeMenuBtn () { return $('#react-burger-cross-btn') }
    get aboutBtn () { return $('#about_sidebar_link') }
    get allItemsBtn () { return $('#inventory_sidebar_link') }
    get logOutBtn () { return $('#logout_sidebar_link') }
    get resetAppStateBtn () { return $('#reset_sidebar_link') }
    get productSorter () { return $('.product_sort-container') }
    get  () { return $('') }   
    /*Body*/
    get problematicImageSource () { 
        return $('//*[@id="item_4_img_link"]/img').getAttribute('src') 
    }    
    get anyProductImg () { return $$('.inventory_item_img')}
    /*Backpack item testing for first test then make dynamic*/
    //$$('.inventory_item')[x].$('selector')
    get backpackItemImg () { return $('.inventory_item_img')}
    get backpackItemtName () { return $('.inventory_item_name')}    
    get backpackItemDescription () { return $('.inventory_item_desc')}
    get addBackPackToCart () { return $('#add-to-cart-sauce-labs-backpack')}
    get removeBackPackFromCart () { return $('#remove-sauce-labs-backpack')}
    get backpackItemPrice () { return $('.inventory_item_price')}
    get backToProducts () { return $('#back-to-products')}
    /*Footer*/
    get twitterLink () { return $('.social_twitter').$('a').getAttribute('href') }
    get facebookLink () { return $('.social_facebook').$('a').getAttribute('href') }
    get linkedinLink () { return $('.social_linkedin').$('a').getAttribute('href') } 
    get swagBot  () { return $('.footer_robot').getAttribute('src') }
    get footerCredits () { return $('.footer_copy') }
    /*SETTERS*/
    burgerMenuOption (option) {
        this.burgerMenuBtn.click();
        option.click();
    }
    sortProducts (preference) {
        this.productSorter.click();
        this.productSorter.$$('option')[`${preference}`].click();
    }
    /*First trial with the backpack then use a variable selector */

    
 
    
    /* METHODS */
    addItemToCart () {
        addBackPackToCart.click();
    }
    openSocMed (socialmedia) {
        socialmedia.click();
    }
    goBack () {
        browser.back();
    }
    
}    

module.exports = new InventoryPage();