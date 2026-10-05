    const prompt = require('prompt-sync')();

    const AtletaView = {
        perguntarIdTurma(){
            return parseInt(prompt("ID da Turma do Atleta: "))
        },
        perguntarNome(){
            return prompt("Nome do Atleta: ");
        },
        perguntarId(rotulo = "ID do Atleta: "){
            return parseInt(prompt(rotulo));
        },
        mostrarAtletaVinculado(nomeAtleta,nomeTurma){
            console.log(`✔ Atleta "${novoAtleta.nome}" vinculado ao ${turma.nome}!`);
        },
        mostrarErroCadastro(mensagem){
            console.log(`✖ Não foi possível cadastrar o atleta: ${erro.message}`);
        },
        listarAtletas(lista){
            console.log("\n=== LISTA DE ATLETAS ===");
        if (lista.atletas.length === 0) return console.log("Nenhum atleta no sistema.");
        lista.atletas.forEach(({atleta, nomeTurma}) => atleta.exibir(nomeTurma));
        },
    };

module.exports = AtletaView;