# Cadastros curados a partir do site da Asturtílias (www.trezetilias.com.br), lido em 23/11/2026.
# Coordenadas: só quando o link de mapa do próprio cadastro aponta para o lugar pelo nome
# (ou é um alfinete colocado pelo cadastro). Campos ausentes = o cadastro não traz o dado.
# photo = id do arquivo no Wix da Asturtílias. confirm = o que precisa de confirmação.

CATEGORIES = [
    # id original, nome original, slug, grupo
    (1, "Hotéis", "hoteis", "ficar"),
    (2, "Pousadas e Hospedarias", "pousadas-e-hospedarias", "ficar"),
    (25, "Campings Treze Tílias", "campings", "ficar"),
    (3, "Gastronomia", "gastronomia", "comer"),
    (24, "Roteiro Cervejeiro", "roteiro-cervejeiro", "comer"),
    (4, "Atrativos Turísticos", "atrativos-turisticos", "fazer"),
    (5, "Escultores", "escultores", "fazer"),
    (6, "Artesanato", "artesanato", "fazer"),
    (7, "Turismo Rural", "turismo-rural", "fazer"),
    (8, "Cicloturismo", "cicloturismo", "fazer"),
    (27, "Espaço Infantil", "espaco-infantil", "fazer"),
    (10, "Guias de Turismo", "guias-de-turismo", "planejar"),
    (9, "Receptivo Turístico", "receptivo-turistico", "planejar"),
    (26, "Espaço de Eventos", "espaco-de-eventos", "planejar"),
    (28, "Ferramenta de Viagem", "ferramenta-de-viagem", "planejar"),
    (20, "Telefones Úteis", "telefones-uteis", "uteis"),
    (11, "Entidades", "entidades", "uteis"),
]

GROUPS = [
    ("fazer", "O que fazer", "Atrativos, ateliês, artesanato e passeios pelo interior"),
    ("comer", "Onde comer e beber", "Cozinha típica, cafés e o roteiro cervejeiro"),
    ("ficar", "Onde ficar", "Hotéis, pousadas, hospedarias e campings"),
    ("planejar", "Planejar a visita", "Guias, passeios receptivos, eventos e ferramentas"),
    ("uteis", "Informações úteis", "Telefones de serviço, atendimento ao turista e entidades"),
]

P = []
def add(**k): P.append(k)

# ---------------- Onde ficar: hotéis ----------------
add(id="hotel-13-linden", name="Hotel 13 Linden", cats=[1], photo="313f8c_aae4743f953a40bd8584cd35cc5e52b3~mv2.jpg",
    address="Rua Pedro Nelcido Käfer, 392", district="Centro", ref="350 m da Prefeitura Municipal",
    phones=["(49) 3537 0297"], email="reservas@hotel13linden.com.br", site="http://www.hotel13linden.com.br",
    instagram="https://www.instagram.com/hotel13linden/", facebook="https://www.facebook.com/hotel13linden/",
    map="https://goo.gl/maps/7NhZTF2P7ZJdQbJP6", coords=(-27.0004711, -51.4043121))
add(id="hotel-alpenrose", name="Hotel Alpenrose", cats=[1], photo="313f8c_791cb9c33fa84ab6b8f43ef369b9025f~mv2.png",
    address="Avenida Afonso Dresch, 340", district="Centro", ref="500 m da Prefeitura Municipal",
    phones=["(49) 3537 0273"], email="reservas@hotelalpenrose.com.br", site="http://www.hotelalpenrose.com.br",
    instagram="https://instagram.com/hotel.alpenrose",
    map="https://goo.gl/maps/wz8pyDNN67qcmbZj8", coords=(-26.9970245, -51.4098858))
add(id="hotel-schneider", name="Hotel Schneider", cats=[1], photo="313f8c_2dc852eb968d4d5f82f798972bd2418d~mv2.jpg",
    address="Rodovia dos Pioneiros", ref="2,0 km da Prefeitura Municipal",
    phones=["(49) 3537 0184"], email="contato@hotelschneider.com.br", site="http://www.hotelschneider.com.br",
    instagram="https://www.instagram.com/hotelschneideremtrezetilias/",
    map="https://goo.gl/maps/f7ja3NM1EAXHd3hi7", coords=(-27.009144, -51.3925761))
add(id="hotel-tirol", name="Hotel Tirol", cats=[1, 3], photo="313f8c_ef69e7bee96d45b8a443b30a7875719e~mv2.png",
    summary="Hotel no centro, com restaurante de buffet de saladas e comidas típicas.",
    address="Rua São Vicente de Paula, 111", district="Centro", ref="230 m da Prefeitura Municipal",
    phones=["(49) 3537 0125"], email="reservas@hoteltirol.com.br", hide=["email"], site="http://www.hoteltirol.com.br",
    instagram="https://www.instagram.com/hotel.tirol/", facebook="https://www.facebook.com/hoteltirol.trezetilias",
    map="https://goo.gl/maps/JJTKHERZR4sRL5eP6", coords=(-27.000709, -51.406188),
    confirm=["E-mail: o site da Asturtílias traz dois endereços diferentes (hotelstirol e hoteltirol)."])
add(id="pousada-adler", name="Pousada Adler", cats=[1], photo="313f8c_791e4513e29445189e4492c5560d2b10~mv2.png",
    address="Rua João Belarmino Grando, 101", district="Bairro Santa Catarina", ref="1,4 km da Prefeitura Municipal",
    phones=["(49) 3537 0047"], email="pousadaadler@yahoo.com.br", site="http://www.pousadaadler.com.br",
    facebook="https://www.facebook.com/pages/Pousada-Adler/466962133325346",
    map="https://goo.gl/maps/dXG4PvPJYY8w5bSn8", coords=(-26.9977194, -51.4136489), hide=["ref"],
    confirm=["Distância: o cadastro diz “1,4 m da Prefeitura”; provavelmente 1,4 km."])
add(id="treze-tilias-park-hotel", name="Treze Tílias Park Hotel", cats=[1], photo="313f8c_48b739a282d14c9798326982dd42773a~mv2.jpg",
    address="Rua Videira, 55", district="Centro", ref="550 m da Prefeitura Municipal",
    phones=["(49) 3537 0277"], site="http://www.ttph.com.br",
    instagram="https://www.instagram.com/trezetiliasparkhotel/", facebook="https://www.facebook.com/www.ttph.com.br/",
    map="https://goo.gl/maps/UrGCucndbJ9xDave6", coords=(-26.9963269, -51.403376),
    confirm=["Inclusão em Espaço de Eventos é minha suposição; confirmar."])

# ---------------- Onde ficar: pousadas e hospedarias ----------------
H = dict(cats=[2])
add(id="haus-wimpissinger", name="Haus Wimpissinger", **H, photo="313f8c_eba7a11e92824296b848a2b1095d6c9b~mv2.png",
    address="Rua Dr. Ivo D'Aquino, 133", district="Centro", ref="350 m da Prefeitura Municipal",
    phones=["(49) 9 9948 1761"], email="wep_fami@hotmail.com", coords=(-27.0021003, -51.4065408),
    map="https://www.google.com/maps/search/?api=1&query=-27.0021003,-51.4065408")
