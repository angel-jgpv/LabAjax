const carregarLista = lista => {
    return lista.reduce((acum, item) => acum += `<li>${item}</li>`, "");
    }

const carregarListaComTipo = (titulo, lista, tipo="ul") =>{
    let secao = ``;
    secao += `<h4>${titulo}</h4>`
    secao += `<${tipo}>`;
    secao += carregarLista(lista);
    secao += `</${tipo}>`;
    return secao
}

const pegarMedia = lista =>{
    let soma = lista.reduce((acum, opiniao) => {
        return acum + opiniao.rating;
    }, 0)
    return soma / lista.length;
}

const pegarEstrela = (nota) => {
    let pEstrelas = ``;
    pEstrelas += `<p id="estrelas">`
        let i = 1;
        for(i; i <= 5; i++){
            if(nota >= 1)
                pEstrelas += `★`;
            else if(nota >= 0.5)
                pEstrelas += `✬`;
            else
                pEstrelas += `✩`;
            nota -= 1;
        }
        pEstrelas += `</p>`;
        return pEstrelas;
}

const coloreClassificacao = (classificacao) => {
    let classe ="";
        if( classificacao >= 18)
            classe = "vermelho";
        else if( classificacao >= 14)
            classe = "amarelo";
        else
            classe = "verde";
        tagClassificacao = "";
        tagClassificacao += `<p class="${classe} idade">`;
        tagClassificacao +=  classificacao == 0 ? "&nbsp;L&nbsp;" :  classificacao
        tagClassificacao += `</p>`
        return tagClassificacao;
}


const xhttp     = new XMLHttpRequest();
const url       = "https://rafaelescalfoni.github.io/desenv_web/filmes.json";
const filmeDiv = document.querySelector("#filmes");


xhttp.open("GET", url);
xhttp.send();

xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        const filmesJson = JSON.parse(this.responseText);
        console.dir(filmesJson);

        filmesJson.forEach(filme => {
            let cardFilme = `<div class="filme">` 

            cardFilme += `<div class="top">`
            cardFilme += `<img src="${filme.figura}">`;
            cardFilme += `<div id="non-img-top">`
            cardFilme += `<h2>${filme.titulo}</h2>`;
            cardFilme += carregarListaComTipo("Gênero", filme.generos, "ul");
            cardFilme += `</div></div>`

            cardFilme += carregarListaComTipo("Elenco", filme.elenco, "ul");
            cardFilme += `<p>${filme.resumo}</p>`;

            cardFilme += `<div class="bottom">`
            cardFilme += coloreClassificacao(filme.classificacao);
            const notaMedia = pegarMedia(filme.opinioes)
            cardFilme += pegarEstrela(notaMedia)
            cardFilme += `</div>`


            const semelhantes = filme.titulosSemelhantes.map(tituloSemelhanteId => filmesJson[tituloSemelhanteId-1].titulo)
            cardFilme += semelhantes.length > 0 ? carregarListaComTipo("Semelhantes", semelhantes, "ul") : ``;

            cardFilme += `</div>`;
            filmeDiv.innerHTML += cardFilme;
        })
    }
}