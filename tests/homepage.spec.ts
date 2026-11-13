import {expect, test} from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { Homepage } from "../src/pages/HomePage";

let loginpage: LoginPage;
let homepage: Homepage;

test.beforeEach( async({page})=>{
    loginpage = new LoginPage(page);
    homepage = new Homepage(page);
    await loginpage.navigateToLoginPage();
    await loginpage.doLogin('ravikumarbrk0@gmail.com', 'Ravi12345@');

})

test('test homepage title', async()=>{
    let title = await homepage.getpageTitle();
    console.log('title is: ', title);
    expect(title).toContain('My Account');
});

test('test my account link', async()=>{
    expect (await homepage.verifymyAccountLink()).toBeTruthy();
});

test('test edit account link', async()=>{
    expect (await homepage.verifyeditAccountLink()).toBeTruthy();
});

test ('test number of headers', async()=>{
    let headers = await homepage.verifynumberOfHeaders();
    console.log('headers are: ', headers);
    expect.soft(headers).toHaveLength(4);
    expect(headers).toEqual(['My Account', 'My Orders', 'My Affiliate Account', 'Newsletter']);
});

