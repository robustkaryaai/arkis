import { Client, Account, TablesDB, ID, Query, Permission, Role } from 'appwrite';

const client = new Client();

const CLOUD_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1';

const endpoint = CLOUD_ENDPOINT;

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '69667fe400099daf8fcf';
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
const TABLES = {
  WAITLIST: process.env.NEXT_PUBLIC_APPWRITE_WAITLIST_TABLE_ID || 'waitlist',
  PREORDER: process.env.NEXT_PUBLIC_APPWRITE_PREORDER_TABLE_ID || 'preorder',
  ORDER: process.env.NEXT_PUBLIC_APPWRITE_ORDER_TABLE_ID || 'order',
  SUBSCRIPTION: process.env.NEXT_PUBLIC_APPWRITE_SUBSCRIPTION_TABLE_ID || 'subscription',
};

client.setEndpoint(endpoint).setProject(PROJECT_ID);

if (typeof window !== 'undefined') {
  try {
    const sid = window.localStorage.getItem('appwrite_session_id');
    if (sid) client.setHeader('X-Appwrite-Session', sid);
  } catch (_) {}
}

export const account = new Account(client);
export const tables = new TablesDB(client);
export { client, ID, Query, Permission, Role, DATABASE_ID, TABLES, PROJECT_ID };
