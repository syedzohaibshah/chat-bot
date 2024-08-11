"use client"
import React from 'react';
import LandingPage from '../components/LandingPage'
import ProtectedRoute from '../components/ProtectedRoute'
import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase'
import { onAuthStateChanged, User } from 'firebase/auth';

const LandingPageWrapper: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setIsFetching(false);
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

export default LandingPageWrapper;