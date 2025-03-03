const conf = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteLogoBucketId : String(import.meta.env.VITE_APPWRITE_LOGO_BUCKET_ID),
    appwriteLogoId : String(import.meta.env.VITE_APPWRITE_LOGO_ID)
}

export default conf 