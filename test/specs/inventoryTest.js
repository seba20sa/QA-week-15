const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const inventoryPage = require('../pageobjects/inventory.page');
const loginPage = require('../pageobjects/login.page');
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
                inventoryPage.burgerMenuBtn.click();
                browser.pause(1000);
                inventoryPage.closeMenuBtn.click();
            }); 
            it('Open burger menu and click the about option', () => {
                inventoryPage.burgerMenuBtn.click();
                browser.pause(1000);
                inventoryPage.aboutBtn.click();
                expect(browser).toHaveUrl(urlAbout);
                browser.back();
                expect(browser).toHaveUrl(urlInventory);
            });
            it('Open burger menu and logout check that fields and error fields to be empty'
            , () => {
                inventoryPage.burgerMenuBtn.click();
                browser.pause(1000);
                inventoryPage.logOutBtn.click();
                expect(browser).toHaveUrl(urlLogin);
                expect(loginPage.errorMessageContainer).toHaveText("");
                expect(loginPage.userNameInput).toHaveText("");
                expect(loginPage.userNameInput).toHaveText("");
                expect(loginPage.passwordInput).toHaveText("");
                LoginPage.testLogin('standard_user', 'secret_sauce');
                expect(browser).toHaveUrl(urlInventory);                
            });
        });
        describe ('BODY testing', () => { 
            it('Click item  img/title and check it opens the individual item page'
            +'then open the burger menu, click the ALL ITEMS option and check the url', () => {
                inventoryPage.backpackItemImg.click();
                expect(browser).toHaveUrl(itemUrl);
                inventoryPage.burgerMenuBtn.click();
                inventoryPage.allItemsBtn.click();
                browser.pause(1000);  
                expect(browser).toHaveUrl(urlInventory);               
                browser.pause(1000);
                inventoryPage.backpackItemtName.click();
                expect(browser).toHaveUrl(itemUrl);
                inventoryPage.burgerMenuBtn.click();
                browser.pause(1000);  
                inventoryPage.allItemsBtn.click();
                expect(browser).toHaveUrl(urlInventory);
                browser.pause(1000);                  
            });
            it('Click item  IMG and check it opens the individual item page'
            +'then click on BACK TO PRODUCTS and check the inventory url', () => {
                inventoryPage.backpackItemImg.click();
                expect(browser).toHaveUrl(itemUrl);
                inventoryPage.backToProducts.click();                
                browser.pause(1000);  
                expect(browser).toHaveUrl(urlInventory);
                browser.pause(1000);                  
            });
            it('Click item  IMG add item to cart the remove the item'
            +'then check the cart item counter', () => {
                inventoryPage.backpackItemImg.click();
                expect(browser).toHaveUrl(itemUrl);
                inventoryPage.addBackPackToCart.click();
                browser.pause(1000);                
                expect(inventoryPage.cartItemsCounter).toHaveText("1");
                inventoryPage.removeBackPackFromCart.click();
                browser.pause(1000);
                expect(inventoryPage.cartItemsCounter).not.toBeDisplayed();
                browser.url(urlInventory);
                browser.pause(1000);                 
            });             
            it('Add item to the cart check the item counter on the cart icon and'
            +'remove item and check if the counter is back to zero', () => {
                inventoryPage.backpackItemImg.click();
                expect(browser).toHaveUrl(itemUrl);
                inventoryPage.addBackPackToCart.click();
                browser.pause(1000);
                expect(inventoryPage.cartItemsCounter).toHaveText("1");
                inventoryPage.removeBackPackFromCart.click();
                browser.pause(1000);
                expect(inventoryPage.cartItemsCounter).not.toBeDisplayed();
                browser.pause(1000);
            });            
            it('Add item to the cart then click burger menu and click RESET APP STATE then check'
            +'the cartItemsCounter display status', () => {
                inventoryPage.addBackPackToCart.click();
                inventoryPage.burgerMenuBtn.click();
                browser.pause(1000);
                inventoryPage.resetAppStateBtn.click();
                expect(inventoryPage.cartItemsCounter).not.toBeDisplayed();
                browser.pause(1000);
            });            
        });
        describe ('FOOTER testing', () =>{
            it('Check the url on the Twitter logo is correct', () => {
                expect(inventoryPage.twitterLink).toBe('https://twitter.com/saucelabs');
                browser.pause(1000);
            });
            it('Check the url on the Facebook logo is correct', () => {
                expect(inventoryPage.facebookLink).toBe('https://www.facebook.com/saucelabs');
                browser.pause(1000);
            });
            it('Check the url on the Linkedin logo is correct', () => {
                expect(inventoryPage.linkedinLink)
                .toBe('https://www.linkedin.com/company/sauce-labs/');
                browser.pause(1000);
            });
            it('Check the footer credit text to be correct', () => {
                expect(inventoryPage.footerCredits)
                .toHaveText("© 2021 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy");
                browser.pause(1000);
            });
            it('Check img for swag-bot', () => {
                expect(inventoryPage.swagBot)
                .toBe("https://www.saucedemo.com/static/media/SwagBot_Footer_graphic.2e87acec.png");
                browser.pause(1000);                
            });
        });
    });
});
