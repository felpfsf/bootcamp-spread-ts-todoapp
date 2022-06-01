const formTarefa = document.querySelector<HTMLFormElement>('#form-tarefa')
const inputTarefa = document.querySelector<HTMLInputElement>('#tarefa-input') 
const listaTarefa = document.querySelector<HTMLUListElement>('#tarefa-lista')
const tarefa: Tarefa[] = carregarTarefa()

tarefa.forEach(adicionarLista)

type Tarefa = {
  titulo: string, 
  concluido: boolean,
}

formTarefa?.addEventListener('submit', err => {
  err.preventDefault()

  if(inputTarefa?.value == '' || inputTarefa?.value == null) return

  const novaTarefa: Tarefa = {
    titulo:inputTarefa.value,
    concluido: false,
  }

  tarefa.push(novaTarefa)
  salvarTarefa()

  adicionarLista(novaTarefa)
  inputTarefa.value = ''

})

function adicionarLista(tarefa: Tarefa) {
  const itemLista = document.createElement('li')
  const labelLista = document.createElement('label')
  const chkboxLista = document.createElement('input')

  chkboxLista.addEventListener('change', () => {
    tarefa.concluido = chkboxLista.checked
    if (chkboxLista.checked == true) {
      labelLista.classList.toggle('tarefa-concluida', true)
    } else {
      labelLista.classList.toggle('tarefa-concluida', false)
    }
    salvarTarefa()       
  })
  

  chkboxLista.type = 'checkbox'
  chkboxLista.checked = tarefa.concluido
  labelLista.append(chkboxLista, tarefa.titulo)
  itemLista.append(labelLista)
  listaTarefa?.append(itemLista)


} 

function salvarTarefa() {
  localStorage.setItem('TAREFA', JSON.stringify(tarefa))
}

function carregarTarefa(): Tarefa[] {
  const tarefaJSON = localStorage.getItem('TAREFA')
  if(tarefaJSON == null) return []
  return JSON.parse(tarefaJSON)
}