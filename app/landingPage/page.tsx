"use client"
import LandingPage from '../components/LandingPage'
import ProtectedRoute from '../components/ProtectedRoute'
import { useState, useEffect } from 'react';
import {auth} from '../firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth';

const LandingPageWrapper = () => {
    const [user, setUser] = useState(null);
  const [isFetching, setisFetching] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setisFetching(false);
        return;
      }
      setUser(null);
      setisFetching(false);
    });
    return () => unSubscribe();
  }, []);

  if (isFetching) {
    return <h2>Loading...</h2>;
  }

  return (
    <ProtectedRoute user={user}>
      <LandingPage />
    </ProtectedRoute>
  )
}

export default LandingPageWrapper

