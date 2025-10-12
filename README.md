# ✨ Repositório do Projeto MATH<FUSION>TECH ✨

Bem-vindo(a) ao nosso espaço oficial de colaboração! Este repositório foi criado para centralizar todos os códigos, desafios e projetos que desenvolveremos juntos.

Este documento é o nosso guia principal. Leia com atenção para entender como vamos trabalhar de forma organizada e garantir que todos possam contribuir sem problemas.

## 🚀 Como Contribuir? Nosso Fluxo de Trabalho

Para manter nosso projeto seguro e organizado, **ninguém deve enviar código diretamente para a branch principal (`main`)**. Em vez disso, seguiremos um fluxo profissional usado em empresas de tecnologia, baseado em *Branches* e *Pull Requests*. Parece complicado, mas é bem simples na prática!

Siga os passos abaixo para cada nova tarefa ou funcionalidade que você for desenvolver.

___

### **Passo 1: Prepare seu Ambiente (Faça isso apenas uma vez)**

Primeiro, você precisa ter uma cópia do projeto na sua máquina.

1.  Clique no botão verde **`< > Code`** no topo desta página.
2.  Copie a URL (HTTPS é a mais fácil).
3.  Abra o terminal (ou o terminal integrado do VS Code) e execute o comando abaixo, substituindo `[URL_DO_REPOSITORIO]` pela URL que você copiou:
    ```bash
    git clone [URL_DO_REPOSITORIO]
    ```
4.  Pronto! Agora você tem a pasta do projeto no seu computador.

---

### **Passo 2: Crie sua Própria "Linha de Trabalho" (Branch)**

Antes de escrever qualquer código, crie uma "ramificação" (branch) só sua. Pense nela como uma cópia da branch principal onde você pode trabalhar com segurança sem afetar o trabalho dos outros.

### **IMPORTANTE:** 
Sempre crie uma nova branch a partir da `main` e garanta que ela esteja atualizada (`git pull origin main`) antes de começar.

Use um nome claro para sua branch. Nossa convenção será: `seu-nome/objetivo-da-branch`

#### Exemplo para a Maria criar uma página de contato
git checkout -b maria/cria-pagina-contato

___

### **Passo 3: Mãos à Obra! (Codifique e Salve seu Progresso)**

Agora você está na sua branch e pode criar, editar e apagar arquivos à vontade. Conforme for trabalhando, salve seu progresso com "commits". Um commit é como um "ponto de salvamento" no seu trabalho.

Adicione os arquivos que você modificou:
#### Para adicionar todos os arquivos modificados na pasta atual
git add .
Crie o "ponto de salvamento" com uma mensagem clara sobre o que você fez:

git commit -m "Feat: adiciona estrutura HTML da página de contato"
(**Dica:** Boas mensagens de commit são curtas e descritivas!)

___

### **Passo 4: Envie seu Trabalho para o GitHub (Push)**

Seus commits existem apenas na sua máquina. Para enviá-los ao repositório no GitHub, você precisa "empurrar" (push) sua branch.

#### Na primeira vez que enviar a branch, use este comando:
git push -u origin nome-da-sua-branch

#### Exemplo:
git push -u origin maria/cria-pagina-contato
Nas próximas vezes que fizer push para a mesma branch, você pode usar apenas git push.

___

### **Passo 5: Peça para Juntar suas Alterações (Abra um Pull Request)**

Este é o passo final e mais importante!

Vá até a página do nosso repositório no GitHub.

Você verá um aviso amarelo com o nome da sua branch e um botão verde "Compare & pull request". Clique nele!

Dê um título claro para seu Pull Request (PR). Ex: "Desenvolvimento da Página de Contato".

Escreva uma breve descrição do que foi feito.

Clique em "Create pull request".

#### Pronto! Seu pedido foi criado. A equipe de coordenação (e outros colegas) poderá revisar seu código, deixar comentários e, quando tudo estiver aprovado, seu trabalho será integrado à branch principal (main).

___

### **🤔 Por que seguimos esse fluxo?**

#### **Segurança**: 
* Protegemos a versão principal do projeto, que deve estar sempre funcionando.

#### **Organização**: 
* Cada tarefa é desenvolvida em sua própria branch, evitando conflitos.

#### **Colaboração e Aprendizado**: 
* O Pull Request é o momento perfeito para aprendermos juntos, revisando o código uns dos outros e dando feedback construtivo.

### 💬 Dúvidas?
Não hesite em perguntar! Poste sua dúvida no Google Classroom ou no nosso grupo de comunicação. Lembre-se: estamos todos aprendendo juntos, e não existe pergunta boba.

#### Vamos construir algo incrível! 🚀
