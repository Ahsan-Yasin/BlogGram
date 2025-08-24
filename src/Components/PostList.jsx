import Post from "./Post";
import { useContext } from "react";
//import PostListContext from "../store/Post-list-store";
import { PostList as PostListContext } from "../store/Post-list-store";

function PostList() {
  const { postList } = useContext(PostListContext);
 
  return (
    <div className="container mt-4">
      <div className="row">
        {postList.map((post) => ( 
          <div className="col-12 d-flex justify-content-center mb-4" key={post.id}>
           <Post post={post} />
          </div>
        ))} 
      </div> 
    </div>
  );
}

export default PostList;
