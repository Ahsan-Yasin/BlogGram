import { useRef, useContext } from "react";
import { PostList } from "../store/Post-list-store";

function CreatePost() {
  const { addPost } = useContext(PostList);

  const userIdRef = useRef();
  const titleRef = useRef();
  const bodyRef = useRef();
  const tagsRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: userIdRef.current.value,
      title: titleRef.current.value,
      body: bodyRef.current.value,
      tags: tagsRef.current.value.split(" "),
      reactions: 0,
    };  

    // 🔹 1. Update frontend state
    addPost(newPost);   /// will remove this later   

    try {
      // 🔹 2. Send to backend
      const response = await fetch("https://bloggram-production.up.railway.app/posts", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      const data = await response.json();
      console.log(" Saved on backend:", data);
    } catch (error) {
      console.error(" Error saving post:", error);
    }

    // 🔹 3. Clear form fields
    userIdRef.current.value = "";
    titleRef.current.value = "";
    bodyRef.current.value = "";
    tagsRef.current.value = "";

    alert("Posted!");
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h3 className="card-title mb-4">Create a New Post</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">User ID</label>
              <input type="text" ref={userIdRef} className="form-control" placeholder="Enter your ID" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Title</label>
              <input type="text" ref={titleRef} className="form-control" placeholder="Enter post title" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Body</label>
              <textarea ref={bodyRef} className="form-control" rows="4" placeholder="Write something..." required></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Tags (space-separated)</label>
              <input type="text" ref={tagsRef} className="form-control" placeholder="e.g. react javascript blog" />
            </div>

            <button type="submit" className="btn btn-primary w-100">Post</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
