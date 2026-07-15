import { randomEnMixed, randomString } from "../utils/data/credentials"

export const testUser1 = {
    name: 'FirstName',
    lastName: 'LastName',
    email: 'rishelevsky+hillel@gmail.com',
    password: 'Hillel-2026'
}

export const testUser2 = {
    name: 'FirstName',
    lastName: 'LastName',
    email: 'rishelevsky+hillel2@gmail.com',
    password: 'Hillel-2026'
}

const dynamicName = randomString(randomEnMixed(10), 10);
const dynamicLastName = randomString(randomEnMixed(10), 10);
const dynamicPassword = `Qa${Date.now()}`

export const newTestUser = {
    firstName: 'TestUser' + dynamicName,
    lastName: 'TestUser' + dynamicLastName,
    email: `test-${Date.now()}+aqa@gmail.com`,
    password: dynamicPassword,
    repeatPassword: dynamicPassword,
}




