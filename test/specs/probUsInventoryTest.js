const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
describe ('INVENTORY page testing',  () => {    
    /*URLs to perform the test*/
    const urlLogin = 'https://www.saucedemo.com/';
    const urlInventory = 'https://www.saucedemo.com/inventory.html';
    const urlCart = 'https://www.saucedemo.com/cart.html';
    const urlAbout = 'https://saucelabs.com/';
    const urlProblematicAbout = 'https://saucelabs.com/error/404';
    //ITEMS
    const itemUrlFour = 'https://www.saucedemo.com/inventory-item.html?id=4';
    // const itemUrlZero = 'https://www.saucedemo.com/inventory-item.html?id=0';
    const itemUrlOne = 'https://www.saucedemo.com/inventory-item.html?id=1';
    const itemUrlFive = 'https://www.saucedemo.com/inventory-item.html?id=5';
    const itemUrlTwo = 'https://www.saucedemo.com/inventory-item.html?id=2';
    const itemUrlThree = 'https://www.saucedemo.com/inventory-item.html?id=3';
    const itemUrlBroken = 'https://www.saucedemo.com/inventory-item.html?id=6';
    // const urlCheckout = 'https://www.saucedemo.com/checkout-step-one.html';  
    const urlDogImg = 'https://www.saucedemo.com/static/media/sl-404.168b1cce.jpg';
    describe('PROBLEMATIC user test', () =>{
        beforeAll('Log out from standard user and access problem user', () =>{
            browser.url(urlLogin);
            LoginPage.testLogin('problem_user', 'secret_sauce');                
        });
        it('Open burger menu and click the about option', () => {
            InventoryPage.burgerMenuOption(InventoryPage.aboutBtn);
            expect(browser).toHaveUrl(urlProblematicAbout);
            browser.back();
            expect(browser).toHaveUrl(urlInventory);
        });
        it('Test all LINKS and IMAGES checking the imgs IDs manually one by one', () =>{
            expect(InventoryPage.igmItemSelector(1).getAttribute('src')).toBe(urlDogImg);
            expect(InventoryPage.igmItemSelector(3).getAttribute('src')).toBe(urlDogImg);
            expect(InventoryPage.igmItemSelector(5).getAttribute('src')).toBe(urlDogImg);
            expect(InventoryPage.igmItemSelector(7).getAttribute('src')).toBe(urlDogImg);
            expect(InventoryPage.igmItemSelector(9).getAttribute('src')).toBe(urlDogImg);
            expect(InventoryPage.igmItemSelector(11).getAttribute('src')).toBe(urlDogImg);
        });
        it('Test SORTER value:1 is Z-A, check the order of items names stays A-Z', () => {
            InventoryPage.sortItems(1);
            expect(InventoryPage.nameItemSelector(5))
            .toHaveText("Test.allTheThings() T-Shirt (Red)");
            expect(InventoryPage.nameItemSelector(4)).toHaveText("Sauce Labs Onesie");
            expect(InventoryPage.nameItemSelector(3)).toHaveText("Sauce Labs Fleece Jacket");
            expect(InventoryPage.nameItemSelector(2)).toHaveText("Sauce Labs Bolt T-Shirt");
            expect(InventoryPage.nameItemSelector(1)).toHaveText("Sauce Labs Bike Light");
            expect(InventoryPage.nameItemSelector(0)).toHaveText("Sauce Labs Backpack"); 
        });
        it('Test SORTER value:2 is price H-L, check the order of items names stays the same', () => {
            InventoryPage.sortItems(2);
            expect(InventoryPage.priceItemSelector(0)).toHaveText("$29.99");
            expect(InventoryPage.priceItemSelector(1)).toHaveText("$9.99");
            expect(InventoryPage.priceItemSelector(2)).toHaveText("$15.99");
            expect(InventoryPage.priceItemSelector(3)).toHaveText("$49.99");
            expect(InventoryPage.priceItemSelector(4)).toHaveText("$7.99");
            expect(InventoryPage.priceItemSelector(5)).toHaveText("$15.99");                
        });
        it('Test SORTER value:3 is price L-H, check the order of items names stays the same', () => {
            InventoryPage.sortItems(2);
            expect(InventoryPage.priceItemSelector(0)).toHaveText("$29.99");
            expect(InventoryPage.priceItemSelector(1)).toHaveText("$9.99");
            expect(InventoryPage.priceItemSelector(2)).toHaveText("$15.99");
            expect(InventoryPage.priceItemSelector(3)).toHaveText("$49.99");
            expect(InventoryPage.priceItemSelector(4)).toHaveText("$7.99");
            expect(InventoryPage.priceItemSelector(5)).toHaveText("$15.99");                
        });
        it('Test for ADD links for all items, check which work and which not'+
        'then check which REMOVE-LINKS buttons do not work',() =>{
            InventoryPage.addBackPackToCart.waitForClickable({ timeout: 3000 }); 
            InventoryPage.addBackPackToCart.click();
            InventoryPage.addLabLightToCart.waitForClickable({ timeout: 3000 }); 
            InventoryPage.addLabLightToCart.click();
            InventoryPage.addBoltTshirtToCart.waitForClickable({ timeout: 3000 }); 
            InventoryPage.addBoltTshirtToCart.click();
            InventoryPage.addFleeceJacketToCart.waitForClickable({ timeout: 3000 }); 
            InventoryPage.addFleeceJacketToCart.click();
            InventoryPage.addOnsieToCart.waitForClickable({ timeout: 3000 }); 
            InventoryPage.addOnsieToCart.click();
            InventoryPage.addRedShirtToCartFromProblemInventory.waitForClickable({ timeout: 3000 }); 
            InventoryPage.addRedShirtToCartFromProblemInventory.click();
            expect(InventoryPage.removeBoltTshirtsFromCart).not.toBeDisplayed();
            expect(InventoryPage.removeFleeceJacketFromCart).not.toBeDisplayed();
            expect(InventoryPage.removeRedShirtToCartFromProblemInventory).not.toBeDisplayed();
            expect(InventoryPage.removeOnsieFromCart).toBeDisplayed();
            expect(InventoryPage.removeLabLightFromCart).toBeDisplayed();
            expect(InventoryPage.removeBackPackFromCart).toBeDisplayed();
            InventoryPage.removeOnsieFromCart.waitForClickable({ timeout: 3000 }); 
            InventoryPage.removeOnsieFromCart.click();
            InventoryPage.removeLabLightFromCart.waitForClickable({ timeout: 3000 }); 
            InventoryPage.removeLabLightFromCart.click();
            InventoryPage.removeBackPackFromCart.waitForClickable({ timeout: 3000 }); 
            InventoryPage.removeBackPackFromCart.click();
            expect(InventoryPage.addOnsieToCart).not.toBeDisplayed();
            expect(InventoryPage.addLabLightToCart).not.toBeDisplayed();
            expect(InventoryPage.addBackPackToCart).not.toBeDisplayed();
        });
        it('Test name links to check if they show the right item', () =>{
            InventoryPage.nameItemSelector(0).waitForClickable({ timeout: 3000 }); 
            InventoryPage.nameItemSelector(0).click();
            expect(browser).toHaveUrl(itemUrlFive);
            InventoryPage.backToProducts.waitForClickable({ timeout: 3000 }); 
            InventoryPage.backToProducts.click();
            InventoryPage.nameItemSelector(1).waitForClickable({ timeout: 3000 }); 
            InventoryPage.nameItemSelector(1).click();
            expect(browser).toHaveUrl(itemUrlOne);
            InventoryPage.backToProducts.waitForClickable({ timeout: 3000 }); 
            InventoryPage.backToProducts.click();
            InventoryPage.nameItemSelector(2).waitForClickable({ timeout: 3000 }); 
            InventoryPage.nameItemSelector(2).click();                
            expect(browser).toHaveUrl(itemUrlTwo);
            InventoryPage.backToProducts.waitForClickable({ timeout: 3000 }); 
            InventoryPage.backToProducts.click();
            InventoryPage.nameItemSelector(3).waitForClickable({ timeout: 3000 }); 
            InventoryPage.nameItemSelector(3).click();
            expect(browser).toHaveUrl(itemUrlBroken);
            InventoryPage.backToProducts.waitForClickable({ timeout: 3000 }); 
            InventoryPage.backToProducts.click();
            InventoryPage.nameItemSelector(4).waitForClickable({ timeout: 3000 }); 
            InventoryPage.nameItemSelector(4).click();
            expect(browser).toHaveUrl(itemUrlThree);
            InventoryPage.backToProducts.waitForClickable({ timeout: 3000 }); 
            InventoryPage.backToProducts.click();
            InventoryPage.nameItemSelector(5).waitForClickable({ timeout: 3000 }); 
            InventoryPage.nameItemSelector(5).click();
            expect(browser).toHaveUrl(itemUrlFour);
        });
    });
});