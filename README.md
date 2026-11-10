# Tem de Tudo — Landing page e cardápio digital

Site estático (HTML5, CSS3 e JavaScript puro) com cardápio, carrinho e envio do pedido por WhatsApp. Sem backend, banco de dados ou dependências.

## Estrutura
```
index.html · vercel.json · css/style.css
js/products.js (config da loja + catálogo) · cart.js · theme.js · main.js
assets/logo · assets/images/{products,categories,banners}
```

## Executar localmente
Abra `index.html` no navegador, ou rode `npx serve .` / `python3 -m http.server` na pasta.

## Editar
- **Produtos e preços:** `js/products.js`, lista `TDT.PRODUCTS` (`price` em reais; `tags`: `popular`, `new`, `promo`). Imagem em `assets/images/products/`.
- **Endereço, bairro, cidade e horário:** `TDT.CONFIG` em `js/products.js`. Bairro e cidade estão vazios e passam a valer no Google Maps ao serem preenchidos.
- **WhatsApp:** `whatsappLink` (link oficial) e, `whatsappPhone` (já configurado com o número da loja).

## WhatsApp: ponto importante
O link `wa.me/message/...` abre a conversa, mas **não aceita texto dinâmico**. Por isso, com `whatsappPhone` preenchido o pedido abre já escrito (o resumo também é copiado como reserva); sem ele, o botão "Finalizar pedido" abre o link oficial e **copia o resumo** para a área de transferência (o cliente cola e envia). Para o pedido chegar já preenchido, informe o número da loja em `whatsappPhone` (somente dígitos, com DDI e DDD). Isso precisa da confirmação do dono da loja.

## Imagens
As imagens atuais são **ilustrações vetoriais (SVG) provisórias**, não fotografias. Substitua pelos arquivos reais mantendo os nomes, ou altere o campo `image` de cada produto.

## Publicar na Vercel
1. Envie a pasta para um repositório no GitHub.
2. Na Vercel: **Add New → Project**, importe o repositório.
3. Framework Preset: **Other**, sem build command. Deploy.
Ou, pelo terminal: `npx vercel --prod`.

## Fotos do estabelecimento
Copie as fotos (JPG/WebP, até ~1600 px de largura, ~200 KB cada) para `assets/images/estabelecimento/` e liste-as em `TDT.GALLERY` (`js/products.js`). Enquanto a lista estiver vazia, o carrossel fica oculto.

## Carrinho
Usa `sessionStorage`: mantém os itens ao atualizar a página na mesma aba e começa vazio em uma nova visita.
