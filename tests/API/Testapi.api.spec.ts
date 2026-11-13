import { test, expect } from '@playwright/test';

//API token for the API test
//Global declaration of the API token
const AUTH_TOKEN = {
  Authorization: 'Bearer e28e0e9d5b3a39519544a8723e3cf4ac760cce84944238d83b357bfca4a32423',
};
//Get user details test
test('get user test', async ({ request }) => {
  const response = await request.get('https://gorest.co.in/public/v2/users/8708869', { headers: AUTH_TOKEN,});

  console.log(await response.json());
  expect(response.status()).toBe(200);
  const jsonBody = await response.json();
  expect(jsonBody.id).toBe(8708869);
  expect(jsonBody.name).toBe('Ravi kavya');
});

//Create user test
test('create user test', async ({ request }) => {
    //JS Object 
    //JS object to JSON is serialization/marshiling
    //JSON to JS object is deserialization
    let Userdata= {
        name: 'Ravikumar',
        email: `testapi${Date.now()}@abc.com`,
        gender: 'male',
        status: 'active',
      };

  const response = await request.post('https://gorest.co.in/public/v2/users', { headers: AUTH_TOKEN, data: Userdata});

  const jsonBody = await response.json();
  console.log(jsonBody);
});

//Update user details test
test('update user details test', async ({ request }) => {
    //JS Object 
    //JS object to JSON is serialization
    //JSON to JS object is deserialization
    let Userdata= {
        name: 'Ravikumar1',
        email: `testapi${Date.now()}@example.com`,
        gender: 'male',
        status: 'active',
      };
  const response = await request.put('https://gorest.co.in/public/v2/users/8709018', { headers: AUTH_TOKEN, data: Userdata});
  const jsonBody = await response.json();
  console.log(jsonBody);
});


//Delete user details test
test('delete user details test', async ({ request }) => {
    //JS Object 
    //JS object to JSON is serialization
    //JSON to JS object is deserialization
  let response = await request.delete('https://gorest.co.in/public/v2/users/8709018', { headers: AUTH_TOKEN});
  console.log(response.statusText());
  console.log(response.status());
});