add(id="hospedaria-brigite", name="Hospedaria Brigite", **H, photo="313f8c_855448d9aba14208bb3f683696f21b1a~mv2.jpg",
    address="Rua Michael Moser, 340", district="Bairro Portal", ref="750 m da Prefeitura Municipal",
    phones=["(49) 9 9960 6728"], email="brigitemoser71@gmail.com",
    instagram="https://www.instagram.com/hospedariabrigite/", facebook="https://www.facebook.com/hospedariabrigite",
    map="https://www.google.com/maps/search/?api=1&query=Hospedaria+Brigite+Treze+T%C3%ADlias", coords=(-27.0038603, -51.4023918))
add(id="hospedaria-pattis", name="Hospedaria Pattis", **H, photo="313f8c_1b236113a2994884985bad8df54a5337~mv2.png",
    address="Rua Michael Moser, 129", district="Bairro Portal", ref="650 m da Prefeitura Municipal",
    phones=["(49) 3537 0536"], whatsapp="(49) 9 9115 3033", email="atelierpattis@hotmail.com",
    instagram="https://www.instagram.com/atelierpattis/",
    map="https://goo.gl/maps/u3TQGo6BXnarAG5HA", coords=(-27.0020663, -51.4034723))
add(id="hospedaria-scharf", name="Hospedaria Scharf", **H, photo="313f8c_d88ad6f24e36439a8f9908ec8a83544b~mv2.png",
    address="Rua Michael Moser, 153", district="Bairro Portal", ref="670 m da Prefeitura Municipal",
    phones=["(49) 3537 0447", "(49) 9 9186 8544"], email="ervinundmaria@hotmail.com",
    map="https://www.google.com/maps/search/?api=1&query=Hospedaria+Haus+Scharf+Treze+T%C3%ADlias", coords=(-27.0023886, -51.4033193))
add(id="gastehaus-enzien", name="Gästehaus Enzien", **H, photo="313f8c_8591f59eb1244d429e50e4f96e0d3c9a~mv2.png",
    address="Rua Jacob Reiter, s/n", district="Bairro das Águas", ref="700 m da Prefeitura Municipal",
    phones=["(49) 3537 0667", "(49) 9 9139 5541"], instagram="https://www.instagram.com/hospedaria.gastehausenzian/",
    map="https://www.google.com/maps/search/?api=1&query=Hospedaria+Enzian+Treze+T%C3%ADlias", coords=(-26.9956289, -51.4094255),
    confirm=["Grafia: o cadastro usa “Enzien”; o mapa e o Instagram usam “Enzian”."])
add(id="pousada-hohlrieder", name="Pousada e Camping Hohlrieder", cats=[2, 25], photo="313f8c_12efc511e540429faf685db0e4043915~mv2.png",
    address="Linha Rosengarten", ref="1,8 km do centro",
    phones=["(49) 9 9923 7304"], email="cristiane_hohlrieder@hotmail.com",
    instagram="https://www.instagram.com/pousadahohlrieder/",
    map="https://www.google.com/maps/search/?api=1&query=Pousada+e+Camping+Holrieder", coords=(-26.9902947, -51.4003384))
add(id="hartmann-haus", name="Hospedaria Hartmann Haus", **H, photo="313f8c_f297a28586234b8bb0520ae0eea9ab9b~mv2.jpg",
    address="Rua Jacob Reiter, 66", district="Bairro das Águas", ref="700 m da Prefeitura Municipal",
    phones=["(49) 3537 0219"], whatsapp="(49) 9 9963 2002", email="hartmannhospedagem@gmail.com",
    instagram="https://www.instagram.com/hospedariahartmannhaus/",
    map="https://www.google.com/maps/search/?api=1&query=Hartmann+Haus+Treze+T%C3%ADlias", coords=(-26.9958258, -51.4095321))
add(id="pousada-kuh-haus", name="Pousada Kuh Haus", cats=[2], photo="313f8c_80780da08bf140d89a1491322752d882~mv2.jpg",
    summary="Pousada na Granja Natter, no interior.",
    address="Linha Natter, 1951", district="Granja Natter, interior", ref="3,9 km da Prefeitura Municipal",
    phones=["(49) 9 9965 7998"], whatsapp="(49) 9 9996 7556", email="pousadakuhhaus@gmail.com",
    instagram="https://www.instagram.com/pousada_kuh_haus/",
    map="https://maps.app.goo.gl/WYQ6zviGZSHD2eZh6", coords=(-26.9918918, -51.4262924))
add(id="sitio-hartmann", name="Casa de Campo Sítio Hartmann", cats=[2], photo="313f8c_174db66bc3734c0c94bbee683bab9b9c~mv2.png",
    address="Rodovia SC 355, km 94", district="Linha Nova Áustria", ref="4 km da Prefeitura Municipal",
    phones=["(49) 3537 0219"], whatsapp="(49) 9 9963 2002", email="hartmannhospedagem@gmail.com",
    instagram="https://www.instagram.com/casadecampohartmann/",
    map="https://www.google.com/maps/search/?api=1&query=Casa+de+Campo+S%C3%ADtio+Hartmann", coords=(-26.9921041, -51.4452563))
add(id="hospedagem-da-oma", name="Hospedagem da Oma", **H, photo="313f8c_4f192590bd6f4f3c9593506bd2c1d41a~mv2.jpg",
    address="Rua Franz Kandler, 385", district="Bairro Imigrantes", ref="1 km da Prefeitura Municipal",
    phones=["(49) 9 9934 2092"],
    confirm=["Localização: o link do cadastro aponta para outro estabelecimento (uma oficina mecânica); sem ponto no mapa."])
add(id="viena-hospedaria-1", name="Viena Hospedaria 1", **H, photo="313f8c_adae0b3077484582ae62f25b28536b04~mv2.jpg",
    address="Rua Germânica, 68", district="Bairro Imigrantes", ref="800 m da Prefeitura Municipal",
    phones=["(49) 9 9968 6880"], email="solangecalza@yahoo.com.br", instagram="https://www.instagram.com/vienahospedaria/",
    confirm=["Localização: os links de mapa das duas unidades Viena estão trocados ou ambíguos no cadastro; sem ponto no mapa."])
add(id="viena-hospedaria-2", name="Viena Hospedaria 2 (Dolce Vitta)", **H, photo="313f8c_9e3bd26f274249f6a5ae8cc5cdfcae71~mv2.png",
    address="Rua Domingos Perondi, 115", district="Bairro Lindner", ref="1,9 km da Prefeitura Municipal",
    phones=["(49) 9 9968 6880"], email="solangecalza@yahoo.com.br", instagram="https://www.instagram.com/vienahospedaria/",
    confirm=["Localização: os links de mapa das duas unidades Viena estão trocados ou ambíguos no cadastro; sem ponto no mapa."])
add(id="villa-gruntal", name="Villa Grüntal Hospedaria", cats=[2], photo="58bdae_c6f1c3842ec441808429f82c867a2dff~mv2.jpg",
    summary="Hospedaria com estacionamento para trailer e motorhome.",
    address="Rua Padre Franz Pointl, 185", district="Bairro do Imigrante", ref="650 m do centro",
    phones=["(49) 9 9985 2003", "(49) 9 9927 5556"], whatsapp="(49) 9 9985 2003",
    instagram="https://www.instagram.com/villagruntal/", facebook="https://www.facebook.com/villagruntal",
    map="https://www.google.com/maps/search/?api=1&query=Villa+Gr%C3%BCntal+Hospedaria", coords=(-27.0022458, -51.4097728))
add(id="trudi-haus", name="Trudi Haus", **H, photo="58bdae_6e4d3eec973744e3a6acc6c7effe2847~mv2.png",
    address="Rua Gardina Knolseisen, 111", district="Centro", ref="350 m da Prefeitura Municipal",
    phones=["(49) 98816 1582"], email="anacarladecouet@gmail.com",
    confirm=["Localização: o link do cadastro leva ao Minigolf; sem ponto no mapa."])
