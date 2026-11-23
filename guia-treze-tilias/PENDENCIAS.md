# Pendências de conferência — uso interno

Nada desta lista aparece no guia público. Quando há dúvida, a interface só esconde a ação afetada.
Fonte dos cadastros: site da Asturtílias (www.trezetilias.com.br), lido em 23/11/2026.
Lista gerada a partir de `tools/places.py` (campos `confirm` e `hide`); a versão de máquina fica em `tools/pendencias.json`.

## 1. Telefones conflitantes (prioridade)

| Cadastro | Conflito | O que o guia faz agora |
|---|---|---|
| Táxi – Sebastião e Táxi – Morais | Os dois têm o mesmo número no site: (49) 9 9828 2723. | Lista os dois sem número nem “Ligar”. |
| Roteiro de cicloturismo (Secretaria de Turismo) | A página de cicloturismo traz (49) 3537 0997; a de contato traz (49) 99164 9034 para a mesma Secretaria. | Esconde o telefone do roteiro. A Secretaria e o CAT continuam com (49) 99164 9034. |
| Strike Boliche Pizzaria | Número com 8 dígitos: (49) 9905-5474. Parece faltar um dígito. | Esconde “Ligar”; mantém o Instagram. |

Também conferir, sem ação escondida:

- Prefeitura: (49) 3536 0166 e (49) 3537 0176. O segundo também aparece como Secretaria de Administração (Parque do Imigrante).
- Asturtílias: a página de telefones mostra “(49) 49 99982 1987” (DDD repetido); a de contato, “+55 49 99982 1987”. O guia usa (49) 99982 1987.

## 2. Localização

| Cadastro | Problema | O que o guia faz agora |
|---|---|---|
| Café Haus | O link de mapa e o Facebook levam a “Alpin Delikatessen Bistrô e Cafeteria”. Confirmar se é o mesmo lugar. | Sem ponto no mapa, sem “Como chegar” e sem Facebook. Mantém telefone, Instagram e endereço. |
| Panificadora Sabor das Tílias | Duas unidades; o ponto do cadastro não diz qual é. | Sem ponto no mapa e sem “Como chegar”. Mostra os dois endereços. |
| Conrado e Katharina Moser | Endereço aparece como Rua Leoberto Leal, 392 e 279; o mapa aponta para o Hotel 13 Linden. | Sem ponto no mapa; endereço sem número. |
| Hospedagem da Oma | O link de mapa leva a uma oficina mecânica. | Sem ponto no mapa. |
| Viena Hospedaria 1 e 2 | Os links de mapa das duas unidades estão trocados ou ambíguos. | Sem ponto no mapa. |
| Trudi Haus | O link de mapa leva ao Minigolf. | Sem ponto no mapa. |
| Cabana Refúgio Alpino | O link de mapa leva ao Eiskaffee Trudi. | Sem ponto no mapa. |

## 3. Outros dados

- Hotel Tirol: dois e-mails no site (reservas@hotelstirol… e reservas@hoteltirol.com.br). O guia esconde o e-mail.
- Pousada Adler: “1,4 m da Prefeitura” (provavelmente 1,4 km). O guia esconde a distância.
- LindenBier: Rua Videira, 585; o Park Hotel, no mesmo complexo, é Rua Videira, 55. O guia mostra a rua sem número.
- Gästehaus Enzien: o cadastro escreve “Enzien”; o mapa e o Instagram, “Enzian”.
- Café Haus: o cadastro não tem descrição nem horário.
- Esquina do Artesanato: o site lista 26 artesãos com contatos pessoais. Decidir se ganham fichas individuais.
- Ferramenta de Viagem (“Turista Fácil”): não foi possível abrir no guia atual. Confirmar o que faz e o link direto.

## 4. Categorias retiradas até confirmação

Associações feitas por suposição foram retiradas. Para devolver, basta incluir a categoria em `tools/places.py`.

- Espaço Infantil (ficou vazio): Parque Aquático, Parque Lindendorf, Minigolf, Strike Boliche.
- Espaço de Eventos: Treze Tílias Park Hotel. Permanece o Espaço Diversittá, que se descreve como “Restaurante e Eventos”.
- Roteiro Cervejeiro: Restaurante Edelweiss (Bierbaum) e Stube. Continuam a Cervejaria Bierbaum e a Pubi Bier.
- Turismo Rural: Pousada Kuh Haus, Sítio Hartmann, Pousada Nova Áustria, Associação dos Produtores Rurais.
- Pousadas e Hospedarias: Pousada Adler (o site a lista em Hotéis).
- Campings: Villa Grüntal Hospedaria (o camping tem ficha própria).
- Receptivo Turístico: Hospedaria Felder (Felder Viagens).
- Entidades: Asturtílias, CAT e Secretaria de Turismo (seguem em Telefones Úteis).
- Chocolaterias (Chocolates Treze Tílias e Sabor dos Alpes): sem categoria no guia atual. Aparecem na busca como “Chocolateria”, mas em nenhum caminho.

## 5. Endereços antigos

- Confirmados: `/local/45/…` = Monumento Águia do Tirol; `/local/131/…` = Café Haus.
- Outro ID antigo abre a busca pelo nome que vem no endereço, sem afirmar correspondência.
- Para acrescentar: o campo `legacy=[ID]` no cadastro em `tools/places.py`.

## 6. Tour 360°

- Águia do Tirol: panorama do Street View `tehZZ-L6Gfa10ggdnzko3A` (imagem de 2019), conferido no navegador. A águia aparece entre 165° e 215°; o link abre em 185°.

## 7. Imagens

- Hospedaria Felder: a foto do cadastro retornou 403 no CDN do Wix.
- Logo: recortada do JPG oficial. Um SVG ou PNG em alta resolução melhoraria a nitidez no cabeçalho.
