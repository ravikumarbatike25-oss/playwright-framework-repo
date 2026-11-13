import { test, expect } from '../../src/fixtures/apifixture';

const TOKEN = process.env.API_TOKEN!;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}`};
let userId: number;


// Test Suite for API Tests, serial is used to run the tests in serial manner
test.describe.serial('API Tests', () => {

// Get API Test
test('GET-API- user test', async ({ apiHelper }) => {
    let response = await apiHelper.get('/public/v2/users', AUTH_HEADER);
    expect(response.status).toBe(200);
});

// Post API Test
test('Post-API- create user test', async ({ apiHelper }) => {
    let Userdata= {
        name: 'Ravikumar API',
        email: `testapi${Date.now()}@abc.com`,
        gender: 'male',
        status: 'active',
      };

      let response = await apiHelper.post('/public/v2/users', Userdata, AUTH_HEADER);
      expect(response.status).toBe(201);
      expect(response.body.name).toBe(Userdata.name);
      expect(response.body.email).toBe(Userdata.email);
      expect(response.body.gender).toBe(Userdata.gender);
      expect(response.body.status).toBe(Userdata.status);
      userId = response.body.id;
      console.log(userId);
});

// Put API Test, This put API is dependent on the post API test which is used to get the user id
test('Put-API- update user test', async ({ apiHelper }) => {
    let Userupdatedata= {
        name: 'Ravikumar Automation API',
        gender: 'female'
    };

    let response = await apiHelper.put(`/public/v2/users/${userId}`, Userupdatedata, AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(Userupdatedata.name);
    expect(response.body.gender).toBe(Userupdatedata.gender);
});

// Delete API Test, This delete API is dependent on the put API test which is used to get the user id
test('Delete-API- delete user test', async ({ apiHelper }) => {
    let response = await apiHelper.delete(`/public/v2/users/${userId}`, AUTH_HEADER);
    expect(response.status).toBe(204);
});
});