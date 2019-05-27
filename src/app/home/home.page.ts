
import { PostsService } from "./../posts.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  
  constructor(
    private postSrvc: PostsService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}
  theme = {
    mycolor: '#000',
    mytextcolor: '#fff'
  };
  posts$: Observable<any>;
  loadPost(post: any) {
    this.router.navigate(["/posts", post.id]);
  }
  ngOnInit() {
    this.posts$ = this.route.paramMap.pipe(
      switchMap(
        (params: ParamMap) =>
          params.get("category")
            ? this.postSrvc.fetchPostsByCategory(params.get("category"))
            : this.postSrvc.fetchPosts()
      )
    );
  }
  colorIt() {
    document.documentElement.style.setProperty(`--tylerscolor`, '#fff');
    document.documentElement.style.setProperty(`--tylersfont`, '#000');
    document.documentElement.style.setProperty(`--tylersback`, '#ddd');
    document.getElementById('logo').setAttribute("src", "http://tmorrow.design/wp-content/uploads/2019/05/tmorrow2.png");
    document.getElementById('button1').style.setProperty("display", "none");
    document.getElementById('button2').style.setProperty("display", "inline-block");

  }
  decolorIt(){
    document.documentElement.style.setProperty(`--tylerscolor`, '#000');
    document.documentElement.style.setProperty(`--tylersfont`, '#fff');
    document.documentElement.style.setProperty(`--tylersback`, '#555');
    document.getElementById('logo').setAttribute("src","http://tmorrow.design/wp-content/uploads/2019/05/tmorrow.png" );
    document.getElementById('button2').style.setProperty("display", "none");
    document.getElementById('button1').style.setProperty("display", "inline-block");

  }
  
  
}