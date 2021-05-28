# Week 15
**Version 1.0.0**

---

Automation test for the  https://www.saucedemo.com/ URL with the WDIO framework. The test consited of performing separated tests on the different sections of the demo site. The site was divided on 4 sections: Login, Inventory, Cehckout and Cart. We tested the process from logging in, adding products to the cart and to finish the checkout ptocess. In addition to that we tested the 3 users allowed to perform the process: standar user which can complete the whole process, the problem user which encountered issues along the process and finally the glitch user which encountered severe performance issues.

---

## STEPS for installing dependencies
npm install @wdio/cli

npx wdio config (local machine, Jasmine, sync, crhomedriver)

npm install @wdio/sync 

---

## LOGIN SECTION TESTS
URL: https://www.saucedemo.com/
We performed tests trying to log in with all the aviable users, tested the form to check it provided all the necessary validations not to grant access to an authorized user for that we let fields to be emtpy and try to use invalid credentials. For this part of the testing we checked that the problem_user once accessing the inventory section has all the images for the items with the wrong source. For the glitched user we tested that it took more than 5 secs to acces the inventory section.

To perform the individual test of the login section the command is:
npx wdio run ./wdio.conf.js --spec loginTest.js

---

## INVENTORY SECTION TESTS
URL: https://www.saucedemo.com/inventory.html
We performed tests on the inventory section by testing the functionality of the header buttons and links
same as for the footer. We tested the burger menu button and its functionalities (logout, reset app state, all items and the about URL). We did a thorough evaluation of the sorter functionality making
sure that all the four options arranged the items according to the selected preference. We tested the process of adding an item to the cart and advancing to the checkout section with all the 6 available items. We had to use different selector for one of the items (red-shirt) because the tests did not work with the same type of selectors as for the other items when it came to adding the red-shirt item to the cart and removing it.

From the inventory section we performed the same tests as cited before, but using the problem_user credentials, navigating this section under those credentials revealed several issues: All the item images where the wrong ones, the sorter menu did not work at all (pressing the different options did not change the order of any of the items), while only half of the adding links worked those items could not be taken out of the shopping cart because the remove links did not work for them, when we clicked on the item's names we were directed to the wrong individual items and the "about page" on the burger menu directed us to a broken link. 

To perform the individual test of the inventory section the command is:
npx wdio run ./wdio.conf.js --spec inventoryTest.js

To perform the individual test of the inventory section the with the problem_user credentials the command is:
npx wdio run ./wdio.conf.js --spec probUsInventoryTest.js

---

## CART SECTION TESTS
URL: https://www.saucedemo.com/cart.html (you must be logged in to work)
We performed a test involving adding an item from the inventory page and then access the cart, going back to the inventory page, remving items, resetting the app state and checking it the cart items counter reflected the actions performed on the page. We did those tests with all six items separately. 

To perform the individual test of the cart section the command is:
npx wdio run ./wdio.conf.js --spec cartTest.js

To perform the individual test of the cart section  with the problem_user credentials the command is:
npx wdio run ./wdio.conf.js --spec probUsCartTest.js

---

## CHECKOUT SECTION TESTS
URL: https://www.saucedemo.com/checkout-step-one.html (you must be logged in to work)
We divided this test in 3 parts: the first checkout menu where the user has to fill in a form, the second checkout menu where the user see the information of the items added to the cart including the the full price of the items added to the cart and finally the "checkout completed" part where the user gets a confirmation of the whole process. We started the test by adding one item from the inventory section, then testing that the information showed at the first checkout section was correct with the item selected and finally we checked that the form got the correct validations (as we did with the login page).

After performing that test with the standar user, we repeated the checkout process with the problem_user credentials. The main issue was that the form doesn't allow to complete the last name field so the checkout process can't advance from that stage.

To perform the individual test of the cart section the command is:
npx wdio run ./wdio.conf.js --spec checkoutTest.js

To perform the individual test of the cart section with the problem_user credentials the command is:
npx wdio run ./wdio.conf.js --spec probUsCheckoutTest.js


---

## E2D TESTS
URL: https://www.saucedemo.com/
We performed one test from the login section to the checkout complete section and back to home with all the items individually and all seix combined. We also performed the same test with the glitched user and tested the load time during the sections where we determined manually that it took 5000 ms to load. As we determined on a previous test the problem user was not able to complete the checkout process due to critical bug on the checkout section 2. 

To perform the individual test for  the E2E process  the command is:
npx wdio run ./wdio.conf.js --spec endToEndTest.js

To perform the individual test for  the E2E process with the glitched user credentials the command is:
npx wdio run ./wdio.conf.js --spec glitchbUsEndToEndTest.js

© Sebastian Sileoni seba20sa@gmail.com