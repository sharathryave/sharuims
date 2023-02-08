import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/api.service';
import * as XLSX from 'xlsx';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit{


  fileUploadUrl="http://localhost:8080/product/upload";
  data: [][] = [];

  
  constructor(
    private _http:HttpClient,private apiService:ApiService
    
  ) {
      
  }
  ngOnInit(): void {
 
  }

  
  file: any;
  flag=true;


  selectFile(event: any) {
    //  console.log(event);
   this.file = event.target.files[0];
   console.log(this.file);

  // const target : DataTransfer = <DataTransfer>(event.target);
  //  const reader: FileReader = new FileReader();
  //  reader.onload = (e: any) => {
  //      const bstr: string = e.target.result;

  //      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary'});
  //      const wsname : string = wb.SheetNames[0];
  //      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  //      console.log(ws);
  //      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1}));
       
  //      console.log(this.data);
  //  };
  //  reader.readAsBinaryString(target.files[0]);


  const reader = new FileReader();
reader.onload = (e) => {
  const data = reader.result;
  const workbook = XLSX.read(data, { type: 'binary' });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  this.data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
};
reader.readAsBinaryString(this.file);

  }

  uploadFile()
  {
    let formData = new FormData()
    formData.append("file",this.file)
    
   this.flag = false;
   this.apiService.getuploadfile().subscribe(
    response=>{
      console.log(response);

   })
    // this._http.post(this.fileUploadUrl,formData).subscribe(
    //   (data: any) => {
    //     console.log(data) 
    //     this.flag=true; 
    //     alert("File Successfully Uploaded")
        
    //   },
    //   (error) => {
    //     this.flag=true;
    //     console.log(error)
    //     alert("File Not Found");
    //   } 
      
    // ) 
  }
 

  }


