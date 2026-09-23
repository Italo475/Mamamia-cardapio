// Pegar butoes de categoria
const botoes= document.querySelectorAll('.btn-categoria');

// Pegar todas as pizzas
const pizzas = document.querySelectorAll('.pizza');

// Tempo das animações, lido do style.css para o JS e o CSS nunca
// ficarem fora de sincronia
const VAR_DURACAO_SAIDA = '--duracao-card-saida';
const DURACAO_PADRAO_MS = 300;
const INTERVALO_ENTRADA_MS = 60;

function lerDuracaoEmMs(variavelCss) {
    const valor = getComputedStyle(document.documentElement)
        .getPropertyValue(variavelCss)
        .trim();

    if (!valor) {
        return DURACAO_PADRAO_MS;
    }

    return valor.endsWith('ms') ? parseFloat(valor) : parseFloat(valor) * 1000;
}

// Coloca o card de volta no grid e anima a entrada dele
function mostrarPizza(pizza) {
    pizza.classList.remove('oculto', 'saindo');
    pizza.classList.add('entrando');

    // Força o navegador a aplicar o estado "fora de posição" antes de animar
    // de volta, senão a transição nem chega a rodar
    void pizza.offsetWidth;

    pizza.classList.remove('entrando');
}

// Adicionar evento de clique a cada botao
botoes.forEach(botao => {

    botao.addEventListener('click', () => {
    
        //remover a classe 'ativo' de todos os botoes
        botoes.forEach(b => b.classList.remove('ativo'));
    
        // adicionar a classe 'ativo' ao botao clicado
        botao.classList.add('ativo');
    
        // pegar a categoria do botao clicado
        const categoriaEscolhida = botao.dataset.categoria;

        // tempo que o JS espera para o grid mudar de verdade
        const duracaoSaida = lerDuracaoEmMs(VAR_DURACAO_SAIDA);
    
        //para cada pizza, mostre ou esconde
        pizzas.forEach(pizza => {

            clearTimeout(pizza.timer);
            
            if(pizza.dataset.categoria === categoriaEscolhida) {

                const estaNaTela = !pizza.classList.contains('oculto');

                if (estaNaTela) {
                    // Já estava aparecendo: cancela uma saída pela metade
                    pizza.classList.remove('saindo');
                    return;
                }

                // O card só entra no grid depois que a saída termina, senão
                // o grid se reorganiza no meio da animação
                pizza.classList.add('entrando');

                pizza.timer = setTimeout(() => {
                    pizza.timer = null;
                    mostrarPizza(pizza);
                }, duracaoSaida);
    
            } else {
                
                if (pizza.classList.contains('oculto')) {
                    return;
                }

                // O card continua no grid durante a animação, para os outros
                // não pularem de lugar antes da saída acabar
                pizza.classList.add('saindo');

                pizza.timer = setTimeout(() => {
                    pizza.classList.remove('saindo');
                    pizza.classList.add('oculto');
                }, duracaoSaida);
            }
        });
    });
});

// Ao carregar a pagina, deixa na tela só a categoria do botão que já vem
// marcado como "ativo", com uma entrada suave
function iniciar() {
    const categoriaInicial = document.querySelector('.btn-categoria.ativo').dataset.categoria;

    pizzas.forEach(pizza => {
        if (pizza.dataset.categoria !== categoriaInicial) {
            // Começa fora do grid, sem animação nenhuma
            pizza.classList.add('oculto');
            return;
        }

        // Começa fora de posição, para poder entrar animando
        pizza.classList.add('entrando');
    });

    let posicao = 0;

    pizzas.forEach(pizza => {
        if (pizza.dataset.categoria !== categoriaInicial) {
            return;
        }

        pizza.timer = setTimeout(() => mostrarPizza(pizza), posicao * INTERVALO_ENTRADA_MS);
        posicao++;
    });
}

iniciar();
