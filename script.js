const botaoAdicionarNota = document.getElementById("adicionar");

const novaNota = document.getElementById('area-de-texto')

const listaDeTextos = JSON.parse(localStorage.getItem('textosSalvos'));
if (listaDeTextos){
  for (textoRecuperado of listaDeTextos) {
    adicionarNota(textoRecuperado);
  }
}

function adicionarNota(textoParametro=''){
   const nota = document.createElement('div');

 nota.innerHTML = `
  <div class="cabecalho">
    <button class="editar">🖊️</button>
    <button class="apagar">🗑️</button>
  </div>
  <div class="area-nota">
    <p class="area-futura-nota esconde"></p>
    <textarea class="texto-nota"></textarea>
  </div>
`  
  document.body.appendChild(nota);

  const textoPrincipal = nota.querySelector('.texto-nota')
  if (textoParametro !== '') {
    textoPrincipal.value = textoParametro;
  }
  
  const areaFuturaNota = nota.querySelector('.area-futura-nota')
  const botaoEditar = nota.querySelector(".editar");
  
  
  botaoEditar.addEventListener('click', () => {
    if (textoPrincipal.value !== '') {
      areaFuturaNota.innerHTML = textoPrincipal.value
      areaFuturaNota.classList.toggle('esconde')
      textoPrincipal.classList.toggle('esconde')
      salvarNotas();
    } else {
      console.log('nota vazia, não preciso salvá-la')
    }
  
  })
  
  const botaoApagar = nota.querySelector(".apagar");
  botaoApagar.addEventListener('click', () => {
    nota.remove();
    salvarNotas();
  })
} 

 botaoAdicionarNota.addEventListener('click', () => adicionarNota());


function salvarNotas() {
  const listaDeNotas = document.querySelectorAll('textarea');
  const listaDeTextos = [] // lista vazia

  for (nota of listaDeNotas) {
    const texto = nota.value
    listaDeTextos.push(texto)
  }
  
localStorage.setItem('textosSalvos', JSON.stringify(listaDeTextos));
}