add(id="cabana-refugio-alpino", name="Cabana Refúgio Alpino", **H, photo="313f8c_8ee6dad2b2c74407ab606c059d91807f~mv2.jpg",
    address="Rua Gardina Knolseisen, 111", district="Centro", ref="350 m da Prefeitura Municipal",
    phones=["(49) 99833 4575"], email="anacarladecouet@yahoo.com.br", instagram="https://www.instagram.com/hospedariatrudi/",
    confirm=["Localização: o link do cadastro leva ao Eiskaffee Trudi; sem ponto no mapa."])
add(id="hospedaria-da-escultora", name="Hospedaria da Escultora", **H, photo="58bdae_ddd7323b6bd541528a86743bbcd9fc76~mv2.jpg",
    address="Av. Afonso Dresch, 71", district="Centro", ref="160 m da Prefeitura Municipal",
    phones=["(49) 9 9964 7117"], email="ingridthaler@yahoo.com.br",
    map="https://www.google.com/maps/search/?api=1&query=-26.9986272,-51.4085747", coords=(-26.9986272, -51.4085747))
add(id="pousada-dona-ines", name="Pousada Dona Inês", **H, photo="313f8c_cf1a8f663a4d4bc29ed9221226697660~mv2.png",
    address="Rua Gisela Thaler", district="Centro", ref="400 m da Prefeitura Municipal",
    phones=["(49) 9 9117 9919", "(49) 9 9201 6032"],
    map="https://www.google.com/maps/search/Pousada+Dona+In%C3%AAs/@-26.9992477,-51.4039514,20.07z")
add(id="pousada-nova-austria", name="Pousada Nova Áustria", cats=[2], photo="313f8c_11346e9f14664e748c8c20f0d2d774bf~mv2.jpg",
    address="Linha Nova Áustria", phones=["(49) 9 9194 9397"], email="neivinhasbardella@yahoo.com.br",
    map="https://www.google.com/maps/search/?api=1&query=-26.9932574,-51.4445811", coords=(-26.9932574, -51.4445811))
add(id="cabana-do-lago", name="Cabana do Lago", **H, photo="58bdae_eceae961eec3437e9e07c78241462af3~mv2.jpg",
    address="Estrada Linha São Paulo", ref="2,5 km da Prefeitura Municipal",
    phones=["(49) 9 9149 1464"], email="ceres@domdomenico.com.br", instagram="https://www.instagram.com/cabanadolagotrezetilias/",
    map="https://www.google.com/maps/search/?api=1&query=Cabana+do+Lago+Treze+T%C3%ADlias", coords=(-27.0131626, -51.4221043))
add(id="hospedaria-felder", name="Hospedaria Felder", cats=[2], photo="313f8c_276ca0b1dc904163985f43c5c751f124~mv2.jpg",
    address="Rua João Schöll, 140", ref="450 m da Prefeitura Municipal",
    phones=["(49) 99194 0349"], email="felder84@hotmail.com", site="http://www.felderviagens.com.br",
    instagram="https://www.instagram.com/felderviagens/",
    map="https://www.google.com/maps/search/?api=1&query=Hospedaria+Felder+Treze+T%C3%ADlias", coords=(-26.999203, -51.4075528),
    confirm=["Inclusão em Receptivo Turístico (Felder Viagens) é minha suposição; confirmar."])

# ---------------- Campings ----------------
add(id="camping-villa-gruntal", name="Camping Villa Grüntal", cats=[25], photo="58bdae_744523ee00cc4f89a3b653809c6e12bd~mv2.jpg",
    summary="Estacionamento para trailer e motorhome.",
    address="Rua Padre Franz Pointl, 185", district="Bairro do Imigrante", ref="650 m do centro",
    phones=["(49) 9 9985 2003", "(49) 9 9927 5556"], whatsapp="(49) 9 9985 2003",
    map="https://www.google.com/maps/search/?api=1&query=Villa+Gr%C3%BCntal+Hospedaria", coords=(-27.0022458, -51.4097728))
# (Camping Hohlrieder = mesma ficha da Pousada e Camping Hohlrieder, alcançável pelas duas categorias)

# ---------------- Gastronomia ----------------
G = dict(cats=[3])
add(id="restaurante-parque-lindendorf", name="Restaurante do Parque Lindendorf", **G, photo="313f8c_36e512c900a74347b258f4b774b320e4~mv2.png",
    summary="Buffet de saladas e comidas típicas austríacas, dentro do parque.",
    address="Rua Antônio Pattis, 10", district="Bairro Jardim das Flores",
    phones=["(49) 3537 0658"], email="contato@minicidade.com", site="http://www.minicidade.com",
    instagram="https://www.instagram.com/minicidade/", map="https://goo.gl/maps/JAeCht92XKnmrfQZ6", coords=(-27.0029824, -51.4177591))
add(id="restaurante-edelweiss", name="Restaurante e Pizzaria Familie Bierbaum (Edelweiss)", cats=[3], photo="313f8c_ea17d62b62ab4f6289cda1ca392ee979~mv2.png",
    summary="Pratos típicos austríacos, pizzas em forno a lenha, petiscos e chopes Bierbaum fabricados no local.",
    address="Rua Dr. Gaspar Coutinho, 439", phones=["(49) 3537 0531"], email="restaurante@bierbaum.com.br",
    site="http://www.bierbaum.com.br", instagram="https://www.instagram.com/cervejariabierbaum/",
    facebook="https://www.facebook.com/EdelweissBierbaum", map="https://goo.gl/maps/1p9jfb7pJrQPXcRb9", coords=(-26.9997765, -51.4146095))
add(id="eiskaffee-trudi", name="Eiskaffee Trudi", **G, photo="313f8c_2e413061f67a4ef484a359f47d1da987~mv2.png",
    summary="Sorveteria e cafeteria no centro; também pastéis, porções e bebidas.",
    address="Rua Gardina Knolseisen", district="Centro", phones=["(49) 3537 0202"],
    instagram="https://www.instagram.com/eiskaffeetrudi/", facebook="https://www.facebook.com/eiskaffeetruditt/",
    map="https://goo.gl/maps/emxUuFU4naKmnFVs8", coords=(-26.9972743, -51.4055486))
add(id="cafe-werneckhof", name="Café Werneckhof", **G, photo="313f8c_e9e68769ed0c46a18f647caffe565b69~mv2.jpeg",
    summary="Café que reúne a arte e os sabores da gastronomia austríaca.",
    address="Rua dos Pioneiros, 219", district="Bairro Portal", phones=["(49) 99995 0636"],
    instagram="https://www.instagram.com/werneckhof/", map="https://maps.app.goo.gl/mnC4YnKCueQW6FcFA", coords=(-27.0022097, -51.4047409))
add(id="biergarten", name="Biergarten", **G, photo="313f8c_4783a843b6e1446c8bea3accd932ad99~mv2.png",
    summary="Buffet no almoço e à la carte nos outros períodos; petiscos, pratos típicos e pizzas.",
    address="SC 455 – Rodovia dos Pioneiros, km 2,5", phones=["(49) 3537 0535"],
    instagram="https://www.instagram.com/biergartenttoficial/", facebook="https://www.facebook.com/biergartenttoficial/",
    map="https://goo.gl/maps/dZeqhTEjsrHhdACU9", coords=(-27.0051096, -51.3991006))
