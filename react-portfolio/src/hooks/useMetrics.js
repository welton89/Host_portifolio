import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gun from '../lib/gun';

const useMetrics = () => {
    const location = useLocation();
    const activeTimeRef = useRef(0);
    const lastActivityRef = useRef(Date.now());
    const isWindowActive = useRef(true);

    const getTodayKey = () => {
        const now = new Date();
        const offset = now.getTimezoneOffset();
        const localDate = new Date(now.getTime() - (offset * 60 * 1000));
        return localDate.toISOString().split('T')[0];
    };

    // Registrar acesso (Page View)
    useEffect(() => {
        const today = getTodayKey();
        const metricsRef = gun.get('metrics').get('daily').get(today);

        metricsRef.get('views').once((current) => {
            const newValue = (Number(current) || 0) + 1;
            metricsRef.get('views').put(newValue);
        });

        // Resetar tempo ativo na mudança de rota (opcional, mas bom para precisão)
        // activeTimeRef.current = 0;
    }, [location.pathname]);

    // Rastrear tempo ativo
    useEffect(() => {
        const handleActivity = () => {
            lastActivityRef.current = Date.now();
        };

        const handleVisibilityChange = () => {
            isWindowActive.current = !document.hidden;
        };

        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('scroll', handleActivity);
        window.addEventListener('keydown', handleActivity);
        window.addEventListener('click', handleActivity);
        window.addEventListener('touchstart', handleActivity);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        const interval = setInterval(() => {
            const now = Date.now();
            const inactiveLimit = 30000; // 30 segundos de inatividade

            if (isWindowActive.current && (now - lastActivityRef.current < inactiveLimit)) {
                const today = getTodayKey();
                const metricsRef = gun.get('metrics').get('daily').get(today);

                metricsRef.get('activeTime').once((current) => {
                    const newValue = (Number(current) || 0) + 5;
                    metricsRef.get('activeTime').put(newValue);
                });
            }
        }, 5000);

        return () => {
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('scroll', handleActivity);
            window.removeEventListener('keydown', handleActivity);
            window.removeEventListener('click', handleActivity);
            window.removeEventListener('touchstart', handleActivity);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            clearInterval(interval);
        };
    }, []);

    return null;
};

export default useMetrics;
