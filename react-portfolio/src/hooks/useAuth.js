import { useState, useEffect, useCallback } from 'react';
import { user } from '../lib/gun';

export const useAuth = () => {
    const [isAuth, setIsAuth] = useState(!!user.is);
    const [username, setUsername] = useState(user.is ? user.is.alias : '');
    const [pub, setPub] = useState(user.is ? user.is.pub : '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Listener para mudanças no estado de autenticação do Gun
        const checkAuth = () => {
            setIsAuth(!!user.is);
            if (user.is) {
                setUsername(user.is.alias);
                setPub(user.is.pub);
            }
        };

        // O Gun não tem um listener nativo simples para 'auth change' global,
        // mas o recall e as ações de auth/leave disparam mudanças no objeto user.
        // Verificamos periodicamente ou confiamos nas ações disparadas pelo hook.
        checkAuth();
    }, []);

    const login = useCallback((u, p, callback) => {
        setLoading(true);
        setError('');
        user.auth(u, p, (ack) => {
            setLoading(false);
            if (ack.err) {
                const msg = ack.err === 'Wrong user or password.' ? 'Usuário ou senha incorretos.' : ack.err;
                setError(msg);
                if (callback) callback({ err: msg });
            } else {
                setIsAuth(true);
                setUsername(user.is.alias);
                setPub(user.is.pub);
                if (callback) callback({ success: true });
            }
        });
    }, []);

    const createAccount = useCallback((u, p, callback) => {
        setLoading(true);
        setError('');
        user.create(u, p, (ack) => {
            if (ack.err) {
                setLoading(false);
                setError(ack.err);
                if (callback) callback({ err: ack.err });
            } else {
                // Delay para garantir propagação local do par de chaves
                setTimeout(() => {
                    login(u, p, callback);
                }, 500);
            }
        });
    }, [login]);

    const logout = useCallback((callback) => {
        user.leave();
        setIsAuth(false);
        setUsername('');
        setPub('');
        if (callback) callback();
    }, []);

    return {
        isAuth,
        username,
        pub,
        loading,
        error,
        login,
        createAccount,
        logout,
        setError
    };
};
