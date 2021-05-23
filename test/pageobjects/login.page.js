class LoginPage {
    /*GETTERS*/    
    get loginLogo () { return $('.login-logo') }    
    /*Form */
    get userNameInput () { return $('.form_input') }
    get passwordInput () { return $('#password') }
    get errorMessageContainer () { return $('.error-message-container') }    
    get wrongUserInput () { return $('.fa-times-circle') }    
    get cleanErrorMessage () { return $('.error-button') }    
    get loginBtn () { return $('#login-button') }       
    get userNameCredentials () { return $('#login_credentials') }
    get passwordCredentials () { return $('.login_password') }
    get imageSource () { 
        return $('//*[@id="item_4_img_link"]/img').getAttribute('src') 
    }    
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
    deleteUserNameInput () {
        this.deleteUserNameInput.click();
    }
    deleteUserNameInput () {
        this.deletePasswordInput.click();
    }
    testLogin (username, password) {
        this.setUserName(username);
        this.setPassword(password);
        this.loginBtn.click();
    }
}    
module.exports = new LoginPage();