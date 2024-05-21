const cheerio = require('cheerio');
const axios = require('axios')

async function autoracingf1(){
const url = "https://www.autoracing.com.br/corrida/formula-1/"

const response = await axios.get(url);
const html = response.data;

const $ = cheerio.load(html);


const results = [];

$('.result-list > div').each((i, e) => {
  const title = $(e).find('h2 > a').text();
  const content = $(e).find('div > p').text();
  const post = $(e).find('span').text();
  const link = $(e).find('h2 > a').attr("href");

  var dateform = post.split(", ")[1]
  var diadata = `${dateform}`.split(" ")[0]

  const dataAtual = new Date()
  const diaAtual = `${dataAtual.getDate() - 1}`
  

  if (link != undefined && diadata == diaAtual){

    const dados = { title, content, diadata, link };
    
    results.push(dados);
  }})
    console.log(results)}

autoracingf1()

async function globo_e_fut() {
    const url = "https://ge.globo.com/futebol/"

    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);

    const results = [];

    $('._evt > div > ._evg > ._evt > div > ._evg > ._evt').each((i, e) => {
        const title = $(e).find('h2 > a > p').text();
        const content = $(e).find('.feed-post-body-resumo > p').text();
        const post = $(e).find('.feed-post-metadata > .feed-post-datetime').text();
        const link = $(e).find('h2 > a').attr("href");
        try {
            var dateform = post.split(" ")
            var num_min = dateform[1]
            var min_h = dateform[2]
        } catch {
            var dateform = post
        }

        if (num_min == "9" || num_min == "8" || num_min == "7" || num_min == "6" || num_min == "5" || num_min == "4" || num_min == "3" || num_min == "2" || num_min == "1") {
            if (min_h == "minutos") {
                var dados = {
                    title,
                    content,
                    post,
                    link
                };
                results.push(dados)
            }
        }
    })
    console.log(results)
}


globo_e_fut()


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
