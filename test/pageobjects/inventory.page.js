class InventoryPage {
    /*GETTERS*/
   
    /*inventory images after clicking login (xpath works better)*/
    get problematicImageSource () { 
        return $('//*[@id="item_4_img_link"]/img').getAttribute('src') 
    }
    
    /*SETTERS*/
    
    /* METHODS */
    
}    
module.exports = new InventoryPage();