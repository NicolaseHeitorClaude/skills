# Que Brasil este plano propõe? — Apresentação de Sociologia

Análise do plano de governo de Renan Santos (Partido Missão, Eleições 2026).
Grupo: Gabriela, Heitor, Nicolas e Sabrina — 2º ano.

## Abrir

Abra `index.html` com dois cliques (Chrome, Edge ou Firefox). O arquivo é único: imagens e fontes estão embutidas, então funciona sem internet e pode ser copiado para um pendrive.

## Apresentar

| Ação | Teclado / controle |
|---|---|
| Próximo / anterior | → ← (ou PageDown / PageUp, Espaço) |
| Primeiro / último | Home / End |
| Ir para um slide | botões 01–10 na barra inferior |
| Tela cheia | F ou botão ⛶ |
| Notas do apresentador | N ou botão “Notas” (**aparecem na tela compartilhada**) |

No celular, deslize para os lados ou use as setas da barra; cada slide rola na vertical.
Para falar com notas sem mostrá-las, use `ROTEIRO.md` em outro aparelho.

## Salvar em PDF

1. Clique em **PDF** na barra (ou Ctrl+P / Cmd+P).
2. Destino: **Salvar como PDF**.
3. Em “Mais configurações”, marque **Gráficos de plano de fundo** (sem isso, o preto e o amarelo somem).
4. Margens: **Nenhuma**. O resultado tem 10 páginas horizontais, uma por slide, sem animações.

Não há exportação para PowerPoint.

## Movimento

Três tipos de transição, escolhidos pela composição (sem biblioteca externa; funciona offline):

- **Máscara** (slides com foto): um véu amarelo atravessa a área da foto, a imagem aparece logo atrás dele com uma leve aproximação, e os títulos sobem linha a linha por uma área de recorte.
- **Passagem editorial** (só nas mudanças de parte: 2→3, 4→5 e 7→8): uma faixa amarela atravessa a tela e revela o slide seguinte.
- **Camadas** (slides de conteúdo): fundo, número, título e blocos se deslocam com distâncias e tempos diferentes, criando profundidade.

Ao voltar, a direção se inverte. O texto fica pronto para leitura em cerca de 1,3 s e depois tudo fica parado. Apertar as setas rapidamente interrompe a troca anterior, sem acumular animações. Com “reduzir movimento” ativado no sistema, a troca vira só um esmaecimento rápido.

## Editar

O texto fica em `src/deck.html` e as notas em `build.py`. Depois de editar, rode `python3 build.py` para gerar de novo `index.html` e `ROTEIRO.md`.

## Pendências antes da entrega

- **TSE:** a professora exige pesquisa no DivulgaCandContas (https://divulgacandcontas.tse.jus.br/divulga/). A consulta automática foi bloqueada pelo site, então ela **não foi feita**. Abram o site, escolham Eleições 2026 → Presidente → Renan Santos, baixem o plano registrado e confiram se é o mesmo PDF e se as páginas citadas batem.
- **Autor estudado:** confirmem se Bourdieu foi trabalhado em aula. Se não, troquem pelo autor estudado (Habermas ou Bauman) no slide 8.
