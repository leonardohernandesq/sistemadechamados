import './header.css';
import React, { useContext } from 'react';
import avatar from '../../assets/avatar.png';
import { AuthContext } from '../../contexts/auth';
import { FiHome, FiUser, FiSettings, FiXCircle } from 'react-icons/fi'
import { Link } from 'react-router-dom';

export default function Header() {
    const { user, signOut } = useContext(AuthContext);
    return (
        <div className='sidebar'>
            <div>
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt={'Foto de Perfil do usuário'} />
            </div>

            <Link to="/dashboard">
                <FiHome size={24} />
                Chamados
            </Link>

            <Link to="/customers">
                <FiUser size={24} />
                Clientes
            </Link>

            <Link to="/profile">
                <FiSettings size={24} />
                Configurações
            </Link>

            <button className='btn-logout' onClick={() => signOut()}>
                <FiXCircle size={24} />
                Sair
            </button>
        </div>
    );
}