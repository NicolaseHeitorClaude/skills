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
            "Como não dá para analisar tudo, escolhemos três áreas: segurança, saúde e educação. Esse diagnóstico é a visão do documento, não uma conclusão nossa. A foto é só um elemento visual trazido pelo grupo; ela não prova apoio nem resultado.",
        ],
        "termos": "Diagnóstico: a leitura dos problemas que justifica as propostas. Desfavelização: nome que o plano dá ao seu projeto urbano para favelas (p. 48).",
        "conferir": "Sumário, p. 2.",
        "transicao": "Gabriela: “Agora o Heitor começa pela segurança, que o plano chama de maior problema do Brasil.”",
    },
    {
        "titulo": "Proposta 1 — Segurança",
        "quem": "Heitor",
        "fala": [
            "Valeu, Gabi. O plano diz que facções como PCC e CV controlam territórios e funcionam quase como governos paralelos, e que as polícias não compartilham dados.",
            "Escolhemos três propostas: integrar inteligência e monitorar portos, aeroportos e fronteiras; cortar o dinheiro das facções, o que o plano chama de asfixia financeira; e isolar as lideranças em presídios de segurança máxima em regiões remotas. O benefício esperado é reduzir o poder de comando das facções.",
            "Mas o capítulo vai além. Ele propõe o Direito Penal do Inimigo, uma teoria do jurista alemão Günther Jakobs que trata membros de facções como “inimigos”, com menos garantias. Também fala em decretos de Estado de Defesa, retirada de direitos políticos e civis de pessoas comprovadamente associadas a facções e inversão do ônus da prova no confisco de bens.",
            "O plano afirma que isso é compatível com a Constituição. Essa é a posição do documento, não uma avaliação jurídica. Por isso a nossa pergunta: como garantir segurança, devido processo legal e proteção de inocentes?",
        ],
        "termos": "Devido processo legal: direito a um processo justo, com defesa e provas. Estado de Defesa: medida excepcional prevista na Constituição que restringe alguns direitos por tempo limitado. Inversão do ônus da prova: a pessoa é que precisa provar que seus bens são lícitos.",
        "conferir": "Problema, p. 11; Direito Penal do Inimigo e Lei Antifacção, p. 12; fronteiras, asfixia financeira e presídios, p. 13.",
        "transicao": None,
    },
    {
        "titulo": "Proposta 2 — Saúde",
        "quem": "Heitor",
        "fala": [
            "Na saúde, o capítulo se chama “SUS Fila Zero”. É o nome do capítulo, não uma garantia de que as filas vão acabar. O problema apontado é a espera de meses e a falta de um prontuário unificado.",
            "A primeira proposta é a ENER, Escala Nacional de Estratificação de Risco. A fila deixaria de ser só por ordem de chegada e passaria a considerar gravidade, risco de piorar, impacto na vida da pessoa, vulnerabilidade social e tempo de espera.",
            "A segunda é o PRONTO, Prontuário Eletrônico Nacional Interoperável. Interoperável quer dizer que sistemas diferentes conseguem trocar informações. A terceira é ampliar a telemedicina e organizar centros regionais para os casos complexos.",
            "O fluxo na tela é um resumo nosso. O benefício esperado é um atendimento mais coordenado. A dúvida é quem paga essa integração e como fica quem não tem internet ou celular.",
        ],
        "termos": "Prontuário: histórico de saúde do paciente. Hub-and-spoke: modelo em que centros regionais (hubs) recebem os casos complexos das cidades menores.",
        "conferir": "ENER e critérios, p. 25; PRONTO, telemedicina, piloto em algumas cidades, meta de 80% de resolução na atenção primária e inspiração no DoctorSV de El Salvador, p. 26.",
        "transicao": "Heitor: “O Nicolas segue com a educação.”",
    },
    {
        "titulo": "Proposta 3 — Educação",
        "quem": "Nicolas",
        "fala": [
            "Obrigado, Heitor. Na educação, o plano aponta dois problemas: a baixa aprendizagem, citando o PISA 2022, em que cerca de 73% dos alunos brasileiros ficaram abaixo do mínimo em matemática, e a violência nas escolas.",
            "Para aprender mais, propõe foco em português e matemática, alfabetização pelo método fônico e levar ao país práticas que deram certo no Ceará. Para a ordem, propõe um código disciplinar nacional e escolas civis-militares nas situações críticas, que o plano chama de medida provisória.",
            "No eixo das oportunidades, o plano propõe acabar com as cotas e criar bolsas de mérito no ensino superior. O benefício esperado é melhorar a aprendizagem e as condições de ensino. A nossa pergunta é: como avaliar mérito sem ignorar que os alunos não partem do mesmo lugar?",
        ],
        "termos": "Método fônico: ensina a relação entre letras e sons. PISA: avaliação internacional de estudantes de 15 anos feita pela OCDE. Cotas: reserva de vagas para grupos com menos acesso ao ensino superior.",
        "conferir": "PISA e problema, p. 30; Ceará, método fônico, código e bolsas de mérito, p. 31; lista de propostas, incluindo abolir as cotas (item 4), p. 32.",
        "transicao": None,
    },
    {
        "titulo": "Relação com a Sociologia",
        "quem": "Nicolas",
        "fala": [
            "Agora, a relação com a Sociologia. Primeiro, o contrato social. Hobbes, Locke e Rousseau pensam de formas diferentes: para Hobbes pesa a proteção; para Locke, os direitos naturais; para Rousseau, a vontade geral. Mas todos discutem por que aceitamos uma autoridade. No plano, isso aparece na segurança: o Estado quer recuperar o controle, e a questão é fazer isso respeitando direitos.",
            "Segundo, democracia e governabilidade. Governabilidade é a capacidade de aprovar e executar políticas, negociando com o Congresso, os estados e a sociedade. Isso é diferente de concentrar poder. Várias propostas dependem de emendas constitucionais e de leis aprovadas.",
            "Terceiro, Pierre Bourdieu e o capital cultural. Os alunos chegam à escola com conhecimentos, hábitos e recursos culturais diferentes, e a escola costuma valorizar os que alguns já trazem de casa. Na nossa interpretação, um sistema só de mérito pode premiar vantagens de origem. Isso é leitura do grupo, não uma opinião de Bourdieu sobre o candidato.",
        ],
        "termos": "Capital cultural: conhecimentos, gostos, linguagem e diplomas que dão vantagem na escola. Referência: Bourdieu e Passeron, A reprodução.",
        "conferir": "Confirmem com a professora se Bourdieu foi estudado em aula. Se não, troquem pelo autor estudado (Habermas ou Bauman).",
        "transicao": "Nicolas: “A Sabrina fecha com a análise crítica.”",
    },
    {
        "titulo": "Análise crítica",
        "quem": "Sabrina",
        "fala": [
            "Obrigada, Nicolas. Algumas coisas ficaram claras: o plano escolhe prioridades, dá nome aos instrumentos, como Lei Antifacção, ENER, PRONTO e código disciplinar, e quer reorganizar o Estado, com mais poder para a União.",
            "Outras precisam de mais detalhe. Nos capítulos que lemos, não encontramos quanto custa cada proposta e de onde viria o dinheiro. O capítulo fiscal traz estimativas de economia (p. 10), mas não as liga a cada proposta. Há metas pontuais, como 80% de resolução na atenção primária (p. 26), mas faltam cronograma e indicadores para a maioria das medidas. Também faltam salvaguardas: como proteger inocentes e quem pode ficar de fora.",
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
            "Para fechar, as fontes. A atividade pede pesquisa no site do TSE, o DivulgaCandContas, onde ficam as candidaturas e os planos registrados. O documento que analisamos é o PDF <i>O Futuro é Glorioso</i>, do Partido Missão. As páginas usadas estão na tela. A referência de Sociologia é <i>A reprodução</i>, de Bourdieu e Passeron, e as fotos foram trazidas pelo grupo.",
            "A pergunta final da professora é: por que é importante conhecer diretamente as propostas de um candidato antes de formar uma opinião sobre elas? A nossa resposta: porque a leitura direta permite comparar propostas, avaliar consequências e formar uma opinião fundamentada, além dos slogans e dos recortes das redes.",
            "Obrigada. Estamos abertos a perguntas.",
        ],
        "termos": "DivulgaCandContas: sistema do TSE com dados de candidaturas, planos de governo e prestação de contas.",
        "conferir": "Antes da entrega, abram o DivulgaCandContas, encontrem a candidatura e confiram se o plano registrado é o mesmo PDF.",
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
