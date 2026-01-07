import Gun from 'gun';
import 'gun/sea';

// Inicializa o Gun. 
// Desativamos o multicast/local peer search para evitar erros de conexão no console se não houver relay local.
const gun = Gun({
    peers: ['https://gun.defucc.me/gun', 'https://gun.o8.is/gun','gunjs-chat.squareweb.app/gun'],
    localStorage: true,
    radisk: true
});

// Chave pública do proprietário do portfólio
export const MASTER_PUB_KEY = '4AyqQNfmHhY8fEPn6I8vkkLLoNlIUjwOQnUrnIyhEFQ.CMYngJ_aFACW4RynToLO40Wbfk9tI8rgzDMaAzlP8HY';

// Cria a instância do usuário
export const user = gun.user().recall({ sessionStorage: true });

export default gun;
