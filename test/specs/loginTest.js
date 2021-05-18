
const loginPage = require('../../../week-14/test/pageobjects/login.page');
const LoginPage = require('../pageobjects/login.page');

describe (
    'login section with two input fields, one login button, three hidden close buttons'+
    ', a credentials field and two images(one as a logo and one as a src image',  () => {    
    /*URLs to perform the test*/
    const urlLogin = 'https://www.saucedemo.com/';  
    beforeAll("Open browser on the tested page", () => {
        browser.url(urlLogin);
    });  
    describe ('user name field testing', () => {
        it('empty username', () => {            
            LoginPage.setUserName();
            LoginPage.loginBtn.click();
            expect(LoginPage.errorMessageContainer)
            .toHaveText("Epic sadface: Username is required");
            // expect(wrongUserInput.isDisplayed()).toBe('true');
            browser.pause(500);            
        });
        

        it('username: undefined', () => {            
            LoginPage.setUserName(undefined);
            LoginPage.loginBtn.click();
            expect(LoginPage.errorMessageContainer)
            .toHaveText("Epic sadface: Username is required");
            browser.pause(500);            
        });  
        it('username not found on the valid credentials list', () => {            
            LoginPage.setUserName('asddassda');
            LoginPage.loginBtn.click();
            expect(LoginPage.errorMessageContainer)
            .toHaveText("Epic sadface: Password is required");
            browser.pause(500);            
        });                
    });
    describe ('password field testing', () => {
        it('empty password', () => {            
            LoginPage.setPassword();
            LoginPage.loginBtn.click();
            expect(LoginPage.errorMessageContainer)
            .toHaveText("Epic sadface: Password is required");
            browser.pause(500);            
        });
        it('undefined password', () => {            
            LoginPage.setPassword(undefined);
            LoginPage.loginBtn.click();
            expect(LoginPage.errorMessageContainer)
            .toHaveText("Epic sadface: Password is required");
            browser.pause(500);            
        }); 
    });
    describe ('usernames AND password testing', () => {
        it('locked user with correct password', () => {            
            LoginPage.testLogin('locked_out_user', 'secret_sauce');
            LoginPage.loginBtn.click();
            expect(LoginPage.errorMessageContainer)
            .toHaveText("Epic sadface: Sorry, this user has been locked out.");
            browser.pause(500);            
        });
        
    // it('correct username and password, loads the next url', () => {            
    //         LoginPage.testLogin('standard_user', 'secret_sauce');
    //         LoginPage.loginBtn.click();
    //         expect(LoginPage.errorMessageContainer)
    //         .toHaveText("");
    //         browser.pause(500);            
    // });
    });   
});