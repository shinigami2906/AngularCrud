import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

class SinhVien {
  
  img: String = ""
  constructor(public id: string, public email: string, public username: string, public name: string
    , public age: number , public sex: boolean) {
    
  }

  

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'crud-demo';
  list : SinhVien[] = [];
  sinhvien: number = -1;
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.http.get("http://localhost:3000/sinhviens").subscribe(data => {
          this.list = data.sinhviens;
        });
  }
  clickSinhVien(i: number){
    this.sinhvien = i;
  }
  removeSinhVien(i: number){
    this.http.delete("http://localhost:3000/sinhvien/"+this.list[i].id).subscribe(data => {
      this.list.splice(i,1);
      this.sinhvien = -1;
    });
 
  }
  onSubmit(value: any) {
    this.http.post("http://localhost:3000/sinhvien",value).subscribe(data =>{
      this.http.get("http://localhost:3000/sinhviens").subscribe(data => {
        this.list = data.sinhviens;
      });
    },(err) =>{
      alert("loi")
    })
  }
}
