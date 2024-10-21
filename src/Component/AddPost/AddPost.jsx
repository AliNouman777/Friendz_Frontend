import React from "react";
import "./AddPost.css";
import {AsyncCreatePost} from "../../../Redux/AsyncSlice/Allpost"
import {useDispatch,useSelector} from "react-redux"
import toast, {Toaster} from 'react-hot-toast'; 
const AddPost = () => {
  const dispatch=useDispatch();

  const {loading}=useSelector((state)=>state.post);

  const [image, setimage]=React.useState("");
  const [caption, setcaption]=React.useState("");


  function handlefileChange(e){
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = () => {
      if(reader.readyState === 2){
        setimage(reader.result);
      }
    }
  

    reader.readAsDataURL(file);
  }


  const SubmitPost=(e)=>{
      e.preventDefault();
      dispatch(AsyncCreatePost({image,caption})).then((e)=>{
        setimage("");
        setcaption("");
        toast.success("Post Created Successfully");
      }).catch((err)=>{
          toast.error("Something went wrong");
      });
  }

  return (
    <>
      <section className="add-post" >
        <div className="container">
          <form  onSubmit={SubmitPost}>
            <h2>New Post</h2>

           {image && <img src={image} alt="image" />}

            <input 
            type="file"
            required
            onChange={handlefileChange}
            name="file" id="file" />

            <input
              type="text"
              name="caption"
              id="Captions"
              required
               value={caption}
              onChange={(e)=>setcaption(e.target.value)}
              placeholder="Caption"
            />

            <button
            disabled={loading}
            id="btn"
            className="btn">Create New Post</button>
          </form>
        </div>
      </section>
      <Toaster/>
    </>
  );
};

export default AddPost;
