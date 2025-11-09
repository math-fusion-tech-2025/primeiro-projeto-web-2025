// Importações de inicialização do Firebase (Versão CDN para HTML)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, setLogLevel } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// --- 1. CONFIGURAÇÃO LOCAL (VS CODE) ---
// Este é o objeto de configuração que você gerou.
// Ele está formatado corretamente para o nosso script.

const firebaseConfig = {
    apiKey: "AIzaSyDm8iECX7Nz1297DpDq5q4Kjo6M_8mnYLU",
    authDomain: "math-fusion-tech.firebaseapp.com",
    projectId: "math-fusion-tech",
    storageBucket: "math-fusion-tech.firebasestorage.app",
    messagingSenderId: "472506393068",
    appId: "1:472506393068:web:b022db27767217a95fa0c9",
    measurementId: "G-MQ9N8FHEHW"
};
// -----------------------------------------------------------------


// As variáveis globais não são mais necessárias para o teste local
export const appId = firebaseConfig.projectId;
export const initialAuthToken = null; // Força a autenticação anônima

// --- 2. INICIALIZAÇÃO E EXPORTAÇÃO ---
let db, auth;

try {
    // Verifica se a API Key foi preenchida
    if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes(AIzaSyDm8iECX7Nz1297DpDq5q4Kjo6M_8mnYLU) {
        throw new Error("ERRO: API Key não foi preenchida em /scripts/firebaseConfig.js. Cole sua chave para testar.");
    }

    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);

    setLogLevel('Debug');
    console.log("Firebase Configurado com Sucesso para teste local. App ID:", appId);

} catch (error) {
    console.error(error.message);
    // Se o usuário esquecer a chave, um alerta é a forma mais
    // óbvia de notificá-lo durante o teste.
    alert(error.message);
}

// Exporta as instâncias 'db' e 'auth' para o 'contato.js'
export { db, auth };

// --- 3. CONSTANTES COMPARTILHADAS ---
// Caminho simplificado para o teste local.
// Os dados serão salvos diretamente na coleção 'sugestoes'.
export const K_COMENTARIOS_PUBLICOS = `sugestoes`;