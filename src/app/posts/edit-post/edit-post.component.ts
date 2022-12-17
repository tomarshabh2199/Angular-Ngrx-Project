import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { updatePost } from '../state/posts.actions';
import { getPostById } from '../state/posts.selector';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})

export class EditPostComponent implements OnInit {
  post:Post | undefined;
  postForm!: FormGroup ;
  postSubscription: Subscription = new Subscription;

  constructor(private route:ActivatedRoute, private store:Store<AppState>, private router:Router) { }

  ngOnInit(): void {
    this.createForm()
    this.postSubscription=this.store.
    select(getPostById).subscribe((post)=>{
      if(post){
      this.post=post;
      this.postForm.patchValue({
        title:post?.title,
        description:post?.description,
      });
    }
    });
    // this.route.paramMap.subscribe((params)=>{
    //   const id=params.get('id');
    //   this.postSubscription=this.store.select(getPostById, {id}).subscribe(data=>{
    //     this.post=data;
    //     this.createForm();
    //     console.log(this.post);
    //   })
    //   console.log(params.get('id'));
    // });
  }

  createForm(){
   this.postForm = new FormGroup({
     title: new FormControl(null,
      [Validators.required, Validators.minLength(6)]),
     description: new FormControl(null,
      [Validators.required, Validators.minLength(10)]),     
   });
  }

  onSubmit(){
    if(!this.postForm.valid){
      return;
    }

    const title=this.postForm.value.title;
    const description=this.postForm.value.description;

    const  post:Post = {
      id:this.post!.id,
      title,
      description
    };

    // dispatch the action
    this.store.dispatch(updatePost({post}));
    this.router.navigate(['posts']);
  }

  ngOnDestroy(){
    if(this.postSubscription){
      this.postSubscription.unsubscribe();
    }
  }
  
}
