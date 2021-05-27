const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutPage = require('../pageobjects/checkout.page');
const cartPage = require('../pageobjects/cart.page');
describe ('Tests performed to the checkout step 1,2 and final sections',  () => {    
    /*URLs to perform the test*/
    const urlLogin = 'https://www.saucedemo.com/';
    const urlInventory = 'https://www.saucedemo.com/inventory.html';
    const urlCart = 'https://www.saucedemo.com/cart.html';
    const urlCheckout = 'https://www.saucedemo.com/checkout-step-one.html';
    const urlCheckoutTwo = 'https://www.saucedemo.com/checkout-step-two.html';
    const urlCheckoutComplete = 'https://www.saucedemo.com/checkout-complete.html';   
    const ponyExpressSource = 'https://www.saucedemo.com/static/media/pony-express.46394a5d.png';
    describe('Checkout form test from STANDARD USER and BACKPACK item', () =>{
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
                    expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                    expect(CheckoutPage.errorMessageContainer)
                    .toHaveText("Error: First Name is required");
                    browser.refresh();
                });
                it('Valid first name, EMPTY LAST NAME and valid zip', () => {
                    CheckoutPage.testCheckoutForm('Sebastian', '', '2000');
                    expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                    expect(CheckoutPage.errorMessageContainer)
                    .toHaveText("Error: Last Name is required");
                    browser.refresh();
                });
                it('Valid first name,valid last name and EMPTY ZIP', () => {
                    CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '');
                    expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                    expect(CheckoutPage.errorMessageContainer)
                    .toHaveText("Error: Postal Code is required");
                    browser.refresh();
                });  
                it('Try to continue with ALL FIELDS EMPTY', () => {
                    CheckoutPage.testCheckoutForm('', '', '');
                    expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                    expect(CheckoutPage.errorMessageContainer)
                    .toHaveText("Error: First Name is required");
                    browser.refresh();
                });
                it('All fields VALID', () => {
                    CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
                    expect(CheckoutPage.wrongUserInput).not.toBeDisplayed();
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
                expect(CheckoutPage.nameItemSelector(0))
                .toHaveText("Sauce Labs Backpack");
                expect(CheckoutPage.descriptionItemSelector(0))
                .toHaveText("carry.allTheThings() with the sleek, streamlined Sly Pack that"+
                " melds uncompromising style with unequaled laptop and tablet protection.");
                expect(CheckoutPage.priceItemSelector(0))
                .toHaveText("$29.99");
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
            it('Click cancel from checkout 2 then from inventory go back to checkout 2', () => {
                CheckoutPage.cancelCheckoutTwo.click();
                expect(browser).toHaveUrl(urlInventory);
                InventoryPage.shoppingCartLink.click();
                CartPage.checkOutBtn.click();
                CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
            });
            it('Click finish on checkout 2', () => {
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
    describe('Checkout form test from STANDARD USER and BIKE-LIGHT item', () =>{
        beforeAll('Enter the checkout page', () => {
            browser.url(urlLogin);
            LoginPage.testLogin('standard_user', 'secret_sauce');
            InventoryPage.addLabLightToCart.click();            
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
                    expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                    expect(CheckoutPage.errorMessageContainer)
                    .toHaveText("Error: First Name is required");
                    browser.refresh();
                });
                it('Valid first name, EMPTY LAST NAME and valid zip', () => {
                    CheckoutPage.testCheckoutForm('Sebastian', '', '2000');
                    expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                    expect(CheckoutPage.errorMessageContainer)
                    .toHaveText("Error: Last Name is required");
                    browser.refresh();
                });
                it('Valid first name,valid last name and EMPTY ZIP', () => {
                    CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '');
                    expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                    expect(CheckoutPage.errorMessageContainer)
                    .toHaveText("Error: Postal Code is required");
                    browser.refresh();
                });  
                it('Try to continue with ALL FIELDS EMPTY', () => {
                    CheckoutPage.testCheckoutForm('', '', '');
                    expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                    expect(CheckoutPage.errorMessageContainer)
                    .toHaveText("Error: First Name is required");
                    browser.refresh();
                });
                it('All fields VALID', () => {
                    CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
                    expect(CheckoutPage.wrongUserInput).not.toBeDisplayed();
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
                expect(CheckoutPage.nameItemSelector(0))
                .toHaveText("Sauce Labs Bike Light");
                expect(CheckoutPage.descriptionItemSelector(0))
                .toHaveText("A red light isn't the desired state in testing but it sure"
                +" helps when riding your bike at night. Water-resistant"
                +" with 3 lighting modes, 1 AAA battery included.");
                expect(CheckoutPage.priceItemSelector(0))
                .toHaveText("$9.99");
                expect(CheckoutPage.cartQuantity).toHaveText("1");
                expect(CheckoutPage.sumaryInfoLevelPaymentInformation)
                .toHaveText("Payment Information:");
                expect(CheckoutPage.sumaryInfoLevelPaymentValue)
                .toHaveText("SauceCard #31337");
                expect(CheckoutPage.sumaryInfoLevelShippingInformation)
                .toHaveText("Shipping Information:");
                expect(CheckoutPage.sumaryInfoLevelShippingValue)
                .toHaveText("FREE PONY EXPRESS DELIVERY!");
                expect(CheckoutPage.sumarySubTotal).toHaveText("Item total: $9.99");
                expect(CheckoutPage.sumaryTax).toHaveText("Tax: $0.80");
                expect(CheckoutPage.sumaryTotal).toHaveText("Total: $10.79");
            });
            it('Click cancel from checkout 2 then from inventory go back to checkout 2', () => {
                CheckoutPage.cancelCheckoutTwo.click();
                expect(browser).toHaveUrl(urlInventory);
                InventoryPage.shoppingCartLink.click();
                CartPage.checkOutBtn.click();
                CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
            });
            it('Click finish on checkout 2', () => {
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
    describe('Checkout form test from STANDARD USER and BOLT-SHIRT item', () =>{
        beforeAll('Enter the checkout page', () => {
            browser.url(urlLogin);
            LoginPage.testLogin('standard_user', 'secret_sauce');
            InventoryPage.addBoltTshirtToCart.click();            
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
                    expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                    expect(CheckoutPage.errorMessageContainer)
                    .toHaveText("Error: First Name is required");
                    browser.refresh();
                });
                it('Valid first name, EMPTY LAST NAME and valid zip', () => {
                    CheckoutPage.testCheckoutForm('Sebastian', '', '2000');
                    expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                    expect(CheckoutPage.errorMessageContainer)
                    .toHaveText("Error: Last Name is required");
                    browser.refresh();
                });
                it('Valid first name,valid last name and EMPTY ZIP', () => {
                    CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '');
                    expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                    expect(CheckoutPage.errorMessageContainer)
                    .toHaveText("Error: Postal Code is required");
                    browser.refresh();
                });  
                it('Try to continue with ALL FIELDS EMPTY', () => {
                    CheckoutPage.testCheckoutForm('', '', '');
                    expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                    expect(CheckoutPage.errorMessageContainer)
                    .toHaveText("Error: First Name is required");
                    browser.refresh();
                });
                it('All fields VALID', () => {
                    CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
                    expect(CheckoutPage.wrongUserInput).not.toBeDisplayed();
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
                expect(CheckoutPage.nameItemSelector(0))
                .toHaveText("Sauce Labs Bolt T-Shirt");
                expect(CheckoutPage.descriptionItemSelector(0))
                .toHaveText("Get your testing superhero on with the Sauce Labs bolt T-shirt."
                +" From American Apparel, 100% ringspun combed cotton,"
                +" heather gray with red bolt.");
                expect(CheckoutPage.priceItemSelector(0))
                .toHaveText("$15.99");
                expect(CheckoutPage.cartQuantity).toHaveText("1");
                expect(CheckoutPage.sumaryInfoLevelPaymentInformation)
                .toHaveText("Payment Information:");
                expect(CheckoutPage.sumaryInfoLevelPaymentValue)
                .toHaveText("SauceCard #31337");
                expect(CheckoutPage.sumaryInfoLevelShippingInformation)
                .toHaveText("Shipping Information:");
                expect(CheckoutPage.sumaryInfoLevelShippingValue)
                .toHaveText("FREE PONY EXPRESS DELIVERY!");
                expect(CheckoutPage.sumarySubTotal).toHaveText("Item total: $15.99");
                expect(CheckoutPage.sumaryTax).toHaveText("Tax: $1.28");
                expect(CheckoutPage.sumaryTotal).toHaveText("Total: $17.27");
            });
            it('Click cancel from checkout 2 then from inventory go back to checkout 2', () => {
                CheckoutPage.cancelCheckoutTwo.click();
                expect(browser).toHaveUrl(urlInventory);
                InventoryPage.shoppingCartLink.click();
                CartPage.checkOutBtn.click();
                CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
            });
            it('Click finish on checkout 2', () => {
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
    describe('Checkout form test from STANDARD USER and FLEECE JACKET', () =>{
        beforeAll('Enter the checkout page', () => {
            browser.url(urlLogin);
            LoginPage.testLogin('standard_user', 'secret_sauce');
            InventoryPage.addFleeceJacketToCart.click();            
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
                    expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                    expect(CheckoutPage.errorMessageContainer)
                    .toHaveText("Error: First Name is required");
                    browser.refresh();
                });
                it('Valid first name, EMPTY LAST NAME and valid zip', () => {
                    CheckoutPage.testCheckoutForm('Sebastian', '', '2000');
                    expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                    expect(CheckoutPage.errorMessageContainer)
                    .toHaveText("Error: Last Name is required");
                    browser.refresh();
                });
                it('Valid first name,valid last name and EMPTY ZIP', () => {
                    CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '');
                    expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                    expect(CheckoutPage.errorMessageContainer)
                    .toHaveText("Error: Postal Code is required");
                    browser.refresh();
                });  
                it('Try to continue with ALL FIELDS EMPTY', () => {
                    CheckoutPage.testCheckoutForm('', '', '');
                    expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                    expect(CheckoutPage.errorMessageContainer)
                    .toHaveText("Error: First Name is required");
                    browser.refresh();
                });
                it('All fields VALID', () => {
                    CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
                    expect(CheckoutPage.wrongUserInput).not.toBeDisplayed();
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
                expect(CheckoutPage.nameItemSelector(0))
                .toHaveText("Sauce Labs Fleece Jacket");
                expect(CheckoutPage.descriptionItemSelector(0))
                .toHaveText("It's not every day that you come across a midweight quarter-zip"
                +" fleece jacket capable of handling everything from a relaxing"
                +" day outdoors to a busy day at the office.");
                expect(CheckoutPage.priceItemSelector(0))
                .toHaveText("$49.99");
                expect(CheckoutPage.cartQuantity).toHaveText("1");
                expect(CheckoutPage.sumaryInfoLevelPaymentInformation)
                .toHaveText("Payment Information:");
                expect(CheckoutPage.sumaryInfoLevelPaymentValue)
                .toHaveText("SauceCard #31337");
                expect(CheckoutPage.sumaryInfoLevelShippingInformation)
                .toHaveText("Shipping Information:");
                expect(CheckoutPage.sumaryInfoLevelShippingValue)
                .toHaveText("FREE PONY EXPRESS DELIVERY!");
                expect(CheckoutPage.sumarySubTotal).toHaveText("Item total: $49.99");
                expect(CheckoutPage.sumaryTax).toHaveText("Tax: $4.00");
                expect(CheckoutPage.sumaryTotal).toHaveText("Total: $53.99");
            });
            it('Click cancel from checkout 2 then from inventory go back to checkout 2', () => {
                CheckoutPage.cancelCheckoutTwo.click();
                expect(browser).toHaveUrl(urlInventory);
                InventoryPage.shoppingCartLink.click();
                CartPage.checkOutBtn.click();
                CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
            });
            it('Click finish on checkout 2', () => {
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
    describe('Checkout form test from STANDARD USER and ONSIE', () =>{
        beforeAll('Enter the checkout page', () => {
            browser.url(urlLogin);
            LoginPage.testLogin('standard_user', 'secret_sauce');
            InventoryPage.addOnsieToCart.click();            
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
                    expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                    expect(CheckoutPage.errorMessageContainer)
                    .toHaveText("Error: First Name is required");
                    browser.refresh();
                });
                it('Valid first name, EMPTY LAST NAME and valid zip', () => {
                    CheckoutPage.testCheckoutForm('Sebastian', '', '2000');
                    expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                    expect(CheckoutPage.errorMessageContainer)
                    .toHaveText("Error: Last Name is required");
                    browser.refresh();
                });
                it('Valid first name,valid last name and EMPTY ZIP', () => {
                    CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '');
                    expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                    expect(CheckoutPage.errorMessageContainer)
                    .toHaveText("Error: Postal Code is required");
                    browser.refresh();
                });  
                it('Try to continue with ALL FIELDS EMPTY', () => {
                    CheckoutPage.testCheckoutForm('', '', '');
                    expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                    expect(CheckoutPage.errorMessageContainer)
                    .toHaveText("Error: First Name is required");
                    browser.refresh();
                });
                it('All fields VALID', () => {
                    CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
                    expect(CheckoutPage.wrongUserInput).not.toBeDisplayed();
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
                expect(CheckoutPage.nameItemSelector(0)).toHaveText("Sauce Labs Onesie");
                expect(CheckoutPage.descriptionItemSelector(0))
                .toHaveText("Rib snap infant onesie for the junior automation engineer"
                +" in development. Reinforced 3-snap bottom closure,"
                +" two-needle hemmed sleeved and bottom won't unravel.");
                expect(CheckoutPage.priceItemSelector(0)).toHaveText("$7.99");
                expect(CheckoutPage.cartQuantity).toHaveText("1");
                expect(CheckoutPage.sumaryInfoLevelPaymentInformation)
                .toHaveText("Payment Information:");
                expect(CheckoutPage.sumaryInfoLevelPaymentValue)
                .toHaveText("SauceCard #31337");
                expect(CheckoutPage.sumaryInfoLevelShippingInformation)
                .toHaveText("Shipping Information:");
                expect(CheckoutPage.sumaryInfoLevelShippingValue)
                .toHaveText("FREE PONY EXPRESS DELIVERY!");
                expect(CheckoutPage.sumarySubTotal).toHaveText("Item total: $7.99");
                expect(CheckoutPage.sumaryTax).toHaveText("Tax: $0.64");
                expect(CheckoutPage.sumaryTotal).toHaveText("Total: $8.63");
            });
            it('Click cancel from checkout 2 then from inventory go back to checkout 2', () => {
                CheckoutPage.cancelCheckoutTwo.click();
                expect(browser).toHaveUrl(urlInventory);
                InventoryPage.shoppingCartLink.click();
                CartPage.checkOutBtn.click();
                CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
            });
            it('Click finish on checkout 2', () => {
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
    describe('Checkout form test from STANDARD USER and RED-T-SHIRT', () =>{
        beforeAll('Enter the checkout page', () => {
            browser.url(urlLogin);
            LoginPage.testLogin('standard_user', 'secret_sauce');
            InventoryPage.addRedShirtToCartFromProblemInventory.click();
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
                    expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                    expect(CheckoutPage.errorMessageContainer)
                    .toHaveText("Error: First Name is required");
                    browser.refresh();
                });
                it('Valid first name, EMPTY LAST NAME and valid zip', () => {
                    CheckoutPage.testCheckoutForm('Sebastian', '', '2000');
                    expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                    expect(CheckoutPage.errorMessageContainer)
                    .toHaveText("Error: Last Name is required");
                    browser.refresh();
                });
                it('Valid first name,valid last name and EMPTY ZIP', () => {
                    CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '');
                    expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                    expect(CheckoutPage.errorMessageContainer)
                    .toHaveText("Error: Postal Code is required");
                    browser.refresh();
                });  
                it('Try to continue with ALL FIELDS EMPTY', () => {
                    CheckoutPage.testCheckoutForm('', '', '');
                    expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                    expect(CheckoutPage.errorMessageContainer)
                    .toHaveText("Error: First Name is required");
                    browser.refresh();
                });
                it('All fields VALID', () => {
                    CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
                    expect(CheckoutPage.wrongUserInput).not.toBeDisplayed();
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
                expect(CheckoutPage.nameItemSelector(0))
                .toHaveText("Test.allTheThings() T-Shirt (Red)");
                expect(CheckoutPage.descriptionItemSelector(0))
                .toHaveText("This classic Sauce Labs t-shirt is perfect to wear when"
                +" cozying up to your keyboard to automate a few tests."
                +" Super-soft and comfy ringspun combed cotton.");
                expect(CheckoutPage.priceItemSelector(0)).toHaveText("$15.99");
                expect(CheckoutPage.cartQuantity).toHaveText("1");
                expect(CheckoutPage.sumaryInfoLevelPaymentInformation)
                .toHaveText("Payment Information:");
                expect(CheckoutPage.sumaryInfoLevelPaymentValue)
                .toHaveText("SauceCard #31337");
                expect(CheckoutPage.sumaryInfoLevelShippingInformation)
                .toHaveText("Shipping Information:");
                expect(CheckoutPage.sumaryInfoLevelShippingValue)
                .toHaveText("FREE PONY EXPRESS DELIVERY!");
                expect(CheckoutPage.sumarySubTotal).toHaveText("Item total: $15.99");
                expect(CheckoutPage.sumaryTax).toHaveText("Tax: $1.28");
                expect(CheckoutPage.sumaryTotal).toHaveText("Total: $17.27");
            });
            it('Click cancel from checkout 2 then from inventory go back to checkout 2', () => {
                CheckoutPage.cancelCheckoutTwo.click();
                expect(browser).toHaveUrl(urlInventory);
                InventoryPage.shoppingCartLink.click();
                CartPage.checkOutBtn.click();
                CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
            });
            it('Click finish on checkout 2', () => {
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
});