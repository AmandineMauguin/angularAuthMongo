import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private http: HttpClient) { }

  posts :any;
  
  ngOnInit(): void {
    this.http.get('https://dekpo.herokuapp.com/posts').subscribe((data ) => {
      console.log(data);
      this.posts = data;
    })
  }

  

}
