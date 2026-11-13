
import { test, expect } from '../../src/fixtures/apifixture';

const TOKEN = process.env.API_TOKEN!;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}`};

//AAA Pattern
//This is the generic function to create user
async function createUser (apiHelper: any) {
    let Userdata= {
        name: 'Ravikumar API',
        email: `testapi${Date.now()}@abc.com`,
        gender: 'male',
        status: 'active',
      };
      let response = await apiHelper.post('/public/v2/users', Userdata, AUTH_HEADER);
      expect(response.status).toBe(201);
     return response.body;
     
    }
//Test-1
//Create user and get user
//create POST API
test('Post API CreateUser and get user', async ({ apiHelper }) => {
    let user = await createUser(apiHelper);

    // Get user 
    let response = await apiHelper.get(`/public/v2/users/${user.id}`, AUTH_HEADER);
    console.log('Test-1 User ID:', user.id);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Ravikumar API');
    expect(response.body.gender).toBe(user.gender);
});

//Test-2
//Create Post -update Put -get user 
test('Post API Create User and update user and get user', async ({ apiHelper }) => {
    let user = await createUser(apiHelper);

    let Userupdatedata= {
        name: 'Ravikumar Automation API',
        gender: 'female'
    };

    // Update user PUT
    let response = await apiHelper.put(`/public/v2/users/${user.id}`, Userupdatedata, AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(Userupdatedata.name);
    console.log('Test-2 User ID:', user.id);

    // Get user
    let getresponse = await apiHelper.get(`/public/v2/users/${user.id}`, AUTH_HEADER);
    expect(getresponse.status).toBe(200);
    expect(getresponse.body.name).toBe(Userupdatedata.name);
    expect(getresponse.body.gender).toBe(Userupdatedata.gender);
});

//TEST-3
//Create-Post delete and get user
test('Post API Create and Delete User and get user', async ({ apiHelper }) => {
    let user = await createUser(apiHelper);
    console.log('Test-3 User ID:', user.id);

// Delete user DELETE
let response = await apiHelper.delete(`/public/v2/users/${user.id}`, AUTH_HEADER);
expect(response.status).toBe(204);

let getresponse = await apiHelper.get(`/public/v2/users/${user.id}`, AUTH_HEADER);
expect(getresponse.status).toBe(404);
expect(getresponse.body.message).toBe('Resource not found');
});
