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

    describe('Checkout form test from PROBLEM USER and BACKPACK', () =>{
        beforeAll('Enter the checkout page reset app state prior adding the BACKPACK', () => {
            browser.url(urlLogin);
            LoginPage.testLogin('problem_user', 'secret_sauce');
            InventoryPage.burgerMenuOption(InventoryPage.resetAppStateBtn);
            browser.refresh();
            InventoryPage.addBackPackToCart.waitForClickable({ timeout: 3000 });
            InventoryPage.addBackPackToCart.click();
            InventoryPage.shoppingCartLink.waitForClickable({ timeout: 3000 });            
            InventoryPage.shoppingCartLink.click();
            CartPage.checkOutBtn.waitForClickable({ timeout: 3000 });
            CartPage.checkOutBtn.click();            
        });        
        describe('Form inputs test', () =>{                
            it('Valid first name, EMPTY LAST NAME and valid zip', () => {
                CheckoutPage.testCheckoutForm('Sebastian', '', '2000');
                expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                expect(CheckoutPage.errorMessageContainer)
                .toHaveText("Error: Last Name is required");                
                browser.refresh();
            });                  
            it('Try to continue with ALL FIELDS EMPTY', () => {
                CheckoutPage.testCheckoutForm('', '', '');
                expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                expect(CheckoutPage.errorMessageContainer)
                .toHaveText("Error: First Name is required");                
                browser.refresh();
            });
            it('Check if the last name field input overwrites the first name one and'+
            'only adds the last character from the last name input', () => {
                CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
                expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                expect(CheckoutPage.lastNameInput.getAttribute('value')).toBe("");
                expect(CheckoutPage.firstNameInput.getAttribute('value')).toBe("i");                
                expect(CheckoutPage.errorMessageContainer)
                .toHaveText("Error: Last Name is required");                
                browser.refresh();
            });        
        });
    });
    describe('Checkout form test from PROBLEM USER and BIKE-LIGHT', () =>{
        beforeAll('Enter the checkout page reset app state prior adding the BIKE-LIGHT', () => {
            browser.url(urlLogin);
            LoginPage.testLogin('problem_user', 'secret_sauce');
            InventoryPage.burgerMenuOption(InventoryPage.resetAppStateBtn);
            browser.refresh();
            InventoryPage.addLabLightToCart.waitForClickable({ timeout: 3000 });
            InventoryPage.addLabLightToCart.click();
            InventoryPage.shoppingCartLink.waitForClickable({ timeout: 3000 });
            InventoryPage.shoppingCartLink.click();
            CartPage.checkOutBtn.waitForClickable({ timeout: 3000 });
            CartPage.checkOutBtn.click();            
        });        
        describe('Form inputs test', () =>{                
            it('Valid first name, EMPTY LAST NAME and valid zip', () => {
                CheckoutPage.testCheckoutForm('Sebastian', '', '2000');
                expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                expect(CheckoutPage.errorMessageContainer)
                .toHaveText("Error: Last Name is required");                
                browser.refresh();
            });                  
            it('Try to continue with ALL FIELDS EMPTY', () => {
                CheckoutPage.testCheckoutForm('', '', '');
                expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                expect(CheckoutPage.errorMessageContainer)
                .toHaveText("Error: First Name is required");                
                browser.refresh();
            });
            it('Check if the last name field input overwrites the first name one and'+
            'only adds the last character from the last name input', () => {
                CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
                expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                expect(CheckoutPage.lastNameInput.getAttribute('value')).toBe("");
                expect(CheckoutPage.firstNameInput.getAttribute('value')).toBe("i");                
                expect(CheckoutPage.errorMessageContainer)
                .toHaveText("Error: Last Name is required");                
                browser.refresh();
            });        
        });
    });
    describe('Checkout form test from PROBLEM USER and BOLT-SHIRT', () =>{
        beforeAll('Enter the checkout page reset app state prior adding the BIKE-LIGHT', () => {
            browser.url(urlLogin);
            LoginPage.testLogin('problem_user', 'secret_sauce');
            InventoryPage.burgerMenuOption(InventoryPage.resetAppStateBtn);
            browser.refresh();
            InventoryPage.addBoltTshirtToCart.waitForClickable({ timeout: 3000 });
            InventoryPage.addBoltTshirtToCart.click();
            InventoryPage.shoppingCartLink.waitForClickable({ timeout: 3000 });           
            InventoryPage.shoppingCartLink.click();
            CartPage.checkOutBtn.waitForClickable({ timeout: 3000 });
            CartPage.checkOutBtn.click();            
        });        
        describe('Form inputs test', () =>{                
            it('Valid first name, EMPTY LAST NAME and valid zip', () => {
                CheckoutPage.testCheckoutForm('Sebastian', '', '2000');
                expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                expect(CheckoutPage.errorMessageContainer)
                .toHaveText("Error: Last Name is required");                
                browser.refresh();
            });                  
            it('Try to continue with ALL FIELDS EMPTY', () => {
                CheckoutPage.testCheckoutForm('', '', '');
                expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                expect(CheckoutPage.errorMessageContainer)
                .toHaveText("Error: First Name is required");                
                browser.refresh();
            });
            it('Check if the last name field input overwrites the first name one and'+
            'only adds the last character from the last name input', () => {
                CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
                expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                expect(CheckoutPage.lastNameInput.getAttribute('value')).toBe("");
                expect(CheckoutPage.firstNameInput.getAttribute('value')).toBe("i");                
                expect(CheckoutPage.errorMessageContainer)
                .toHaveText("Error: Last Name is required");                
                browser.refresh();
            });        
        });
    });
    describe('Checkout form test from PROBLEM USER and FLEECE JACKET', () =>{
        beforeAll('Enter the checkout page reset app state prior adding the BIKE-LIGHT', () => {
            browser.url(urlLogin);
            LoginPage.testLogin('problem_user', 'secret_sauce');
            InventoryPage.burgerMenuOption(InventoryPage.resetAppStateBtn);
            browser.refresh();
            InventoryPage.addFleeceJacketToCart.waitForClickable({ timeout: 3000 });  
            InventoryPage.addFleeceJacketToCart.click();
            InventoryPage.shoppingCartLink.waitForClickable({ timeout: 3000 });              
            InventoryPage.shoppingCartLink.click();
            CartPage.checkOutBtn.waitForClickable({ timeout: 3000 });  
            CartPage.checkOutBtn.click();            
        });        
        describe('Form inputs test', () =>{                
            it('Valid first name, EMPTY LAST NAME and valid zip', () => {
                CheckoutPage.testCheckoutForm('Sebastian', '', '2000');
                expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                expect(CheckoutPage.errorMessageContainer)
                .toHaveText("Error: Last Name is required");                
                browser.refresh();
            });                  
            it('Try to continue with ALL FIELDS EMPTY', () => {
                CheckoutPage.testCheckoutForm('', '', '');
                expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                expect(CheckoutPage.errorMessageContainer)
                .toHaveText("Error: First Name is required");                
                browser.refresh();
            });
            it('Check if the last name field input overwrites the first name one and'+
            'only adds the last character from the last name input', () => {
                CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
                expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                expect(CheckoutPage.lastNameInput.getAttribute('value')).toBe("");
                expect(CheckoutPage.firstNameInput.getAttribute('value')).toBe("i");                
                expect(CheckoutPage.errorMessageContainer)
                .toHaveText("Error: Last Name is required");                
                browser.refresh();
            });        
        });
    });
    describe('Checkout form test from PROBLEM USER and ONSIE', () =>{
        beforeAll('Enter the checkout page reset app state prior adding the BIKE-LIGHT', () => {
            browser.url(urlLogin);
            LoginPage.testLogin('problem_user', 'secret_sauce');
            InventoryPage.burgerMenuOption(InventoryPage.resetAppStateBtn);
            browser.refresh();
            InventoryPage.addOnsieToCart.waitForClickable({ timeout: 3000 }); 
            InventoryPage.addOnsieToCart.click();
            InventoryPage.shoppingCartLink.waitForClickable({ timeout: 3000 });             
            InventoryPage.shoppingCartLink.click();
            CartPage.checkOutBtn.waitForClickable({ timeout: 3000 }); 
            CartPage.checkOutBtn.click();            
        });        
        describe('Form inputs test', () =>{                
            it('Valid first name, EMPTY LAST NAME and valid zip', () => {
                CheckoutPage.testCheckoutForm('Sebastian', '', '2000');
                expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                expect(CheckoutPage.errorMessageContainer)
                .toHaveText("Error: Last Name is required");                
                browser.refresh();
            });                  
            it('Try to continue with ALL FIELDS EMPTY', () => {
                CheckoutPage.testCheckoutForm('', '', '');
                expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                expect(CheckoutPage.errorMessageContainer)
                .toHaveText("Error: First Name is required");                
                browser.refresh();
            });
            it('Check if the last name field input overwrites the first name one and'+
            'only adds the last character from the last name input', () => {
                CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
                expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                expect(CheckoutPage.lastNameInput.getAttribute('value')).toBe("");
                expect(CheckoutPage.firstNameInput.getAttribute('value')).toBe("i");                
                expect(CheckoutPage.errorMessageContainer)
                .toHaveText("Error: Last Name is required");                
                browser.refresh();
            });        
        });
    });
    describe('Checkout form test from PROBLEM USER and RED-T-SHIRT', () =>{
        beforeAll('Enter the checkout page reset app state prior adding the BIKE-LIGHT', () => {
            browser.url(urlLogin);
            LoginPage.testLogin('problem_user', 'secret_sauce');
            InventoryPage.burgerMenuOption(InventoryPage.resetAppStateBtn);
            browser.refresh();
            InventoryPage.addRedShirtToCartFromProblemInventory.waitForClickable({ timeout: 3000 }); 
            InventoryPage.addRedShirtToCartFromProblemInventory.click();
            InventoryPage.shoppingCartLink.waitForClickable({ timeout: 3000 });           
            InventoryPage.shoppingCartLink.click();
            CartPage.checkOutBtn.waitForClickable({ timeout: 3000 }); 
            CartPage.checkOutBtn.click();            
        });        
        describe('Form inputs test', () =>{                
            it('Valid first name, EMPTY LAST NAME and valid zip', () => {
                CheckoutPage.testCheckoutForm('Sebastian', '', '2000');
                expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                expect(CheckoutPage.errorMessageContainer)
                .toHaveText("Error: Last Name is required");                
                browser.refresh();
            });                  
            it('Try to continue with ALL FIELDS EMPTY', () => {
                CheckoutPage.testCheckoutForm('', '', '');
                expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                expect(CheckoutPage.errorMessageContainer)
                .toHaveText("Error: First Name is required");                
                browser.refresh();
            });
            it('Check if the last name field input overwrites the first name one and'+
            'only adds the last character from the last name input', () => {
                CheckoutPage.testCheckoutForm('Sebastian', 'Sileoni', '2000');
                expect(CheckoutPage.wrongUserInput).toBeDisplayed();
                expect(CheckoutPage.lastNameInput.getAttribute('value')).toBe("");
                expect(CheckoutPage.firstNameInput.getAttribute('value')).toBe("i");                
                expect(CheckoutPage.errorMessageContainer)
                .toHaveText("Error: Last Name is required");                
                browser.refresh();
            });        
        });
    });
});