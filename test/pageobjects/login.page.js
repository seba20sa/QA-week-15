class LoginPage {
    /*GETTERS*/  
    get userNameInput () { return $('#user-name') }
    get passwordInput () { return $('#password') }
    get errorMessageContainer () { return $('.error-message-container') }    
    get wrongUserInput () { return $$('.fa-times-circle') }    
    get cleanErrorMessage () { return $('.error-button') }    
    get loginBtn () { return $('#login-button') }
    /*SETTERS*/
    setUserName (username) {
        this.userNameInput.setValue(username);
        browser.keys('Tab');        
    }
    setPassword (password) {
        this.passwordInput.setValue(password);
        browser.keys('Tab');        
    }    
    /* METHODS */
    cleanErrorMessages () {
        this.cleanErrorMessage.click();
    }
    testLogin (username, password) {
        this.setUserName(username);
        this.setPassword(password);
        this.loginBtn.click();
    }
}    
module.exports = new LoginPage();