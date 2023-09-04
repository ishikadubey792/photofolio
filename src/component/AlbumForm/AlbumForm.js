import styles from "./albumForm.module.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AlbumForm = ({addAlbum})=>{
    const [albumName , setAlbumName] = useState("");
    const create = ()=>{
        if(albumName.trim()===""){
            // alert('');
            toast.error('Please enter a valid name!!')
        }else {
            addAlbum(albumName);
            toast.success("album created successfully");
            clear();
        }
    }
    const clear = () =>{
            setAlbumName("");
    }
    const inputChange = (e) =>{
        setAlbumName(e.target.value);
    }

    return(
        <>
           <div className= {styles.form}>
               <h1 className={styles.title} >Create Album</h1>
               <input type="text" placeholder="Enter an album name..." value={albumName} onChange={inputChange} autoFocus/>
                <div className={styles.btn}>
                    <button onClick={clear}>Clear</button>
                    <button onClick={create}>Create</button>
                </div>  
           </div>
           <ToastContainer/>
        </>

    )    
}
export default AlbumForm;