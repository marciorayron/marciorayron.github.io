const tabela = document.getElementById("tabelaProducao");

// Função para calcular a produção (horas montagem e horas padrão)
function calcularProducao(tempoMont, tempoStd, pecas) {
    const hrsMont = tempoMont * pecas;
    const hrsStd = tempoStd * pecas;
    return { hrsMont, hrsStd };
}

// Função para adicionar uma linha na tabela com os dados calculados
function adicionarLinhaTabela(matchingValue, pecasValue) {
    const newRow = tabela.insertRow();
    
    // Adiciona os valores à nova linha da tabela
    newRow.insertCell(0).textContent = matchingValue.derivativo;
    newRow.insertCell(1).textContent = matchingValue.tempomont;
    newRow.insertCell(2).textContent = matchingValue.tempostd;
    newRow.insertCell(3).textContent = pecasValue;

    // Calcula as horas e insere na nova linha
    const horas = calcularProducao(matchingValue.tempomont, matchingValue.tempostd, pecasValue);
    newRow.insertCell(4).textContent = horas.hrsMont.toFixed(4);
    newRow.insertCell(5).textContent = horas.hrsStd.toFixed(4);
}

// Função para buscar os dados do arquivo JSON e inserir na tabela
function enviarParaArquivoJson() {
    const derivativoValue = parseInt(document.getElementById("formprod-derivativo").value);
    const pecasValue = parseInt(document.getElementById("formprod-pecas").value);

    fetch('valores_predefinidos.json')
        .then(response => response.json())
        .then(jsonData => {
            // Busca o item que corresponde ao derivativo selecionado
            const matchingValue = jsonData.valores.find(item => item.derivativo === derivativoValue);

            if (matchingValue) {
                // Se encontrado, adiciona uma linha na tabela
                adicionarLinhaTabela(matchingValue, pecasValue);
            } else {
                // Caso não encontrado, exibe uma mensagem de erro
                alert("Valor derivativo não encontrado no arquivo JSON.");
            }
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error);
        });
}

// Atribui a função ao evento de clique do botão
document.getElementById("btnAdicionar").addEventListener("click", enviarParaArquivoJson);

// Função para calcular os totais de peças, horas montagem e horas padrão
function calcularTotais() {
    let totalPecas = 0;
    let totalHrsMont = 0;
    let totalHrsStd = 0;

    // Seleciona todas as linhas da tabela "tabelaProducao" (exceto a primeira linha de cabeçalho)
    const linhas = tabela.querySelectorAll('tr');
    
    // Itera sobre as linhas e soma os valores das células
    linhas.forEach((linha, index) => {
        if (index === 0) return; // Ignora a primeira linha (cabeçalho)

        const celulas = linha.querySelectorAll('td');
        
        // Acessa os valores das células e converte para número
        const pecas = parseFloat(celulas[3].textContent);
        const hrsMont = parseFloat(celulas[4].textContent);
        const hrsStd = parseFloat(celulas[5].textContent);
        
        // Soma os valores aos totais
        totalPecas += pecas;
        totalHrsMont += hrsMont;
        totalHrsStd += hrsStd;
    });

    // Atualiza os elementos da tabela com os totais calculados
    document.getElementById('total_pecas').textContent = totalPecas;
    document.getElementById('total_hrs_mont').textContent = totalHrsMont.toFixed(4);
    document.getElementById('total_hrs_std').textContent = totalHrsStd.toFixed(4);
}
