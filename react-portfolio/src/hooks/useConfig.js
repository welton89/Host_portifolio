import { useState, useEffect } from 'react';
import gun, { MASTER_PUB_KEY } from '../lib/gun';

export const useConfig = () => {
    const [config, setConfig] = useState({
        intro1: '',
        intro2: '',
        experience: '',
        publicKeys: '',
        loading: true
    });

    useEffect(() => {
        // Lemos do grafo público do proprietário
        const configRef = gun.user(MASTER_PUB_KEY).get('portifolio').get('config');

        const handleData = (data) => {
            console.log('Gun Config Data:', data);
            if (data) {
                setConfig({
                    intro1: data.intro1 || '',
                    intro2: data.intro2 || '',
                    experience: data.experience || '',
                    publicKeys: data.publicKeys || '',
                    loading: false
                });
            } else {
                setConfig(prev => ({ ...prev, loading: false }));
            }
        };

        configRef.on(handleData);

        // Timeout de segurança para não travar a UI
        const timeout = setTimeout(() => {
            console.log('Gun config timeout reached, setting loading to false.');
            setConfig(prev => ({ ...prev, loading: false }));
        }, 3000);

        return () => {
            configRef.off();
            clearTimeout(timeout);
        };
    }, []);

    return config;
};