add(id="chef-haus", name="Chef Haus", **G, photo="313f8c_109e1a3f74144c0094095e8b22c10cdd~mv2.png",
    summary="Pizzaria, pratos à la carte e chope artesanal. Espaço fondue com reserva.",
    address="Av. Afonso Dresch, 298", phones=["(49) 3537 1368", "(49) 9 9994 2209"],
    instagram="https://www.instagram.com/restaurantechefhaus/", facebook="https://www.facebook.com/restaurantechefhaus/",
    map="https://g.page/restaurantechefhaus?share")
add(id="stube", name="Stube Bistrô & Cervejaria", cats=[3], photo="313f8c_7b56b9ec654f46f99cc26c88367b4789~mv2.jpeg",
    summary="Bistrô austríaco e casa da cervejaria Pubi Bier. Criou o Schnitzel em tiras empanado com malte e a Bierstation, caixa de cerveja 24h.",
    address="Av. Antônio Carlos Altenburger, 269", phones=["(49) 99925 9860"], whatsapp="(49) 99925 9860",
    hours="Sextas das 18h às 0h; sábados das 16h às 0h",
    instagram="https://www.instagram.com/stubetrezetilias/", facebook="https://www.facebook.com/stuberestaurant",
    map="https://goo.gl/maps/p2yJLpok3ppVqeX47", coords=(-27.0011725, -51.4102445))
add(id="cafe-haus", name="Café Haus", **G, photo="58bdae_74ed0e21ddca4d889f82170ddfcd13b1~mv2.jpg",
    summary="Café ao lado da Prefeitura Municipal.",
    address="Av. Afonso Dresch, 13", ref="Ao lado da Prefeitura Municipal", phones=["(49) 3537 0017"],
    instagram="https://www.instagram.com/cafehaustrezetilias/", facebook="https://www.facebook.com/AlpinDelikatessen",
    map="https://maps.app.goo.gl/NQEZKLah8y8un8KM7", coords=(-26.9989801, -51.4076257), legacy=[131],
    hide=["directions", "facebook"],
    confirm=["O link de mapa e o Facebook levam a “Alpin Delikatessen Bistrô e Cafeteria”; confirmar se é o mesmo estabelecimento.",
             "O cadastro não traz descrição nem horário."])
add(id="espaco-diversitta", name="Espaço Diversittá", cats=[3, 26], photo="313f8c_2a510d33676d47e4a4531c0f72b9beb9~mv2.jpg",
    summary="Restaurante e eventos: almoço e finger foods. “Temos alma de comida feita em casa!”",
    address="Rua Domingos Perondi, 23", phones=["(49) 99841 6168"],
    instagram="https://www.instagram.com/espacodiversitta_/", facebook="https://www.facebook.com/espacodiversitta",
    map="https://maps.app.goo.gl/ctKQdBoSWXQbvtQGA", coords=(-26.9950577, -51.413801))
add(id="sabor-das-tilias", name="Panificadora e Confeitaria Sabor das Tílias", **G, photo="313f8c_1dbbdb095c2f4bb6937ae233c25f7e92~mv2.png",
    address="Rua Pedro Nelcido Käfer", district="Centro", address2="Rua Caçador, Bairro Santa Catarina",
    phones=["(49) 3537 1080"], map="https://goo.gl/maps/VRRCkdS3wSwcpFHY6", coords=(-26.9997329, -51.4176303), hide=["directions"],
    confirm=["Duas unidades; o ponto no mapa é de uma delas (não indicada pelo cadastro)."])
add(id="restaurante-do-gringo", name="Restaurante do Gringo", **G, photo="313f8c_7a3d864d3b434082bcdb7a36b9daa764~mv2.png",
    summary="Buffet no horário de almoço.", address="Rua Pedro Nelcido Käfer", district="Centro", phones=["(49) 3537 1083"],
    map="https://goo.gl/maps/PFUKMipLwLoLxzT98", coords=(-27.0009406, -51.403996))
add(id="strike-boliche-pizzaria", name="Strike Boliche Pizzaria", cats=[3], photo="58bdae_95092c723d25457c83f64b6159fff14e~mv2.jpg",
    address="Rua Johann Anrain, s/n", district="Centro", ref="Ao lado do Parque Aquático",
    phones=["(49) 9905 5474"], hide=["phone"], instagram="https://www.instagram.com/strike.boliche.pizzaria/",
    map="https://goo.gl/maps/4kpVUiT8RrfBzpdG7", coords=(-26.993383, -51.404461),
    confirm=["Telefone com 8 dígitos no cadastro: (49) 9905-5474; confirmar o número.",
             "Inclusão em Espaço Infantil é minha suposição; confirmar."])
add(id="chocolates-treze-tilias", name="Chocolates Treze Tílias", cats=[], label="Chocolateria", photo="313f8c_7a55853d45c641e282e966e9715ea6be~mv2.jpg",
    summary="Chocolate artesanal de família, há três décadas.",
    address="Rodovia dos Pioneiros, km 13", phones=["(49) 3537 0156"], whatsapp="(49) 3537 0156",
    email="contato@chocolate13tilias.com.br", site="http://www.chocolate13tilias.com.br",
    instagram="https://www.instagram.com/chocolates13tilias/",
    map="https://goo.gl/maps/GnDRfyRKgV5dd3T87", coords=(-27.0038302, -51.4009765),
    confirm=["Chocolaterias entraram em Gastronomia; no guia atual não há categoria própria."])
add(id="sabor-dos-alpes", name="Chocolate Artesanal Sabor dos Alpes", cats=[], label="Chocolateria", photo="313f8c_64e2e88a07ba4d79953209dd8c593016~mv2.jpg",
    summary="Chocolate puro e totalmente artesanal.",
    address="Rua dos Imigrantes, 304", phones=["(49) 3537 1133", "(49) 9948 0335"],
    email="sabordosalpes@yahoo.com.br", site="http://www.sabordosalpes.com",
    map="https://goo.gl/maps/ayKfzAp2fPYw67dY6", coords=(-27.0006291, -51.4176987))

# ---------------- Roteiro cervejeiro ----------------
add(id="cervejaria-bierbaum", name="Cervejaria Bierbaum", cats=[24], photo="313f8c_b1a40bd7387947d4a408a66309e19f9c~mv2.jpg",
    summary="Cervejaria da família Bierbaum, segundo a Lei da Pureza de 1516. Visitação na Brauhaus aos sábados às 10h15; outros dias com agendamento.",
    address="Rua Dr. Gaspar Coutinho, 439", phones=["(49) 3537 0531", "(49) 99156 6820"], whatsapp="(49) 99156 6820",
    email="loja@bierbaum.com.br", site="http://www.bierbaum.com.br", hours="Visitação guiada: sábados às 10h15",
    instagram="https://www.instagram.com/cervejariabierbaum/", facebook="https://www.facebook.com/CervejariaBierbaum",
    map="https://goo.gl/maps/LjKx3aRoGgn8TLDY7", coords=(-26.9997017, -51.4150358))
add(id="pubi-bier", name="Cervejaria Pubi Bier", cats=[24], photo="313f8c_4990859015f24a46813ed6c2a0b1df68~mv2.jpg",
    summary="Cervejaria nascida em Treze Tílias; o bar de fábrica fica anexo à Stube.",
    address="Av. Antônio Carlos Altenburger, 269", phones=["(49) 99925 9860"], whatsapp="(49) 99925 9860",
    hours="Bar de fábrica: segunda a quinta, das 14h às 17h",
    instagram="https://www.instagram.com/pubibier/", facebook="https://www.facebook.com/pubibier",
    map="https://goo.gl/maps/YiEmYuoDa3GqhpYSA", coords=(-27.0011725, -51.4102445))
