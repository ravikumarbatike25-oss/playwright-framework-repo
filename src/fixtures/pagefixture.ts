import { Homepage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { SearchPage } from "../pages/SearchPage";
import { test as basepage } from "@playwright/test";
import { CsvHelper } from "../Utils/csvHelpers";
import path from "node:path";
import { ProductInfoPage } from "../pages/MapproductInfopage";
import { BasePage } from "../pages/BasePage";

// define the type of the pagefixture
type pagefixture ={
    homePage :Homepage;
    loginPage : LoginPage;
    searchPage : SearchPage;
    testData : Record<string, string>[]
    productInfopage : ProductInfoPage;
    basePage : BasePage;
};

export let test = basepage.extend<pagefixture>({
    //homePage fixture
    homePage : async ({page}, use) => {
        let homePage = new Homepage(page);
        await use(homePage);
    },
    //loginPage fixture
    loginPage : async ({page}, use) => {
        let loginPage = new LoginPage(page);
        await use( loginPage);
    },
    basePage : async ({page}, use) => {
        let basePage = new BasePage(page);
        await use( basePage);
    },
    //searchPage fixture
    searchPage : async ({page}, use) => {
        let searchPage = new SearchPage(page);
        await use( searchPage);
    },

    productInfopage : async ({page}, use) => {
        let productInfopage = new ProductInfoPage(page);
        await use( productInfopage);
    },

    testData : async ({}, use) =>{
        let testData = CsvHelper.readCsv(path.join(__dirname, "../data/testData.csv"));
        await use(testData);
    }
});

 export {expect} from "@playwright/test";


