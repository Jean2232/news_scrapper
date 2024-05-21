const cheerio = require('cheerio');
const axios = require('axios')


async function jogosdehj() {
    const url = "https://mantosdofutebol.com.br/guia-de-jogos-tv-hoje-ao-vivo/"

    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);

    const results = [];

    const titles = $('.penci-main-single-page-default > div > article > .post-entry .inner-post-entry > h3 > strong');
    const contents = $('.penci-main-single-page-default > div > article > .post-entry .inner-post-entry > p > span > strong');
    const date = $('.penci-main-single-page-default > div > article > .post-entry .inner-post-entry > h1 > strong').text().split(" ")[2].split("/")[0]
    const datehj = $('.penci-main-single-page-default > div > article > .post-entry .inner-post-entry > h1 > strong').text()

    const dataAtual = new Date()
    const diaAtual = `${dataAtual.getDate()}`

    if (date == diaAtual){
        titles.each((index, element) => {
            const title = $(element).text().trim();
            const content = $(contents[index]).text().trim();
            results.push({ title, content });
        });
    } 

    function formatarJogos(results) {
        let resultado = "";
        results.forEach(jogo => {
          resultado += `- ⚽${jogo.title}\n- Onde assistir: ${jogo.content}\n\n`;
        });
        return resultado;
      }
      
      const jogosFormatados = `⚽🥅 *Jogos de Hoje: ${datehj}:*\n\n` + formatarJogos(results) ;

    return jogosFormatados
}
jogosdehj()
