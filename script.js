
const inicioEl = document.getElementById("inicio");
const fimEl = document.getElementById("fim");
const dataEl = document.getElementById("data");
const turnoEl = document.getElementById("turno");
const listaTurnos = document.getElementById("lista-turnos");
const nomesContainer = document.getElementById("nomes-container");

function adicionarNome() {
  const input = document.createElement("input");
  input.type = "text";
  input.className = "nome";
  input.placeholder = "novo nome";
  input.style.marginTop = "6px";
  nomesContainer.appendChild(input);
}

function limpar(){
    if (confirm("Deseja realmente apagar todos os turnos salvos?")) {
        // Seleciona a div que contém a lista e apaga todo o conteúdo interno
        document.getElementById("lista-turnos").innerHTML = "";
    }
}

function adicionarTurno() {
  const nomes = [...document.querySelectorAll(".nome")]
    .map(n => n.value.trim())
    .filter(Boolean);

  if (!nomes.length || !inicioEl.value || !fimEl.value || !dataEl.value || !turnoEl.value) {
    alert("Preencha todos os campos, Por gentileza");
    return;
  }

  const div = document.createElement("div");
  div.className = "turno";
  div.innerHTML = `
    <div class="turno-info">❄️ Turno ${turnoEl.value} • ${new Date(dataEl.value).toLocaleDateString("pt-BR")}</div>
    <div class="nomes">${nomes.map(n => `<div>${n}</div>`).join("")}</div>
    <div>🕒 ${inicioEl.value} às ${fimEl.value}</div>
  `;
  listaTurnos.appendChild(div);

  nomesContainer.innerHTML = '<input type="text" class="nome" placeholder="Ex: Carla Fabiana">';
  inicioEl.value = fimEl.value = dataEl.value = turnoEl.value = "";
}

function gerarImagem() {
  // Nota: html2canvas precisa estar carregado no HTML antes deste script ser chamado
  html2canvas(document.getElementById("area-foto"), { scale: 2 }).then(canvas => {
    const link = document.createElement("a");
    link.download = "turnos-natal-azul.jpg";
    link.href = canvas.toDataURL("image/jpeg", 0.9);
    link.click();
  });
}

function criarNeve() {
  const floco = document.createElement("div");
  floco.classList.add("neve");
  floco.innerHTML = "❄";
  floco.style.left = Math.random() * window.innerWidth + "px";
  floco.style.fontSize = Math.random() * 12 + 10 + "px";
  floco.style.animationDuration = Math.random() * 5 + 5 + "s";
  document.body.appendChild(floco);
  setTimeout(() => floco.remove(), 10000);
}

setInterval(criarNeve, 300);

function atualizarSaudacao() {
    const agora = new Date();
    const hora = agora.getHours();
    let saudacao = "";

    if (hora >= 5 && hora < 12) {
        saudacao = "Bom dia ☀️";
    } else if (hora >= 12 && hora < 18) {
        saudacao = "Boa tarde 🌤️";
    } else {
        saudacao = "Boa noite ✨";
    }

    // Procura o elemento de título para inserir a saudação
    const titulo = document.querySelector('h1 span');
    if (titulo) {
        titulo.innerHTML = `${saudacao} • Natal Azul & Branco`;
    }
}

// Executa a função assim que a página carregar
window.onload = atualizarSaudacao;
