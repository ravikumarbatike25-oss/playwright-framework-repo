import path from "path";
import {expect, test} from "../src/fixtures/pagefixture";
import { CsvHelper } from "../src/Utils/csvHelpers";

//loginPage distructuring 
test.beforeEach( async({ loginPage  })=>{
    await loginPage.navigateToLoginPage();
    //get username and password from environment variables
    await loginPage.doLogin(process.env.LOGIN_Username!, process.env.LOGIN_Password!);
});

//Data driven test-Taking product data from csv file
let searchtData = CsvHelper.readCsv(path.join(__dirname, "../src/data/productdata.csv"));
for (let row of searchtData){
    test(`test search result -${row.productkey}-${row.product}-${row.result}`, async({ homePage, searchPage })=>{
        await homePage.verifysearchfieldbox(row.productkey);
        await homePage.verifysearchIcon();
        expect(await searchPage.verifysearchResultCount()).toBe(Number(row.result));
    });
};
for (let row of searchtData){
test(`test product cart page-${row.productkey}-${row.product}-${row.result}`, async ({ homePage, searchPage, page})=>{
    await homePage.verifysearchfieldbox(row.productkey);
    await homePage.verifysearchIcon();
    await searchPage.VerifyProductSearch(row.product);
    expect(await page.title()).toBe(row.product);
});
};

//searchPage distructuring 
test('test search page title', async({homePage, searchPage })=>{
    await homePage.verifysearchfieldbox('macbook');
    await homePage.verifysearchIcon();
    expect(await searchPage.verifysearchHeader()).toBeTruthy();
});

test('test search result count', async({ homePage, searchPage })=>{
    await homePage.verifysearchfieldbox('macbook');
    await homePage.verifysearchIcon();
    expect(await searchPage.verifysearchResultCount()).toBe(3);
});
test('test product cart page', async ({ homePage, searchPage, page})=>{
    await homePage.verifysearchfieldbox('macbook');
    await homePage.verifysearchIcon();
    await searchPage.VerifyProductSearch('MacBook Pro');
    expect(await page.title()).toBe('MacBook Pro');
});