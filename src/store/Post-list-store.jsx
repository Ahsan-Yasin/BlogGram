import { createContext, useReducer } from "react";
import { useEffect } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {}, 
});

const postListReducer = (currentPostList, action) => {
  switch (action.type) {
    case "DELETE-POST":
      return currentPostList.filter((post) => post.id !== action.payload.postId);
    case "ADD-POST":
      return [action.payload.newPost, ...currentPostList];
    case "SET-POSTS":
      return action.payload; // replace current list with fetched posts
    default:
      return currentPostList;
  }
};



const PostListProvider  = ({ children }) => { 
  const [postList, dispatchPosts] = useReducer(postListReducer, DEFAULT_POST_LIST);

const setPosts = (posts) => {
    dispatchPosts({ type: "SET-POSTS", payload: posts });
  };
  
  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to fetch posts:", err));
  }, []);


 
  const addPost = (post) => {
    const newPost = { id: Date.now().toString(), ...post };
    dispatchPosts({ type: "ADD-POST", payload: { newPost } });
  };

  const deletePost = async (postId) => { 
    try
    {  const res = await  fetch(`http://localhost:5000/posts/${postId}`,{ 
        method:'DELETE',
      }) ; 
        console.log(res); 
      const data = await res.json(); 
      
      if (res.ok && data.status === "deleted") {
        // Remove from frontend state only if backend succeeded 
          window.location.reload();
        dispatchPosts({ type: "DELETE-POST", payload: { postId } });
      } else {
        console.error("Failed to delete post:", data.error);
      }} 
      catch (error)
      { 
        console.log('ERROR WHILE DELETING : ', erro ); 
      }
  };

  return (
    <PostList.Provider value={{ postList, addPost, deletePost, setPosts }}>
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    title: "A Slow Morning",
    id: "1",
    body: "Waking up without an alarm, sipping tea near the window, journaling thoughts—slow mornings remind us that peace is a luxury we can create.",
    reactions: 10,
    userId: "user123",
    tags: ["#healing", "#mentalhealth", "#growth"],
  },
  {
    title: "Things That Spark Joy in My Daily Routine",
    id: "2",
    body:
      "Fresh stationery, lo-fi playlists, clean sheets, long walks, and laughing with my sibling. The little things add up to happiness.!",
    reactions: 50,
    userId: "user123",
    tags: ["#travel", "#bali", "#vacations", "#trip", "#fun"],
  },
];
 
export default PostListProvider;