add(id="cervejaria-trezetiliense", name="Cervejaria Trezetiliense", cats=[24], photo="313f8c_dba13304a7a24cca8bf5f7ed8bd0fc56~mv2.jpg",
    summary="Cervejas de malte de cevada ou trigo, sem pasteurização nem filtragem.",
    address="Rua Jacob Reiter, 238", phones=["(49) 99933 5641"],
    instagram="https://instagram.com/cervejariatrezetiliense")
add(id="vinicola-kranz", name="Vinícola Kranz", cats=[24], photo="313f8c_7829b3700cbb4ce7bcdde8e568a07eb1~mv2.jpg",
    summary="Fundada em 2007: vinhos, espumantes e sucos 100% naturais.",
    address="Rua dos Pioneiros, 220", phones=["(49) 3537 0833"], whatsapp="(49) 3537 0833",
    site="http://www.vinicolakranz.com.br", instagram="https://www.instagram.com/vinicolakranz/",
    map="https://g.page/vinicolakranz?share")
add(id="lindenbier", name="LindenBier", cats=[24], photo="58bdae_18cd513631344bdd8d05dc4b53dab398~mv2.jpg",
    summary="Cervejaria artesanal dentro do Treze Tílias Park Hotel.",
    address="Rua Videira, 585", hide=["addressNumber"], phones=["(49) 3537 0277"], site="http://www.lindenbier.com.br",
    instagram="https://www.instagram.com/lindenbiercervejaria/",
    map="https://goo.gl/maps/fMsaZxEpDtH1uxQMA", coords=(-26.9964511, -51.403544),
    confirm=["Endereço: Rua Videira, 585 (LindenBier) e Rua Videira, 55 (Park Hotel); confirmar o número."])

# ---------------- Atrativos ----------------
A = dict(cats=[4])
OBS = "Em feriados, consulte o horário de atendimento."
add(id="monumento-aguia-do-tirol", name="Monumento Águia do Tirol", **A, kind="monument",
    photo="313f8c_6001480980ed48bca3b5dfea4181a19c~mv2_d_5158_3439_s_4_2.jpg",
    summary="A águia de 8 × 7 m saúda quem chega a Treze Tílias, com vista para a cidade.",
    text="Inspirada na águia que desfilou em Innsbruck em 2009, nos 200 anos da revolta tirolesa liderada por Andreas Hofer. Projeto doado pelo austríaco Helmut Strobl, recorte do metal de Bernhard Josef Gratt e pintura de Roberto Anrain.",
    address="SC-355, sentido Iomerê", ref="Início do perímetro urbano",
    map="https://maps.app.goo.gl/eSXpBTseJDs5Sy9K8", coords=(-26.9975572, -51.4021781), legacy=[45],
    # panorama indicado pela ficha original (pano tehZZ-L6Gfa10ggdnzko3A); conferido: a águia aparece entre 165° e 215°; link abre em 185°
    tour="https://www.google.com/maps/@?api=1&map_action=pano&pano=tehZZ-L6Gfa10ggdnzko3A&heading=185&pitch=4&fov=75",
    tourNote="Street View, imagem de 2019")
add(id="museu-andreas-thaler", name="Museu Municipal Andreas Thaler", **A, kind="monument", photo="313f8c_37e5a94469d64d5f95cc137f832799a2~mv2.png",
    summary="O “Castelinho”, residência de 1934–36 do fundador, com objetos da colonização e ambientes dos anos 30.",
    address="Rua Brasílico C. de Oliveira", district="Centro", phones=["(49) 99164 9034"], whatsapp="(49) 99164 9034",
    hours="Segunda a sexta: 9h–12h e 14h–17h · Domingos e feriados: 9h–12h", note=OBS,
    facebook="https://www.facebook.com/museuandreas.thaler.7",
    map="https://maps.app.goo.gl/8nFNNW7ujfZBYukB6", coords=(-27.0001962, -51.405799),
    phoneLabel="WhatsApp do Centro de Atendimento ao Turista")
add(id="parque-lindendorf", name="Parque Lindendorf – Minicidade", cats=[4], photo="313f8c_6b27fc3181be4b8dad0141becdfcbd84~mv2.png",
    summary="Jardins e trilhas em 45 mil m², animais, lago e a Minicidade com as principais construções de Treze Tílias.",
    address="Rua Antônio Pattis, 10", district="Bairro Jardim das Flores", phones=["(49) 3537 0658"],
    whatsapp="(49) 9 9996 0296", email="contato@minicidade.com", site="http://www.minicidade.com",
    hours="Terça a domingo, das 10h às 18h · Segunda fechado", note=OBS,
    instagram="https://www.instagram.com/minicidade13tilias/", facebook="https://www.facebook.com/minicidade13tilias",
    map="https://maps.app.goo.gl/jPJtcbQtUAFdBdhQ6", coords=(-27.0029824, -51.4177591),
    confirm=["Inclusão em Espaço Infantil é minha suposição (animais e minicidade); confirmar."])
add(id="minigolf", name="Minigolf Treze Tílias", cats=[4], photo="313f8c_99bc8942401b4192ba1b73d91a80df2f~mv2.jpg",
    summary="Circuito de 18 pistas certificado; partida de 45 min a 1h30, para todas as idades.",
    address="Rua Gardina Knollseisen, 171", district="Centro", whatsapp="(49) 9 9836 1256",
    email="atendimento@minigolf13tilias.com.br", site="http://www.minigolf13tilias.com.br",
    hours="Horários variam com as estações; consulte antes", note=OBS,
    instagram="https://www.instagram.com/minigolf13tilias/", facebook="https://www.facebook.com/minigolf13tilias",
    map="https://maps.app.goo.gl/YoUnqpXbNbBSVKrp6", coords=(-26.9968981, -51.4055248))
add(id="parque-aquatico", name="Parque Aquático Treze Tílias", cats=[4], photo="313f8c_661d4a882acc4e658fed75f4b6358f26~mv2.jpg",
    summary="Água de fonte natural a cerca de 32 °C: 7 piscinas externas, piscina coberta, tobogãs, sauna e parquinho infantil.",
    address="Rua Johann Anrain", district="Centro", phones=["(49) 9 9906 5755"], whatsapp="(49) 9 9906 5755",
    email="contato@parqueaquaticotrezetilias.com.br", site="http://www.parqueaquaticotrezetilias.com.br", note=OBS,
    instagram="https://www.instagram.com/parqueaquaticotrezetilias/", facebook="https://www.facebook.com/parqueaquaticotrezetilias",
    map="https://maps.app.goo.gl/BL2S8NLthswhkaJb7", coords=(-26.9925239, -51.4042196))
add(id="mundo-tiroles", name="Mundo Tirolês", cats=[4, 6], photo="313f8c_2ae3d24714c34b7d9a74f17c2d6de7fc~mv2.jpg",
    summary="Loja temática de souvenirs, trajes, chapéus e acessórios típicos, artesanato local e malharia.",
    address="Rua Dr. Gaspar Coutinho, 461", phones=["(49) 3537 0316"], whatsapp="(49) 99819 1932",
    email="vendas@mundotiroles.com.br", site="http://www.mundotiroles.com.br",
    instagram="https://www.instagram.com/mundo.tiroles/", facebook="https://www.facebook.com/mundotiroles",
    map="https://maps.app.goo.gl/EmSokWQqNDX13BJZ8", coords=(-26.9993475, -51.415615))
