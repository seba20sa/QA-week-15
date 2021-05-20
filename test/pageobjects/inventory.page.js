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
    get  () { return $('') }
    /*Body*/
    get problematicImageSource () { 
        return $('//*[@id="item_4_img_link"]/img').getAttribute('src') 
    }
    
    get anyProductImg () { return $$('.inventory_item_img')}
    /*Backpack item testing for first test then make dynamic*/
    get firstProductImg () { return $('.inventory_item_img')}
    get backpackItemDescription () { return $('.inventory_item_desc')}
    get addBackPackToCart () { return $('#add-to-cart-sauce-labs-backpack')}
    get removeBackPackFromCart () { return $('#remove-sauce-labs-backpack')}
    get backpackItemPrice () { return $('.inventory_item_price')}

    /*Footer*/
    get socMedTwitter () { return $('.social_twitter') }
    get socMedFacebook () { return $('.social_facebook') }
    get socMedLinkedin () { return $('.social_linkedin') }    
    get swagBot  () { return $('.footer_robot') }
    get footerCredits () { return $('.footer_copy') }

    
    /*SETTERS*/
    
    /* METHODS */
    
}    
module.exports = new InventoryPage();