
import path from "node:path";
import {expect, test} from "../src/fixtures/pagefixture";
import { CsvHelper } from "../src/Utils/csvHelpers";
import { ExcelHelper } from "../src/Utils/excelHelper";
import { JsonHelper } from "../src/Utils/josonhelpers";


//before each test
test.beforeEach( async ({loginPage})=>{
    await loginPage.navigateToLoginPage();

})

test('test login page title', async({loginPage})=>{
    let page_title =await loginPage.getpageTitle();
    console.log('page title is :',page_title);
    expect(page_title).toBe('Account Login');
    
});

test ('verify logo, after login', async({loginPage})=>{
    expect(await loginPage.isLogoVisible()).toBe(true);
});

test('test forgot password link', async({loginPage})=>{
    expect(await loginPage.verifyForgotPassword()).toBe(true);
});

//Sequincial execution- one by one testdata from Fixure file 
test('test login with invalid credentials', async({loginPage, testData})=>{
    for (let row of testData){
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isLogininvaliderror()).toBe(true);
    }
});

// DD_2: without fixtures, parallel mode. Read CSV data directly and loop the test method row wise...
let testData = CsvHelper.readCsv(path.join(__dirname, "../src/data/testData.csv"));
for (let row of testData) {

  test(`invalid login  - ${row.username} - ${row.password}`, async ({ loginPage }) => {
    await loginPage.doLogin(row.username, row.password);
    expect(await loginPage.isLogininvaliderror()).toBeTruthy();
  });
}


//Excel data
//
// let LoginData = ExcelHelper.readExcel(path.join(__dirname, "../src/data/excellogin.xlsx"), "login-1");
// for (let row  of LoginData) {

//   test(`invalid excel data-  ${row.username} `, async ({ loginPage }) => {
//     await loginPage.doLogin(row.username, row.password);
//     expect(await loginPage.isLogininvaliderror()).toBeTruthy();
//   });
// }

let testJsonData = JsonHelper.readJson(path.join(__dirname, "../src/data/Logindata.json"));
for (let row of testJsonData) {

  test(`invalid login with json  - ${row.username} - ${row.password}`, async ({ loginPage }) => {
    await loginPage.doLogin(row.username, row.password);
    expect(await loginPage.isLogininvaliderror()).toBeTruthy();
  });
}