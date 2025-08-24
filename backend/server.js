const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Post = require("./schema");
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({ origin: ["http://localhost:5173" ,"https://blog-gram-lovat.vercel.app"]})); // allow frontend
app.use(express.json());
mongoose.connect("mongodb+srv://ahsan:ahsan123@cluster0.yvr1heo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));
// this will recive all get requests means getting data from backend 

 

app.get("/posts",async  (req, res) => {   

  try {
    const posts = await Post.find(); // fetch all documents
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  } 
}); 
//this will deal with posting data :
app.post("/posts",async  (req, res) => {
  console.log("Received:", req.body);
  try 
  {  
    const newPost = new Post(req.body); // create document
    await newPost.save();               // save to MongoDB
    res.status(200).json({ status: "ok", savedPost: newPost });

  }
  catch(error)
  { 
    console.log("ERROR WHILE INSERTING INTO DATABASE ",error);
   return res.status(500).json({ error: "Failed to save post" });
  }
  
}); 
// Update reactions by ID
app.put("/api/posts/:id/reactions", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { reactions: 1 } }, // increment reactions
      { new: true }
    );
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
  }
}); 
// Delete a post 
app.delete("/posts/:userId", async (req, res) => {
  try { 
    console.log('REQ TO DELET ERECUVED ')
    const result = await Post.deleteOne({ userId: req.params.userId }); 
    console.log(result);
    return res.json({ status: "deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  } 
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
