import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:'root'
})
export class ApiService{

    constructor(private router:Router,private httpClient:HttpClient){

        
    }
    // newURL="http://localhost:8080/product/upload";
    getuploadfile():Observable<any>{
        return this.httpClient.post("http://localhost:8080/product/upload",{responseType:'json'})

    }
}

