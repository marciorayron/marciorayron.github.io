// Função para atualizar a tabela com base nos valores do formulário
function atualizarTabela() {
  // Obtenha uma referência aos elementos de entrada do formulário
  let formPessoasManingAtual = document.getElementById("formPessoas-maningAtual");
  let formPessoasFaltas = document.getElementById("formPessoas-faltas");
  let formPessoasFerias = document.getElementById("formPessoas-ferias");
  let formPessoasEmprestimos = document.getElementById("formPessoas-emprestimos");

  // Obtenha uma referência às células da tabela "Pessoas"
  let tabMannig = document.getElementById("Tab-mannig");
  let tabFaltas = document.getElementById("tab-Faltas");
  let tabFerias = document.getElementById("tab-Ferias");
  let tabEmprestimos = document.getElementById("tab-Emprestimos");

  // Atualize os valores das células da tabela com base nos valores do formulário
  tabMannig.textContent = formPessoasManingAtual.value;
  tabFaltas.textContent = formPessoasFaltas.value;
  tabFerias.textContent = formPessoasFerias.value;
  tabEmprestimos.textContent = formPessoasEmprestimos.value;

  // Limpe os campos do formulário após a atualização da tabela
  //formPessoasManingAtual.value = "";
  //formPessoasFaltas.value = "";
  //formPessoasFerias.value = "";
  //formPessoasEmprestimos.value = "";
}


function calcularHoras() {
  // Passo 1: Pegar os dados dos inputs e criar variáveis correspondentes
  let pessoa1 = parseFloat(document.getElementById("Tab-mannig").textContent);
  let faltas = parseFloat(document.getElementById("tab-Faltas").textContent);
  let ferias = parseFloat(document.getElementById("tab-Ferias").textContent);
  let emprestimos = parseFloat(document.getElementById("tab-Emprestimos").textContent);

  // Passo 2: Somar faltas e férias
  let totalFaltas = faltas + ferias;

  // Passo 3: Subtrair pessoa1 pelo resultado do passo 2
  let resul1 = pessoa1 - totalFaltas;

  // Passo 4: somar resultado acima com a variavel do input "emprestimos"
  let presentes = resul1 + emprestimos;

  // Passo 5: mostrar o resultado do passo 4 no campo da tabela "presentes"
  document.getElementById("tab-Presentes").textContent = presentes.toFixed(2);

  // Passo 6: Criar a constante "hr2t" e definir seu valor em 7,9
  const hr2t = 7.9;

  // Passo 7: Multiplicar o valor do campo "presentes" por "hr2t" e criar "total-horas"
  let totalHoras = presentes * hr2t;

  // Passo 8: Mostrar o valor de "total-horas" na tabela
  document.getElementById("tab-TotalHRH").textContent = totalHoras.toFixed(2);
}
