const tabela = document.getElementById("tabelaProducao");

function calcularProducao(tempoMont, tempoStd, pecas) {
    var hrsMont = tempoMont * pecas;
    var hrsStd = tempoStd * pecas;
    return { hrsMont, hrsStd };
}

function enviarParaArquivoJson() {
    var derivativoValue = parseInt(document.getElementById("formprod-derivativo").value);
    var pecasValue = parseInt(document.getElementById("formprod-pecas").value);

    fetch('valores_predefinidos.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonData) {
            var matchingValue = jsonData.valores.find(function (item) {
                return item.derivativo === derivativoValue;
            });

            if (matchingValue) {
                var newRow = tabela.insertRow();
                newRow.insertCell(0).textContent = matchingValue.derivativo;
                newRow.insertCell(1).textContent = matchingValue.tempomont;
                newRow.insertCell(2).textContent = matchingValue.tempostd;
                newRow.insertCell(3).textContent = pecasValue;

                var horas = calcularProducao(matchingValue.tempomont, matchingValue.tempostd, pecasValue);

                newRow.insertCell(4).textContent = horas.hrsMont.toFixed(4);
                newRow.insertCell(5).textContent = horas.hrsStd.toFixed(4);


            } else {
                alert("Valor derivativo não encontrado no arquivo JSON.");
            }
        })
        .catch(function (error) {
            console.error('Erro ao carregar o arquivo JSON:', error);
        });
};

// Atribua a função ao evento de clique do botão
document.getElementById("btnAdicionar").addEventListener("click", enviarParaArquivoJson);

function calcularTotais() {
    var totalPecas = 0;
    var totalHrsMont = 0;
    var totalHrsStd = 0;

    // Seleciona todas as linhas da tabela "tabelaProducao" (exceto a primeira linha de cabeçalho).
    var linhas = tabela.querySelectorAll('tr');
    
    for (var i = 1; i < linhas.length; i++) {
        var linha = linhas[i];
        var celulas = linha.querySelectorAll('td');
        
        // Acesse as células da tabela para obter os valores.
        var pecas = parseFloat(celulas[3].textContent);
        var hrsMont = parseFloat(celulas[4].textContent);
        var hrsStd = parseFloat(celulas[5].textContent);
        
        // Some os valores aos totais.
        totalPecas += pecas;
        totalHrsMont += hrsMont;
        totalHrsStd += hrsStd;
    }
    
    // Atualize os elementos na tabela "tabelaCalculoProduçao" com os totais calculados.
    document.getElementById('total_pecas').textContent = totalPecas;
    document.getElementById('total_hrs_mont').textContent = totalHrsMont.toFixed(4);
    document.getElementById('total_hrs_std').textContent = totalHrsStd.toFixed(4);

 
}






