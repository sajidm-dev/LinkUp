import { router } from 'expo-router';
import { Alert } from 'react-native';
import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
    endPoint: 'https://cloud.appwrite.io/v1',
    projectId: '67b055e00035e2eda63c',
    databaseId: '67b0564900045708f698',
    usersCollectionId: '67b0565c000cd033ae59',
    postsCollectionId: '67b0567e0001ca274137',
    storageId: '67b056a2003a49bebdf0'
};

// Init Appwrite SDK
const client = new Client();

client
    .setEndpoint(config.endPoint)
    .setProject(config.projectId);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createuser = async (email, username, password) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        if (!newAccount) throw new Error("Account creation failed");

        const avatarUrl = avatars.getInitials(username);
        // Create user record in the database (without SignIn)
        const newUser = await databases.createDocument(
            config.databaseId,
            config.usersCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        );
        try {
             const session = await signIn(email, password);
             if(!session){
                throw new Error("sign in failed");
             }
             return session 
        } catch (error) {
            Alert.alert("Sign-in failed after account creation:", error);
        }
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};
export async function logOut() {
    try {
        await account.deleteSession('current'); // Deletes only the active session
        console.log("User logged out successfully.");
    } catch (error) {
        console.error("Logout error:", error.message);
    }
}
 export const getCurrentUser = async () => {
    try {
        const currentAccout = await account.get();
        const currentuser = await databases.listDocuments(
            config.databaseId,
            config.usersCollectionId,
            [Query.equal('accountId', currentAccout.$id)]
        );
        if(!currentuser) throw Error;
        return currentuser.documents[0];
    } catch (error) {
        return null;
    }
 }
 export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.vidoesCollectionId
        );
        return posts.documents;
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        return null;
    }
 }
 export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.vidoesCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        );
        return posts.documents;
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        return null;
    }
 }

export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw new Error(error.message);
    }
}
