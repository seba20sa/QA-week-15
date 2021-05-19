class LoginPage {
    /*GETTERS*/
    /*login logo*/
    get loginLogo () { return $('.login-logo') }    
    /*form fields*/
    get userNameInput () { return $('#user-name') }
    get passwordInput () { return $('#password') }
    /*error messages container*/
    get errorMessageContainer () { return $('.error-message-container') }
    /*wrong input icon from FA shown when there is any incorrect input*/
    // get wrongUserInput () { return $('.fa-times-circle') }
    /*delete error circle*/
    get cleanErrorMessage () { return $('.error-button') }
    /*login btn*/
    get loginBtn () { return $('#login-button') }
    /*credentials containers*/    
    get userNameCredentials () { return $('#login_credentials') }
    get passwordCredentials () { return $('.login_password') }
    /*bot colum, this may be tricky contains an image*/
    // get botColum () {
    //     return $('')
    // }
    /*inventory images after clicking login*/
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