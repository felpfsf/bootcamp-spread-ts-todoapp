const formTarefa = document.querySelector("#form-tarefa");
const inputTarefa = document.querySelector("#tarefa-input");
const listaTarefa = document.querySelector("#tarefa-lista");
const tarefa = carregarTarefa();
tarefa.forEach(adicionarLista);
formTarefa?.addEventListener("submit", (err) => {
  err.preventDefault();
  if (inputTarefa?.value == "" || inputTarefa?.value == null)
    return;
  const novaTarefa = {
    titulo: inputTarefa.value,
    concluido: false
  };
  tarefa.push(novaTarefa);
  salvarTarefa();
  adicionarLista(novaTarefa);
  inputTarefa.value = "";
});
function adicionarLista(tarefa2) {
  const itemLista = document.createElement("li");
  const labelLista = document.createElement("label");
  const chkboxLista = document.createElement("input");
  chkboxLista.addEventListener("change", () => {
    tarefa2.concluido = chkboxLista.checked;
    if (chkboxLista.checked == true) {
      labelLista.classList.toggle("tarefa-concluida", true);
    } else {
      labelLista.classList.toggle("tarefa-concluida", false);
    }
    salvarTarefa();
  });
  chkboxLista.type = "checkbox";
  chkboxLista.checked = tarefa2.concluido;
  labelLista.append(chkboxLista, tarefa2.titulo);
  itemLista.append(labelLista);
  listaTarefa?.append(itemLista);
}
function salvarTarefa() {
  localStorage.setItem("TAREFA", JSON.stringify(tarefa));
}
function carregarTarefa() {
  const tarefaJSON = localStorage.getItem("TAREFA");
  if (tarefaJSON == null)
    return [];
  return JSON.parse(tarefaJSON);
}
