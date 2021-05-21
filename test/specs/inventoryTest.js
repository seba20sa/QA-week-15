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
            it('Click item title and img check it opens the individual item page'
            +'then open the burger menu, click the ALL ITEMS option and check the url', () => {
                inventoryPage.backpackItemImg.click();
                expect(browser).toHaveUrl(itemUrl);
                inventoryPage.burgerMenuBtn.click();
                inventoryPage.allItemsBtn.click();
                expect(browser).toHaveUrl(urlInventory);
                inventoryPage.backpackItemtName.click();
                expect(browser).toHaveUrl(itemUrl);
                inventoryPage.burgerMenuBtn.click();
                inventoryPage.allItemsBtn.click();
                expect(browser).toHaveUrl(urlInventory);
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
        });
        describe ('FOOTER testing', () =>{
            it('Check the url on the twitter logo', () => {
                inventoryPage.twitterLink.click();
                browser.pause(7000);
                

                
                
                
                
            }); 

        });
    });
});