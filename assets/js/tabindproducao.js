

function calcularValores() {
    // Calcular absenteísmo
    // Obter o valor de pessoa1
    let pessoa1 = parseFloat(document.getElementById("Tab-mannig").textContent);
    const faltas = parseFloat(document.getElementById("tab-Faltas").textContent);
    let absenteismoResult = (faltas / pessoa1) * 100;
    document.getElementById("absenteismo-real").textContent = absenteismoResult.toFixed(2) + "%";

    // Obtenha uma referência aos elementos de entrada do formulário
    let primeiraHoraQntReal = parseFloat(document.getElementById("formprod-qntRealPecas1hr").value);
    let primeiraHoraQntMeta = parseFloat(document.getElementById("formprod-metaPecas1hr").value);
    // Obtenha uma referência aos elementos da tabela de Pessoas
    let tabprimeiraHoraQntReal = document.getElementById("tab-PrimeiraHoraQntReal");
    let tabprimeiraHoraQntMeta = document.getElementById("tab-PrimeiraHoraQntMeta");
    //calculo
    let primeiraHoraPorcenResult = (primeiraHoraQntReal / primeiraHoraQntMeta) * 100;
    document.getElementById("primeira-hora-porcen-real").textContent = primeiraHoraPorcenResult.toFixed(2) + "%";
    // Atualize os valores das células da tabela com base nos valores do formulário
    tabprimeiraHoraQntReal.textContent = primeiraHoraQntReal;
    tabprimeiraHoraQntMeta.textContent = primeiraHoraQntMeta;

    // Calcular a aderência
    let pecasProgramadas = parseFloat(document.getElementById("formprod-pecasProgramadas").value);
    let totalPecas = parseFloat(document.getElementById("total_pecas").textContent);
    let aderenciaReal = (totalPecas / pecasProgramadas) * 100;
    document.getElementById("aderencia-real").textContent = aderenciaReal.toFixed(2) + "%";


    // Calcular a eficiência
    let totalHrsStd = parseFloat(document.getElementById("total_hrs_std").textContent);
    let totalHoras = parseFloat(document.getElementById("tab-TotalHRH").textContent);
    let mostraeficienciaReal = (totalHrsStd / totalHoras) * 100;
    document.getElementById("eficiencia-real").textContent = mostraeficienciaReal.toFixed(2) + "%";
}

// document.getElementById("btnCalcular2").addEventListener("click", calcularValores);

