import { Client, Account, Databases } from "appwrite";

const client = new Client();
client
    .setEndpoint('https://[APPWRITE_ENDPOINT]')
    .setProject('[PROJECT_ID]');

export const account = new Account(client);
export const databases = new Databases(client);
