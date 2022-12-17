import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "src/app/store/router/custom-serializer";
import { getCurrentRoute } from "src/app/store/router/router.selector";
import { postsAdapter, PostsState } from "./posts.states";


export const POST_STATE_NAME = 'posts';
const getPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const postsSelector=postsAdapter.getSelectors();

export const getPosts=createSelector(
    getPostsState,
    postsSelector.selectAll
);
  //  return state.posts;
//);
export const getPostEntities=createSelector(
    getPostsState,
    postsSelector.selectEntities

 );

export const getPostById= createSelector(
    getPostEntities,
    getCurrentRoute,
     (posts, route:RouterStateUrl)=>{
        debugger;
   // console.log(props);
  // const post = state.posts.find((post: { id: any; })=>post.id===props.id);
   return posts? posts[route.params['id']]:null;
});



export const getCount=createSelector(getPostsState,(state)=>state.count);