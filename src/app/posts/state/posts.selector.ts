import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostsState } from "./posts.states";

const getPostsState=createFeatureSelector<PostsState>('posts');

export const getPosts=createSelector(getPostsState,(state)=>{
    return state.posts;
});

export const getPostById= createSelector(getPostsState, (state: { posts: any[]; }, props: { id: any; })=>{
    console.log(props);
   const post = state.posts.find((post: { id: any; })=>post.id===props.id);
   return post;
})