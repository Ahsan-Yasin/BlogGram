import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Sidebar from './Components/Sidebar';
//import Post from './Components/Post';
import CreatePost from './Components/CreatePost';
import PostList from './Components/PostList';
import React, { useState } from 'react';
import PostListProvider from './store/Post-list-store';


function App() {

const [selectedTab,setSelectedTab]=useState("Home"); // by default home page

  return (
    <>
    <PostListProvider>
      <Header /> 
      <div className="app">
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
        <div className="content">
          {selectedTab==="Home"?(
            <PostList/>
          ):(<CreatePost/>)
}
           
          
         
          <Footer />
        </div>
      </div>
      </PostListProvider>
    </>
  );
}

export default App;