add(id="parque-do-imigrante", name="Parque do Imigrante", **A, photo="313f8c_c20d75065c1f4c76a01e899292dc82b3~mv2.png",
    summary="Lago com uma ilha no formato da Áustria, Via Crucis esculpida em madeira e academia ao ar livre.",
    address="Rua Franz Pointl, s/n", district="Centro", phones=["(49) 3537 0176"],
    phoneLabel="Secretaria de Administração",
    hours="Seg fechado · Ter–sex 8h–12h e 13h30–17h30 · Sáb 9h–12h e 14h30–17h30 · Dom e feriados 10h–12h e 14h30–18h30",
    map="https://maps.app.goo.gl/cPY84ajwfTZ6mTQy6", coords=(-27.0014739, -51.4094335))
add(id="o-tiroles", name="Estátua O Tirolês", **A, kind="monument", photo="58bdae_9dd38b91943b4623918ff674e7b72a7d~mv2.jpg",
    summary="Obra do escultor trezetiliense Conrado Moser em homenagem aos agricultores do município.",
    address="Rótula da Av. Afonso Dresch com a Rua Domingos Perondi",
    map="https://maps.app.goo.gl/cW6mt2pW1Lc64hFZA", coords=(-26.9954511, -51.4136705))
add(id="campanario", name="Campanário", **A, kind="monument", photo="58bdae_d78a119fa5c140f2b9eb6fc27016cde2~mv2.jpg",
    address="Praça Ministro Andreas Thaler",
    map="https://maps.app.goo.gl/syxsEb7WPxjhDJ5K6", coords=(-26.9994243, -51.4070446))

# ---------------- Escultores ----------------
E = dict(cats=[5])
add(id="mauro-e-andre-moser", name="Mauro e André Moser", **E, photo="313f8c_e081231837dd470895202c4e763c5e99~mv2.png",
    summary="Campanários de madeira com detalhes metálicos, como os Dachglocken dos Alpes.",
    address="Rua dos Pioneiros, 129", phones=["(49) 3537 0152", "(49) 9995 5579"],
    map="https://goo.gl/maps/GoeX2t76DzB2X2FfA", coords=(-27.001395, -51.4044553))
add(id="bernardo-moser", name="Bernardo Moser", **E, photo="313f8c_2d69e6690bfd4f80a2be7a715a191cd2~mv2.png",
    summary="Esculturas em miniatura, de 3 mm a 5 cm.", address="Rodovia dos Pioneiros",
    phones=["(49) 3537 1388"], email="moserbernardo@yahoo.com.br")
add(id="esculturas-thaler", name="Esculturas Thaler – Bruno e Suzy Thaler", cats=[5, 6], photo="313f8c_75796de05a5c416dba7acefb5d03ebf5~mv2.jpg",
    summary="Ateliê da família Thaler: ornamentos, portas, brasões e obras sacras e profanas.",
    address="Rua Pedro Nelcido Käfer, 231", phones=["(49) 3537 0157", "(49) 3537 0683", "(49) 9 9918 6689"],
    email="suzy@esculturasthaler.com.br", site="http://www.esculturasthaler.com.br",
    instagram="https://www.instagram.com/esculturas_thaler/",
    map="https://goo.gl/maps/mhs85FbhTk7KV6He7", coords=(-26.9996136, -51.4047416))
add(id="esculturas-moser", name="Esculturas e Artesanatos Moser – Rudi e Christian Moser", cats=[5, 6], photo="58bdae_4483a5db960e45f68278a6ee5714917c~mv2.jpg",
    summary="Loja familiar de esculturas, principalmente sacras, em diversos tamanhos.",
    address="Rodovia dos Pioneiros, 485", district="Bairro Portal", phones=["(49) 3537 0190", "(49) 9 9976 9367", "(49) 9 9827 3109"],
    email="artesanatosmoser@gmail.com", instagram="https://www.instagram.com/esculturas_artesanatos_moser/",
    map="https://g.page/Eamoser?share")
add(id="conrado-michael-moser", name="Conrado Michael Moser", **E, photo="313f8c_cd8f4c0ccf904fb1a5b111795bbe83ab~mv2.png",
    summary="Estatuária sacra; formado na Schnitzschule de Oberammergau.",
    address="Rua Michael Moser, s/n", phones=["(49) 3537 0297", "(49) 99971 7713"], email="coni.moser@hotmail.com",
    map="https://g.page/san-michael-apartamentos?share")
add(id="conrado-e-katharina-moser", name="Conrado e Katharina Moser", **E, photo="313f8c_dfa9cbca4848414da3f11b9fc2c65980~mv2.png",
    summary="Arte sacra (Conrado) e Kerbschnitzerei, ornamentos geométricos alpinos (Katharina).",
    address="Rua Leoberto Leal, 392", phones=["(49) 3537 0297"], email="reservas@hotel13linden.com.br",
    site="http://www.hotel13linden.com.br", map="https://goo.gl/maps/Qxymqv4BV2gBACMV7", coords=(-27.000471, -51.4043121),
    hide=["directions", "addressNumber"],
    confirm=["Endereço: Rua Leoberto Leal, 392 e 279 aparecem para o casal; o mapa aponta para o Hotel 13 Linden."])
add(id="memorial-gotfredo-thaler", name="Memorial Gotfredo Thaler – Ingrid e Ellen Thaler", cats=[5, 6], photo="58bdae_86b588f471a34fa299796ff8df56cda0~mv2.jpg",
    summary="Ateliê com as obras de Gotfredo Thaler e das filhas, as escultoras Ingrid e Ellen.",
    address="Rua Leoberto Leal, 260", phones=["(49) 3537 0123", "(49) 99964 7117"],
    email="ingridthaler@yahoo.com.br", map="https://goo.gl/maps/W5iyD2QRZx7DX3KF6", coords=(-27.0000674, -51.4046808))
add(id="atelier-pattis", name="Atelier Pattis – Germano Pattis", cats=[5, 6], photo="313f8c_13c45036ec1a45b3a053de520fde43ca~mv2.jpg",
    summary="Esculturas em madeira (flores, alpinistas, relógios) e pintura Bauernmalerei de Luciana Pattis.",
    address="Rua Michael Moser, 129", phones=["(49) 3537 0536"], whatsapp="(49) 99115 3033",
    email="atelierpattis@hotmail.com", instagram="https://www.instagram.com/atelierpattis/",
    map="https://goo.gl/maps/oRTdVR15cN5b4PV29", coords=(-27.0020948, -51.4035004))
add(id="jose-dalla-costa", name="José Dalla Costa", **E, photo="313f8c_457c40eb1398492da86b7796470e6b48~mv2.png",
    summary="Esculturas de médio porte, com o cavalo como tema principal.",
    address="Rua Lúcia Klotz, s/n", phones=["(49) 3537 0397"],
    map="https://goo.gl/maps/kHa64GnwdZnEjP4v5", coords=(-26.9931513, -51.4134725))
add(id="werner-thaler", name="Werner Thaler", cats=[5, 6], photo="313f8c_e12633db2b414babb55e65c69f8113ac~mv2.jpg",
    summary="Obras clássicas, sacras e contemporâneas em madeira, bronze, pedra e concreto.",
    address="Rua Pedro Nelcido Käfer, 456", district="Bairro Portal", phones=["(49) 3537 0384"],
    email="escultor@wernerthaler.com.br", site="http://www.wernerthaler.com.br",
    instagram="https://www.instagram.com/wernerthaler_escultor/",
    map="https://goo.gl/maps/AfkjHFCTMmwcK32p7", coords=(-27.0015451, -51.4032869))

