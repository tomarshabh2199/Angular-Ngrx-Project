import { Action, createReducer, on } from "@ngrx/store";
import {addPostSuccess, deletePostSuccess, loadPostsSuccess, updatePostSuccess } from "./posts.actions";
import { initialState, PostsState } from "./posts.states";

const _postsReducer = createReducer(
    initialState, 
    on(addPostSuccess, (state, action)=>{
        let post = {...action.post};
        post.id=(state.posts.length+1).toString();
    
        return{
           ...state,
           posts:[...state.posts, post]
    };
}),

on(updatePostSuccess,(state,action)=>{
    const updatePosts=state.posts.map(post=>{
        return action.post.id===post.id?action.post:post;
    })
    return{
        ...state,
        posts:updatePosts,
    }
}),

on(deletePostSuccess,(state,{id})=>{
    const updatedPosts=state.posts.filter(post=>{
        return post.id!==id;
    });
    
  return {
    ...state,
    posts:updatedPosts,
  }
}),

on(loadPostsSuccess,(state,action)=>{
    return {
        ...state,
        posts:action.posts,
    }

})

);

export function postsReducers(state: PostsState , action: Action){
    return _postsReducer(state,action);
}