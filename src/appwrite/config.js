import { Client, Databases, Storage, Query, ID } from "appwrite";
import conf from "../conf/conf.js";

export class DatabaseService {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({title, slug, content, featuredImage, status, userId}){
    try {
        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                userId,
                status,
            }
        )
      } catch (error) {
        console.log("config :: createPost Error :", error);
      }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
      try {
          return await this.databases.updateDocument(
              conf.appwriteDatabaseId,
              conf.appwriteCollectionId,
              slug,
              {
                  title,
                  content,
                  featuredImage,
                  status,

              }
          )
    } catch (error) {
      console.log("config :: updatePost Error : ", error);
    }
  }

  async deletePost(slug){
    try {
        await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        
        )
        return true
    } catch (error) {
      console.log("config :: deletePost Error : ", error);
      return false;
    }
  }

  async getPost(slug){
    try {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        
        )
    } catch (error) {
      console.log("config :: getPost Error :", error);
    }
  }

  async getAllPosts(queries = [Query.equal("status", "active")]){
    try {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries,
            

        )
    } catch (error) {
      console.log("config :: getAllPosts Error : ", error);
      return false
    }
  }

  //  File storage methods

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
    )
    } catch (error) {
      console.log("config :: uploadFile Error :", error);
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(
        conf.appwriteBucketId,
        fileId
    )
    return true
    } catch (error) {
      console.log("config :: deleteFile : ", error);
      return false
    }
  }

  filePreview(fileId) {
    return this.storage.getFileView(
      conf.appwriteBucketId,
      fileId
  )
  } 

  logoPreview(fileId){
    return this.storage.getFilePreview(
      conf.appwriteLogoBucketId,
      fileId
    )
   }
}


const databaseService = new DatabaseService();

export default databaseService;
