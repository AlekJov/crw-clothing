import { useState} from "react";
import './sign-up-form.styles.scss'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";


const defaultformFields ={
    displayName:'',
    email:'',
    password:'',
    confirmPassword:'',
}


const SignUpForm = () =>{
  
   const[formFields, setFormFields] = useState(defaultformFields);
   const {displayName,email,password,confirmPassword} = formFields;

   

   const resetFormFields = () =>{
      setFormFields(defaultformFields);
   }

   const handleSubmit = async (event)=>{
    event.preventDefault();
    if(password !== confirmPassword){
        alert ('password do not match');
        return
    }
    try{
       const {user} = await createAuthUserWithEmailAndPassword(email,password);
      
       await createUserDocumentFromAuth(user,{displayName});
       resetFormFields();
       
    }catch (error){
        if(error.code === 'auth/email-already-in-use'){
            alert('Cannot create user,email already in use');
        }else{
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
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput label='Name' type='text' required onChange={handleChange} name='displayName' value={displayName}/>

                
                <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email}/>

                <FormInput label= 'Password' type='password' onChange={handleChange} required name='password' value={password}/>

                <FormInput label='Confirm Password' type='password'  required onChange={handleChange} name='confirmPassword' value={confirmPassword}/>
                <Button byttonType="google" type="submit">Sign UP</Button>
            </form>
        </div>
    )
}

export default SignUpForm;