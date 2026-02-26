import { Client, Account } from 'appwrite';

const client = new Client();

const endpoint =
    typeof window === 'undefined'
        ? 'https://fra.cloud.appwrite.io/v1'
        : '/api/appwrite/v1';

client.setEndpoint(endpoint).setProject('69667fe400099daf8fcf');

export const account = new Account(client);
export { client };
