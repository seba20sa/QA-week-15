const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutPage = require('../pageobjects/checkout.page');
describe('COMPLETE test from login to checkout complete for all items', () =>{
    /*URLs to perform the test*/
    const urlLogin = 'https://www.saucedemo.com/';
    const urlInventory = 'https://www.saucedemo.com/inventory.html';
    const urlCart = 'https://www.saucedemo.com/cart.html';
    const urlCheckout = 'https://www.saucedemo.com/checkout-step-one.html';  
    const urlCheckoutTwo = 'https://www.saucedemo.com/checkout-step-two.html';
    const urlCheckoutComplete = 'https://www.saucedemo.com/checkout-complete.html'; 
    //ITEMS
    const itemUrlFour = 'https://www.saucedemo.com/inventory-item.html?id=4';
        
    describe('E2E test for GLITCH USER BACKPACK', () =>{
        beforeAll('Login with standar user', () =>{
            browser.url(urlLogin);
            LoginPage.testLogin('performance_glitch_user', 'secret_sauce');
            browser.setTimeout({
                'pageLoad': 5000,
            });
        });
        it('E2E not clicking on the individual item', () =>{
            InventoryPage.addBackPackToCart.waitForClickable({ timeout: 6000 }); 
            InventoryPage.addBackPackToCart.click();
            InventoryPage.shoppingCartLink.waitForClickable({ timeout: 6000 }); 
            InventoryPage.shoppingCartLink.click();
            expect(browser).toHaveUrl(urlCart);
            expect(CartPage.cartQuantity).toHaveText("1");
            expect(CartPage.nameItemSelector(0)).toHaveText("Sauce Labs Backpack");
            expect(CartPage.descriptionItemSelector(0))
            .toHaveText("carry.allTheThings() with the sleek, streamlined Sly Pack that"+
            " melds uncompromising style with unequaled laptop and tablet protection.");
            expect(CartPage.priceItemSelector(0)).toHaveText("$29.99");
            CartPage.checkOutBtn.waitForClickable({ timeout: 6000 }); 
            CartPage.checkOutBtn.click();
            expect(browser).toHaveUrl(urlCheckout);
            CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
            expect(browser).toHaveUrl(urlCheckoutTwo);
            expect(CheckoutPage.nameItemSelector(0)).toHaveText("Sauce Labs Backpack");
            expect(CheckoutPage.descriptionItemSelector(0))
            .toHaveText("carry.allTheThings() with the sleek, streamlined Sly Pack "+
            "that melds uncompromising style with unequaled laptop and tablet protection.");
            expect(CheckoutPage.priceItemSelector(0)).toHaveText("$29.99");
            expect(CheckoutPage.cartQuantity).toHaveText("1");
            expect(CheckoutPage.sumaryInfoLevelPaymentInformation)
            .toHaveText("Payment Information:");
            expect(CheckoutPage.sumaryInfoLevelPaymentValue)
            .toHaveText("SauceCard #31337");
            expect(CheckoutPage.sumaryInfoLevelShippingInformation)
            .toHaveText("Shipping Information:");
            expect(CheckoutPage.sumaryInfoLevelShippingValue)
            .toHaveText("FREE PONY EXPRESS DELIVERY!");
            expect(CheckoutPage.sumarySubTotal).toHaveText("Item total: $29.99");
            expect(CheckoutPage.sumaryTax).toHaveText("Tax: $2.40");
            expect(CheckoutPage.sumaryTotal).toHaveText("Total: $32.39");
            expect(CheckoutPage.cartQuantity).toHaveText("1");
            CheckoutPage.finishBtn.waitForClickable({ timeout: 6000 }); 
            CheckoutPage.finishBtn.click();
            expect(browser).toHaveUrl(urlCheckoutComplete);
            CheckoutPage.backHome.waitForClickable({ timeout: 6000 }); 
            CheckoutPage.backHome.click();
            browser.setTimeout({
                'pageLoad': 5000,
            });            
            expect(browser).toHaveUrl(urlInventory);
            expect(InventoryPage.removeBackPackFromCart).not.toBeDisplayed();
            expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
        });
        it('E2E  clicking on the individual item prior accessing the CART', () =>{
            InventoryPage.addBackPackToCart.waitForClickable({ timeout: 6000 }); 
            InventoryPage.addBackPackToCart.click();
            InventoryPage.nameItemSelector(0).waitForClickable({ timeout: 6000 }); 
            InventoryPage.nameItemSelector(0).click();
            expect(browser).toHaveUrl(itemUrlFour);
            InventoryPage.shoppingCartLink.waitForClickable({ timeout: 6000 }); 
            InventoryPage.shoppingCartLink.click();
            expect(browser).toHaveUrl(urlCart);
            expect(CartPage.cartQuantity).toHaveText("1");
            expect(CartPage.nameItemSelector(0)).toHaveText("Sauce Labs Backpack");
            expect(CartPage.descriptionItemSelector(0))
            .toHaveText("carry.allTheThings() with the sleek, streamlined Sly Pack that"+
            " melds uncompromising style with unequaled laptop and tablet protection.");
            expect(CartPage.priceItemSelector(0)).toHaveText("$29.99");
            CartPage.checkOutBtn.waitForClickable({ timeout: 6000 }); 
            CartPage.checkOutBtn.click();
            expect(browser).toHaveUrl(urlCheckout);
            CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
            expect(browser).toHaveUrl(urlCheckoutTwo);
            expect(CheckoutPage.nameItemSelector(0)).toHaveText("Sauce Labs Backpack");
            expect(CheckoutPage.descriptionItemSelector(0))
            .toHaveText("carry.allTheThings() with the sleek, streamlined Sly Pack "+
            "that melds uncompromising style with unequaled laptop and tablet protection.");
            expect(CheckoutPage.priceItemSelector(0)).toHaveText("$29.99");
            expect(CheckoutPage.cartQuantity).toHaveText("1");
            expect(CheckoutPage.sumaryInfoLevelPaymentInformation)
            .toHaveText("Payment Information:");
            expect(CheckoutPage.sumaryInfoLevelPaymentValue)
            .toHaveText("SauceCard #31337");
            expect(CheckoutPage.sumaryInfoLevelShippingInformation)
            .toHaveText("Shipping Information:");
            expect(CheckoutPage.sumaryInfoLevelShippingValue)
            .toHaveText("FREE PONY EXPRESS DELIVERY!");
            expect(CheckoutPage.sumarySubTotal).toHaveText("Item total: $29.99");
            expect(CheckoutPage.sumaryTax).toHaveText("Tax: $2.40");
            expect(CheckoutPage.sumaryTotal).toHaveText("Total: $32.39");
            expect(CheckoutPage.cartQuantity).toHaveText("1");
            CheckoutPage.finishBtn.waitForClickable({ timeout: 6000 }); 
            CheckoutPage.finishBtn.click();
            expect(browser).toHaveUrl(urlCheckoutComplete);
            CheckoutPage.backHome.waitForClickable({ timeout: 6000 }); 
            CheckoutPage.backHome.click();
            browser.setTimeout({
                'pageLoad': 5000,
            });            
            expect(browser).toHaveUrl(urlInventory);
            expect(InventoryPage.removeBackPackFromCart).not.toBeDisplayed();
            expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
        });        
    });     
});