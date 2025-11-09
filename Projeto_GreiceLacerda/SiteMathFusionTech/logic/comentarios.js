// Importações de AÇÕES do Firebase (note que 'initializeApp' e 'getFirestore' sumiram)
import {
    doc,
    setDoc,
    addDoc,
    collection,
    query,
    where,
    onSnapshot,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// --- 1. IMPORTAÇÃO DA CONFIGURAÇÃO ---
// Importa as conexões e constantes do nosso novo arquivo de configuração
import {
    db,
    auth,
    initialAuthToken,
    K_COMENTARIOS_PUBLICOS
} from './firebaseConfig.js';

// --- 2. CONFIGURAÇÃO E INICIALIZAÇÃO ---

let userId;

// Seletores do DOM
const form = document.getElementById('form-contato');
const nomeInput = document.getElementById('nome-contato');
const comentarioInput = document.getElementById('comentario-contato');
const btnEnviar = document.getElementById('btn-enviar');
const btnText = document.getElementById('btn-text');
const btnLoader = document.getElementById('btn-loader');
const statusMessage = document.getElementById('status-message');
const comentariosLista = document.getElementById('comentarios-lista');
const loaderComentarios = document.getElementById('loader-comentarios');

// VERIFICAÇÃO: Garante que o DB foi importado corretamente
if (!db || !auth) {
    console.error("Conexão do Firebase não foi importada corretamente.");
    comentariosLista.innerHTML = '<p class="error-message">Erro fatal ao carregar a configuração do banco de dados.</p>';
} else {
    // Inicia o processo de autenticação
    handleAuthentication();
}


// --- 3. AUTENTICAÇÃO ---

async function handleAuthentication() {
    try {
        if (initialAuthToken) {
            console.log("Autenticando com Custom Token...");
            await signInWithCustomToken(auth, initialAuthToken);
        } else {
            console.log("Autenticando anonimamente...");
            await signInAnonymously(auth);
        }
    } catch (error) {
        console.error("Erro na autenticação:", error);
    }

    // O onAuthStateChanged gerencia o que acontece após o login
    onAuthStateChanged(auth, (user) => {
        if (user) {
            userId = user.uid;
            console.log("Usuário autenticado:", userId);
            // Agora que estamos autenticados, podemos carregar os comentários
            // e habilitar o formulário.
            setupFormListener();
            setupComentariosListener();
        } else {
            console.log("Usuário não autenticado.");
            // Desabilita o formulário se a autenticação falhar
            btnEnviar.disabled = true;
            btnText.textContent = "Erro de Conexão";
        }
    });
}

// --- 4. ENVIO DO FORMULÁRIO (Salvar no DB) ---

function setupFormListener() {
    // Garante que o formulário exista antes de adicionar o listener
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        const nome = nomeInput.value.trim();
        const comentario = comentarioInput.value.trim();

        if (!nome || !comentario) {
            showStatus("Por favor, preencha todos os campos.", "error");
            return;
        }

        // Desabilita o botão e mostra o loader
        setLoading(true);

        try {
            // Cria um novo documento na coleção pública
            const novoComentario = {
                nome: nome,
                comentario: comentario,
                timestamp: serverTimestamp(), // Marca de tempo do servidor
                isApproved: false, // **IMPORTANTE: Moderação Padrão**
                submetidoPor: userId // Rastreia quem enviou (privado)
            };

            // K_COMENTARIOS_PUBLICOS agora é importado
            const docRef = await addDoc(collection(db, K_COMENTARIOS_PUBLICOS), novoComentario);

            console.log("Documento salvo com ID:", docRef.id);
            showStatus("Obrigado! Seu comentário foi enviado para moderação.", "success");
            form.reset(); // Limpa o formulário

        } catch (error) {
            console.error("Erro ao salvar comentário:", error);
            showStatus("Erro ao enviar seu comentário. Tente novamente.", "error");
        } finally {
            // Reabilita o botão e esconde o loader
            setLoading(false);
        }
    });
}

// --- 5. LEITURA DO BANCO DE DADOS (Exibir Comentários) ---

function setupComentariosListener() {
    // Garante que a lista exista
    if (!comentariosLista) return;

    // Esta é a consulta:
    // Busque em K_COMENTARIOS_PUBLICOS
    // ONDE 'isApproved' == true
    // K_COMENTARIOS_PUBLICOS agora é importado
    const q = query(collection(db, K_COMENTARIOS_PUBLICOS), where("isApproved", "==", true));

    // onSnapshot "escuta" em tempo real
    onSnapshot(q, (snapshot) => {
        // Limpa a lista antiga
        comentariosLista.innerHTML = '';

        if (snapshot.empty) {
            comentariosLista.innerHTML = '<p>Seja o primeiro a deixar um comentário!</p>';
            return;
        }

        snapshot.forEach((doc) => {
            const data = doc.data();
            const comentarioCard = document.createElement('div');
            comentarioCard.className = 'comentario-card';

            // Formata como uma citação
            const blockquote = document.createElement('blockquote');
            blockquote.textContent = data.comentario;

            const cite = document.createElement('cite');
            cite.textContent = `- ${data.nome}`;

            comentarioCard.appendChild(blockquote);
            comentarioCard.appendChild(cite);
            comentariosLista.appendChild(comentarioCard);
        });

    }, (error) => {
        console.error("Erro ao carregar comentários:", error);
        comentariosLista.innerHTML = '<p class="error-message">Não foi possível carregar os comentários.</p>';
    });
}

// --- 6. FUNÇÕES AUXILIARES (UI) ---

function setLoading(isLoading) {
    if (isLoading) {
        btnEnviar.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
    } else {
        btnEnviar.disabled = false;
        btnText.style.display = 'inline-block';
        btnLoader.style.display = 'none';
    }
}

function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`; // 'success' ou 'error'
    statusMessage.style.display = 'block';

    setTimeout(() => {
        statusMessage.style.display = 'none';
    }, 5000); // Esconde a mensagem após 5 segundos
}