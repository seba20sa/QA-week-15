const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
describe (
    ''+'',  () => {    
    /*URLs to perform the test*/
    const urlLogin = 'https://www.saucedemo.com/';
    const urlInventory = 'https://www.saucedemo.com/inventory.html';
    const urlCart = 'https://www.saucedemo.com/cart.html'
    const urlAbout = 'https://saucelabs.com/'
    const itemUrl = 'https://www.saucedemo.com/inventory-item.html?id=4'
    describe ('INVENTORY testing', () =>{
        beforeAll('Open browser on the tested page', () => {
            browser.url(urlLogin);
            LoginPage.testLogin('standard_user', 'secret_sauce');
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
            it('Click item  img/title and check it opens the individual item page'
            +'then open the burger menu, click the ALL ITEMS option and check the url', () => {
                InventoryPage.backpackItemImg.click();
                expect(browser).toHaveUrl(itemUrl);
                InventoryPage.burgerMenuOption(InventoryPage.allItemsBtn);
                expect(browser).toHaveUrl(urlInventory);
                InventoryPage.backpackItemtName.click();
                expect(browser).toHaveUrl(itemUrl);
                InventoryPage.burgerMenuOption(InventoryPage.allItemsBtn);
                expect(browser).toHaveUrl(urlInventory);
                browser.pause(1000);                  
            });
            it('Click item  IMG and check it opens the individual item page'
            +'then click on BACK TO PRODUCTS and check the inventory url', () => {
                InventoryPage.backpackItemImg.click();
                expect(browser).toHaveUrl(itemUrl);
                InventoryPage.backToProducts.click();                
                browser.pause(1000);  
                expect(browser).toHaveUrl(urlInventory);
                browser.pause(1000);                  
            });
            it('Click item  IMG add item to cart the remove the item'
            +'then check the cart item counter', () => {
                InventoryPage.backpackItemImg.click();
                expect(browser).toHaveUrl(itemUrl);
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
                InventoryPage.backpackItemImg.click();
                expect(browser).toHaveUrl(itemUrl);
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
    });
});
