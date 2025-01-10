import { Client, Databases, ID } from "appwrite";
import conf from "../conf/conf.js";

class dataBaseClass{
    client=new Client();
    Databases;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
        .setProject(conf.appwriteProjectId) // Your project ID
        this.Databases = new Databases(this.client);
        

    }
async createDocument(summary,title,url,userId){
    try {
        const res=await this.Databases.createDocument(
            conf.appwriteDataBaseID,
            conf.appwriteCollectionId, 
            ID.unique(),
            {
                summary:summary,
                title:title,
                url:url,
                userId:userId

            }
           
        
        );
        
    } catch (error) {
        console.error("Error in create Document",error);
        throw new Error("Error in create Document");
        
    }

    }

}
const dataBaseObj = new dataBaseClass();

export default dataBaseObj;