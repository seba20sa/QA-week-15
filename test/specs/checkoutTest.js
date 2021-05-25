const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutPage = require('../pageobjects/checkout.page');
describe ('Tests performed to the checkout step 1 and 2 sections',  () => {    
    /*URLs to perform the test*/
    const urlLogin = 'https://www.saucedemo.com/';
    const urlInventory = 'https://www.saucedemo.com/inventory.html';
    const urlCart = 'https://www.saucedemo.com/cart.html';
    const urlCheckout = 'https://www.saucedemo.com/checkout-step-one.html';
    const urlCheckoutTwo = 'https://www.saucedemo.com/checkout-step-two.html';
    const urlCheckoutComplete = 'https://www.saucedemo.com/checkout-complete.html';   
    const ponyExpressSource = 'https://www.saucedemo.com/static/media/pony-express.46394a5d.png'
    beforeAll('Enter the checkout page', () => {
        browser.url(urlLogin);
        LoginPage.testLogin('standard_user', 'secret_sauce');
        InventoryPage.addBackPackToCart.click();            
        InventoryPage.shoppingCartLink.click();
        CartPage.checkOutBtn.click();
    });
    describe('Links and fuctionality tests', () =>{
        it('Cancel checkout, then go back to the checkout url for the next tests', () => {
            CheckoutPage.cancelCheckout.click();
            expect(browser).toHaveUrl(urlCart);            
        });
        it('Click the cart icon', () => {
            CheckoutPage.shoppingCartLink.click();
            expect(browser).toHaveUrl(urlCart);
            browser.url(urlCheckout);
        });
    });                 
    describe ('Checkout section tests', () => {        
        describe('Form inputs test', () =>{
            it('EMPTY FIRST NAME ,valid last name and valid zip', () => {
                CheckoutPage.testCheckoutForm('', 'Sileoni', '2000');
                expect(CheckoutPage.errorMessageContainer)
                .toHaveText("Error: First Name is required");
                browser.refresh();
            });
            it('Valid first name, EMPTY LAST NAME and valid zip', () => {
                CheckoutPage.testCheckoutForm('Sebastian', '', '2000');
                expect(CheckoutPage.errorMessageContainer)
                .toHaveText("Error: Last Name is required");
                browser.refresh();
            });
            it('Valid first name,valid last name and EMPTY ZIP', () => {
                CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '');
                expect(CheckoutPage.errorMessageContainer)
                .toHaveText("Error: Postal Code is required");
                browser.refresh();
            });  
            it('Try to continue with ALL FIELDS EMPTY', () => {
                CheckoutPage.testCheckoutForm('', '', '');
                expect(CheckoutPage.errorMessageContainer)
                .toHaveText("Error: First Name is required");
                browser.refresh();
            });
            it('All fields VALID', () => {
                CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
                expect(CheckoutPage.errorMessageContainer).not.toBeDisplayed();
                expect(browser).toHaveUrl(urlCheckoutTwo);                
            });
        });         
    });
    describe ('Checkout PART TWO', () => {
        beforeAll('Access the PART TWO', () => {
            CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
            browser.pause(1000);
        });
        it('Check item info  and quantity displayed correctly', () => {
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
        });
        it('Click Finish on checkout 2', () => {
            CheckoutPage.finishBtn.click();
            expect(browser).toHaveUrl(urlCheckoutComplete);
        });    
    });
    describe ('Checkout COMPLETE', () => {
        beforeAll('Access the FINISH part', () => {
            CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
            CheckoutPage.finishBtn.click();
            browser.pause(1000);
        });
        it('Check COMPLETE title, img and description', () => {
            expect(CheckoutPage.completeTitle).toHaveText("CHECKOUT: COMPLETE!");
            expect(CheckoutPage.completeHeader).toHaveText("THANK YOU FOR YOUR ORDER");
            expect(CheckoutPage.completeText).toHaveText("Your order has been dispatched, "+
            "and will arrive just as fast as the pony can get there!");
            expect(CheckoutPage.ponyExpress).toBe(ponyExpressSource);
        });
        it('Click BACK HOME', () => {
            CheckoutPage.backHome.click();
            expect(browser).toHaveUrl(urlInventory)
        });
    });
});