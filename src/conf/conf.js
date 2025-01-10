const conf={
    youtubeApi:String(import.meta.env.VITE_YOUTUBE),
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteDataBaseID:String(import.meta.env.VITE_DATABASE_ID),
}
export default conf;