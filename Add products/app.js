
import {ref,storage,uploadBytes,getDownloadURL, db, collection, addDoc, auth} from '../utills/utills.js'
console.log(auth);
const event_form = document.getElementById("event_form")
const Add_btn = document.getElementById("Add_btn")

event_form.addEventListener("submit",(e)=>{
    
    e.preventDefault()
console.log(e); 

const eventInfo = {
    banner : e.target[0].files[0],
    category : e.target[1].value,
    Name : e.target[2].value,
    price : e.target[3].value,
    createdBy : auth.currentUser.uid,
    createdByEmail : auth.currentUser.email,
    likes : [],
}
console.log(eventInfo);

const imgRef = ref (storage, eventInfo.banner.name);
uploadBytes(imgRef,eventInfo.banner).then(()=>{
    console.log("file upload done");

    getDownloadURL(imgRef).then((url)=>{
       console.log("url agya=>",url);
       eventInfo.banner=url

       const eventCollection = collection(db, "events");
       addDoc(eventCollection,eventInfo).then(()=>{
        console.log("Document Added");
        window.location.href = "/"
       })
    })

})
})