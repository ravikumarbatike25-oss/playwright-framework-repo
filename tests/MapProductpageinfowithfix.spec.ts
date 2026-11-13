import {expect, test} from "../src/fixtures/pagefixture";


//loginPage distructuring 
test.beforeEach( async({ loginPage  })=>{
    await loginPage.navigateToLoginPage();
    //get username and password from environment variables
    await loginPage.doLogin(process.env.LOGIN_Username!, process.env.LOGIN_Password!);
})
//Checking the on product info page
test('logo on the product page', async({basePage})=>{
    expect(await basePage.isLogoVisible()).toBeTruthy();
});
 test('footer links count',  async({basePage})=>{
    expect(await basePage.isFooterLinksVisible()).toBe(16);
 });

test('test product image count', async({homePage, productInfopage, searchPage})=>{
    await homePage.verifysearchfieldbox('macbook');
    await homePage.verifysearchIcon();
    await searchPage.VerifyProductSearch('MacBook Pro');
    let imagecount = await productInfopage.verifyproductImagescount();
    expect(imagecount).toBe(4);
})
test('test header test', async({homePage, productInfopage, searchPage})=>{
    await homePage.verifysearchfieldbox('macbook');
    await homePage.verifysearchIcon();
    await searchPage.VerifyProductSearch('MacBook Pro');
    let header=await productInfopage.headerText();
    console.log(header);
    expect(header).toBe('MacBook Pro');
})

test('test product information', async({homePage, productInfopage, searchPage})=>{
    await homePage.verifysearchfieldbox('macbook');
    await homePage.verifysearchIcon();
    await searchPage.VerifyProductSearch('MacBook Pro');
    let actulalproductinfo = await productInfopage.getProductinfo();
    console.log(actulalproductinfo);
    expect.soft(actulalproductinfo.get('Productname')).toBe('MacBook Pro');
    expect.soft(actulalproductinfo.get('Productimages')).toBe(4);
    expect.soft(actulalproductinfo.get('ProductPrice')).toBe('$2,000.00');
    expect.soft(actulalproductinfo.get('ExTaxPrice')).toBe('$2,000.00');
});