import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { AuthContext } from '../../contexts/auth'

function Logar() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signUp, loadingAuth } = useContext(AuthContext)

    function handleRegister(e) {
        e.preventDefault();

        if (nome !== '' && email !== '' && password !== '') {
            signUp(email, password, nome)

        }

    }

    return (
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt="Logo do sistema com um sinal de maior sendo uma seta pra direita e um sinal de menor sendo uma seta para a direita construindo a tag usada para programação" />
                </div>

                <form onSubmit={handleRegister}>
                    <h1>Cadastrar uma conta</h1>
                    <input type="text" placeholder="Digite seu nome: " value={nome} onChange={(e) => setNome(e.target.value)} />
                    <input type="text" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="***********" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type='submit'> {loadingAuth ? 'Carregando...' : 'Acessar'} </button>
                </form>

                <Link to="/">Já possui uma conta? Entre</Link>
            </div>
        </div>
    );
}

export default Logar;
