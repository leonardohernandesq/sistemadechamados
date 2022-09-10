import './new.css'
import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { AuthContext } from '../../contexts/auth'
import firebase from '../../services/firebaseConnection'
import { useHistory, useParams } from 'react-router-dom'

import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function New() {
    const { id } = useParams()
    const history = useHistory();
    const { user } = useContext(AuthContext);

    const [assunto, setAssunto] = useState('Suporte')
    const [status, setStatus] = useState('Aberto')
    const [complemento, setComplemento] = useState('')

    const [customers, setCustomers] = useState([])
    const [loadCustomers, setLoadCustomers] = useState(true)
    const [customerSelected, setCustomerSelected] = useState(0)

    const [idCustomer, setIdCustomer] = useState(false)
    const [titulo, setTitulo] = useState('')

    useEffect(() => {
        async function loadCustomers() {
            await firebase.firestore().collection('customers')
                .get()
                .then((snapshot) => {

                    let lista = [];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            nomeFantasia: doc.data().nomeFantasia
                        })
                    })

                    if (lista.length === 0) {
                        toast.warning('Nenhuma Empresa Encontrada')
                        setCustomers([{ id: '1', nomeFantasia: 'Opção Nula' }])
                        setLoadCustomers(false);
                        return;
                    }

                    setCustomers(lista);
                    setLoadCustomers(false);

                    if (id) {
                        loadId(lista);
                    }

                })
                .catch((error) => {
                    toast.error('Ops... Ocorreu algum erro!')
                    setCustomers([{ id: '1', nomeFantasia: 'Opção Nula' }])
                    setLoadCustomers(false);
                })
        }

        function alterandoTitulo() {
            if (id) {
                setTitulo('Alterando Chamado')
            } else {
                setTitulo('Criando Chamado')
            }
        }

        alterandoTitulo();
        loadCustomers();
    }, [id]);

    async function loadId(lista) {
        await firebase.firestore().collection('called').doc(id)
            .get()
            .then((snapshot) => {
                setAssunto(snapshot.data().assunto)
                setStatus(snapshot.data().status)
                setComplemento(snapshot.data().complemento)

                let index = lista.findIndex(item => item.id === snapshot.data().clienteId);
                setCustomerSelected(index);
                setIdCustomer(true);
            })
            .catch((err) => {
                toast.error('Erro no item consultado...')
                setIdCustomer(false);
            })
    }

    //Registra um novo chamado
    async function handleRegisterNew(e) {
        e.preventDefault();

        if (idCustomer) {
            await firebase.firestore().collection('called')
                .doc(id)
                .update({
                    cliente: customers[customerSelected].nomeFantasia,
                    clienteId: customers[customerSelected].id,
                    assunto: assunto,
                    status: status,
                    complemento: complemento,
                    userId: user.uid
                })
                .then(() => {
                    toast.success('Chamado alterado com sucesso!')
                    setCustomerSelected(0);
                    setComplemento('');
                    history.push('/dashboard');
                })
                .catch(() => {
                    toast.error('Ops... Erro ao registrar, tente mais tarde.')
                })

            return;
        }

        await firebase.firestore().collection('called')
            .add({
                created: new Date(),
                cliente: customers[customerSelected].nomeFantasia,
                clienteId: customers[customerSelected].id,
                assunto: assunto,
                status: status,
                complemento: complemento,
                userId: user.uid
            })
            .then(() => {
                toast.success('Chamado criado com sucesso!')
                setComplemento('');
                setCustomerSelected(0);
            })
            .catch((err) => {
                toast.error('Ocorreu um erro no cadastro.')
            })
    }

    //Troca o select de assunto conforme o usuário interagir
    function handleChangeSelect(e) {
        setAssunto(e.target.value)
    }

    //troca as opções do radio conforme o usuário interagir
    function handleOptionChange(e) {
        setStatus(e.target.value)
    }

    //Troca o complemento conforme preenchido
    function handleComplemento(e) {
        setComplemento(e.target.value)
    }

    //Chamado no Select ao trocar de cliente
    function handleChangeCustomers(e) {
        setCustomerSelected(e.target.value)
    }

    return (
        <div>
            <Header />
            <div className='content'>
                <Title name={titulo}>
                    <FiPlus size={25} />
                </Title>


                <div className='container '>
                    <form className='form-profile' onSubmit={handleRegisterNew}>
                        <label>Clientes</label>

                        {loadCustomers ? (
                            <input type='text' disabled={true} value="Carregando..." />
                        ) : (
                            <select value={customerSelected} onChange={handleChangeCustomers}>
                                {customers.map((item, index) => {
                                    return (
                                        <option key={item.id} value={index}>
                                            {item.nomeFantasia}
                                        </option>
                                    );
                                })}
                            </select>
                        )}

                        <label>Assunto</label>
                        <select value={assunto} onChange={handleChangeSelect}>
                            <option value="Suporte">Suporte</option>
                            <option value="Visita Técnica">Visita Técnica</option>
                            <option value="Financeiro">Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className='status'>
                            <input
                                type="radio"
                                name="radio"
                                value="Aberto"
                                onChange={handleOptionChange}
                                checked={status === 'Aberto'}
                            />
                            <span>Em Aberto</span>
                            <input
                                type="radio"
                                name="radio"
                                value="Progresso"
                                onChange={handleOptionChange}
                                checked={status === 'Progresso'}
                            />
                            <span>Progresso</span>
                            <input
                                type="radio"
                                name="radio"
                                value="Atendido"
                                onChange={handleOptionChange}
                                checked={status === 'Atendido'}
                            />
                            <span>Atendido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea
                            type="text"
                            placeholder='Descreva seu Problema.'
                            value={complemento}
                            onChange={handleComplemento}
                        />

                        <button type='submit'>Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}