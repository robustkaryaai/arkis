import { Client, Account } from 'appwrite';

const client = new Client();

const CLOUD_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1';

const endpoint = CLOUD_ENDPOINT;

client.setEndpoint(endpoint).setProject('69667fe400099daf8fcf');

export const account = new Account(client);
export { client };
