import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";
class AuthService{
    client =new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
       
        this.account=new Account(this.client);

    }
     async createAccount(email,password){
      try {
        const userAccount=await this.account.create(ID.unique(),email,password);
        if(userAccount){
          return userAccount;
        }else{
            throw new Error("Account not created");
        }
      } catch (error) {
        throw new Error(error);
        
      }
    }
    async getAccount(){
        try {
            const userAccount=await this.account.get();
            if(userAccount){
                return userAccount;
            }else{
                throw new Error("Account not found");
            }
          } catch (error) {
            throw new Error(error);
            
          }
    }
    async login(email,password){
        try {
            const userAccount=await this.account.createSession(email,password);
            if(userAccount){
                return userAccount;
            }else{
                throw new Error("Account not found");
            }
          } catch (error) {
            throw new Error(error);
            
          }
    }

}
const authObj=new AuthService();

export default authObj;