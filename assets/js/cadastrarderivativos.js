// Chame a função carregarRegistros para carregar os dados do arquivo JSON
carregarRegistros();

let registros; // Variável global para armazenar os registros

// Função para carregar os registros a partir do arquivo JSON
function carregarRegistros() {
    fetch("valores_predefinidos.json")
        .then(response => response.json())
        .then(data => {
            registros = data.valores;
            atualizarListaSelecao();
            preencherListaRegistros(); // Chamada para preencher a lista após carregar os registros
        })
        .catch(error => {
            console.error("Erro ao carregar registros:", error);
        });
}

// Função para cadastrar um registro
function cadastrarRegistro() {
    const valorDerivativo = parseFloat(document.getElementById("derivativoInput").value);
    const tempoMontagem = parseFloat(document.getElementById("tempoMontInput").value);
    const tempoStandard = parseFloat(document.getElementById("tempoStdInput").value);

    try {
        if (!isNaN(valorDerivativo) && !isNaN(tempoMontagem) && !isNaN(tempoStandard)) {
            // Verificar se o derivativo já está cadastrado
            const derivativoExistente = registros.find(registro => registro.derivativo === valorDerivativo);

            if (derivativoExistente) {
                alert("Derivativo já cadastrado.");
            } else {
                const novoRegistro = {
                    derivativo: valorDerivativo,
                    tempomont: tempoMontagem,
                    tempostd: tempoStandard
                };

                registros.push(novoRegistro);
                atualizarListaSelecao();

                // Limpa os campos de entrada após o cadastro
                document.getElementById("derivativoInput").value = "";
                document.getElementById("tempoMontInput").value = "";
                document.getElementById("tempoStdInput").value = "";

                alert("Cadastro realizado com sucesso.");
            }
        } else {
            alert("Preencha todos os campos com valores numéricos para cadastrar o registro.");
        }
    } catch (error) {
        console.error("Erro ao cadastrar registro:", error);
    }
}


// Função para excluir um registro
function excluirRegistro() {
    const selecionarRegistro = document.getElementById("selecionarRegistro");
    const selectedIndex = selecionarRegistro.selectedIndex;

    if (selectedIndex >= 0) {
        const registroExcluido = registros.splice(selectedIndex, 1)[0]; // Remova o registro e capture o registro excluído

        alert("O registro " + registroExcluido.derivativo + " foi excluído com sucesso! .");
        atualizarListaSelecao();
    } else {
        alert("Selecione um registro para excluir.");
    }
}

// Função para atualizar a lista de seleção com os registros existentes
function atualizarListaSelecao() {
    const selecionarRegistro = document.getElementById("selecionarRegistro");
    selecionarRegistro.innerHTML = "";

    for (let i = 0; i < registros.length; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = `Registro ${i + 1}`;
        selecionarRegistro.appendChild(option);
    }
}

// Função para preencher a lista com os registros existentes
function preencherListaRegistros() {
    const ulElement = document.getElementById("valoresPredefinidos");
    ulElement.innerHTML = ""; // Limpa a lista existente

    for (let i = 0; i < registros.length; i++) {
        const liElement = document.createElement("li");
        liElement.textContent = `Registro ${i + 1}: Derivativo=${registros[i].derivativo}, Tempo Montagem=${registros[i].tempomont}, Tempo Standard=${registros[i].tempostd}`;
        ulElement.appendChild(liElement);
    }
}

// Função para salvar os registros em um arquivo JSON e criar um link para download
function salvarRegistros() {
    const jsonData = JSON.stringify({ valores: registros });

    // Crie um objeto Blob com o JSON
    const blob = new Blob([jsonData], { type: "application/json" });

    // Crie um objeto URL para o Blob
    const url = URL.createObjectURL(blob);

    // Crie um elemento "a" para o link de download
    const a = document.createElement("a");
    a.href = url;
    a.download = "valores_predefinidos.json";
    a.textContent = "Download dos Registros";

    // Simule o clique no elemento "a" para iniciar o download
    a.style.display = "none"; // Oculte o elemento para que não seja visível
    document.body.appendChild(a);
    a.click();

    // Remova o elemento "a" depois do download
    document.body.removeChild(a);
}

// Adicione os eventos de clique aos botões
document.getElementById("cadastrarButton").addEventListener("click", cadastrarRegistro);
document.getElementById("excluirButton").addEventListener("click", excluirRegistro);
document.getElementById("salvarButton").addEventListener("click", salvarRegistros);