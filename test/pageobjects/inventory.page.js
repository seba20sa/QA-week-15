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
    get productSorter () { return $('.product_sort_container') }
    get  () { return $('') }   
    /*Body*/
    get imageSource () { 
        return $('//*[@id="item_4_img_link"]/img').getAttribute('src') 
    }    
    get anyProductImg () { return $$('.inventory_item_img') }
    /*Backpack item testing for first test then make dynamic*/
    // get firstItem () { return $('//*[@id="inventory_container"]/div/div[1]') }
    get backToProducts () { return $('#back-to-products')}
    get checkOutBtn () { return $('#checkout') }
    /*Backpack ID 4*/   
    get backpackItemImg () { return $$('.inventory_item_img')[1] }    
    get backpackItemtName () { return $$('.inventory_item_name')[0] }    
    get backpackItemDescription () { return $$('.inventory_item_desc')[1] }
    get addBackPackToCart () { return $('#add-to-cart-sauce-labs-backpack') }
    get removeBackPackFromCart () { return $('#remove-sauce-labs-backpack') }
    get backpackItemPrice () { return $('.inventory_item_price')[1]}
    /*Lab lights ID 0*/
    get labLightsItemImg () { return $$('.inventory_item_img')[2] }    
    get labLightsItemtName () { return $$('.inventory_item_name')[1] }    
    get labLightsItemDescription () { return $$('.inventory_item_desc')[2] }
    get addLabLightsToCart () { return $('#add-to-cart-sauce-labs-bike-lights') }
    get removeLabLightsFromCart () { return $('#remove-sauce-labs-bike-lights') }
    get labLightsItemPrice () { return $$('.inventory_item_price')[2]}
    /*Bolt T-shirt ID 1*/
    get boltTshirtItemImg () { return $$('.inventory_item_img')[3] }    
    get boltTshirtItemtName () { return $$('.inventory_item_name')[2] }    
    get boltTshirtItemDescription () { return $$('.inventory_item_desc')[3] }
    get addBoltTshirtToCart () { return $('#add-to-cart-sauce-bolt-t-shirt') }
    get removeBoltTshirtsFromCart () { return $('#remove-sauce-bolt-t-shirt') }
    get boltTshirtItemPrice () { return $$('.inventory_item_price')[3]}
    /*Fleece jacket ID 5*/
    get fleeceJacketItemImg () { return $$('.inventory_item_img')[4] }    
    get fleeceJacketItemtName () { return $$('.inventory_item_name')[3] }    
    get fleeceJacketItemDescription () { return $$('.inventory_item_desc')[4] }
    get addFleeceJacketToCart () { return $('#add-to-cart-sauce-labs-fleece-jacket') }
    get removeFleeceJacketFromCart () { return $('#remove-sauce-labs-fleece-jacket') }
    get fleeceJacketItemPrice () { return $$('.inventory_item_price')[4]}
    /*Onsie ID 2*/
    get onsieItemImg () { return $$('.inventory_item_img')[5] }    
    get onsieItemtName () { return $$('.inventory_item_name')[4] }    
    get onsieItemDescription () { return $$('.inventory_item_desc')[5] }
    get addOnsieToCart () { return $('#add-to-cart-sauce-labs-onesie') }
    get removeOnsieFromCart () { return $('#remove-sauce-labs-onesie') }
    get onsieItemPrice () { return $$('.inventory_item_price')[5]}
    /*Red shirt ID 3*/
    get redShirtItemImg () { return $$('.inventory_item_img')[6] }    
    get redShirtItemtName () { return $$('.inventory_item_name')[5] }    
    get redShirtItemDescription () { return $$('.inventory_item_desc')[6] }
    get addRedShirtToCart () { return $('#add-to-cart-test.allthethings()-t-shirt-(red)') }
    get removeRedShirtFromCart () { return $('#remove-test.allthethings()-t-shirt-(red)') }
    get redShirtItemPrice () { return $$('.inventory_item_price')[6]} 
    
    /*Footer*/
    get twitterLink () { return $('.social_twitter').$('a').getAttribute('href') }
    get facebookLink () { return $('.social_facebook').$('a').getAttribute('href') }
    get linkedinLink () { return $('.social_linkedin').$('a').getAttribute('href') } 
    get swagBot  () { return $('.footer_robot').getAttribute('src') }
    get footerCredits () { return $('.footer_copy') }
    //Other items 
     //*[@id="remove-sauce-labs-backpack"]
     //*[@id="remove-sauce-labs-bike-light"]


    /*SETTERS*/
    burgerMenuOption (option) {        
        this.burgerMenuBtn.click();
        browser.pause(1000);
        option.click();
    }
    
    /* METHODS */
    

    
    getToInventory () {
        browser.url('https://www.saucedemo.com/');        
        LoginPage.testLogin('standard_user', 'secret_sauce');
        browser.pause(1000);        

    }
    getToProblematicInventory () {
        browser.url('https://www.saucedemo.com/');        
        LoginPage.testLogin('problem_user', 'secret_sauce');
        browser.pause(1000);        

    }
    
    addItemToCart (itemaddlink) {
        this.itemaddlink.click();
    }
    openSocMed (socialmedialink) {
        socialmedialink.click();
    }
    goBack () {
        browser.back();
    }
    
}    

module.exports = new InventoryPage();