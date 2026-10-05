const Modalidade =
    require('./Modalidade');

class Equipe {

    #nome;
    #idEquipe;
    #idTurma;
    #modalidade;
    #atletas;

    constructor(
        nome,
        idEquipe,
        idTurma,
        modalidade
    ) {
        this.#nome = nome;
        this.#idEquipe = idEquipe;
        this.#idTurma = idTurma;
        this.#modalidade = modalidade;
        this.#atletas = [];
    }

    get nome() {
        return this.#nome;
    }

    get idEquipe() {
        return this.#idEquipe;
    }

    get idTurma() {
        return this.#idTurma;
    }

    get modalidade() {
        return this.#modalidade;
    }

    get atletas() {
        return this.#atletas;
    }

    set idEquipe(
        novoIdEquipe
    ) {
        if (
            !Number.isInteger(
                novoIdEquipe
            ) ||
            novoIdEquipe <= 0
        ) {
            console.log(
                '[ERRO] ID de equipe inválido.'
            );

            return;
        }

        this.#idEquipe =
            novoIdEquipe;
    }

    set idTurma(
        novoIdTurma
    ) {
        this.#idTurma =
            novoIdTurma;
    }

    set modalidade(
        novaModalidade
    ) {
        const modalidades =
            Object.values(
                Modalidade
            );

        if (
            !modalidades.includes(
                novaModalidade
            )
        ) {
            console.log(
                'ERRO, modalidade inválida.'
            );

            return;
        }

        this.#modalidade =
            novaModalidade;
    }

    adicionarAtleta(
        idAtleta
    ) {
        if (
            !Number.isInteger(
                idAtleta
            ) ||
            idAtleta <= 0
        ) {
            console.log(
                '[ERRO] ID de atleta inválido.'
            );

            return false;
        }

        if (
            this.#atletas.includes(
                idAtleta
            )
        ) {
            return false;
        }

        this.#atletas.push(
            idAtleta
        );

        return true;
    }

    removerAtleta(
        idAtleta
    ) {
        const quantidadeAntes =
            this.#atletas.length;

        this.#atletas =
            this.#atletas.filter(
                id => id !== idAtleta
            );

        return (
            this.#atletas.length <
            quantidadeAntes
        );
    }

    exibirDados() {
        console.log(
            `ID: ${this.idEquipe} | ` +
            `Turma: ${this.idTurma} | ` +
            `Modalidade: ${this.modalidade} | ` +
            `Atletas: ${this.atletas.length}`
        );
    }

    exibir(
        nomeTurma,
        nomesAtletas
    ) {
        console.log(
            `\nID Equipe: ${this.idEquipe}`
        );

        console.log(
            `Nome: ${this.nome}`
        );

        console.log(
            `Turma: ${nomeTurma}`
        );

        console.log(
            `Modalidade: ${this.modalidade}`
        );

        if (
            nomesAtletas.length === 0
        ) {
            console.log(
                'Atletas: Nenhum atleta vinculado.'
            );
        } else {
            console.log(
                `Atletas: ${nomesAtletas.join(', ')}`
            );
        }
    }
}

module.exports = Equipe;