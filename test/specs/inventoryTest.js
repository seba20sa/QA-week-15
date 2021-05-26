const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
describe ('INVENTORY page testing',  () => {    
    /*URLs to perform the test*/
    const urlLogin = 'https://www.saucedemo.com/';
    const urlInventory = 'https://www.saucedemo.com/inventory.html';
    const urlCart = 'https://www.saucedemo.com/cart.html';
    const urlAbout = 'https://saucelabs.com/';
    const urlProblematicAbout = 'https://saucelabs.com/error/404';
    //ITEMS
    const itemUrlFour = 'https://www.saucedemo.com/inventory-item.html?id=4';
    const itemUrlZero = 'https://www.saucedemo.com/inventory-item.html?id=0';
    const itemUrlOne = 'https://www.saucedemo.com/inventory-item.html?id=1';
    const itemUrlFive = 'https://www.saucedemo.com/inventory-item.html?id=5';
    const itemUrlTwo = 'https://www.saucedemo.com/inventory-item.html?id=2';
    const itemUrlThree = 'https://www.saucedemo.com/inventory-item.html?id=3';
    const itemUrlBroken = 'https://www.saucedemo.com/inventory-item.html?id=6';
    const urlCheckout = 'https://www.saucedemo.com/checkout-step-one.html';  
    const urlDogImg = 'https://www.saucedemo.com/static/media/sl-404.168b1cce.jpg';
    describe ('INVENTORY testing', () =>{
        beforeAll('Open browser on the tested page', () => {            
            browser.url(urlLogin);
            LoginPage.testLogin('standard_user', 'secret_sauce');
            browser.pause(1000);
        });
        describe ('HEADER testing', () => {            
            it('Cart icon opens the cart URL', () => {
                InventoryPage.shoppingCartLink.click();
                expect(browser).toHaveUrl(urlCart);
                browser.back();
                expect(browser).toHaveUrl(urlInventory);
            });        
            it('Open and close burger menu', () => {
                InventoryPage.burgerMenuOption(InventoryPage.closeMenuBtn);                
            }); 
            it('Open burger menu and click the about option', () => {
                InventoryPage.burgerMenuOption(InventoryPage.aboutBtn);
                expect(browser).toHaveUrl(urlAbout);
                browser.back();
                expect(browser).toHaveUrl(urlInventory);
            });
            it('Open burger menu and logout check that fields and error fields to be empty'
            , () => {
                InventoryPage.burgerMenuOption(InventoryPage.logOutBtn);
                expect(browser).toHaveUrl(urlLogin);
                expect(LoginPage.errorMessageContainer).toHaveText("");
                expect(LoginPage.userNameInput).toHaveText("");
                expect(LoginPage.userNameInput).toHaveText("");
                expect(LoginPage.passwordInput).toHaveText("");
                LoginPage.testLogin('standard_user', 'secret_sauce');
                expect(browser).toHaveUrl(urlInventory);                
            });
        });
        describe ('BODY testing', () => {
            describe ('SORTER testing', () => {                
                it('Price HIGH-LOW OP: 3 the prices must be ordered in a descending fashion', () =>{
                    browser.refresh();
                    InventoryPage.productSorter.click();
                    InventoryPage.sortItems(3);
                    expect(InventoryPage.priceItemSelector(0)).toHaveText("$49.99");
                    expect(InventoryPage.priceItemSelector(1)).toHaveText("$29.99");
                    expect(InventoryPage.priceItemSelector(2)).toHaveText("$15.99");
                    expect(InventoryPage.priceItemSelector(3)).toHaveText("$15.99");
                    expect(InventoryPage.priceItemSelector(4)).toHaveText("$9.99");
                    expect(InventoryPage.priceItemSelector(5)).toHaveText("$7.99");                   
                });                
                it('Price LOW-HIGH OP:2  the prices must be ordered in a ascending fashion', () =>{
                    browser.refresh();
                    InventoryPage.productSorter.click();
                    InventoryPage.sortItems(2);
                    expect(InventoryPage.priceItemSelector(0)).toHaveText("$7.99");
                    expect(InventoryPage.priceItemSelector(1)).toHaveText("$9.99");
                    expect(InventoryPage.priceItemSelector(2)).toHaveText("$15.99");
                    expect(InventoryPage.priceItemSelector(3)).toHaveText("$15.99");
                    expect(InventoryPage.priceItemSelector(4)).toHaveText("$29.99"); 
                    expect(InventoryPage.priceItemSelector(5)).toHaveText("$49.99");
                });
                it('Name Z-A OP:1  the names must be ordered in a descending fashion', () =>{
                    browser.refresh();
                    InventoryPage.productSorter.click();
                    InventoryPage.sortItems(1);                   
                    expect(InventoryPage.nameItemSelector(0))
                    .toHaveText("Test.allTheThings() T-Shirt (Red)");
                    expect(InventoryPage.nameItemSelector(1)).toHaveText("Sauce Labs Onesie");
                    expect(InventoryPage.nameItemSelector(2)).toHaveText("Sauce Labs Fleece Jacket");
                    expect(InventoryPage.nameItemSelector(3)).toHaveText("Sauce Labs Bolt T-Shirt");
                    expect(InventoryPage.nameItemSelector(4)).toHaveText("Sauce Labs Bike Light");
                    expect(InventoryPage.nameItemSelector(5)).toHaveText("Sauce Labs Backpack");                    
                });
                it('Name A-Z OP:  the names must be ordered in a descending fashion', () =>{
                    browser.refresh();
                    InventoryPage.productSorter.click();
                    InventoryPage.sortItems(0);
                    expect(InventoryPage.nameItemSelector(5))
                    .toHaveText("Test.allTheThings() T-Shirt (Red)");
                    expect(InventoryPage.nameItemSelector(4)).toHaveText("Sauce Labs Onesie");
                    expect(InventoryPage.nameItemSelector(3)).toHaveText("Sauce Labs Fleece Jacket");
                    expect(InventoryPage.nameItemSelector(2)).toHaveText("Sauce Labs Bolt T-Shirt");
                    expect(InventoryPage.nameItemSelector(1)).toHaveText("Sauce Labs Bike Light");
                    expect(InventoryPage.nameItemSelector(0)).toHaveText("Sauce Labs Backpack");                    
                });
            });
            describe ('Add all items and check if the quantity is reflected on the item counter', () =>{
                it('From inventory add the items one by one and check the counter on the cart icon', () =>{
                    InventoryPage.addBackPackToCart.click();
                    expect(InventoryPage.cartItemsCounter).toHaveText("1");
                    InventoryPage.addLabLightToCart.click();                    
                    expect(InventoryPage.cartItemsCounter).toHaveText("2");
                    InventoryPage.addBoltTshirtToCart.click();
                    expect(InventoryPage.cartItemsCounter).toHaveText("3");
                    InventoryPage.addFleeceJacketToCart.click();
                    expect(InventoryPage.cartItemsCounter).toHaveText("4");
                    InventoryPage.addOnsieToCart.click();
                    expect(InventoryPage.cartItemsCounter).toHaveText("5");
                    InventoryPage.addRedShirtToCartOnInventory.click();
                    expect(InventoryPage.cartItemsCounter).toHaveText("6");
                    InventoryPage.removeBackPackFromCart.click();
                    expect(InventoryPage.cartItemsCounter).toHaveText("5");
                    InventoryPage.removeLabLightFromCart.click();
                    expect(InventoryPage.cartItemsCounter).toHaveText("4");
                    InventoryPage.removeBoltTshirtsFromCart.click();
                    expect(InventoryPage.cartItemsCounter).toHaveText("3");
                    InventoryPage.removeFleeceJacketFromCart.click();
                    expect(InventoryPage.cartItemsCounter).toHaveText("2");
                    InventoryPage.removeOnsieFromCart.click();
                    expect(InventoryPage.cartItemsCounter).toHaveText("1");
                    InventoryPage.removeRedShirtFromCartOnInventory.click();
                    expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();  
                });
            });
        
            describe ('BACKPACK testing', () => {
                it('Click item  img/name and check it opens the individual item page'
                    +'then open the burger menu, click the ALL ITEMS option and check the url', () => {
                    InventoryPage.igmItemSelector(1).click();
                    expect(browser).toHaveUrl(itemUrlFour);
                    InventoryPage.burgerMenuOption(InventoryPage.allItemsBtn);
                    expect(browser).toHaveUrl(urlInventory);
                    InventoryPage.nameItemSelector(0).click();
                    expect(browser).toHaveUrl(itemUrlFour);
                    InventoryPage.burgerMenuOption(InventoryPage.allItemsBtn);
                    expect(browser).toHaveUrl(urlInventory);
                    browser.pause(1000);                  
                });
                it('Click item  IMG and check it opens the individual item page'
                +'then click on BACK TO PRODUCTS and check the inventory url', () => {
                    InventoryPage.igmItemSelector(1).click();
                    expect(browser).toHaveUrl(itemUrlFour);
                    InventoryPage.backToProducts.click();                
                    browser.pause(1000);  
                    expect(browser).toHaveUrl(urlInventory);
                    browser.pause(1000);                  
                });
                it('Click item  IMG add item to cart the remove the item'
                +'then check the cart item counter', () => {
                    InventoryPage.igmItemSelector(1).click();
                    expect(browser).toHaveUrl(itemUrlFour);
                    InventoryPage.addBackPackToCart.click();
                    browser.pause(1000);                
                    expect(InventoryPage.cartItemsCounter).toHaveText("1");
                    InventoryPage.removeBackPackFromCart.click();
                    browser.pause(1000);
                    expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
                    browser.url(urlInventory);
                    browser.pause(1000);                 
                });             
                it('Add item to the cart check the item counter on the cart icon and'
                +'remove item and check if the counter goes back to zero', () => {
                    InventoryPage.igmItemSelector(1).click();
                    expect(browser).toHaveUrl(itemUrlFour);
                    InventoryPage.addBackPackToCart.click();
                    browser.pause(1000);
                    expect(InventoryPage.cartItemsCounter).toHaveText("1");
                    InventoryPage.removeBackPackFromCart.click();
                    browser.pause(1000);
                    expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
                    browser.pause(1000);
                });            
                it('Add item to the cart then click burger menu and click RESET APP STATE then check'
                +'the cartItemsCounter display status', () => {
                    InventoryPage.addBackPackToCart.click();
                    InventoryPage.burgerMenuOption(InventoryPage.resetAppStateBtn);
                    expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
                    browser.pause(1000);
                });
                it('Click checkout and test the url', () => {                
                    InventoryPage.shoppingCartLink.click();
                    InventoryPage.checkOutBtn.click();
                    expect(browser).toHaveUrl(urlCheckout);
                    browser.pause(1000);                    
                });
            });
            describe ('BIKE LIGHT testing', () => {
                it('Click item  img/name and check it opens the individual item page'
                +'then open the burger menu, click the ALL ITEMS option and check the url', () => {
                    browser.url(urlInventory);
                    InventoryPage.igmItemSelector(2).click();
                    expect(browser).toHaveUrl(itemUrlZero);
                    InventoryPage.burgerMenuOption(InventoryPage.allItemsBtn);
                    expect(browser).toHaveUrl(urlInventory);
                    InventoryPage.nameItemSelector(1).click();
                    expect(browser).toHaveUrl(itemUrlZero);
                    InventoryPage.burgerMenuOption(InventoryPage.allItemsBtn);
                    expect(browser).toHaveUrl(urlInventory);
                    browser.pause(1000);
                });
                it('Click item  IMG and check it opens the individual item page'
                +'then click on BACK TO PRODUCTS and check the inventory url', () => {
                    InventoryPage.igmItemSelector(2).click();
                    InventoryPage.backToProducts.click();                
                    browser.pause(1000);  
                    expect(browser).toHaveUrl(urlInventory);
                    browser.pause(1000);                  
                });
                it('Click item  IMG add item to cart the remove the item'
                +'then check the cart item counter', () => {                    
                    InventoryPage.igmItemSelector(2).click();
                    expect(browser).toHaveUrl(itemUrlZero);
                    InventoryPage.addLabLightToCart.click();
                    browser.pause(1000);                
                    expect(InventoryPage.cartItemsCounter).toHaveText("1");
                    InventoryPage.removeLabLightFromCart.click();
                    browser.pause(1000);
                    expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
                    browser.url(urlInventory);
                    browser.pause(1000);                 
                });             
                it('Add item to the cart check the item counter on the cart icon and'
                +'remove item and check if the counter goes back to zero', () => {
                    InventoryPage.igmItemSelector(2).click();
                    expect(browser).toHaveUrl(itemUrlZero);
                    InventoryPage.addLabLightToCart.click();
                    browser.pause(1000);
                    expect(InventoryPage.cartItemsCounter).toHaveText("1");
                    InventoryPage.removeLabLightFromCart.click();
                    browser.pause(1000);
                    expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
                    browser.pause(1000);
                });            
                it('Add item to the cart then click burger menu and click RESET APP STATE then check'
                +'the cartItemsCounter display status', () => {
                    InventoryPage.addLabLightToCart.click();
                    InventoryPage.burgerMenuOption(InventoryPage.resetAppStateBtn);
                    expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
                    browser.pause(1000);
                });
                it('Click checkout and test the url', () => {                
                    InventoryPage.shoppingCartLink.click();
                    InventoryPage.checkOutBtn.click();
                    expect(browser).toHaveUrl(urlCheckout);
                    browser.pause(1000);                    
                });                
            });
            describe ('BOLT T-SHIRT testing', () => {
                it('Click item  img/name and check it opens the individual item page'
                +'then open the burger menu, click the ALL ITEMS option and check the url', () => {
                    browser.url(urlInventory);
                    InventoryPage.igmItemSelector(4).click();
                    expect(browser).toHaveUrl(itemUrlOne);
                    InventoryPage.burgerMenuOption(InventoryPage.allItemsBtn);
                    expect(browser).toHaveUrl(urlInventory);
                    InventoryPage.nameItemSelector(2).click();
                    expect(browser).toHaveUrl(itemUrlOne);
                    InventoryPage.burgerMenuOption(InventoryPage.allItemsBtn);
                    expect(browser).toHaveUrl(urlInventory);
                    browser.pause(1000);
                });
                it('Click item  IMG and check it opens the individual item page'
                +'then click on BACK TO PRODUCTS and check the inventory url', () => {
                    InventoryPage.igmItemSelector(4).click();
                    InventoryPage.backToProducts.click();                
                    browser.pause(1000);  
                    expect(browser).toHaveUrl(urlInventory);
                    browser.pause(1000);                  
                });
                it('Click item  IMG add item to cart the remove the item'
                +'then check the cart item counter', () => {
                    
                    InventoryPage.igmItemSelector(4).click();
                    expect(browser).toHaveUrl(itemUrlOne);
                    InventoryPage.addBoltTshirtToCart.click();
                    browser.pause(1000);                
                    expect(InventoryPage.cartItemsCounter).toHaveText("1");
                    InventoryPage.removeBoltTshirtsFromCart.click();
                    browser.pause(1000);
                    expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
                    browser.url(urlInventory);
                    browser.pause(1000);                 
                });             
                it('Add item to the cart check the item counter on the cart icon and'
                +'remove item and check if the counter goes back to zero', () => {
                    InventoryPage.igmItemSelector(4).click();
                    expect(browser).toHaveUrl(itemUrlOne);
                    InventoryPage.addBoltTshirtToCart.click();
                    browser.pause(1000);
                    expect(InventoryPage.cartItemsCounter).toHaveText("1");
                    InventoryPage.removeBoltTshirtsFromCart.click();
                    browser.pause(1000);
                    expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
                    browser.pause(1000);
                });            
                it('Add item to the cart then click burger menu and click RESET APP STATE then check'
                +'the cartItemsCounter display status', () => {
                    InventoryPage.addBoltTshirtToCart.click();
                    InventoryPage.burgerMenuOption(InventoryPage.resetAppStateBtn);
                    expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
                    browser.pause(1000);
                });
                it('Click checkout and test the url', () => {                
                    InventoryPage.shoppingCartLink.click();
                    InventoryPage.checkOutBtn.click();
                    expect(browser).toHaveUrl(urlCheckout);
                    browser.pause(1000);                    
                });                
            });
            describe ('FLEECE JACKET testing', () => {
                it('Click item  img/name and check it opens the individual item page'
                +'then open the burger menu, click the ALL ITEMS option and check the url', () => {
                    browser.url(urlInventory);
                    InventoryPage.igmItemSelector(6).click();
                    expect(browser).toHaveUrl(itemUrlFive);
                    InventoryPage.burgerMenuOption(InventoryPage.allItemsBtn);
                    expect(browser).toHaveUrl(urlInventory);
                    InventoryPage.nameItemSelector(3).click();
                    expect(browser).toHaveUrl(itemUrlFive);
                    InventoryPage.burgerMenuOption(InventoryPage.allItemsBtn);
                    expect(browser).toHaveUrl(urlInventory);
                    browser.pause(1000);
                });
                it('Click item  IMG and check it opens the individual item page'
                +'then click on BACK TO PRODUCTS and check the inventory url', () => {
                    InventoryPage.igmItemSelector(6).click();
                    InventoryPage.backToProducts.click();                
                    browser.pause(1000);  
                    expect(browser).toHaveUrl(urlInventory);
                    browser.pause(1000);                  
                });
                it('Click item  IMG add item to cart the remove the item'
                +'then check the cart item counter', () => {                    
                    InventoryPage.igmItemSelector(6).click();
                    expect(browser).toHaveUrl(itemUrlFive);
                    InventoryPage.addFleeceJacketToCart.click();
                    browser.pause(1000);                
                    expect(InventoryPage.cartItemsCounter).toHaveText("1");
                    InventoryPage.removeFleeceJacketFromCart.click();
                    browser.pause(1000);
                    expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
                    browser.url(urlInventory);
                    browser.pause(1000);                 
                });             
                it('Add item to the cart check the item counter on the cart icon and'
                +'remove item and check if the counter goes back to zero', () => {
                    InventoryPage.igmItemSelector(6).click();
                    expect(browser).toHaveUrl(itemUrlFive);
                    InventoryPage.addFleeceJacketToCart.click();
                    browser.pause(1000);
                    expect(InventoryPage.cartItemsCounter).toHaveText("1");
                    InventoryPage.removeFleeceJacketFromCart.click();
                    browser.pause(1000);
                    expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
                    browser.pause(1000);
                });            
                it('Add item to the cart then click burger menu and click RESET APP STATE then check'
                +'the cartItemsCounter display status', () => {
                    InventoryPage.addFleeceJacketToCart.click();
                    InventoryPage.burgerMenuOption(InventoryPage.resetAppStateBtn);
                    expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
                    browser.pause(1000);
                });
                it('Click checkout and test the url', () => {                
                    InventoryPage.shoppingCartLink.click();
                    InventoryPage.checkOutBtn.click();
                    expect(browser).toHaveUrl(urlCheckout);
                    browser.pause(1000);                    
                });                
            });
            describe ('ONSIE testing', () => {
                it('Click item  img/name and check it opens the individual item page'
                +'then open the burger menu, click the ALL ITEMS option and check the url', () => {
                    browser.url(urlInventory);
                    InventoryPage.igmItemSelector(8).click();
                    expect(browser).toHaveUrl(itemUrlTwo);
                    InventoryPage.burgerMenuOption(InventoryPage.allItemsBtn);
                    expect(browser).toHaveUrl(urlInventory);
                    InventoryPage.nameItemSelector(4).click();
                    expect(browser).toHaveUrl(itemUrlTwo);
                    InventoryPage.burgerMenuOption(InventoryPage.allItemsBtn);
                    expect(browser).toHaveUrl(urlInventory);
                    browser.pause(1000);
                });
                it('Click item  IMG and check it opens the individual item page'
                +'then click on BACK TO PRODUCTS and check the inventory url', () => {
                    InventoryPage.igmItemSelector(8).click();
                    InventoryPage.backToProducts.click();                
                    browser.pause(1000);  
                    expect(browser).toHaveUrl(urlInventory);
                    browser.pause(1000);                  
                });
                it('Click item  IMG add item to cart the remove the item'
                +'then check the cart item counter', () => {                    
                    InventoryPage.igmItemSelector(8).click();
                    expect(browser).toHaveUrl(itemUrlTwo);
                    InventoryPage.addOnsieToCart.click();
                    browser.pause(1000);                
                    expect(InventoryPage.cartItemsCounter).toHaveText("1");
                    InventoryPage.removeOnsieFromCart.click();
                    browser.pause(1000);
                    expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
                    browser.url(urlInventory);
                    browser.pause(1000);                 
                });             
                it('Add item to the cart check the item counter on the cart icon and'
                +'remove item and check if the counter goes back to zero', () => {
                    InventoryPage.igmItemSelector(8).click();
                    expect(browser).toHaveUrl(itemUrlTwo);
                    InventoryPage.addOnsieToCart.click();
                    browser.pause(1000);
                    expect(InventoryPage.cartItemsCounter).toHaveText("1");
                    InventoryPage.removeOnsieFromCart.click();
                    browser.pause(1000);
                    expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
                    browser.pause(1000);
                });            
                it('Add item to the cart then click burger menu and click RESET APP STATE then check'
                +'the cartItemsCounter display status', () => {
                    InventoryPage.addOnsieToCart.click();
                    InventoryPage.burgerMenuOption(InventoryPage.resetAppStateBtn);
                    expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
                    browser.pause(1000);
                });
                it('Click checkout and test the url', () => {                
                    InventoryPage.shoppingCartLink.click();
                    InventoryPage.checkOutBtn.click();
                    expect(browser).toHaveUrl(urlCheckout);
                    browser.pause(1000);                    
                });                
            });
            describe ('RED SHIRT testing', () => {
                it('Click item  img/name and check it opens the individual item page'
                +'then open the burger menu, click the ALL ITEMS option and check the url', () => {
                    browser.url(urlInventory);
                    InventoryPage.igmItemSelector(10).click();
                    expect(browser).toHaveUrl(itemUrlThree);
                    InventoryPage.burgerMenuOption(InventoryPage.allItemsBtn);
                    expect(browser).toHaveUrl(urlInventory);
                    InventoryPage.nameItemSelector(5).click();
                    expect(browser).toHaveUrl(itemUrlThree);
                    InventoryPage.burgerMenuOption(InventoryPage.allItemsBtn);
                    expect(browser).toHaveUrl(urlInventory);
                    browser.pause(1000);
                });
                it('Click item  IMG and check it opens the individual item page'
                +'then click on BACK TO PRODUCTS and check the inventory url', () => {
                    InventoryPage.igmItemSelector(10).click();
                    InventoryPage.backToProducts.click();                
                    browser.pause(1000);  
                    expect(browser).toHaveUrl(urlInventory);
                    browser.pause(1000);                  
                });
                it('Click item  IMG add item to cart the remove the item'
                +'then check the cart item counter', () => {                    
                    InventoryPage.igmItemSelector(10).click();
                    expect(browser).toHaveUrl(itemUrlThree);
                    InventoryPage.addRedShirtToCartOnItems.click();
                    browser.pause(1000);                
                    expect(InventoryPage.cartItemsCounter).toHaveText("1");
                    InventoryPage.removeRedShirtFromCartOnItems.click();
                    browser.pause(1000);
                    expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
                    browser.url(urlInventory);
                    browser.pause(1000);                 
                });
                it('Add item to the cart then click burger menu and click RESET APP STATE then check'
                +'the cartItemsCounter display status', () => {                    
                    InventoryPage.addRedShirtToCartOnInventory.click();                    
                    InventoryPage.burgerMenuOption(InventoryPage.resetAppStateBtn);                    
                    expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();                    
                    browser.pause(1000);
                });             
                it('Add item to the cart check the item counter on the cart icon and'
                +'remove item and check if the counter goes back to zero', () => {
                    InventoryPage.igmItemSelector(10).click();
                    expect(browser).toHaveUrl(itemUrlThree);
                    InventoryPage.addRedShirtToCartOnItems.click();                    
                    expect(InventoryPage.cartItemsCounter).toHaveText("1");
                    InventoryPage.removeRedShirtFromCartOnItems.click();                    
                    expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
                    browser.pause(1000);
                });            
                
                it('Click checkout and test the url', () => {                
                    InventoryPage.shoppingCartLink.click();
                    InventoryPage.checkOutBtn.click();
                    expect(browser).toHaveUrl(urlCheckout);
                    browser.pause(1000);                    
                });                
            });
        });
        describe ('FOOTER testing', () =>{
            it('Check the url on the Twitter logo is correct', () => {
                expect(InventoryPage.twitterLink).toBe('https://twitter.com/saucelabs');
                browser.pause(1000);
            });
            it('Check the url on the Facebook logo is correct', () => {
                expect(InventoryPage.facebookLink).toBe('https://www.facebook.com/saucelabs');
                browser.pause(1000);
            });
            it('Check the url on the Linkedin logo is correct', () => {
                expect(InventoryPage.linkedinLink)
                .toBe('https://www.linkedin.com/company/sauce-labs/');
                browser.pause(1000);
            });
            it('Check the footer credit text to be correct', () => {
                expect(InventoryPage.footerCredits)
                .toHaveText("© 2021 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy");
                browser.pause(1000);
            });
            it('Check img for swag-bot', () => {
                expect(InventoryPage.swagBot)
                .toBe("https://www.saucedemo.com/static/media/SwagBot_Footer_graphic.2e87acec.png");
                browser.pause(1000);                
            });
        });
         describe('PROBLEMATIC user test', () =>{
            beforeAll('Log out from standard user and access problem user', () =>{
                InventoryPage.burgerMenuBtn.click();
                InventoryPage.logOutBtn.click();
                browser.url('https://www.saucedemo.com/');        
                LoginPage.testLogin('problem_user', 'secret_sauce');
                
            });
            it('Open burger menu and click the about option', () => {
                InventoryPage.burgerMenuOption(InventoryPage.aboutBtn);
                expect(browser).toHaveUrl(urlProblematicAbout);
                browser.back();
                expect(browser).toHaveUrl(urlInventory);
            });
            it('Test all LINKS and IMAGES checking the imgs IDs manually one by one', () =>{
                expect(InventoryPage.igmItemSelector(1).getAttribute('src')).toBe(urlDogImg);
                expect(InventoryPage.igmItemSelector(3).getAttribute('src')).toBe(urlDogImg);
                expect(InventoryPage.igmItemSelector(5).getAttribute('src')).toBe(urlDogImg);
                expect(InventoryPage.igmItemSelector(7).getAttribute('src')).toBe(urlDogImg);
                expect(InventoryPage.igmItemSelector(9).getAttribute('src')).toBe(urlDogImg);
                expect(InventoryPage.igmItemSelector(11).getAttribute('src')).toBe(urlDogImg);
            });
            it('Test SORTER value:1 is Z-A, check the order of items names stays A-Z', () => {
                InventoryPage.sortItems(1);
                expect(InventoryPage.nameItemSelector(5))
                .toHaveText("Test.allTheThings() T-Shirt (Red)");
                expect(InventoryPage.nameItemSelector(4)).toHaveText("Sauce Labs Onesie");
                expect(InventoryPage.nameItemSelector(3)).toHaveText("Sauce Labs Fleece Jacket");
                expect(InventoryPage.nameItemSelector(2)).toHaveText("Sauce Labs Bolt T-Shirt");
                expect(InventoryPage.nameItemSelector(1)).toHaveText("Sauce Labs Bike Light");
                expect(InventoryPage.nameItemSelector(0)).toHaveText("Sauce Labs Backpack"); 
            });
            it('Test SORTER value:2 is price H-L, check the order of items names stays the same', () => {
                InventoryPage.sortItems(2);
                expect(InventoryPage.priceItemSelector(0)).toHaveText("$29.99");
                expect(InventoryPage.priceItemSelector(1)).toHaveText("$9.99");
                expect(InventoryPage.priceItemSelector(2)).toHaveText("$15.99");
                expect(InventoryPage.priceItemSelector(3)).toHaveText("$49.99");
                expect(InventoryPage.priceItemSelector(4)).toHaveText("$7.99");
                expect(InventoryPage.priceItemSelector(5)).toHaveText("$15.99");                
            });
            it('Test SORTER value:3 is price L-H, check the order of items names stays the same', () => {
                InventoryPage.sortItems(2);
                expect(InventoryPage.priceItemSelector(0)).toHaveText("$29.99");
                expect(InventoryPage.priceItemSelector(1)).toHaveText("$9.99");
                expect(InventoryPage.priceItemSelector(2)).toHaveText("$15.99");
                expect(InventoryPage.priceItemSelector(3)).toHaveText("$49.99");
                expect(InventoryPage.priceItemSelector(4)).toHaveText("$7.99");
                expect(InventoryPage.priceItemSelector(5)).toHaveText("$15.99");                
            });
            it('Test for ADD links for all items, check which work and which not'+
            'then check which REMOVE-LINKS buttons do not work',() =>{
                InventoryPage.addBackPackToCart.click();
                InventoryPage.addLabLightToCart.click();
                InventoryPage.addBoltTshirtToCart.click();
                InventoryPage.addFleeceJacketToCart.click();
                InventoryPage.addOnsieToCart.click();
                InventoryPage.addRedShirtToCartFromProblemInventory.click();
                expect(InventoryPage.removeBoltTshirtsFromCart).not.toBeDisplayed();
                expect(InventoryPage.removeFleeceJacketFromCart).not.toBeDisplayed();
                expect(InventoryPage.removeRedShirtToCartFromProblemInventory).not.toBeDisplayed();
                expect(InventoryPage.removeOnsieFromCart).toBeDisplayed();
                expect(InventoryPage.removeLabLightFromCart).toBeDisplayed();
                expect(InventoryPage.removeBackPackFromCart).toBeDisplayed();
                InventoryPage.removeOnsieFromCart.click();
                InventoryPage.removeLabLightFromCart.click();
                InventoryPage.removeBackPackFromCart.click();
                expect(InventoryPage.addOnsieToCart).not.toBeDisplayed();
                expect(InventoryPage.addLabLightToCart).not.toBeDisplayed();
                expect(InventoryPage.addBackPackToCart).not.toBeDisplayed();
            });
            it('Test name links to check if they show the right item', () =>{
                InventoryPage.nameItemSelector(0).click();
                expect(browser).toHaveUrl(itemUrlFive);
                InventoryPage.backToProducts.click();
                InventoryPage.nameItemSelector(1).click();
                expect(browser).toHaveUrl(itemUrlOne);
                InventoryPage.backToProducts.click();
                InventoryPage.nameItemSelector(2).click();                
                expect(browser).toHaveUrl(itemUrlTwo);
                InventoryPage.backToProducts.click();
                InventoryPage.nameItemSelector(3).click();
                expect(browser).toHaveUrl(itemUrlBroken);
                InventoryPage.backToProducts.click();
                InventoryPage.nameItemSelector(4).click();
                expect(browser).toHaveUrl(itemUrlThree);
                InventoryPage.backToProducts.click();
                InventoryPage.nameItemSelector(5).click();
                expect(browser).toHaveUrl(itemUrlFour);
            });
        });
    });
});
