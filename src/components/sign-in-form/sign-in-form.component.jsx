import { useState,} from "react";
import './sign-in-form.styles.scss'
import { signInWtihGooglePopup, createUserDocumentFromAuth,signinAuthUserWithEmailAndPassword,signOutUser } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";


const defaultformFields ={
    
    email:'',
    password:'',
    
}


const SignInForm = () =>{
  
   const[formFields, setFormFields] = useState(defaultformFields);
   const {email,password} = formFields;



   const resetFormFields = () =>{
      setFormFields(defaultformFields);
   }

   const signInWithGoogle = async () => {
        
     await signInWtihGooglePopup()
   
    
    
}


   const handleSubmit = async (event)=>{
    event.preventDefault();
   
    try{
     await signinAuthUserWithEmailAndPassword(email,password)
        
        resetFormFields();
    }catch (error){
        switch(error.code){
            case 'auth/wrong-password':
                alert('incorrect password for email');
                break
            case 'auth/user-not-found':
                alert('no user associated with this email'); 
                break;
                default:
                    console.log(error)  
        }
       
    }
    
   }
  

   const handleChange = (event)=>{
    {
        const{name,value} = event.target;
        setFormFields({...formFields,[name]:value})
    }
   }

    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                
               
                
                <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email}/>

                <FormInput label= 'Password' type='password' onChange={handleChange} required name='password' value={password}/>

               <div className="buttons-container">
               <Button type="submit">Sign In</Button>
                <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>GoogleSign In</Button>
               </div>
              
            </form>
        </div>
    )
}

export default SignInForm;