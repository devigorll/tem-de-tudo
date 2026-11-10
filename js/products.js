/* Configurações comerciais e catálogo. Edite aqui para mudar loja, preços e produtos. */
window.TDT = window.TDT || {};
TDT.CONFIG = {
  storeName: "Tem de Tudo",
  address: "Rua Eritréia, 30",
  neighborhood: "", // preencher quando disponível
  city: "",         // preencher quando disponível
  hours: "Segunda a sábado, das 09h às 19h",
  openDays: [1, 2, 3, 4, 5, 6], openHour: 9, closeHour: 19,
  whatsappLink: "https://wa.me/message/36455NZSW7EJE1", // link oficial da loja
  whatsappPhone: "5511965070243" // número da loja (só dígitos): envia o pedido já preenchido
};
TDT.CATEGORIES = [
  { id: "salgados", name: "Salgados", image: "assets/images/categories/salgados.svg" },
  { id: "espetos", name: "Espetos", image: "assets/images/categories/espetos.svg" },
  { id: "bolos", name: "Bolos de pote", image: "assets/images/categories/bolos.svg" },
  { id: "bebidas", name: "Bebidas", image: "assets/images/categories/bebidas.svg" }
];
/* tags: "popular" | "new" | "promo". Preços fictícios para demonstração. */
TDT.PRODUCTS = [
  { id: "coxinha", category: "salgados", name: "Coxinha de frango", description: "Massa dourada e crocante com recheio cremoso de frango.", price: 6.00, image: "assets/images/products/coxinha.svg", tags: ["popular"] },
  { id: "risole", category: "salgados", name: "Risole de queijo", description: "Massa empanada e crocante com queijo derretido por dentro.", price: 5.00, image: "assets/images/products/risole.svg", tags: [] },
  { id: "pastel-carne", category: "salgados", name: "Pastel de carne", description: "Pastel sequinho e crocante recheado com carne temperada.", price: 8.00, image: "assets/images/products/pastel-carne.svg", tags: ["popular"] },
  { id: "pastel-queijo", category: "salgados", name: "Pastel de queijo", description: "Pastel crocante com recheio generoso de queijo.", price: 8.00, image: "assets/images/products/pastel-queijo.svg", tags: [] },
  { id: "bolinha-queijo", category: "salgados", name: "Bolinha de queijo", description: "Bolinha frita e dourada, macia e cheia de queijo.", price: 5.00, image: "assets/images/products/bolinha-queijo.svg", tags: [] },
  { id: "enroladinho", category: "salgados", name: "Enroladinho de presunto e queijo", description: "Massa macia enrolada com presunto e queijo.", price: 6.00, image: "assets/images/products/enroladinho.svg", tags: [] },
  { id: "esfiha", category: "salgados", name: "Esfiha de carne", description: "Esfiha aberta com carne temperada.", price: 7.00, image: "assets/images/products/esfiha.svg", tags: [] },
  { id: "pao-queijo", category: "salgados", name: "Pão de queijo", description: "Quentinho, macio por dentro e com casquinha leve.", price: 4.00, image: "assets/images/products/pao-queijo.svg", tags: [] },
  { id: "espeto-carne", category: "espetos", name: "Espeto de carne", description: "Cubos de carne grelhados no ponto.", price: 12.00, image: "assets/images/products/espeto-carne.svg", tags: ["popular"] },
  { id: "espeto-frango", category: "espetos", name: "Espeto de frango", description: "Frango suculento grelhado na brasa.", price: 10.00, image: "assets/images/products/espeto-frango.svg", tags: [] },
  { id: "espeto-linguica", category: "espetos", name: "Espeto de linguiça", description: "Linguiça grelhada com sabor de churrasco.", price: 10.00, image: "assets/images/products/espeto-linguica.svg", tags: [] },
  { id: "espeto-coalho", category: "espetos", name: "Espeto de queijo coalho", description: "Queijo coalho dourado, macio por dentro.", price: 9.00, image: "assets/images/products/espeto-coalho.svg", tags: ["new"] },
  { id: "espeto-coracao", category: "espetos", name: "Espeto de coração", description: "Coração de frango grelhado e temperado.", price: 12.00, image: "assets/images/products/espeto-coracao.svg", tags: [] },
  { id: "bolo-chocolate", category: "bolos", name: "Bolo de pote de chocolate", description: "Camadas de bolo fofinho de chocolate com creme.", price: 10.00, image: "assets/images/products/bolo-chocolate.svg", tags: [] },
  { id: "bolo-ninho", category: "bolos", name: "Bolo de pote de ninho com morango", description: "Creme de leite ninho com morangos frescos.", price: 12.00, image: "assets/images/products/bolo-ninho.svg", tags: ["new"] },
  { id: "bolo-cenoura", category: "bolos", name: "Bolo de pote de cenoura com chocolate", description: "Bolo de cenoura com cobertura de chocolate.", price: 10.00, image: "assets/images/products/bolo-cenoura.svg", tags: [] },
  { id: "bolo-prestigio", category: "bolos", name: "Bolo de pote de prestígio", description: "Chocolate com creme de coco.", price: 11.00, image: "assets/images/products/bolo-prestigio.svg", tags: ["popular"] },
  { id: "coca-lata", category: "bebidas", name: "Coca-Cola lata 350 ml", description: "Gelada, na lata de 350 ml.", price: 6.00, image: "assets/images/products/coca-lata.svg", tags: [] },
  { id: "guarana-lata", category: "bebidas", name: "Guaraná Antarctica lata 350 ml", description: "Refrigerante de guaraná, lata de 350 ml.", price: 5.00, image: "assets/images/products/guarana-lata.svg", tags: [] },
  { id: "coca-2l", category: "bebidas", name: "Coca-Cola 2 litros", description: "Garrafa de 2 litros para dividir.", price: 12.00, image: "assets/images/products/coca-2l.svg", tags: [] },
  { id: "agua", category: "bebidas", name: "Água mineral 500 ml", description: "Água mineral sem gás, 500 ml.", price: 3.00, image: "assets/images/products/agua.svg", tags: [] },
  { id: "suco", category: "bebidas", name: "Suco natural", description: "Suco natural, feito na hora.", price: 7.00, image: "assets/images/products/suco.svg", tags: [] }
];
/* Fotos reais do estabelecimento (carrossel de "Sobre nós").
   Coloque os arquivos em assets/images/estabelecimento/ e liste aqui. Vazio = carrossel oculto. */
TDT.GALLERY = [
  { src: "assets/images/estabelecimento/salgados-caixa.jpg", alt: "Caixas com salgados variados: folhados, pães de queijo e outros salgados" },
  { src: "assets/images/estabelecimento/enroladinhos.jpg", alt: "Enroladinhos dourados recheados com presunto e queijo" },
  { src: "assets/images/estabelecimento/interior.jpg", alt: "Projeto em 3D do interior, com mesas, cadeiras e parede de lousa" },
  { src: "assets/images/estabelecimento/fachada.jpg", alt: "Fachada vermelha do estabelecimento, com letreiro Lanchonete Verão" }
];
