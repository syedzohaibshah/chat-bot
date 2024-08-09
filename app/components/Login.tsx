'use client'
import  { useState } from 'react'
import { createUserWithEmailAndPassword,  signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebase/firebase'
import { useRouter } from 'next/navigation'
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSignUpActive, setisSignUpActive] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    function handleSignUp() {
        if (!email || !password) {
            setError('Email and Password both are required')
            return
        }
        createUserWithEmailAndPassword(auth,email,password )
        .then((userCredentials)=>{
            const user = userCredentials.user
            console.log(user);
            alert('Account created')
        })
        .catch((error)=>{
            const errorCode= error.errorcode
            const errorMessage = error.message
            setError(errorMessage)
            console.log(errorCode,errorMessage);
        })
    }

    function handleSignIn() {
        if (!email || !password) {
            setError('Email and Password both are required')
            return
        }
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredentials)=>{
            const user = userCredentials.user
            console.log(user);
            router.push('/landingPage')
        })
        .catch((error)=>{
            const errorCode= error.errorcode
            const errorMessage = error.message
            setError(errorMessage)
            console.log(errorCode,errorMessage);
        })
        
    }

    function handleMethodChange() {
        setisSignUpActive(!isSignUpActive)
    }
  return (
    <>
    <form>
        {isSignUpActive && <legend><u>Sign Up</u></legend>}
        {!isSignUpActive && <legend><u>Sign In</u></legend>}
        <fieldset>
            <ul>
                <li>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' onChange={(e)=>setEmail(e.target.value)} />
                </li>
                <li>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' onChange={(e)=>setPassword(e.target.value)}/>
                </li>
            </ul>
            {isSignUpActive && (
                <button type='button' onClick={handleSignUp}>Sign Up</button>
            )}
            {!isSignUpActive && (
                <button type='button' onClick={handleSignIn}>Sign In</button>
            )}
        </fieldset>
        {error && <p id='error-message'>{error}</p>}
        {isSignUpActive && <a onClick={handleMethodChange}>Already have an account? <span>Sign In</span> </a>}
        {!isSignUpActive && <a onClick={handleMethodChange}>Do not have an account? <span>Sign Up</span> </a>}
    </form>
    </>
  )
}

export default Login
