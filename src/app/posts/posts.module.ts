import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { PostsEffects } from "./state/posts.effect";
import { postsReducers } from "./state/posts.reducers";
import { SinglepostComponent } from './singlepost/singlepost.component';

const routes:Routes=[{
    path:'posts', 
    component:PostsListComponent,
    children:[
    {
        path:'add', 
        component:AddPostComponent
    },
    {
        path:'edit/:id',
        component:EditPostComponent
    }
    ]
}];

@NgModule({
    declarations:[
        PostsListComponent,
        AddPostComponent,
        EditPostComponent,
        SinglepostComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('posts', postsReducers),
        EffectsModule.forFeature([PostsEffects]),
    ]
})

export class PostsModule{
    
}