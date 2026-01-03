import { useState, useRef, useEffect } from 'react';
import styles from './ShareButton.module.css';

const ShareButton = ({ title, url }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const menuRef = useRef(null);

    const fullUrl = url.startsWith('http')
        ? url
        : `${window.location.origin}${window.location.pathname}#${url}`;

    const encodedUrl = encodeURIComponent(fullUrl);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: 'WhatsApp',
            icon: 'fab fa-whatsapp',
            url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
            color: '#25D366'
        },
        {
            name: 'LinkedIn',
            icon: 'fab fa-linkedin-in',
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            color: '#0077B5'
        },
        {
            name: 'X (Twitter)',
            icon: 'fab fa-twitter', // Fallback para garantir que apareça
            url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
            color: '#1DA1F2'
        },
        // {
        //     name: 'Instagram',
        //     icon: 'fab fa-instagram',
        //     url: '#', // Instagram não tem share URL via web
        //     color: '#E4405F',
        //     isCopy: true
        // },
        {
            name: 'Facebook',
            icon: 'fab fa-facebook-f',
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: '#1877F2'
        },
        {
            name: 'Telegram',
            icon: 'fab fa-telegram-plane',
            url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
            color: '#0088cc'
        }
    ];

    const copyToClipboard = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(fullUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Falha ao copiar:', err);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.shareContainer} ref={menuRef}>
            <button
                className={styles.shareButton}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                title="Compartilhar"
            >
                <i className="fas fa-share-alt"></i>
            </button>

            {isOpen && (
                <div className={styles.shareMenu}>
                    <div className={styles.menuHeader}>
                        <span>Compartilhar</span>
                    </div>
                    <div className={styles.linksGrid}>
                        {shareLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.shareLink}
                                onClick={(e) => {
                                    if (link.isCopy) {
                                        copyToClipboard(e);
                                    } else {
                                        e.stopPropagation();
                                    }
                                }}
                                title={link.name}
                            >
                                <i className={link.icon} style={{ color: link.color }}></i>
                            </a>
                        ))}
                        <button
                            className={styles.copyButton}
                            onClick={copyToClipboard}
                            title={copied ? 'Copiado!' : 'Copiar Link'}
                        >
                            <i className={copied ? "fas fa-check" : "fas fa-link"}></i>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShareButton;
