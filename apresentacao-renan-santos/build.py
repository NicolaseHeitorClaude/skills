#!/usr/bin/env python3
"""Gera a apresentação autossuficiente e o roteiro oral.

Entradas:  src/deck.html, assets/img/*, assets/fonts/*, e as notas abaixo.
Saídas:    index.html            (arquivo único, abre offline em qualquer navegador)
           dist/fragment.html    (mesmo conteúdo sem <html>/<head>, para publicação como Artifact)
           ROTEIRO.md            (roteiro oral separado, dividido entre os integrantes)

Uso:  python3 build.py
"""
import base64
import html
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent

NOTAS = [
    {
        "titulo": "Capa",
        "quem": "Gabriela",
        "fala": [
            "Bom dia, professora e turma. Nós somos Gabriela, Heitor, Nicolas e Sabrina. O nosso trabalho analisa o plano de governo de Renan Santos, candidato do Partido Missão à Presidência da República nas eleições de 2026.",
            "O documento que lemos se chama <i>O Futuro é Glorioso</i>. Ele é um resumo executivo do Livro Amarelo, que é o plano completo do partido.",
            "A pergunta que guia a apresentação é: que Brasil este plano propõe? Vamos explicar algumas propostas, mostrar o benefício que o próprio plano espera e as dúvidas que surgiram para o grupo. É uma análise de Sociologia, não uma atividade de campanha.",
        ],
        "termos": "Plano de governo: documento com as propostas do candidato, que acompanha o registro da candidatura no TSE.",
        "conferir": "Título na p. 1; o resumo diz que o livro completo tem mais de 500 páginas (p. 5).",
        "transicao": None,
    },
    {
        "titulo": "Diagnóstico e áreas do plano",
        "quem": "Gabriela",
        "fala": [
            "O plano começa com um diagnóstico, ou seja, os problemas que ele considera mais graves. Destacamos cinco: o desequilíbrio das contas públicas (p. 9), o crime organizado (p. 11), os gargalos de infraestrutura (p. 23), as barreiras de acesso à saúde (p. 25) e a baixa aprendizagem com violência nas escolas (pp. 30–31).",
            "O documento também trata de pacto federativo, gestão pública, cultura, indústria e terras raras, agricultura, política externa e desfavelização.",
            "Como não dá para analisar tudo, escolhemos quatro áreas: economia, segurança, saúde e educação. Esse diagnóstico é a visão do documento, não uma conclusão nossa. A foto é só um elemento visual trazido pelo grupo; ela não prova apoio nem resultado.",
        ],
        "termos": "Diagnóstico: a leitura dos problemas que justifica as propostas. Desfavelização: nome que o plano dá ao seu projeto urbano para favelas (p. 48).",
        "conferir": "Sumário, p. 2.",
        "transicao": None,
    },
    {
        "titulo": "Economia — problema e proposta",
        "quem": "Gabriela",
        "fala": [
            "Começamos pela economia, porque o próprio plano diz que as outras propostas dependem das contas em ordem. O problema apontado é o desequilíbrio das contas públicas: as despesas obrigatórias crescem acima do limite do arcabouço fiscal e, segundo o documento, sobra pouco para investir (p. 9).",
            "A proposta central é uma PEC de ajuste fiscal, que o plano chama de PEC do Equilíbrio Fiscal. Ela inclui revisar benefícios fiscais e o abono salarial. O plano também quer acabar com os supersalários e mudar as emendas parlamentares (p. 10).",
            "O benefício pretendido é abrir espaço no orçamento para investimentos e deixar as contas mais sustentáveis. O diagrama embaixo mostra a lógica do plano: rever despesas, reorganizar o orçamento e ampliar a capacidade de investir. Isso é o que o plano espera; os efeitos dependem de o Congresso aprovar e de a medida ser bem executada.",
        ],
        "termos": "Ajuste fiscal: mudanças nas receitas e nas despesas para equilibrar as contas. PEC: Proposta de Emenda à Constituição; precisa de 3/5 dos votos na Câmara e no Senado, em dois turnos. Benefícios fiscais: isenções e reduções de impostos que diminuem a arrecadação (o plano fala em “renúncias fiscais” ou “gastos tributários”). Abono salarial: benefício anual pago a trabalhadores formais de baixa renda. Supersalários: salários de servidores acima do teto. Emendas parlamentares: parte do orçamento indicada por deputados e senadores.",
        "conferir": "Problema e números do déficit e da dívida, p. 9; PEC do Equilíbrio Fiscal e medidas do CDPP, p. 10.",
        "transicao": "Gabriela: “O ajuste também tem consequências sociais. O Heitor explica quais.”",
    },
    {
        "titulo": "Economia — escolhas e impactos",
        "quem": "Heitor",
        "fala": [
            "Valeu, Gabi. A PEC tem duas medidas que mexem diretamente com a vida das pessoas.",
            "A primeira: aposentadorias e benefícios assistenciais deixariam de ser reajustados pelo salário mínimo e passariam a ser corrigidos só pela inflação. A correção pela inflação preserva o poder de compra, mas, se o salário mínimo tiver aumento real, o benefício não acompanha.",
            "A segunda: os pisos de saúde e educação deixariam de ser ligados à receita. Hoje existe um gasto mínimo calculado sobre o que o governo arrecada. Desvincular muda essa regra; não quer dizer acabar com o SUS nem com a escola pública, nem zerar esses gastos.",
            "O argumento a favor é ter mais flexibilidade para organizar o orçamento. O plano cita uma economia de R$ 1,1 trilhão até 2031, mas é uma projeção do documento, não um resultado. A nossa pergunta: como equilibrar as contas sem prejudicar a proteção social e a qualidade dos serviços?",
        ],
        "termos": "Desindexar: deixar de corrigir um valor automaticamente por outro índice, aqui o salário mínimo. Aumento real: reajuste acima da inflação. Piso constitucional: gasto mínimo obrigatório, hoje ligado à receita, em saúde e educação.",
        "conferir": "Desindexação, desvinculação dos pisos e estimativa de R$ 1,1 trilhão até 2031, p. 10; crescimento de cerca de 6% ao ano dos gastos com Previdência e Assistência, p. 9.",
        "transicao": "Heitor: “Agora a segurança, que o plano chama de maior problema do Brasil.”",
    },
    {
        "titulo": "Segurança",
        "quem": "Heitor",
        "fala": [
            "O plano diz que facções como PCC e CV controlam territórios e funcionam quase como governos paralelos, e que as polícias não compartilham dados.",
            "Escolhemos três propostas: integrar inteligência e monitorar portos, aeroportos e fronteiras; cortar o dinheiro das facções, o que o plano chama de asfixia financeira; e isolar as lideranças em presídios de segurança máxima em regiões remotas. O benefício esperado é reduzir o poder de comando das facções.",
            "Mas o capítulo vai além. Ele propõe o Direito Penal do Inimigo, uma teoria do jurista alemão Günther Jakobs que trata membros de facções como “inimigos”, com menos garantias. Também fala em decretos de Estado de Defesa, retirada de direitos políticos e civis de pessoas comprovadamente associadas a facções e inversão do ônus da prova no confisco de bens.",
            "O plano afirma que isso é compatível com a Constituição. Essa é a posição do documento, não uma avaliação jurídica. Por isso a nossa pergunta: como garantir segurança, devido processo legal e proteção de inocentes?",
        ],
        "termos": "Devido processo legal: direito a um processo justo, com defesa e provas. Estado de Defesa: medida excepcional prevista na Constituição que restringe alguns direitos por tempo limitado. Inversão do ônus da prova: a pessoa é que precisa provar que seus bens são lícitos.",
        "conferir": "Problema, p. 11; Direito Penal do Inimigo e Lei Antifacção, p. 12; fronteiras, asfixia financeira e presídios, p. 13.",
        "transicao": "Heitor: “O Nicolas segue com saúde e educação.”",
    },
    {
        "titulo": "Saúde",
        "quem": "Nicolas",
        "fala": [
            "Obrigado, Heitor. Na saúde, o capítulo se chama “SUS Fila Zero”. É o nome do capítulo, não uma garantia de que as filas vão acabar. O problema apontado é a espera de meses e a falta de um prontuário unificado.",
            "A primeira proposta é a ENER, Escala Nacional de Estratificação de Risco. A fila deixaria de ser só por ordem de chegada e passaria a considerar gravidade, risco de piorar, impacto na vida da pessoa, vulnerabilidade social e tempo de espera.",
            "A segunda é o PRONTO, Prontuário Eletrônico Nacional Interoperável. Interoperável quer dizer que sistemas diferentes conseguem trocar informações. A terceira é ampliar a telemedicina e organizar centros regionais para os casos complexos.",
            "O fluxo na tela é um resumo nosso. O benefício esperado é um atendimento mais coordenado. A dúvida é quem paga essa integração e como fica quem não tem internet ou celular. E isso se liga à economia: com os pisos desvinculados, o financiamento da saúde passa a depender mais das escolhas de cada orçamento.",
        ],
        "termos": "Prontuário: histórico de saúde do paciente. Hub-and-spoke: modelo em que centros regionais (hubs) recebem os casos complexos das cidades menores.",
        "conferir": "ENER e critérios, p. 25; PRONTO, telemedicina, piloto em algumas cidades, meta de 80% de resolução na atenção primária e inspiração no DoctorSV de El Salvador, p. 26.",
        "transicao": None,
    },
    {
        "titulo": "Educação",
        "quem": "Nicolas",
        "fala": [
            "Na educação, o plano aponta dois problemas: a baixa aprendizagem, citando o PISA 2022, em que cerca de 73% dos alunos brasileiros ficaram abaixo do mínimo em matemática, e a violência nas escolas.",
            "Para aprender mais, propõe foco em português e matemática, alfabetização pelo método fônico e levar ao país práticas que deram certo no Ceará. Para a ordem, propõe um código disciplinar nacional e escolas civis-militares nas situações críticas, que o plano chama de medida provisória.",
            "No eixo das oportunidades, o plano propõe acabar com as cotas e criar bolsas de mérito no ensino superior. O benefício esperado é melhorar a aprendizagem e as condições de ensino. A nossa pergunta é: como avaliar mérito sem ignorar que os alunos não partem do mesmo lugar?",
        ],
        "termos": "Método fônico: ensina a relação entre letras e sons. PISA: avaliação internacional de estudantes de 15 anos feita pela OCDE. Cotas: reserva de vagas para grupos com menos acesso ao ensino superior.",
        "conferir": "PISA e problema, p. 30; Ceará, método fônico, código e bolsas de mérito, p. 31; lista de propostas, incluindo abolir as cotas (item 4), p. 32.",
        "transicao": "Nicolas: “A Sabrina relaciona tudo isso com a Sociologia.”",
    },
    {
        "titulo": "Relação com a Sociologia",
        "quem": "Sabrina",
        "fala": [
            "Obrigada, Nicolas. Primeiro, democracia e governabilidade. Governabilidade é a capacidade de aprovar e executar políticas, negociando com o Congresso, os estados e a sociedade. Isso é diferente de concentrar poder. E o orçamento é onde isso aparece: decidir quanto vai para aposentadorias, saúde, educação ou investimento é uma escolha política sobre direitos e prioridades. Por isso a PEC fiscal, assim como a Lei Antifacção, depende do Congresso.",
            "Segundo, o contrato social. Hobbes, Locke e Rousseau pensam de formas diferentes: para Hobbes pesa a proteção; para Locke, os direitos naturais; para Rousseau, a vontade geral. Na segurança, a questão é recuperar o controle respeitando direitos.",
            "Terceiro, Pierre Bourdieu e o capital cultural. Os alunos chegam à escola com conhecimentos e recursos culturais diferentes, e a escola costuma valorizar os que alguns já trazem de casa. Na nossa interpretação, um sistema só de mérito pode premiar vantagens de origem. Isso é leitura do grupo, não uma opinião de Bourdieu sobre o candidato.",
        ],
        "termos": "Capital cultural: conhecimentos, gostos, linguagem e diplomas que dão vantagem na escola. Referência: Bourdieu e Passeron, A reprodução.",
        "conferir": "Hobbes, Locke, Rousseau e Bourdieu estão entre os autores estudados em aula. A professora pede ao menos um entre Habermas, Bauman e Bourdieu: o nosso é Bourdieu.",
        "transicao": None,
    },
    {
        "titulo": "Análise crítica",
        "quem": "Sabrina",
        "fala": [
            "Algumas coisas ficaram claras: o plano escolhe prioridades, dá nome aos instrumentos, como a PEC do Equilíbrio Fiscal, a Lei Antifacção, a ENER, o PRONTO e o código disciplinar, e quer reorganizar o Estado, com mais poder para a União.",
            "Outras precisam de mais detalhe. A PEC traz uma estimativa de economia (p. 10), mas não encontramos quanto custa cada proposta nem de onde viria o dinheiro de cada uma. Também falta mostrar o impacto do ajuste sobre aposentados, beneficiários e serviços de saúde e educação. Há metas pontuais, como 80% de resolução na atenção primária (p. 26), mas faltam cronograma e indicadores para a maioria das medidas, além de salvaguardas de direitos.",
            "Lembrando: lemos o resumo. O livro completo tem mais de 500 páginas e pode trazer mais detalhes. A nossa pergunta para o candidato é a da faixa amarela.",
        ],
        "termos": "Indicador: número usado para medir se uma política funcionou. Salvaguarda: regra que protege direitos durante a execução de uma política.",
        "conferir": "Estimativa da PEC do Equilíbrio Fiscal (R$ 1,1 trilhão até 2031), p. 10; meta de 80%, p. 26; prazos processuais de 30 e 60 dias, p. 12.",
        "transicao": None,
    },
    {
        "titulo": "Fontes e reflexão final",
        "quem": "Sabrina",
        "fala": [
            "Para fechar, as fontes. A atividade pede pesquisa no site oficial do TSE: consultamos em 9 de novembro a página “Renan Santos — Propostas de Governo”, que organiza as propostas por tema e indica as páginas do plano. O documento que analisamos é o PDF <i>O Futuro é Glorioso</i>, do Partido Missão; as páginas usadas, incluindo o ajuste fiscal nas páginas 9 e 10, estão na tela. A referência de Sociologia é <i>A reprodução</i>, de Bourdieu e Passeron, e as fotos foram trazidas pelo grupo.",
            "A pergunta final da professora é: por que é importante conhecer diretamente as propostas de um candidato antes de formar uma opinião sobre elas? A nossa resposta: porque a leitura direta permite comparar propostas, avaliar consequências e formar uma opinião fundamentada, além dos slogans e dos recortes das redes.",
            "Obrigada. Estamos abertos a perguntas.",
        ],
        "termos": "TSE: Tribunal Superior Eleitoral, que registra as candidaturas e publica os planos de governo.",
        "conferir": "Página do TSE consultada pelo grupo em 9 nov. 2026. As páginas que ela indica para economia (pp. 9–10), segurança (pp. 11–13), saúde (pp. 25–26) e educação (pp. 30–32) coincidem com as do PDF usado.",
        "transicao": None,
    },
]



