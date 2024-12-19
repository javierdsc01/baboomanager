'use client';
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import Image from "next/image";
import MenuMercado from './componentes/MenuMercado';
import axios from 'axios';

function Modal({ type, player, price, balance, isOpen, handleClose, handlePriceChange, handleAction }) {
    if (!isOpen) return null;

    const maxDebt = balance.max_debt || player.price;
    const [balanceFuture, setBalanceFuture] = useState(balance.future);

    const handleFutureChange = (e) => {
        setBalanceFuture(balance.future - e);
        handlePriceChange(e);
    };
    return (
        <div className={styles.overlay}>
            <div className={styles.Modal}>
                <button onClick={handleClose} className={styles.buttonClose}>x</button>
                {player && (
                    <Image
                        src={player.image}
                        alt={player.name}
                        className={styles.modalImage}
                        width={150}
                        height={150}
                    />
                )}
                {type === 'buy' && (
                    <>
                        <h2>Comprar a {player?.name}</h2>
                        <input
                            type="range"
                            min={player?.price}
                            max={maxDebt}
                            value={price}
                            onChange={(e) => handleFutureChange(parseInt(e.target.value))}
                            className={styles.slider}
                        />
                        <p className={styles.priceLabel}>Precio de puja: {price.toLocaleString('de-DE')} €</p>
                        <div className={styles.balance} style={{ color: balanceFuture < 0 ? '#ED2439' : 'white' }}>
                            <div>
                                <span>Saldo actual</span>
                                <p>{balance.balance.toLocaleString('de-DE')} €</p>
                            </div>
                            <div>
                                <span>Saldo futuro</span>
                                <p>{balanceFuture.toLocaleString('de-DE')} €</p>
                            </div>
                            <div>
                                <span>Deuda máxima</span>
                                <p>{maxDebt.toLocaleString('de-DE')} €</p>
                            </div>
                        </div>
                        <button onClick={() => handleAction('buy', player.id, price, player.idOwner, player.idMarket)} className={styles.botonModal}>Pujar</button>
                        <a href={null} className={styles.extra}>Ver perfil de <span>{player?.name}</span></a>
                        {player?.seller !== 'Libre,' &&
                            <a href={null} className={styles.extra}>Ver perfil de <span>{player?.seller}</span></a>
                        }
                    </>
                )}
                {type === 'sell' && (
                    <>
                        <h2>Vender a {player?.name}</h2>
                        <input
                            type="range"
                            min={player?.price}
                            max="99999999"
                            value={price}
                            onChange={(e) => handlePriceChange(e.target.value)}
                            className={styles.slider}
                        />
                        <p className={styles.priceLabel}>Precio de venta: {price.toLocaleString('de-DE')} €</p>
                        <button onClick={() => handleAction('sell', player.id, price)} className={styles.botonModal}>Vender</button>
                    </>
                )}
            </div>
        </div >
    );
}

