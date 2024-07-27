import {auth,
   createUserWithEmailAndPassword,
     doc, 
     setDoc,
      ref,
      storage,
       uploadBytes,
         getDownloadURL,
      db} from '../utills/utills.js'


         const signup_btn = document.getElementById("signup_btn")
         const signup_foam = document.getElementById("signup_foam")


         signup_foam.addEventListener('submit',function (e) {
            e.preventDefault()
            console.log(e);
            
            const image = e.target[0].files[0]
            const email = e.target[1].value
            const password = e.target[2].value
            const firstName = e.target[4].value
            const lastName = e.target[5].value
            const phoneNumber = e.target[6].value
            const company = e.target[7].value
            console.log(image)
         
            const userInfo = {
               image,
               email,
               password,
               firstName,
               lastName,
               phoneNumber,
               company
            }
            console.log(userInfo);
            

            signup_btn.innerText = "please wait"
            signup_btn.disabled = "true"
            createUserWithEmailAndPassword(auth, email, password)
            .then((user)=>{
               console.log("user=>", user.user.uid);

               const userRef = ref(storage , `user/${user.user.uid}`)
               uploadBytes( userRef,image )
               .then(()=>{
                  console.log("user is logged");

                  getDownloadURL(userRef)
                  .then((url)=>{
                     console.log("url agya bbhaiyo=>", url);
                     userInfo.image = url
                 
                     const userDbRef = doc(db,"usersss",user.user.uid)

                     setDoc(userDbRef, userInfo ).then(()=>{
                        console.log("user object updated info");
                        window.location.href ="/"
                        signup_btn.innerText = "submit"
            signup_btn.disabled = "false"


                     })


                  }).catch((err)=> {console.log("err agya",err)
                      signup_btn.innerText = "submit"
                      signup_btn.disabled = "false"



                  })

               }).catch(()=>{console.log()
                   signup_btn.innerText = "submit"
                   signup_btn.disabled = "false"



               })

            }).catch((err)=>{alert(err)
                signup_btn.innerText = "submit"
            signup_btn.disabled = "false"


            })
            


         })