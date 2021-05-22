const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');



describe ('',  () => {    
    /*URLs to perform the test*/
    const urlLogin = 'https://www.saucedemo.com/';
    const urlInventory = 'https://www.saucedemo.com/inventory.html';
    const urlCart = 'https://www.saucedemo.com/cart.html';
    const urlCheckout = 'https://www.saucedemo.com/checkout-step-one.html'    
    beforeAll(
        'log on with standard user, add the backpack item and '+
        'then click the cart icon', () => {
            browser.url(urlCart);
            LoginPage.testLogin('standard_user', 'secret_sauce');
            browser.pause(1000);
            InventoryPage.addBackPackToCart.click();            
            InventoryPage.shoppingCartLink.click();
        });                  
    describe ('Tests performed from the cart page', () => {                
        it('Check if the URL, item quantity and item info are correct', () => {
            expect(browser).toHaveUrl(urlCart);          
            expect(CartPage.cartQuantity).toHaveText("1");
            expect(CartPage.backpackItemtName).toHaveText("Sauce Labs Backpack");
            expect(CartPage.backpackItemDescription)
            .toHaveText("carry.allTheThings() with the sleek, streamlined Sly Pack that"+
            " melds uncompromising style with unequaled laptop and tablet protection.");
            expect(CartPage.backpackItemPrice).toHaveText("$29.99");
        });        
        it('From the cart page click CONTINUE SHOPPING', () => {
            CartPage.continueShopping.click();
            expect(browser).toHaveUrl(urlInventory);
            browser.pause(1000);
        });
        
        
        it('Remove item and check the quantity and cart counter ', () => {
            CartPage.removeBackPackFromCart.click();            
            expect(CartPage.cartItemsCounter).not.toBeDisplayed();            
            expect(CartPage.cartQuantity).not.toBeDisplayed();
                      
        });
        it('Reset app state', () => {
            CartPage.burgerMenuOption(CartPage.resetAppStateBtn);            
            expect(CartPage.cartItemsCounter).not.toBeDisplayed();            
            expect(CartPage.cartQuantity).not.toBeDisplayed();
                      
        });
        // it('Click on check out', () => {
        //     CartPage.checkOutBtn.click();
        //     expect(browser).toHaveUrl(urlCheckout);            
        // });          
    });
      
});



