import {expect, test} from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";

let loginPage: LoginPage; //global variable

//before each test
test.beforeEach( async ({page})=>{
     loginPage = new LoginPage(page);
})

test('test login page title', async()=>{
    await loginPage.navigateToLoginPage();
    let page_title =await loginPage.getpageTitle();
    console.log('page title is :',page_title);
    expect(page_title).toBe('Account Login');
    await loginPage.isLogoVisible();
});

test('test forgot password link', async()=>{
    await loginPage.navigateToLoginPage();
    expect(await loginPage.verifyForgotPassword()).toBe(true);
});

test('login to the page', async()=>{ 
    await loginPage.doLogin(process.env.LOGIN_Username!, process.env.LOGIN_Password!);

});