import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { getPostById } from '../state/posts.selector';

@Component({
  selector: 'app-singlepost',
  templateUrl: './singlepost.component.html',
  styleUrls: ['./singlepost.component.css']
})

export class SinglepostComponent implements OnInit {
  post!:Observable<Post>;
  
  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.post=this.store.select(getPostById);
  }

}
