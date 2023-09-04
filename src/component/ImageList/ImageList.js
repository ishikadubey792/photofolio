import { useEffect, useState } from "react";
import { setDoc , addDoc, collection , doc , onSnapshot , deleteDoc} from "firebase/firestore";
import { db } from "../../FirebaseInit";
import backImg from "./backImg.png";
import styles from "./imageList.module.css";
import edit from "./editIcon.png";
import deleteImg from "./deleteIcon.png";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ImageList = ({albumId, back})=>{
   const [url , setUrl] = useState("");
   const [name , setName] = useState("");
   const [image , setImg] = useState([]);
   const [form , setForm] = useState(false);
   const [imageId , setImageId] = useState(null);

   const addImg = async ()=>{
    try{
        if(imageId){
           await setDoc(doc(db,'images', imageId), {
               albumId , 
               name ,
               url 
         }); 
         toast.success('Image edited successfully');
         clearInput();
        } else {
          await addDoc(collection(db,'images'), {
             albumId, 
             name,
             url 
         }); 
         toast.success('Image added succesfully');
         clearInput();
        }
    } catch(error){
        console.log(error);
    }
 }


   useEffect(()=>{
    const unsubscribe = onSnapshot(collection(db, 'images'), (querySnapshot) => {
        const imageData = querySnapshot.docs.filter((doc) =>
            doc.data()
                .albumId === albumId)
            .map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
        setImg(imageData)
    })
    return () => {
        unsubscribe();
    }
   },[albumId])
   const  newImg = () =>{
      setForm((prev)=> !prev);
      setImageId(null);
   }

   
   const dltImg = async (imageId) =>{
        const docRef =  doc(db,'images',imageId);
        await deleteDoc(docRef);
        toast.error('image deleted successfully');
   }
   const clearInput = ()=>{
        setUrl("");
        setName("");
        setImageId(null);
   }

   const editImg = (imag)=>{
       setName(imag.name);
       setUrl(imag.url);
       setImageId(imag.imageId);
       setForm(true);
       
   }

     return(
        <>
            {form && (<div className={styles.addImg}>
                <h1>Add Image</h1>
                 <input type="text" placeholder="Title" value={name} required onChange={(e)=>setName(e.target.value)} autoFocus/>
                 <input type="text" placeholder="Image Url" value={url} required onChange={(e)=>setUrl(e.target.value)} autoFocus/>
                 <div className={styles.btn}>
                    <button onClick={clearInput}>Clear</button>
                    <button onClick={addImg}>Create</button>
                </div> 
            </div>) }
            <div className={styles.imgList}>
              <img onClick={back} src={backImg} alt="gotohomepage"/>
               <h1>{image.length===0 ? "No Images in Album " : "Images in Album"}</h1>
               <button onClick={newImg}>{form ? "Cancel" : "Add image" }</button>
            </div>
            <div>
                {image.map((ig)=>(
                  <div key={ig.id} className={styles.showImg}>
                    <div className={styles.button}>
                    <img onClick={()=>editImg(ig)} src={edit} alt="edit" className={styles.edit}/>
                    <img onClick={()=> dltImg(ig.id)} src={deleteImg} alt="deleteIcon" className={styles.delete}/>
                    </div>
                    <div className={styles.imgDiv}><img src={ig.url} alt="img" className={styles.photo}/></div>
                    <h3>{ig.name}</h3>
                  </div>
                ))}
            </div>

            <ToastContainer/>
        </>
     )
}
export default ImageList;