# ---------------- Artesanato ----------------
add(id="alpenhaus", name="AlpenHaus", cats=[6], photo="313f8c_6053aa4694084c99ba2b276a970a3e0b~mv2.jpg",
    summary="Quadros, colares e vasilhas com a flor Edelweiss natural, pinturas e recortes a laser.",
    address="Rua Pedro Nelcido Käfer, 355", phones=["(49) 3537 0834"], email="alpenhaustt@gmail.com",
    instagram="https://www.instagram.com/alpenhaustt/", facebook="https://www.facebook.com/alpenhaustt",
    map="https://goo.gl/maps/nGkUaveCAQ7TKK5e7", coords=(-27.0005915, -51.4036808))
add(id="malharia-edelweiss", name="Malharia Edelweiss", cats=[6], photo="313f8c_f4b7712311d746c5b541006088b848c7~mv2.jpg",
    summary="Trajes típicos, pijamas, camisetas, polos e uniformes.",
    address="Rua Pedro Nelcido Käfer", phones=["(49) 3537 0504", "(49) 99979 7650"], email="malhariaedelweiss@hotmail.com",
    instagram="https://www.instagram.com/malharia_edelweiss/",
    map="https://goo.gl/maps/MHdgJ7pJ4noQx9xDA", coords=(-27.0003936, -51.4038165))
add(id="vidros-e-velas-prema", name="Vidros e Velas Prema", cats=[6], photo="313f8c_55b5de8e7fc74d1d8ea03c496f9d3fc3~mv2.jpg",
    summary="Ateliê de vidro em fusing desde 2009 e velas artesanais.",
    address="Rodovia Frei Belmiro Brondani, km 95 – SC 355", phones=["(49) 3537 1131"],
    email="loja@velasprema.com.br", site="http://www.lojasprema.com.br", instagram="https://www.instagram.com/prema13tilias/")
add(id="esquina-do-artesanato", name="Esquina do Artesanato", cats=[6], photo="313f8c_46da3e9956b54ab48d9a395805e315e8~mv2.jpg",
    summary="Espaço da Associação dos Artesãos: bordados, tricô, tear, biscuit, Bauernmalerei, guirlandas de sementes, licores e bolachas.",
    address="Subsolo da Concha Acústica", phones=["(49) 3537 0058"], email="artesanato13tilias@gmail.com",
    instagram="https://www.instagram.com/esquinadoartesanatott/",
    map="https://goo.gl/maps/JjRW6Sj7rvYLNDpg6", coords=(-26.9989653, -51.4073676),
    confirm=["O site da Asturtílias lista 26 artesãos com contatos pessoais; nesta versão eles não ganharam fichas individuais."])
add(id="produtores-rurais", name="Associação dos Produtores Rurais", cats=[6], photo="313f8c_05dfb998fbd847a588a5a0ca777c1eff~mv2.webp",
    summary="Pães, bolos, bolachas, queijos, geleias, doces, mel e outros produtos artesanais.",
    address="Concha Acústica", hours="Sábados, das 7h30 às 11h30",
    map="https://goo.gl/maps/JjRW6Sj7rvYLNDpg6", coords=(-26.9989653, -51.4073676))

# ---------------- Turismo rural ----------------
add(id="granja-natter", name="Laticínio Granja Natter", cats=[7], photo="313f8c_e05611d59c404a6c91f73ff08678940b~mv2.png",
    summary="Queijos artesanais, visita guiada, passeio no “Vacamóvel”, trilha de quadriciclo e degustação, a 8 minutos do centro.",
    address="Linha Natter, 2021", district="Interior", phones=["(49) 9 9965 7998", "(49) 9 9996 7556"],
    email="laticiniogranjanatter@gmail.com", instagram="https://www.instagram.com/granjanatter/",
    facebook="https://www.facebook.com/nattergranja",
    map="https://maps.app.goo.gl/WYQ6zviGZSHD2eZh6", coords=(-26.9918918, -51.4262924))
add(id="linha-babenberg", name="Linha Babenberg", cats=[7], kind="monument", photo="58bdae_d4fed2b792924b948cafd4992fc35639.jpg",
    summary="Primeira comunidade do interior (1934), a 9 km do centro: igreja, gruta, trilha com Via Crucis e romarias.",
    address="Linha Babenberg, interior", ref="Cerca de 9 km do centro")
add(id="linha-pinhal", name="Linha Pinhal", cats=[7], kind="monument", photo=None,
    summary="Comunidade de origem italiana; igreja de 1952 com pinturas de Karl Neumayr, Jantar Italiano e Festa de São Brás.",
    address="Linha Pinhal, interior")

# ---------------- Cicloturismo ----------------
add(id="roteiro-cicloturismo", name="Roteiro de cicloturismo", cats=[8], kind="monument", photo=None,
    summary="Planilha de roteiro criada por Carlos Eduardo Rohrer Felder (Pubi). Ponto de partida: Secretaria de Turismo.",
    address="Ponto de partida: Secretaria de Turismo", phones=["(49) 3537 0997"], phoneLabel="Secretaria de Turismo", hide=["phone"],
    map="https://goo.gl/maps/oXCUapiivQU72Pv49", coords=(-26.9994138, -51.4056449),
    link=("Ver a planilha no site da Asturtílias", "https://www.trezetilias.com.br/cicloturismo"),
    confirm=["Telefone da Secretaria de Turismo: (49) 3537 0997 aqui e (49) 99164 9034 na página de contato."])

# ---------------- Guias de turismo ----------------
for gid, gname, lang, phones in [
    ("edson-concatto", "Edson Concatto", "Português", ["(49) 9 8837 9826", "(49) 9 9181 9826"]),
    ("veronica-knolseisen", "Veronica Knolseisen", "Português e alemão", ["(49) 3537 0834", "(49) 9 9979 2605"]),
    ("maria-aparecida-moser", "Maria Aparecida Moser", "Português", ["(49) 3537 0190", "(49) 9 9916 5675"]),
    ("gladis-ansiliero", "Gladis Ansiliero", "Português", ["(49) 9 9813 1336", "(49) 3537 0217"]),
    ("joao-dalla-costa", "João F. Dalla Costa", "Português", ["(49) 99947 0533", "(49) 3537 0294"]),
    ("sandra-kropp", "Sandra Mara B. Kropp", "Português", ["(49) 9 9979 7650", "(49) 3537 0504"]),
]:
    add(id=gid, name=gname, cats=[10], kind="service", summary=f"Guia de turismo · {lang}", phones=phones)

# ---------------- Receptivo ----------------
add(id="trenzinho", name="Trenzinho", cats=[9], kind="service", summary="Passeio de trenzinho (Luiz).",
    phones=["(49) 9 9976 7089", "(49) 9 9966 2062"])
add(id="tirolerbus", name="Tirolerbus", cats=[9], kind="service", summary="Passeio de ônibus.", phones=["(49) 3537 0277"])
add(id="onibus-interior", name="Passeio de ônibus pelo interior", cats=[9], kind="service", summary="Com Silvio.", phones=["(49) 3537 0529"])

