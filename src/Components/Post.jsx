import { useContext } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PostList } from "../store/Post-list-store";

function Post({ post }) {
  const { deletePost } = useContext(PostList);

  return ( 
    <div className="card postCard" style={{ width: "40rem" }}>
      <div className="card-body">
        <h5 className="card-title">  
          {post.title}{" "}
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            onClick={() => deletePost(post.userId)}
            style={{ cursor: "pointer" }}
          >
            <RiDeleteBin6Line />
          </span>
        </h5>
        <p className="card-text">{post.body}</p>

        {post.tags?.map((tag, index) => (
          <span key={index} className="badge hashtag me-1">
            {tag}
          </span>
        ))}  

        <div className="alert alert-success reactions mt-3" role="alert">
          Reacted By: {post.reactions} People.
        </div>
      </div>
    </div>
  );
}

export default Post;
