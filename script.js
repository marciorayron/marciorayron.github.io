function tudo () {
        atualizarTabela();
        calcularTotais();
        calcularHoras();
        calcularValores();
};


document.getElementById("btnCalcular").addEventListener("click", tudo);
