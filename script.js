// Pegar butoes de categoria
const botoes= document.querySelectorAll('.btn-categoria');

// Pegar todas as pizzas
const pizzas = document.querySelectorAll('.pizza');

// Adicionar evento de clique a cada botao
botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        //remover a classe 'ativo' de todos os botoes
        botoes.forEach(b => b.classList.remove('ativo'));
        // adicionar a classe 'ativo' ao botao clicado
        botao.classList.add('ativo');
        // pegar a categoria do botao clicado
        const categoriaEscolhida = botao.dataset.categoria;
        //para cada pizza, mostre ou esconde
        pizzas.forEach(pizza => {
            if(pizza.dataset.categoria ===categoriaEscolhida) {
                pizza.style.display = 'flex';
            } else {
                pizza.style.display = 'none';
            }
        });
    });
});

//Ao carregar a pagina, simular um clique no primeiro botão (o "ativo" por padrão)
document.querySelector('.btn-categoria').click();