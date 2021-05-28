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
    describe('STANDAR USER BACKPACK item', () =>{
        beforeAll('Login with standar user', () =>{
            browser.url(urlLogin);
            LoginPage.testLogin('standard_user', 'secret_sauce');
        });
        it('E2E not clicking on the individual item', () =>{
            InventoryPage.addBackPackToCart.click();
            InventoryPage.shoppingCartLink.click();
            expect(browser).toHaveUrl(urlCart);
            expect(CartPage.cartQuantity).toHaveText("1");
            expect(CartPage.nameItemSelector(0)).toHaveText("Sauce Labs Backpack");
            expect(CartPage.descriptionItemSelector(0))
            .toHaveText("carry.allTheThings() with the sleek, streamlined Sly Pack that"+
            " melds uncompromising style with unequaled laptop and tablet protection.");
            expect(CartPage.priceItemSelector(0)).toHaveText("$29.99");
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
            CheckoutPage.finishBtn.click();
            expect(browser).toHaveUrl(urlCheckoutComplete);
            CheckoutPage.backHome.click();            
            expect(browser).toHaveUrl(urlInventory);
            expect(InventoryPage.removeBackPackFromCart).not.toBeDisplayed();
            expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
        });
        it('E2E  clicking on the individual item prior accessing the CART', () =>{
            InventoryPage.addBackPackToCart.click();
            InventoryPage.nameItemSelector(0).click();
            expect(browser).toHaveUrl(itemUrlFour);
            InventoryPage.shoppingCartLink.click();
            expect(browser).toHaveUrl(urlCart);
            expect(CartPage.cartQuantity).toHaveText("1");
            expect(CartPage.nameItemSelector(0)).toHaveText("Sauce Labs Backpack");
            expect(CartPage.descriptionItemSelector(0))
            .toHaveText("carry.allTheThings() with the sleek, streamlined Sly Pack that"+
            " melds uncompromising style with unequaled laptop and tablet protection.");
            expect(CartPage.priceItemSelector(0)).toHaveText("$29.99");
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
            CheckoutPage.finishBtn.click();
            expect(browser).toHaveUrl(urlCheckoutComplete);
            CheckoutPage.backHome.click();            
            expect(browser).toHaveUrl(urlInventory);
            expect(InventoryPage.removeBackPackFromCart).not.toBeDisplayed();
            expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
        });  
    });
    describe('STANDAR USER BIKE-LIGHT item', () =>{
        beforeAll('Login with standar user', () =>{
            browser.url(urlLogin);
            LoginPage.testLogin('standard_user', 'secret_sauce');
        });
        it('E2E not clicking on the individual item', () =>{
            InventoryPage.addLabLightToCart.click();
            InventoryPage.shoppingCartLink.click();
            expect(browser).toHaveUrl(urlCart);
            expect(CartPage.cartQuantity).toHaveText("1");
            expect(CartPage.nameItemSelector(0)).toHaveText("Sauce Labs Bike Light");
            expect(CartPage.descriptionItemSelector(0))
            .toHaveText("A red light isn't the desired state in testing but it sure "
            +"helps when riding your bike at night. Water-resistant"
            +" with 3 lighting modes, 1 AAA battery included.");
            CartPage.checkOutBtn.click();
            expect(browser).toHaveUrl(urlCheckout);
            CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
            expect(browser).toHaveUrl(urlCheckoutTwo);
            expect(CheckoutPage.nameItemSelector(0)).toHaveText("Sauce Labs Bike Light");
            expect(CheckoutPage.descriptionItemSelector(0))
            .toHaveText("A red light isn't the desired state in testing but it sure "
            +"helps when riding your bike at night. Water-resistant"
            +" with 3 lighting modes, 1 AAA battery included.");
            expect(CheckoutPage.priceItemSelector(0)).toHaveText("$9.99");
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
            expect(CheckoutPage.cartQuantity).toHaveText("1");
            CheckoutPage.finishBtn.click();
            expect(browser).toHaveUrl(urlCheckoutComplete);
            CheckoutPage.backHome.click();            
            expect(browser).toHaveUrl(urlInventory);
            expect(InventoryPage.removeBackPackFromCart).not.toBeDisplayed();
            expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
        });
        it('E2E  clicking on the individual item prior accessing the CART', () =>{
            InventoryPage.addLabLightToCart.click();
            InventoryPage.nameItemSelector(0).click();
            expect(browser).toHaveUrl(itemUrlFour);
            InventoryPage.shoppingCartLink.click();
            expect(browser).toHaveUrl(urlCart);
            expect(CartPage.cartQuantity).toHaveText("1");
            expect(CartPage.nameItemSelector(0)).toHaveText("Sauce Labs Bike Light");
            expect(CartPage.descriptionItemSelector(0))
            .toHaveText("A red light isn't the desired state in testing but it sure "
            +"helps when riding your bike at night. Water-resistant"
            +" with 3 lighting modes, 1 AAA battery included.");
            CartPage.checkOutBtn.click();
            expect(browser).toHaveUrl(urlCheckout);
            CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
            expect(browser).toHaveUrl(urlCheckoutTwo);
            expect(CheckoutPage.nameItemSelector(0)).toHaveText("Sauce Labs Bike Light");
            expect(CheckoutPage.descriptionItemSelector(0))
            .toHaveText("A red light isn't the desired state in testing but it sure "
            +"helps when riding your bike at night. Water-resistant"
            +" with 3 lighting modes, 1 AAA battery included.");
            expect(CheckoutPage.priceItemSelector(0)).toHaveText("$9.99");
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
            expect(CheckoutPage.cartQuantity).toHaveText("1");
            CheckoutPage.finishBtn.click();
            expect(browser).toHaveUrl(urlCheckoutComplete);
            CheckoutPage.backHome.click();            
            expect(browser).toHaveUrl(urlInventory);
            expect(InventoryPage.removeBackPackFromCart).not.toBeDisplayed();
            expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
        });  
    });
    describe('STANDAR USER BOLT_SHIRT item', () =>{
        beforeAll('Login with standar user', () =>{
            browser.url(urlLogin);
            LoginPage.testLogin('standard_user', 'secret_sauce');
        });
        it('E2E not clicking on the individual item', () =>{
            InventoryPage.addBoltTshirtToCart.click();
            InventoryPage.shoppingCartLink.click();
            expect(browser).toHaveUrl(urlCart);
            expect(CartPage.cartQuantity).toHaveText("1");
            expect(CartPage.nameItemSelector(0)).toHaveText("Sauce Labs Bolt T-Shirt");
            expect(CartPage.descriptionItemSelector(0))
            .toHaveText("Get your testing superhero on with the Sauce Labs bolt T-shirt."
            +" From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.");
            CartPage.checkOutBtn.click();
            expect(browser).toHaveUrl(urlCheckout);
            CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
            expect(browser).toHaveUrl(urlCheckoutTwo);
            expect(CheckoutPage.nameItemSelector(0)).toHaveText("Sauce Labs Bolt T-Shirt");
            expect(CheckoutPage.descriptionItemSelector(0))
            .toHaveText("Get your testing superhero on with the Sauce Labs bolt T-shirt."
            +" From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.");
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
            expect(CheckoutPage.cartQuantity).toHaveText("1");
            CheckoutPage.finishBtn.click();
            expect(browser).toHaveUrl(urlCheckoutComplete);
            CheckoutPage.backHome.click();            
            expect(browser).toHaveUrl(urlInventory);
            expect(InventoryPage.removeBackPackFromCart).not.toBeDisplayed();
            expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
        });
        it('E2E  clicking on the individual item prior accessing the CART', () =>{
            InventoryPage.addBoltTshirtToCart.click();
            InventoryPage.nameItemSelector(0).click();
            expect(browser).toHaveUrl(itemUrlFour);
            InventoryPage.shoppingCartLink.click();
            expect(browser).toHaveUrl(urlCart);
            expect(CartPage.cartQuantity).toHaveText("1");
            expect(CartPage.nameItemSelector(0)).toHaveText("Sauce Labs Bolt T-Shirt");
            expect(CartPage.descriptionItemSelector(0))
            .toHaveText("Get your testing superhero on with the Sauce Labs bolt T-shirt."
            +" From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.");
            CartPage.checkOutBtn.click();
            expect(browser).toHaveUrl(urlCheckout);
            CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
            expect(browser).toHaveUrl(urlCheckoutTwo);
            expect(CheckoutPage.nameItemSelector(0)).toHaveText("Sauce Labs Bolt T-Shirt");
            expect(CheckoutPage.descriptionItemSelector(0))
            .toHaveText("Get your testing superhero on with the Sauce Labs bolt T-shirt."
            +" From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.");
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
            expect(CheckoutPage.cartQuantity).toHaveText("1");
            CheckoutPage.finishBtn.click();
            expect(browser).toHaveUrl(urlCheckoutComplete);
            CheckoutPage.backHome.click();            
            expect(browser).toHaveUrl(urlInventory);
            expect(InventoryPage.removeBackPackFromCart).not.toBeDisplayed();
            expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
        });  
    });
    describe('STANDAR USER FLEECE JACKET item', () =>{
        beforeAll('Login with standar user', () =>{
            browser.url(urlLogin);
            LoginPage.testLogin('standard_user', 'secret_sauce');
        });
        it('E2E not clicking on the individual item', () =>{
            InventoryPage.addFleeceJacketToCart.click();
            InventoryPage.shoppingCartLink.click();
            expect(browser).toHaveUrl(urlCart);
            expect(CartPage.cartQuantity).toHaveText("1");
            expect(CartPage.nameItemSelector(0)).toHaveText("Sauce Labs Fleece Jacket");
            expect(CartPage.descriptionItemSelector(0))
            .toHaveText("It's not every day that you come across a midweight quarter-zip"
            +" fleece jacket capable of handling everything from a relaxing day"
            +" outdoors to a busy day at the office.");
            CartPage.checkOutBtn.click();
            expect(browser).toHaveUrl(urlCheckout);
            CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
            expect(browser).toHaveUrl(urlCheckoutTwo);
            expect(CheckoutPage.nameItemSelector(0)).toHaveText("Sauce Labs Fleece Jacket");
            expect(CheckoutPage.descriptionItemSelector(0))
            .toHaveText("It's not every day that you come across a midweight quarter-zip"
            +" fleece jacket capable of handling everything from a relaxing day"
            +" outdoors to a busy day at the office.");
            expect(CheckoutPage.priceItemSelector(0)).toHaveText("$49.99");
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
            expect(CheckoutPage.cartQuantity).toHaveText("1");
            CheckoutPage.finishBtn.click();
            expect(browser).toHaveUrl(urlCheckoutComplete);
            CheckoutPage.backHome.click();            
            expect(browser).toHaveUrl(urlInventory);
            expect(InventoryPage.removeBackPackFromCart).not.toBeDisplayed();
            expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
        });
        it('E2E  clicking on the individual item prior accessing the CART', () =>{
            InventoryPage.addFleeceJacketToCart.click();
            InventoryPage.nameItemSelector(0).click();
            expect(browser).toHaveUrl(itemUrlFour);
            InventoryPage.shoppingCartLink.click();
            expect(browser).toHaveUrl(urlCart);
            expect(CartPage.cartQuantity).toHaveText("1");
            expect(CartPage.nameItemSelector(0)).toHaveText("Sauce Labs Fleece Jacket");
            expect(CartPage.descriptionItemSelector(0))
            .toHaveText("It's not every day that you come across a midweight quarter-zip"
            +" fleece jacket capable of handling everything from a relaxing day"
            +" outdoors to a busy day at the office.");
            CartPage.checkOutBtn.click();
            expect(browser).toHaveUrl(urlCheckout);
            CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
            expect(browser).toHaveUrl(urlCheckoutTwo);
            expect(CheckoutPage.nameItemSelector(0)).toHaveText("Sauce Labs Fleece Jacket");
            expect(CheckoutPage.descriptionItemSelector(0))
            .toHaveText("It's not every day that you come across a midweight quarter-zip"
            +" fleece jacket capable of handling everything from a relaxing day"
            +" outdoors to a busy day at the office.");
            expect(CheckoutPage.priceItemSelector(0)).toHaveText("$49.99");
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
            expect(CheckoutPage.cartQuantity).toHaveText("1");
            CheckoutPage.finishBtn.click();
            expect(browser).toHaveUrl(urlCheckoutComplete);
            CheckoutPage.backHome.click();            
            expect(browser).toHaveUrl(urlInventory);
            expect(InventoryPage.removeBackPackFromCart).not.toBeDisplayed();
            expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
        });  
    });
    describe('STANDAR USER ONSIE item', () =>{
        beforeAll('Login with standar user', () =>{
            browser.url(urlLogin);
            LoginPage.testLogin('standard_user', 'secret_sauce');
        });
        it('E2E not clicking on the individual item', () =>{
            InventoryPage.addOnsieToCart.click();
            InventoryPage.shoppingCartLink.click();
            expect(browser).toHaveUrl(urlCart);
            expect(CartPage.cartQuantity).toHaveText("1");
            expect(CartPage.nameItemSelector(0)).toHaveText("Sauce Labs Onesie");
            expect(CartPage.descriptionItemSelector(0))
            .toHaveText("Rib snap infant onesie for the junior automation"
            +" engineer in development. Reinforced 3-snap bottom closure,"
            +" two-needle hemmed sleeved and bottom won't unravel.");
            CartPage.checkOutBtn.click();
            expect(browser).toHaveUrl(urlCheckout);
            CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
            expect(browser).toHaveUrl(urlCheckoutTwo);
            expect(CheckoutPage.nameItemSelector(0)).toHaveText("Sauce Labs Onesie");
            expect(CheckoutPage.descriptionItemSelector(0))
            .toHaveText("Rib snap infant onesie for the junior automation"
            +" engineer in development. Reinforced 3-snap bottom closure,"
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
            expect(CheckoutPage.cartQuantity).toHaveText("1");
            CheckoutPage.finishBtn.click();
            expect(browser).toHaveUrl(urlCheckoutComplete);
            CheckoutPage.backHome.click();            
            expect(browser).toHaveUrl(urlInventory);
            expect(InventoryPage.removeBackPackFromCart).not.toBeDisplayed();
            expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
        });
        it('E2E  clicking on the individual item prior accessing the CART', () =>{
            InventoryPage.addOnsieToCart.click();
            InventoryPage.nameItemSelector(0).click();
            expect(browser).toHaveUrl(itemUrlFour);
            InventoryPage.shoppingCartLink.click();
            expect(browser).toHaveUrl(urlCart);
            expect(CartPage.cartQuantity).toHaveText("1");
            expect(CartPage.nameItemSelector(0)).toHaveText("Sauce Labs Onesie");
            expect(CartPage.descriptionItemSelector(0))
            .toHaveText("Rib snap infant onesie for the junior automation"
            +" engineer in development. Reinforced 3-snap bottom closure,"
            +" two-needle hemmed sleeved and bottom won't unravel.");
            CartPage.checkOutBtn.click();
            expect(browser).toHaveUrl(urlCheckout);
            CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
            expect(browser).toHaveUrl(urlCheckoutTwo);
            expect(CheckoutPage.nameItemSelector(0)).toHaveText("Sauce Labs Onesie");
            expect(CheckoutPage.descriptionItemSelector(0))
            .toHaveText("Rib snap infant onesie for the junior automation"
            +" engineer in development. Reinforced 3-snap bottom closure,"
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
            expect(CheckoutPage.cartQuantity).toHaveText("1");
            CheckoutPage.finishBtn.click();
            expect(browser).toHaveUrl(urlCheckoutComplete);
            CheckoutPage.backHome.click();            
            expect(browser).toHaveUrl(urlInventory);
            expect(InventoryPage.removeBackPackFromCart).not.toBeDisplayed();
            expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
        });  
    });
    describe('STANDAR USER RED-T-SHIRT item', () =>{
        beforeAll('Login with standar user', () =>{
            browser.url(urlLogin);
            LoginPage.testLogin('standard_user', 'secret_sauce');
        });
        it('E2E not clicking on the individual item', () =>{
            InventoryPage.addRedShirtToCartOnInventory.click();
            InventoryPage.shoppingCartLink.click();
            expect(browser).toHaveUrl(urlCart);
            expect(CartPage.cartQuantity).toHaveText("1");
            expect(CartPage.nameItemSelector(0))
            .toHaveText("Test.allTheThings() T-Shirt (Red)");
            expect(CartPage.descriptionItemSelector(0))
            .toHaveText("This classic Sauce Labs t-shirt is perfect"
            +" to wear when cozying up to your keyboard to"
            +" automate a few tests. Super-soft and comfy ringspun combed cotton.");
            CartPage.checkOutBtn.click();
            expect(browser).toHaveUrl(urlCheckout);
            CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
            expect(browser).toHaveUrl(urlCheckoutTwo);
            expect(CheckoutPage.nameItemSelector(0))
            .toHaveText("Test.allTheThings() T-Shirt (Red)");
            expect(CheckoutPage.descriptionItemSelector(0))
            .toHaveText("This classic Sauce Labs t-shirt is perfect"
            +" to wear when cozying up to your keyboard to"
            +" automate a few tests. Super-soft and comfy ringspun combed cotton.");
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
            expect(CheckoutPage.cartQuantity).toHaveText("1");
            CheckoutPage.finishBtn.click();
            expect(browser).toHaveUrl(urlCheckoutComplete);
            CheckoutPage.backHome.click();            
            expect(browser).toHaveUrl(urlInventory);
            expect(InventoryPage.removeBackPackFromCart).not.toBeDisplayed();
            expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
        });
        it('E2E  clicking on the individual item prior accessing the CART', () =>{
            InventoryPage.addRedShirtToCartOnInventory.click();
            InventoryPage.nameItemSelector(0).click();
            expect(browser).toHaveUrl(itemUrlFour);
            InventoryPage.shoppingCartLink.click();
            expect(browser).toHaveUrl(urlCart);
            expect(CartPage.cartQuantity).toHaveText("1");
            expect(CartPage.nameItemSelector(0))
            .toHaveText("Test.allTheThings() T-Shirt (Red)");
            expect(CartPage.descriptionItemSelector(0))
            .toHaveText("This classic Sauce Labs t-shirt is perfect"
            +" to wear when cozying up to your keyboard to"
            +" automate a few tests. Super-soft and comfy ringspun combed cotton.");
            CartPage.checkOutBtn.click();
            expect(browser).toHaveUrl(urlCheckout);
            CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
            expect(browser).toHaveUrl(urlCheckoutTwo);
            expect(CheckoutPage.nameItemSelector(0))
            .toHaveText("Test.allTheThings() T-Shirt (Red)");
            expect(CheckoutPage.descriptionItemSelector(0))
            .toHaveText("This classic Sauce Labs t-shirt is perfect"
            +" to wear when cozying up to your keyboard to"
            +" automate a few tests. Super-soft and comfy ringspun combed cotton.");
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
            expect(CheckoutPage.cartQuantity).toHaveText("1");
            CheckoutPage.finishBtn.click();
            expect(browser).toHaveUrl(urlCheckoutComplete);
            CheckoutPage.backHome.click();            
            expect(browser).toHaveUrl(urlInventory);
            expect(InventoryPage.removeBackPackFromCart).not.toBeDisplayed();
            expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
        });  
    });
    describe('STANDAR USER ALL ITEMS ', () =>{
        beforeAll('Login with standar user', () =>{
            browser.url(urlLogin);
            LoginPage.testLogin('standard_user', 'secret_sauce');
        });
        it('E2E not clicking on the individual item', () =>{
            InventoryPage.addBackPackToCart.click();
            InventoryPage.addLabLightToCart.click();
            InventoryPage.addBoltTshirtToCart.click();
            InventoryPage.addFleeceJacketToCart.click();
            InventoryPage.addOnsieToCart.click();
            InventoryPage.addRedShirtToCartOnInventory.click();
            InventoryPage.shoppingCartLink.click();
            expect(browser).toHaveUrl(urlCart);
            expect(CartPage.cartItemsCounter).toHaveText("6");
            expect(CartPage.nameItemSelector(0)).toHaveText("Sauce Labs Backpack");
            expect(CartPage.nameItemSelector(1)).toHaveText("Sauce Labs Bike Light");
            expect(CartPage.nameItemSelector(2)).toHaveText("Sauce Labs Bolt T-Shirt");
            expect(CartPage.nameItemSelector(3)).toHaveText("Sauce Labs Fleece Jacket");
            expect(CartPage.nameItemSelector(4)).toHaveText("Sauce Labs Onesie");
            expect(CartPage.nameItemSelector(5))
            .toHaveText("Test.allTheThings() T-Shirt (Red)");
            expect(CheckoutPage.descriptionItemSelector(0))
            .toHaveText("carry.allTheThings() with the sleek, streamlined Sly Pack "+
            "that melds uncompromising style with unequaled laptop and tablet protection.");
            expect(CartPage.descriptionItemSelector(1))
            .toHaveText("A red light isn't the desired state in testing but it sure "
            +"helps when riding your bike at night. Water-resistant"
            +" with 3 lighting modes, 1 AAA battery included.");
            expect(CartPage.descriptionItemSelector(2))
            .toHaveText("Get your testing superhero on with the Sauce Labs bolt T-shirt."
            +" From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.");
            expect(CartPage.descriptionItemSelector(3))
            .toHaveText("It's not every day that you come across a midweight quarter-zip"
            +" fleece jacket capable of handling everything from a relaxing day"
            +" outdoors to a busy day at the office.");
            expect(CartPage.descriptionItemSelector(4))
            .toHaveText("Rib snap infant onesie for the junior automation"
            +" engineer in development. Reinforced 3-snap bottom closure,"
            +" two-needle hemmed sleeved and bottom won't unravel.");
            expect(CartPage.descriptionItemSelector(5))
            .toHaveText("This classic Sauce Labs t-shirt is perfect"
            +" to wear when cozying up to your keyboard to"
            +" automate a few tests. Super-soft and comfy ringspun combed cotton.");
            CartPage.checkOutBtn.click();
            expect(browser).toHaveUrl(urlCheckout);
            CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
            expect(browser).toHaveUrl(urlCheckoutTwo);
            expect(CartPage.nameItemSelector(0)).toHaveText("Sauce Labs Backpack");
            expect(CartPage.nameItemSelector(1)).toHaveText("Sauce Labs Bike Light");
            expect(CartPage.nameItemSelector(2)).toHaveText("Sauce Labs Bolt T-Shirt");
            expect(CartPage.nameItemSelector(3)).toHaveText("Sauce Labs Fleece Jacket");
            expect(CartPage.nameItemSelector(4)).toHaveText("Sauce Labs Onesie");
            expect(CartPage.nameItemSelector(5))
            .toHaveText("Test.allTheThings() T-Shirt (Red)");
            expect(CheckoutPage.descriptionItemSelector(0))
            .toHaveText("carry.allTheThings() with the sleek, streamlined Sly Pack "+
            "that melds uncompromising style with unequaled laptop and tablet protection.");
            expect(CartPage.descriptionItemSelector(1))
            .toHaveText("A red light isn't the desired state in testing but it sure "
            +"helps when riding your bike at night. Water-resistant"
            +" with 3 lighting modes, 1 AAA battery included.");
            expect(CartPage.descriptionItemSelector(2))
            .toHaveText("Get your testing superhero on with the Sauce Labs bolt T-shirt."
            +" From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.");
            expect(CartPage.descriptionItemSelector(3))
            .toHaveText("It's not every day that you come across a midweight quarter-zip"
            +" fleece jacket capable of handling everything from a relaxing day"
            +" outdoors to a busy day at the office.");
            expect(CartPage.descriptionItemSelector(4))
            .toHaveText("Rib snap infant onesie for the junior automation"
            +" engineer in development. Reinforced 3-snap bottom closure,"
            +" two-needle hemmed sleeved and bottom won't unravel.");
            expect(CartPage.descriptionItemSelector(5))
            .toHaveText("This classic Sauce Labs t-shirt is perfect"
            +" to wear when cozying up to your keyboard to"
            +" automate a few tests. Super-soft and comfy ringspun combed cotton.");
            expect(CheckoutPage.priceItemSelector(0)).toHaveText("$29.99")
            expect(CheckoutPage.priceItemSelector(1)).toHaveText("$9.99");
            expect(CheckoutPage.priceItemSelector(2)).toHaveText("$15.99");
            expect(CheckoutPage.priceItemSelector(3)).toHaveText("$49.99");
            expect(CheckoutPage.priceItemSelector(4)).toHaveText("$7.99");
            expect(CheckoutPage.priceItemSelector(5)).toHaveText("$15.99");
            expect(CheckoutPage.cartQuantity).toHaveText("1");
            expect(CheckoutPage.sumaryInfoLevelPaymentInformation)
            .toHaveText("Payment Information:");
            expect(CheckoutPage.sumaryInfoLevelPaymentValue)
            .toHaveText("SauceCard #31337");
            expect(CheckoutPage.sumaryInfoLevelShippingInformation)
            .toHaveText("Shipping Information:");
            expect(CheckoutPage.sumaryInfoLevelShippingValue)
            .toHaveText("FREE PONY EXPRESS DELIVERY!");
            expect(CheckoutPage.sumarySubTotal).toHaveText("Item total: $129.94");
            expect(CheckoutPage.sumaryTax).toHaveText("Tax: $10.40");
            expect(CheckoutPage.sumaryTotal).toHaveText("Total: $140.34");
            expect(CheckoutPage.cartQuantity).toHaveText("1");
            CheckoutPage.finishBtn.click();
            expect(browser).toHaveUrl(urlCheckoutComplete);
            CheckoutPage.backHome.click();            
            expect(browser).toHaveUrl(urlInventory);
            expect(InventoryPage.removeBackPackFromCart).not.toBeDisplayed();
            expect(InventoryPage.cartItemsCounter).not.toBeDisplayed();
        });
    });
});