export default function Mercado() {
    const [activeTab, setActiveTab] = useState(0);
    const [modalInfo, setModalInfo] = useState({ type: '', isOpen: false, player: null, price: 0 });
    const [bids, setBids] = useState({});
    const [marketPlayers, setMarketPlayers] = useState([]);
    const [teamPlayers, setTeamPlayers] = useState([]);
    const [balance, setBalance] = useState({ balance: 0, future: 0, max_debt: 0 });
    const [isSelling, setIsSelling] = useState({});

    // Inicializamos todos los isSelling como player.active
    useEffect(() => {
        const initialIsSelling = {};
        marketPlayers.forEach(player => {
            initialIsSelling[player.id] = player.active;
        });
        teamPlayers.forEach(player => {
            initialIsSelling[player.id] = player.active;
        });
        setIsSelling(initialIsSelling);
    }, [marketPlayers, teamPlayers]);

    const handleModal = async (type, player, isOpen) => {
        if (type === 'remove') {
            handleAction('remove', player.id, player.price, player.idOwner, player.idMarket, activeTab);
            return;
        }

        try {
            const response = await axios.post('/api/balance');
            const balanceData = response.data.data.data;
            console.log('Balance response:', balanceData);
            setBalance(balanceData);
            setModalInfo({
                type,
                isOpen,
                player,
                price: player ? player.price : 0,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handlePriceChange = (price) => {
        setModalInfo(prev => ({ ...prev, price: parseInt(price) }));
    };

    const handleAction = async (action, id_player, price, idOwner = null, idMarket = null, tab = 0) => {
        let payload = {};
        let apiEndpoint = '';

        if (action === 'buy' || (action === 'remove' && tab === 0)) {
            payload = {
                offeree_id: idOwner,
                id_market: idMarket,
                id_player: id_player,
                action: action === 'remove' ? 'remove' : 'bid',
                bid: price.toLocaleString()
            };
            apiEndpoint = '/api/pujar';
        } else if (action === 'sell' || (action === 'remove' && tab === 1)) {
            payload = {
                id_player: id_player,
                action: action === 'remove' ? 'remove' : 'sale',
                price: price.toLocaleString()
            };
            apiEndpoint = '/api/venta';
        }

        try {
            const response = await axios.post(apiEndpoint, payload);
            console.log(action === 'buy' ? 'Puja exitosa' : 'Acción exitosa', response.data);

            const updatePlayerState = (players) => players.map(player => {
                if (player.id === id_player) {
                    return { ...player, active: action === 'sell' ? true : action !== 'remove' ? true : false };
                }
                return player;
            });

            if (tab === 0) {
                setMarketPlayers(prev => updatePlayerState(prev));
            } else if (tab === 1) {
                setTeamPlayers(prev => updatePlayerState(prev));
            }

            setBids(prev => ({
                ...prev,
                [id_player]: action === 'buy' || action === 'sell' ? 'remove' : 'buy'
            }));
            setIsSelling(prev => ({ ...prev, [id_player]: action === 'sell' }));
            handleModal('', null, false);
        } catch (error) {
            console.log('Error en la acción', error);
        }
    };

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const marketResponse = await axios.get('/api/market');
                const teamResponse = await axios.get('/api/equipo');

                const marketData = marketResponse.data.map(player => ({
                    ...player,
                    active: player.active || false,
                }));
                const teamData = teamResponse.data.map(player => ({
                    ...player,
                    active: player.active || false,
                }));

                setMarketPlayers(marketData);
                setTeamPlayers(teamData);

                console.log('Market players:', marketResponse.data);
                console.log('Team players:', teamResponse.data);
            } catch (error) {
                console.log('Error fetching players', error);
            }
        };

        fetchPlayers();
    }, []);

    const playersToShow = activeTab === 0 ? marketPlayers : teamPlayers;

    const handleComprasAleatorias = async () => {
        try {
            const response = await axios.post('/api/compras-aleatorias');
            console.log('Compras aleatorias:', response.data);

            const updatePlayerState = (players) => players.map(player => {
                if (response.data.includes(player.id)) {
                    return { ...player, active: true };
                }
                return player;
            });

            if (activeTab === 0) {
                setMarketPlayers(prev => updatePlayerState(prev));
            } else if (activeTab === 1) {
                setTeamPlayers(prev => updatePlayerState(prev));
            }
        } catch (error) {
            console.log('Error en compras aleatorias', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.background} />
            <div className={styles.laliga} />
            <div className={styles.menuContainer}>
                <MenuMercado activeTab={activeTab} setActiveTab={setActiveTab} />
                <button onClick={handleComprasAleatorias} className={styles.botonAleatorio}>{activeTab === 0 ? 'Realizar compras recomendadas' : 'Realizar ventas recomendadas'}</button>
                <div className={styles.containerMercado}>
                    {playersToShow.map((player) => (
                        player.price !== null &&
                        <div className={styles.jugador} key={player.id}>
                            <div className={styles.jugador_container}>
                                <div className={styles.jugador_image_container}>
                                    <Image
                                        src={player.image}
                                        alt={player.name}
                                        width={100}
                                        height={100}
                                    />
                                </div>
                                <div className={styles.jugador_info_container}>
                                    <h3>{player.name}</h3>
                                    <p>Precio: {player.price.toLocaleString('de-DE')} €</p>
                                    <p>Puntos: {player.points}</p>
                                    {activeTab !== 1 && <p>Vendedor: {player.seller}</p>}
                                </div>
                                <button
                                    onClick={() => {
                                        if (isSelling[player.id]) {
                                            handleAction('remove', player.id, player.price, player.idOwner, player.idMarket, activeTab);
                                        } else if (activeTab === 0) {
                                            handleModal('buy', player, true);
                                        } else if (activeTab === 1) {
                                            handleModal('sell', player, true);
                                        }
                                    }}
                                    style={{ backgroundColor: isSelling[player.id] ? 'white' : '', color: isSelling[player.id] ? 'rgba(31, 32, 48, 1)' : '' }}
                                >
                                    {isSelling[player.id] ? 'Retirar' : (activeTab === 0 ? 'Comprar' : 'Vender')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal
                type={modalInfo.type}
                player={modalInfo.player}
                price={modalInfo.price}
                balance={balance}
                isOpen={modalInfo.isOpen}
                handleClose={() => handleModal(modalInfo.type, null, false)}
                handlePriceChange={handlePriceChange}
                handleAction={handleAction}
            />
        </div>
    );
}
