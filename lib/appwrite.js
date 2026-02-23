import { Client, Account } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('69667fe400099daf8fcf');

export const account = new Account(client);
export { client };