def data_uri(path: pathlib.Path) -> str:
    mime = {".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".woff2": "font/woff2"}[path.suffix]
    return f"data:{mime};base64," + base64.b64encode(path.read_bytes()).decode()


def inline_assets(text: str) -> str:
    def repl(m):
        return data_uri((ROOT / "src" / m.group(1)).resolve())
    return re.sub(r"(\.\./assets/[\w/.-]+)", repl, text)


def main():
    src = (ROOT / "src" / "deck.html").read_text(encoding="utf-8")
    notes_json = json.dumps(NOTAS, ensure_ascii=False).replace("</", "<\\/")
    src = src.replace("{{NOTES_JSON}}", notes_json)
    src = inline_assets(src)

    (ROOT / "dist").mkdir(exist_ok=True)
    (ROOT / "dist" / "fragment.html").write_text(src, encoding="utf-8")

    head, body = src.split("<!--BODY-->", 1)
    page = (
        '<!doctype html>\n<html lang="pt-BR">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        + head + "\n</head>\n<body>\n" + body + "\n</body>\n</html>\n"
    )
    (ROOT / "index.html").write_text(page, encoding="utf-8")

    strip = lambda s: html.unescape(re.sub(r"<[^>]+>", "", s))
    lines = [
        "# Roteiro oral — Plano de governo de Renan Santos (Partido Missão)",
        "",
        "Sociologia — 2º ano · Gabriela, Heitor, Nicolas e Sabrina",
        "",
        "Cerca de 45–60 segundos por slide. Use como guia e fale com as próprias palavras; não leia a tela.",
        "Separe sempre: **o que o plano diz** (problema e proposta), **o benefício que o plano espera** e **a análise do grupo**.",
        "",
    ]
    for i, n in enumerate(NOTAS, 1):
        lines += [f"## Slide {i} — {n['titulo']}", f"**{n['quem']}**", ""]
        lines += [strip(p) + "\n" for p in n["fala"]]
        if n["termos"]:
            lines += [f"- *Termos:* {strip(n['termos'])}"]
        if n["conferir"]:
            lines += [f"- *Conferir no PDF:* {strip(n['conferir'])}"]
        if n["transicao"]:
            lines += [f"- *Transição:* {strip(n['transicao'])}"]
        lines += [""]
    (ROOT / "ROTEIRO.md").write_text("\n".join(lines), encoding="utf-8")
    print("ok:", (ROOT / "index.html").stat().st_size, "bytes")


if __name__ == "__main__":
    main()
