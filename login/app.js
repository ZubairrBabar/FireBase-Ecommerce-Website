import {auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword} from '../utills/utills.js'
 
 
          const signup_btn = document.getElementById("signup_btn")
          const login_foam = document.getElementById("login_foam")
 
 
          login_foam.addEventListener('submit',function (e) {
             e.preventDefault()
             console.log(e);
             
             const email = e.target[0].value
             const password = e.target[1].value

             console.log(email);
             console.log(password);

             signInWithEmailAndPassword(auth, email, password).then(()=>{
               window.location.href="/"
   
             }).catch((err)=>alert(err))
          }) 
