import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useConfig } from '../../hooks/useConfig';
import { MASTER_PUB_KEY } from '../../lib/gun';

const ProtectedRoute = ({ children }) => {
    const { isAuth, pub, logout, loading: authLoading } = useAuth();
    const { publicKeys, loading: configLoading } = useConfig();
    const navigate = useNavigate();

    // Se o usuário logado for o dono (Master Key), permitimos o acesso imediatamente
    const isOwner = isAuth && pub === MASTER_PUB_KEY;

    if ((authLoading || configLoading) && !isOwner) {
        return <div style={{ color: 'white', padding: '2rem' }}>Verificando permissões...</div>;
    }

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    // Lista de chaves autorizadas (Master Key + chaves cadastradas no Admin)
    const authorizedKeys = [
        MASTER_PUB_KEY,
        ...(publicKeys ? publicKeys.split(',').map(k => k.trim()) : [])
    ];

    if (!authorizedKeys.includes(pub)) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1a202c',
                color: 'white',
                textAlign: 'center',
                padding: '2rem'
            }}>
                <h1 style={{ color: '#f56565', marginBottom: '1rem' }}>Acesso Negado</h1>
                <p style={{ marginBottom: '2rem', color: '#a0aec0' }}>
                    Você não tem permissão para acessar esta área.<br />
                    Sua chave: <code style={{ fontSize: '0.8rem', backgroundColor: '#2d3748', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{pub}</code>
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={() => logout(() => navigate('/login'))}
                        style={{
                            backgroundColor: '#f56565',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Sair e trocar de conta
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            backgroundColor: 'transparent',
                            color: '#a0aec0',
                            border: '1px solid #4a5568',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '6px',
                            cursor: 'pointer'
                        }}
                    >
                        Voltar ao Início
                    </button>
                </div>
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;
