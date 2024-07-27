import { auth, db, storage, onAuthStateChanged, signOut, getDoc, doc, getDocs, collection,updateDoc, arrayUnion, arrayRemove , query, where, deleteDoc } from "../utills/utills.js"
// console.log("auth=>",auth);
// console.log("db=>",db);
// console.log("storage=>",storage);

const logout_btn = document.getElementById("logout_btn")
const profile_img = document.getElementById("profile_img")
const login_auth = document.getElementById("login_auth")
const events_cards_container = document.getElementById("events_cards_container")



onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      profile_img.style.display="inline-block"
      login_auth.style.display="none"
    
      getUserInfo(uid)
      getMyEvents(uid)
      // ...
    } else {
    //  window.location.href = '/login/index.html'
      profile_img.style.display="none"
      login_auth.style.display="block"
      
    }
  });

  
  logout_btn.addEventListener("click",()=>{
    signOut(auth)
  })

  function getUserInfo(uid){
    const userRef = doc(db,"usersss", uid)
    getDoc(userRef).then((data)=>{
      // console.log("data=>" , data.id);
      // console.log("data=>" , data.data());
      profile_img.src = data.data().image
    })
  }
  
  async function getMyEvents(uid) {
    try {
      const q = query(collection(db, "events"), where("createdBy", "==", uid));
      const querySnapshot = await getDocs(q);
      events_cards_container.innerHTML = " "
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        const event = doc.data()
        // console.log("event=>",event);

        const {banner,category,Name,price,createdByEmail,createdBy} = event

        const card = ` 
       <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src="${banner}"
          alt="Event Image"
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h2 class="text-xl font-bold mb-2">${category}</h2>
          <p class="text-gray-600 mb-2"><b>${Name}</b>  </p>
          <p class="text-gray-600 mb-2"><b>Price :  ${ price} </b> </p>
          
          <div class="flex justify-between items-center">
          <button id="${doc.id}"
          onclick="DeleteEvent(this)"
          class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 "
           style=" width: 100%; background-color:  rgb(9, 116, 80); height: 50px; font-weight: bold; ">
          delete
          </button>
          </div>

        </div>
      </div> `
     window.DeleteEvent = DeleteEvent
      events_cards_container.innerHTML += card

});
  
}catch(err){
  alert(err)
}
}

async function DeleteEvent(e) {
  console.log(e);
  e.innerText = "please wait"
  const docRef = doc(db, "events", e.id)
  await deleteDoc(docRef)
  e.innerText = "delete"
  getMyEvents(auth.currentUser.uid)
}