# ---------------- Ferramenta de viagem ----------------
add(id="ferramenta-de-viagem", name="Ferramenta de viagem (Turista Fácil)", cats=[28], kind="service",
    summary="O guia atual oferece uma ferramenta de viagem identificada como “Turista Fácil”. O acesso continua pelo endereço original.",
    link=("Abrir a ferramenta no guia atual", "https://mapa.trezetilias.com.br/categoria/28/Ferramenta%20de%20Viagem"),
    confirm=["Não consegui abrir a ferramenta (o site bloqueia navegação automatizada). Confirmar o que ela faz e o link direto."])

# ---------------- Telefones úteis ----------------
U = dict(cats=[20], kind="service")
add(id="bombeiros", name="Corpo de Bombeiros Voluntários", **U, emergency="193", phones=["(49) 3537 0516", "(49) 9 9818 0592"],
    instagram="https://www.instagram.com/bombeirostrezetilias/")
add(id="policia", name="Delegacia de Polícia", **U, emergency="190", phones=["(49) 3537 0129"])
add(id="pronto-atendimento", name="Pronto Atendimento – Saúde", **U, phones=["(49) 99176 5217"])
add(id="posto-de-saude", name="Posto de Saúde – Recepção", **U, phones=["(49) 99181 1032"])
add(id="cat", name="CAT – Centro de Atendimento ao Turista", cats=[20], kind="service",
    phones=["(49) 99164 9034"], whatsapp="(49) 99164 9034", email="cat@trezetilias.sc.gov.br",
    address="Rua Pedro Nelcido Käfer, 115", district="Centro")
add(id="secretaria-de-turismo", name="Secretaria de Turismo, Indústria e Comércio", cats=[20], kind="service",
    phones=["(49) 99164 9034"], email="cat@trezetilias.sc.gov.br", address="Rua Pedro Nelcido Käfer, 115", district="Centro")
add(id="prefeitura", name="Prefeitura Municipal", **U, phones=["(49) 3536 0166", "(49) 3537 0176"], site="https://trezetilias.atende.net/")
add(id="casan", name="CASAN – Água e saneamento", **U, phones=["(49) 3537 0419"])
add(id="celesc", name="CELESC – Energia elétrica", **U, phones=["(49) 3537 0230"])
for tid, tname, ph in [("taxi-sergio-boesing", "Táxi – Sérgio Boesing", "(49) 9 9911 0656"),
                       ("taxi-dica", "Táxi – Dica Serviços de Táxi", "(49) 9 9986 2490"),
                       ("taxi-angelo", "Táxi – Angelo", "(49) 9 9952 3554"),
                       ("taxi-sebastiao", "Táxi – Sebastião", "(49) 9 9828 2723"),
                       ("taxi-morais", "Táxi – Morais", "(49) 9 9828 2723")]:
    add(id=tid, name=tname, **U, group="Táxi", phones=[ph],
        hide=["phone"] if tid in ("taxi-sebastiao", "taxi-morais") else None,
        confirm=["Sebastião e Morais aparecem com o mesmo número no cadastro."] if tid in ("taxi-sebastiao", "taxi-morais") else None)

# ---------------- Entidades ----------------
add(id="asturtilias", name="Asturtílias – Associação de Turismo de Treze Tílias", cats=[20], kind="service",
    phones=["(49) 99982 1987"], whatsapp="(49) 99982 1987", email="asturtilias@gmail.com",
    address="Rua Pedro Nelcido Käfer, 115", district="Centro",
    instagram="https://www.instagram.com/visitetrezetilias/", facebook="https://www.facebook.com/Asturtilias",
    site="https://www.trezetilias.com.br")
ENT = [
    ("banda-dos-tiroleses", "Banda dos Tiroleses", "Banda formada em 1933, ainda no navio dos imigrantes; atividades ininterruptas desde então.", ["(49) 99194 5886"], "bandadostiroleses@gmail.com", "http://www.bandadostiroleses.com", "https://www.instagram.com/bandadostiroleses/", "313f8c_a3e78ae416824130953423f662999382~mv2.png"),
    ("coral-tiroler-echo", "Coral Tiroler Echo", "Cantou pela primeira vez no Natal de 1933; canções tirolesas e melodias antigas.", ["(49) 3537 1388"], None, None, None, "313f8c_ffee110018e146dd9d0638e21746c6b3~mv2.png"),
    ("coral-hobbysanger", "Coral Hobbysänger", "Coral fundado em 1993.", [], None, None, None, "313f8c_27cbfbb0d51544c99d6bdc86d374135a~mv2.png"),
    ("coral-amici-della-cantoria", "Coral Amici della Cantoria", None, [], None, None, None, "313f8c_e4612ecdaf404b3eb66bc3c0fe277d91~mv2.png"),
    ("coral-treze-tilias", "Coral Treze Tílias", None, [], None, None, None, "58bdae_a9b815b4fe4c492ba1f9650a33eba30c~mv2.jpg"),
    ("schuhplattler", "Grupo de Danças Austríacas Schuhplattler", "O grupo de danças mais antigo de Treze Tílias, fundado em 1933.", ["(49) 9 9980 2500"], None, None, "https://www.instagram.com/gruposchuhplattler/", "313f8c_4b452bba2c4443a7bcdf929773eced81~mv2.png"),
    ("lindental", "Lindental Tanz Gruppe", "Danças folclóricas tirolesas desde 1995; apresentações em hotéis e restaurantes.", ["(49) 3537 0658"], "minicidade@yahoo.com.br", None, "https://www.instagram.com/grupo_lindental/", "313f8c_f09630676f324968924dc95b60f88887~mv2.png"),
    ("tiroler-plattler", "Grupo de Danças Tiroler Plattler", "Associação cultural fundada em 2000 para difundir o folclore tirolês.", ["(49) 9 9902 6512"], "tirolerplattler@hotmail.com", None, "https://www.instagram.com/tirolerplattler/", "313f8c_e20ee107858e4d289375585909aa9a71~mv2.png"),
    ("westfalen", "Grupo de Danças Folclóricas Alemãs Westfalen", "Fundado em 1998; danças acrobáticas e polcas.", [], None, None, None, "313f8c_86e2e4c0c3214fdcb812e21da108f9b6~mv2.png"),
    ("volare", "Grupo de Danças Italianas Volare", "Grupo da Associação Vêneta de Treze Tílias.", [], None, None, "https://www.instagram.com/gruppo_folk_volare/", "313f8c_d7c050ece2a44d4cacd7170e523028ae~mv2.png"),
    ("dorfmusik", "Banda Dorfmusik", "Banda jovem ligada à Banda dos Tiroleses desde 2016.", [], None, None, None, "313f8c_606a7fd831f8491391f1ca3d9c0c28fc~mv2.png"),
    ("ccdl", "Centro Cultural Dona Leopoldina (CCDL)", "Fundado em 1969; mantém a escola de alemão Karl Ilg Schule.", [], "centroculturaldl@gmail.com", "http://www.ccdl.org.br", None, "313f8c_151fa5a8a4e34e11be79aa03fb85c2a6~mv2.png"),
]
for eid, ename, esum, eph, eem, esite, eig, eph_ in ENT:
    add(id=eid, name=ename, cats=[11], kind="service", summary=esum, phones=eph, email=eem, site=esite, instagram=eig, photo=eph_)
add(id="bombeiros-entidade", alias="bombeiros", cats=[11])

# Eventos: Espaço de Eventos recebe Espaço Diversittá e Treze Tílias Park Hotel (ver confirm).
# Espaço Infantil recebe Parque Aquático, Lindendorf, Minigolf e Strike Boliche (ver confirm).
