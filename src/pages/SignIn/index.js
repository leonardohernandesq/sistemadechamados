import './signin.css';
import React, { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/auth';
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

function SignIn() {

    const { Logar, loadingAuth } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin(e) {
        e.preventDefault();

        if (email !== '' && password !== '') {
            Logar(email, password);
        }
    }

    return (
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt="Logo do sistema com um sinal de maior sendo uma seta pra direita e um sinal de menor sendo uma seta para a direita construindo a tag usada para programação" />
                </div>

                <form onSubmit={handleLogin}>
                    <h1>Entrar</h1>
                    <input type="text" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="***********" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type='submit'> {loadingAuth ? 'Carregando...' : 'Acessar'} </button>
                </form>

                <Link to="/register">Criar uma conta</Link>
            </div>
        </div>
    );
}

export default SignIn;
