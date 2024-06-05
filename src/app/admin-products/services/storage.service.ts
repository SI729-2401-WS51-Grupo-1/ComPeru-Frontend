import { Injectable } from '@angular/core';
import firebase from "firebase/compat/app";
import 'firebase/compat/storage';
import {environment} from "../../../environments/environment";

firebase.initializeApp(environment.firebaseConfig)
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storageRef = firebase.app().storage().ref();

  constructor() { }

  async uploadImage(arhciver_name:string,name:string,imgBase64:any){

    try {
      let response = await this.storageRef.child(arhciver_name+"/"+name).putString(imgBase64,'data_url');
      console.log(response);
      return await response.ref.getDownloadURL();
    }catch (err){
      console.log(err);
      return null;
    }
  }
}
