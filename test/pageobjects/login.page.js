class LoginPage {
    /*GETTERS*/
    /*Login logo*/
    get loginLogo () { return $('.login-logo') }    
    /*Form fields*/
    get userNameInput () { return $('#user-name') }
    get passwordInput () { return $('#password') }
    /*Error messages container*/
    get errorMessageContainer () { return $('.error-message-container') }
    /*Wrong input icon from FA shown when there is any incorrect input*/
    // get wrongUserInput () { return $('.fa-times-circle') }
    /*Delete error circle*/
    get cleanErrorMessage () { return $('.error-button') }
    /*Login btn*/
    get loginBtn () { return $('#login-button') }
    /*Credentials containers*/    
    get userNameCredentials () { return $('#login_credentials') }
    get passwordCredentials () { return $('.login_password') }
    /*Bot colum, this may be tricky contains an image*/
    // get botColum () {
    //     return $('')
    // }
    /*Inventory images after clicking login*/
    get problematicImageSource () { 
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