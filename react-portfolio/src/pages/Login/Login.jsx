
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Login.module.css';

const Login = () => {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const { isAuth, loading, error, login, createAccount, setError } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate('/adm');
        }
    }, [isAuth, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors before attempting login
        login(usernameInput, passwordInput, (ack) => {
            if (ack.success) {
                navigate('/adm');
            }
            // Error handling is done within useAuth and set to the 'error' state
        });
    };

    const handleCreateAccount = (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors before attempting creation
        createAccount(usernameInput, passwordInput, (ack) => {
            if (ack.success) {
                navigate('/adm');
            }
            // Error handling is done within useAuth and set to the 'error' state
        });
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <h1>Admin Login</h1>
                <p className={styles.subtitle}>Acesso restrito ao portfólio</p>

                <form className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="username">Usuário</label>
                        <input
                            type="text"
                            id="username"
                            value={usernameInput}
                            onChange={(e) => setUsernameInput(e.target.value)}
                            placeholder="Digite seu usuário"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            placeholder="Digite sua senha"
                            required
                        />
                    </div>

                    {error && <p className={styles.errorMessage}>{error}</p>}

                    <div className={styles.buttonGroup}>
                        <button
                            type="submit"
                            onClick={handleLogin}
                            className={styles.loginButton}
                            disabled={loading}
                        >
                            {loading ? 'Entrando...' : 'Entrar'}
                        </button>
                        <button
                            type="button"
                            onClick={handleCreateAccount}
                            className={styles.createButton}
                            disabled={loading}
                        >
                            Criar Conta
                        </button>
                    </div>
                </form>

                <div className={styles.footer}>
                    <a href="/" className={styles.backLink}>
                        <i className="fas fa-arrow-left"></i> Voltar para o Portfólio
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
