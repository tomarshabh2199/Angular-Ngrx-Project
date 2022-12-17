import { Action, createReducer, on } from "@ngrx/store";
import {addPostSuccess, deletePostSuccess, loadPostsSuccess, updatePostSuccess } from "./posts.actions";
import { initialState, postsAdapter, PostsState } from "./posts.states";

const _postsReducer = createReducer(
    initialState, 
    on(addPostSuccess, (state, action)=>{
    //     let post = {...action.post};
    //     post.id=(state.posts.length+1).toString();
    
    //     return{
    //        ...state,
    //        posts:[...state.posts, post]
    // };
    return postsAdapter.addOne(action.post,{...state, count:state.count+1});
}),

on(updatePostSuccess,(state,action)=>{
    // const updatePosts=state.posts.map(post=>{
    //     return action.post.id===post.id?action.post:post;
    // })
    // return{
    //     ...state,
    //     posts:updatePosts,
    // }
    return postsAdapter.updateOne(action.post,state);
}),

on(deletePostSuccess,(state,{id})=>{
//     const updatedPosts=state.posts.filter(post=>{
//         return post.id!==id;
//     });
    
//   return {
//     ...state,
//     posts:updatedPosts,
//   }
return postsAdapter.removeOne(id,state);
}),

on(loadPostsSuccess,(state,action)=>{
    // return {
    //     ...state,
    //     posts:action.posts,
    // }
   return postsAdapter.setAll(action.posts,{...state,count:state.count+1});
})

);

export function postsReducers(state: PostsState , action: Action){
    return _postsReducer(state,action);
}