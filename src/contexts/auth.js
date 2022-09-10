
import React, { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConnection';
import { toast } from 'react-toastify'

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        function loadStorage() {
            const storageUser = localStorage.getItem('@SistemaUser')
            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false)
            }
            setLoading(false)
        }

        loadStorage();

    }, [])

    async function signUp(email, password, nome) {
        setLoadingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;

                await firebase.firestore().collection('users')
                    .doc(uid).set({
                        nome: nome,
                        avatarUrl: null,
                    })
                    .then(() => {
                        let data = {
                            uid: uid,
                            nome: nome,
                            email: value.user.email,
                            avatarUrl: null,
                        };

                        setUser(data);
                        storageUser(data);
                        setLoadingAuth(false);
                        toast.dark(`Bem vindo a Plataforma | ${nome}`)
                    })
            })
            .catch((error) => {
                console.log(error);
                toast.error('Ops, Algo deu errado');
                setLoadingAuth(false);
            })
    }

    function storageUser(data) {
        localStorage.setItem('@SistemaUser', JSON.stringify(data));
    }

    async function signOut() {
        await firebase.auth().signOut();
        localStorage.removeItem('@SistemaUser')
        setUser(null);
        toast.dark(`Volte Sempre!!!`)
    }

    async function Logar(email, password) {
        setLoadingAuth(true);
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;

                const userProfile = await firebase.firestore().collection('users')
                    .doc(uid).get();

                let data = {
                    uid: uid,
                    nome: userProfile.data().nome,
                    avatarUrl: userProfile.data().avatarUrl,
                    email: value.user.email
                }

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.dark(`Bem vindo a Plataforma | ${userProfile.data().nome}`)

            })
            .catch((error) => {
                console.log(error)
                toast.error('Ops, Algo deu errado')
                setLoadingAuth(false)
            })
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                loading,
                signUp,
                signOut,
                Logar,
                loadingAuth,
                setUser,
                storageUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider