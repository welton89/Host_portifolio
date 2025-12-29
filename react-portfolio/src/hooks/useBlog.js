import { useState, useEffect, useCallback } from 'react';
import gun, { MASTER_PUB_KEY, user } from '../lib/gun';
import { parseToTimestamp } from '../utils/dateUtils';

export const useBlog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Lemos do grafo público do proprietário
        const postsRef = gun.user(MASTER_PUB_KEY).get('portifolio').get('blog');

        const handleData = (data, id) => {
            if (data) {
                setPosts(prev => {
                    const filtered = prev.filter(p => p.id !== id);
                    return [...filtered, { ...data, id }].sort((a, b) => {
                        const timeA = a.timestamp || parseToTimestamp(a.date);
                        const timeB = b.timestamp || parseToTimestamp(b.date);
                        return timeB - timeA;
                    });
                });
            } else {
                setPosts(prev => prev.filter(p => p.id !== id));
            }
            setLoading(false);
        };

        postsRef.map().on(handleData);

        const timer = setTimeout(() => setLoading(false), 3000);

        return () => {
            postsRef.off();
            clearTimeout(timer);
        };
    }, []);

    const addPost = useCallback((post) => {
        const id = post.id || Math.random().toString(36).substr(2, 9);
        // Prioridade absoluta para a data inserida pelo usuário
        const timestamp = parseToTimestamp(post.date) || Date.now();

        user.get('portifolio').get('blog').get(id).put({
            title: post.title,
            summary: post.summary,
            content: post.content,
            image: post.image,
            tags: post.tags || '',
            date: post.date,
            timestamp: timestamp
        });
    }, []);

    const updatePost = useCallback((id, post) => {
        const timestamp = parseToTimestamp(post.date) || Date.now();

        user.get('portifolio').get('blog').get(id).put({
            title: post.title,
            summary: post.summary,
            content: post.content,
            image: post.image,
            tags: post.tags || '',
            date: post.date,
            timestamp: timestamp
        });
    }, []);

    const deletePost = useCallback((id) => {
        user.get('portifolio').get('blog').get(id).put(null);
    }, []);

    return { posts, loading, addPost, updatePost, deletePost };
};
