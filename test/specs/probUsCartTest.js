const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutPage = require('../pageobjects/checkout.page');
describe ('CART page tests',  () => {    
    /*URLs to perform the test*/
    const urlLogin = 'https://www.saucedemo.com/';
    const urlInventory = 'https://www.saucedemo.com/inventory.html';
    const urlCart = 'https://www.saucedemo.com/cart.html';
    describe('Tests with PROBLEM USER at the end of each describe the app state is reseted', () =>{
        beforeAll('Login with problem user', () => {
            browser.url(urlLogin);
            LoginPage.testLogin('problem_user', 'secret_sauce');
        });
        describe ('Tests performed from BACK-PACK item from the cart page', () => {
            beforeAll('From the inventory page add the item to the cart and access the cart', () =>{
                InventoryPage.addBackPackToCart.waitForClickable({ timeout: 3000 });
                InventoryPage.addBackPackToCart.click();
                InventoryPage.shoppingCartLink.waitForClickable({ timeout: 3000 });            
                InventoryPage.shoppingCartLink.click();            
            });                
            it('Check if the URL, item quantity and item info are correct', () => {
                expect(browser).toHaveUrl(urlCart);          
                expect(CartPage.cartQuantity).toHaveText("1");
                expect(CartPage.nameItemSelector(0)).toHaveText("Sauce Labs Backpack");
                expect(CartPage.descriptionItemSelector(0))
                .toHaveText("carry.allTheThings() with the sleek, streamlined Sly "+
                "Pack that melds uncompromising style with unequaled laptop and tablet protection.");
                expect(CartPage.priceItemSelector(0)).toHaveText("$29.99");
            });    
            it('Reset app state from inventory and check quantity and item counter', () => {
                CartPage.burgerMenuOption(CartPage.resetAppStateBtn);
                browser.refresh();            
                expect(CartPage.cartItemsCounter).not.toBeDisplayed();            
                expect(CartPage.cartQuantity).not.toBeDisplayed();
                browser.url(urlInventory);
            });                 
        });
        describe ('Tests performed from BIKE-LIGHT item from the cart page', () => {
            beforeAll('From the inventory page add the item to the cart and access the cart', () =>{
                InventoryPage.addLabLightToCart.waitForClickable({ timeout: 3000 });
                InventoryPage.addLabLightToCart.click();
                InventoryPage.shoppingCartLink.waitForClickable({ timeout: 3000 });            
                InventoryPage.shoppingCartLink.click();            
            });                
                it('Check if the URL, item quantity and item info are correct selector is ZERO', () => {
                expect(browser).toHaveUrl(urlCart);          
                expect(CartPage.cartQuantity).toHaveText("1");
                expect(CartPage.nameItemSelector(0)).toHaveText("Sauce Labs Bike Light");
                expect(CartPage.descriptionItemSelector(0))
                .toHaveText("A red light isn't the desired state in testing but it sure helps when"
                +" riding your bike at night. Water-resistant with 3"
                +" lighting modes, 1 AAA battery included.");
                expect(CartPage.priceItemSelector(0)).toHaveText("$9.99");
            });        
            it('Reset app state from inventory and check quantity and item counter', () => {
                CartPage.burgerMenuOption(CartPage.resetAppStateBtn);
                browser.refresh();            
                expect(CartPage.cartItemsCounter).not.toBeDisplayed();            
                expect(CartPage.cartQuantity).not.toBeDisplayed();
                browser.url(urlInventory);
            });                
        });
        describe ('Tests performed from ONSIE item from the cart page', () => {
            beforeAll('from the inventory page add the item to the cart and access the cart', () =>{
                InventoryPage.addOnsieToCart.waitForClickable({ timeout: 3000 });
                InventoryPage.addOnsieToCart.click();
                InventoryPage.shoppingCartLink.waitForClickable({ timeout: 3000 });            
                InventoryPage.shoppingCartLink.click();            
            });                
            it('Check if the URL, item quantity and item info are correct selector is ZERO', () => {
                expect(browser).toHaveUrl(urlCart);          
                expect(CartPage.cartQuantity).toHaveText("1");
                expect(CartPage.nameItemSelector(0)).toHaveText("Sauce Labs Onesie");
                expect(CartPage.descriptionItemSelector(0))
                .toHaveText("Rib snap infant onesie for the junior automation"
                +" engineer in development. Reinforced 3-snap bottom closure,"
                +" two-needle hemmed sleeved and bottom won't unravel.");
                expect(CartPage.priceItemSelector(0)).toHaveText("$7.99");
            });       
            it('Reset app state from inventory and check quantity and item counter', () => {
                CartPage.burgerMenuOption(CartPage.resetAppStateBtn);
                browser.refresh();            
                expect(CartPage.cartItemsCounter).not.toBeDisplayed();            
                expect(CartPage.cartQuantity).not.toBeDisplayed();
                browser.url(urlInventory);
            });                 
        });
    });           
});
