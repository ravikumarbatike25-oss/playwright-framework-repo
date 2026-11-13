import { test as baseTest } from '@playwright/test';
import { APIHelper } from '../api/APIHelper';

type apiFixture = {
    apiHelper: APIHelper;
}

export let test = baseTest.extend<apiFixture>({
    apiHelper: async ({request}, use) => {
        const apiHelper = new APIHelper(
            request, process.env.API_BASE_URL!);
        await use(apiHelper);
    }
})

export { expect } from '@playwright/test';