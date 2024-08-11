'use client'
import  { useState } from 'react'
import { createUserWithEmailAndPassword,  signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebase/firebase'
import { useRouter } from 'next/navigation'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSignUpActive, setisSignUpActive] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    function handleSignUp() {
        if (!email || !password) {
            setError('Email and Password both are required')
            return
        }
        setLoading(true);
        createUserWithEmailAndPassword(auth,email,password )
        .then((userCredentials)=>{
            const user = userCredentials.user
            console.log(user);
            alert('Account created')
            setLoading(false)
        })
        .catch((error)=>{
            const errorCode= error.errorcode
            const errorMessage = error.message
            setError(errorMessage)
            console.log(errorCode,errorMessage);
            setLoading(false)
        })
    }

    function handleSignIn() {
        if (!email || !password) {
            setError('Email and Password both are required')
            return
        }
        setLoading(true)
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
            setLoading(false)
        })
        
    }

    function handleMethodChange() {
        setisSignUpActive(!isSignUpActive)
    }
  return (
    <>
            {loading && (
                <div className="overlay">
                    <div className="loader" style={{display:'flex',justifyContent:'center',marginTop:'20%',fontSize:'30px',fontWeight:'bold'}}>Loading...</div>
                </div>
            )}
            {!loading && (
                <form className='form'>
                    {isSignUpActive ? <legend><u>Sign Up</u></legend> : <legend><u>Sign In</u></legend>}
                    <fieldset>
                        <ul>
                            <li>
                                <label className='label' htmlFor="email">Email</label>
                                <MdEmail style={{ fontSize: '22px', marginLeft: 5 }} />
                                <input className='input' type="email" id='email' onChange={(e) => setEmail(e.target.value)} />
                            </li>
                            <li>
                                <label className='label' htmlFor="password">Password</label>
                                <RiLockPasswordFill style={{ fontSize: '22px', marginLeft: 5 }} />
                                <input className='input' type="password" id='password' onChange={(e) => setPassword(e.target.value)} />
                            </li>
                        </ul>
                        {isSignUpActive && <button type='button' className='btn' onClick={handleSignUp}>Sign Up</button>}
                        {!isSignUpActive && <button type='button' className='btn' onClick={handleSignIn}>Sign In</button>}
                    </fieldset>
                    {error && <p id='error-message'>{error}</p>}
                    {isSignUpActive ? (
                        <a onClick={handleMethodChange}>Already have an account? <span>Sign In</span> </a>
                    ) : (
                        <a onClick={handleMethodChange}>Do not have an account? <span>Sign Up</span> </a>
                    )}
                </form>
            )}
        </>
  )
}

export default Login

// 'use client'
// import { useState } from 'react';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebase/firebase';
// import { useRouter } from 'next/navigation';
// import { MdEmail } from 'react-icons/md';
// import { RiLockPasswordFill } from 'react-icons/ri';

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [isSignUpActive, setIsSignUpActive] = useState(false);
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);  // Loading state added
//     const router = useRouter();

//     function handleSignUp() {
//         if (!email || !password) {
//             setError('Email and Password both are required');
//             return;
//         }
//         setLoading(true);  // Start loading
//         createUserWithEmailAndPassword(auth, email, password)
//             .then((userCredentials) => {
//                 const user = userCredentials.user;
//                 console.log(user);
//                 alert('Account created');
//                 setLoading(false);  // Stop loading after account creation
//             })
//             .catch((error) => {
//                 const errorMessage = error.message;
//                 setError(errorMessage);
//                 console.log(error.code, errorMessage);
//                 setLoading(false);  // Stop loading if there's an error
//             });
//     }

//     function handleSignIn() {
//         if (!email || !password) {
//             setError('Email and Password both are required');
//             return;
//         }
//         setLoading(true);  // Start loading
//         signInWithEmailAndPassword(auth, email, password)
//             .then((userCredentials) => {
//                 const user = userCredentials.user;
//                 console.log(user);
//                 router.push('/landingPage');
//             })
//             .catch((error) => {
//                 const errorMessage = error.message;
//                 setError(errorMessage);
//                 console.log(error.code, errorMessage);
//                 setLoading(false);  // Stop loading if there's an error
//             });
//     }

//     function handleMethodChange() {
//         setIsSignUpActive(!isSignUpActive);
//     }

//     return (
//         <>
//             {loading && (
//                 <div className="overlay">
//                     <div className="loader" style={{display:'flex',justifyContent:'center',marginTop:'20%',fontSize:'30px', fontWeight:'bold'}}>Loading...</div>
//                 </div>
//             )}
//             {!loading && (
//                 <form className='form'>
//                     {isSignUpActive ? <legend><u>Sign Up</u></legend> : <legend><u>Sign In</u></legend>}
//                     <fieldset>
//                         <ul>
//                             <li>
//                                 <label className='label' htmlFor="email">Email</label>
//                                 <MdEmail style={{ fontSize: '22px', marginLeft: 5 }} />
//                                 <input className='input' type="email" id='email' onChange={(e) => setEmail(e.target.value)} />
//                             </li>
//                             <li>
//                                 <label className='label' htmlFor="password">Password</label>
//                                 <RiLockPasswordFill style={{ fontSize: '22px', marginLeft: 5 }} />
//                                 <input className='input' type="password" id='password' onChange={(e) => setPassword(e.target.value)} />
//                             </li>
//                         </ul>
//                         {isSignUpActive && <button type='button' className='btn' onClick={handleSignUp}>Sign Up</button>}
//                         {!isSignUpActive && <button type='button' className='btn' onClick={handleSignIn}>Sign In</button>}
//                     </fieldset>
//                     {error && <p id='error-message'>{error}</p>}
//                     {isSignUpActive ? (
//                         <a onClick={handleMethodChange}>Already have an account? <span>Sign In</span> </a>
//                     ) : (
//                         <a onClick={handleMethodChange}>Do not have an account? <span>Sign Up</span> </a>
//                     )}
//                 </form>
//             )}
//         </>
//     );
// };

// export default Login;
