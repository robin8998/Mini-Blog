import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf.js";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    console.log(email,password,name)
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
       
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log(`createAccount Error : ${error}`);
      throw error
    }
  }

  async login({ email, password }) {
    try {
     const result =  await this.account.createEmailPasswordSession(email, password);
     console.log("This is Login result :",result )
     return result 
     
    } catch (error) {
      console.log("Login Error :", error);
      throw error
    }
  } 

  async currentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("auth.js :: CurrentUser Error :", error);
    }
    return null;
  }

  async logOut() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("logOut Error : ", error);
    }
  }
}

const authService = new AuthService();

export default authService;
