
import {expect, test} from "../src/fixtures/pagefixture";
import { Homepage } from "../src/pages/HomePage";


//loginPage distructuring 
test.beforeEach( async({ loginPage  })=>{
    await loginPage.navigateToLoginPage();
    //get username and password from environment variables
    await loginPage.doLogin(process.env.LOGIN_Username!, process.env.LOGIN_Password!);
})
//homePage distructuring
test('test homepage title', async({  homePage  })=>{
    let title = await homePage.getpageTitle();
    console.log('title is: ', title);
    expect(title).toContain('My Account');
});

//homePage distructuring 
test('test my account link', async({ homePage })=>{
    expect (await homePage.verifymyAccountLink()).toBeTruthy();
});

test('test edit account link', async({ homePage })=>{
    expect (await homePage.verifyeditAccountLink()).toBeTruthy();
});

test ('test number of headers', async({ homePage })=>{
    let headers = await homePage.verifynumberOfHeaders();
    console.log('headers are: ', headers);
    expect.soft(headers).toHaveLength(4);
    expect(headers).toEqual(['My Account', 'My Orders', 'My Affiliate Account', 'Newsletter']);
});

test('test search field box', async({ homePage })=>{
  expect(await homePage.verifysearchfieldbox('macbook')).toBeTruthy();
});

test('test search for product', async({homePage})=>{
  expect(await homePage.verifysearchIcon()).toBeTruthy();
});