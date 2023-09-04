import { useEffect, useState } from "react";
import styles from "./AlbumList.module.css";
import icon from './icon.png';
import {db} from "../../FirebaseInit";
import { addDoc , collection, deleteDoc , doc ,getDocs} from "firebase/firestore";
import AlbumForm from "../AlbumForm/AlbumForm";
import ImageList from "../ImageList/ImageList";
import deleteIcon from './deleteIcon.png';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AlbumList = ()=>{
      // Declare a new state variable, which we'll call album
      const [albumName , setAlbumName] = useState("");
      const [album , setAlbum] = useState([]);
      const [showForm , setShowForm] = useState(false);
      const [albumId , setAlbumId] = useState(null);

      const fetchAlbum = async ()=>{
            const querySnapshot = await getDocs(collection(db, 'album'))
            const albumData = [];
            querySnapshot.forEach((doc) => {
                albumData.push({id: doc.id, name: doc.data().name});
            });
            setAlbum(albumData);
      }
      useEffect(()=>{
           fetchAlbum();
      },[]);

      const addAlbum = async (name)=>{
           try{
              const docRef = await addDoc(collection(db,'album'), {
                  name: name,
              }); 
              setAlbumName(name);
              fetchAlbum();
           } catch(error){
               console.log(error);
           }
      }
      const removeAlbum = async (id) =>{
          const docRef =  doc(db,'album',id);
          await deleteDoc(docRef);
          toast.success('album deleted successfully');
      }
      const newAlbum = () =>{
           setShowForm((prev)=> !prev);
      }
    const back = ()=>{
        setAlbumId(null);
    }
      const openAlbum = (albumId)=>{
          setAlbumId(albumId);
          setShowForm(false);
      }

     return(
       <>
           {showForm && <AlbumForm addAlbum={addAlbum}/>}
           {!albumId && (<div className={styles.head}>
                <h1>Your Album </h1>
                <button onClick={newAlbum}>{showForm ? "Cancel" : "Add Album" }</button>
           </div>)}
           
            {!albumId && album.length>0 && (<div className={styles.list}>
              {album.map((album) => 
                <div key={album.id} className={styles.album}>
                   <img onClick={()=>removeAlbum(album.id)} src={deleteIcon} alt="deleteImg" className={styles.deleteIcon}/>
                   <img onClick={()=>openAlbum(album.id)} src={icon} alt="icon" className={styles.icon}/>
                   <h4>{album.name}</h4>
               </div>)} 
           </div>)}

           {albumId && (<ImageList albumId={albumId} back={back}/>)}
           <ToastContainer/>
       </>
     )
}
export default AlbumList;