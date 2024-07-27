import { auth, db, storage, onAuthStateChanged, signOut, getDoc, doc, getDocs, collection,updateDoc, arrayUnion, arrayRemove  } from "./utills/utills.js"
// console.log("auth=>",auth);
// console.log("db=>",db);
// console.log("storage=>",storage);

const logout_btn = document.getElementById("logout_btn")
const my_events = document.getElementById("my_events")
const create_events = document.getElementById("create_events")
const profile_img = document.getElementById("profile_img")
const login_auth = document.getElementById("login_auth")
const events_cards_container = document.getElementById("events_cards_container")


getAllEvents()
onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      profile_img.style.display="inline-block"
      login_auth.style.display="none"
      getUserInfo(uid)
      logout_btn.style.display = "block"
      my_events.style.display = "block"
      create_events.style.display = "block"

      // ...
    } else {
      //  window.location.href = '/login/index.html'
      profile_img.style.display="none"
      login_auth.style.display="block"
      logout_btn.style.display = "none"
      my_events.style.display = "none"
      create_events.style.display = "none"
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
  
  async function getAllEvents() {
    try {
      const querySnapshot = await getDocs(collection(db, "events"));
      events_cards_container.innerHTML = " "
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        const event = doc.data()
        console.log("event=>",event);

        const {banner,category,Name,createdByEmail,price} = event

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
             onclick="likeEvent(this)"
              class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
              >
              ${auth?.currentUser && event?.likes?.includes(auth?.currentUser.uid)
                ?"ADDED"
                :"Add to Cart"}
              
            </button>
          </div>
        </div>
      </div> `
      window.likeEvent = likeEvent
      events_cards_container.innerHTML += card

});
  
}catch(err){
  alert(err)
}
}

async function likeEvent(e) {
  e.disabled = true
  console.log(e.innerText);
  if(auth.currentUser){
    const docRef = doc(db, "events", e.id)
    if(e.innerText == "ADDED"){
    
    updateDoc(docRef , {
      likes:arrayRemove(auth.currentUser.uid),
     }).then(()=>{
      e.innerText = "Add to Cart"
      e.disabled = false
    })
    .catch((err)=> console.log(err));
    
  }else{
    
    
    updateDoc(docRef , {
      likes:arrayUnion(auth.currentUser.uid),
    }).then(()=>{
      e.innerText = "ADDED"
      e.disabled = false
    })
    .catch((err)=> console.log(err));
    
    }

  }else{
    window.location.href = "login/index.html"
  }
  
}