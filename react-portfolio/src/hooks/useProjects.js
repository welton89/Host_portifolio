import { useState, useEffect, useCallback } from 'react';
import gun, { MASTER_PUB_KEY, user } from '../lib/gun';

export const useProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Lemos do grafo público do proprietário
        const projectsRef = gun.user(MASTER_PUB_KEY).get('portifolio').get('projects');

        // Usamos .map() para escutar cada projeto individualmente
        const handleData = (data, id) => {
            if (data) {
                setProjects(prev => {
                    // Remove o projeto se ele já existir para evitar duplicatas ao atualizar
                    const filtered = prev.filter(p => p.id !== id);
                    return [...filtered, { ...data, id }].sort((a, b) => {
                        const timeA = a.timestamp || 0;
                        const timeB = b.timestamp || 0;
                        if (timeA !== timeB) return timeB - timeA;
                        return a.title.localeCompare(b.title);
                    });
                });
            } else {
                // Se data for null, o projeto foi deletado
                setProjects(prev => prev.filter(p => p.id !== id));
            }
            setLoading(false);
        };

        projectsRef.map().on(handleData);

        // Se não houver dados após um tempo, paramos o loading
        const timer = setTimeout(() => setLoading(false), 2000);

        return () => {
            projectsRef.off();
            clearTimeout(timer);
        };
    }, []);

    const addProject = useCallback((project) => {
        const id = project.id || Math.random().toString(36).substr(2, 9);
        const timestamp = project.timestamp || 0;
        user.get('portifolio').get('projects').get(id).put({
            title: project.title,
            subtitle: project.subtitle,
            descricao: project.descricao,
            imagem: project.imagem,
            linkRepositorio: project.linkRepositorio,
            date: project.date || '',
            timestamp: timestamp
        });
    }, []);

    const updateProject = useCallback((id, project) => {
        user.get('portifolio').get('projects').get(id).put({
            title: project.title,
            subtitle: project.subtitle,
            descricao: project.descricao,
            imagem: project.imagem,
            linkRepositorio: project.linkRepositorio,
            date: project.date || '',
            timestamp: project.timestamp || 0
        });
    }, []);

    const deleteProject = useCallback((id) => {
        user.get('portifolio').get('projects').get(id).put(null);
    }, []);

    return { projects, loading, addProject, updateProject, deleteProject };
};
