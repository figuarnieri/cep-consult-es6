document.querySelector('[data-cep]').addEventListener('blur', (event) => {
    let t = event.target
    , cep = t.value.replace('-', '').substring(0, 8)
    , url = 'https://viacep.com.br/ws/'+cep+'/json/'
    , tagLogadouro = document.querySelector('[data-rua]')
    , tagUf = document.querySelector('[data-uf]')
    , tagCidade = document.querySelector('[data-cidade]')
    , tagBairro = document.querySelector('[data-bairro]')
    , tagComplement = [tagLogadouro, tagUf, tagCidade, tagBairro]
    ;
    if(cep.length<8) return;
    fetch(url).then((res) => {
        tagComplement.map((selector) => {
            let attr = {"value": "", "placeholder": "Carregando..."};
            selector.setAttribute('data-placeholder', selector.placeholder);
            Object.entries(attr).map((key) => {
                selector[key[0]] = key[1];
            });
        })
        return res.json();
    }).then((res) => {
        tagComplement.map((selector) => {
            selector.placeholder=selector.dataset.placeholder;
        });
        if(res.erro){
            alert('CEP não encontrado');
            return;
        }
        tagLogadouro.value = res.logradouro;
        tagUf.value = res.uf;
        tagCidade.value = res.localidade;
        tagBairro.value = res.bairro;
        console.log(res);
    }).catch((error) => {
        console.error(error);
    });
});