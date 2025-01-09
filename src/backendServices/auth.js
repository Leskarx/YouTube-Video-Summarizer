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
        return await this.account.create(email,password);
    }

}
const authObj=new AuthService();

export default authObj;