class Pessoa {

    #id;
    #nome;

    constructor(
        id,
        nome
    ) {
        this.#id = id;
        this.nome = nome;
    }

    set nome(
        novoNome
    ) {
        if (
            !novoNome ||
            novoNome.length < 3
        ) {
            console.log(
                'Nome inválido. Acesso não permitido.'
            );

            return;
        }

        this.#nome =
            novoNome;
    }

    get nome() {
        return this.#nome;
    }

    get id() {
        return this.#id;
    }

    exibirDados() {
        console.log(
            `[${this.id}] - Nome: ${this.nome}`
        );
    }
}


class Atleta
    extends Pessoa {

    #idTurma;
    #modalidade;
    #idade;

    constructor(
        id,
        nome,
        modalidade,
        idade,
        idTurma
    ) {
        super(
            id,
            nome
        );

        this.modalidade =
            modalidade;

        this.idade =
            idade;

        this.#idTurma =
            idTurma;
    }

    eMaiorDeIdade() {
        return (
            this.idade >= 18
        );
    }

    set idTurma(
        novoIdTurma
    ) {
        this.#idTurma =
            novoIdTurma;
    }

    get idTurma() {
        return this.#idTurma;
    }

    set modalidade(
        novaModalidade
    ) {
        this.#modalidade =
            novaModalidade;
    }

    get modalidade() {
        return this.#modalidade;
    }

    set idade(
        novaIdade
    ) {
        this.#idade =
            novaIdade;
    }

    get idade() {
        return this.#idade;
    }

    exibirDados() {
        console.log(
            `[${this.id}] - ` +
            `Nome: ${this.nome} | ` +
            `Modalidade: ${this.modalidade} | ` +
            `Idade: ${this.idade} | ` +
            `ID da Turma: ${this.idTurma}`
        );
    }
}


class Arbitro
    extends Pessoa {

    #numeroCredencial;
    #anosExperiencia;

    constructor(
        id,
        nome,
        numeroCredencial,
        anosExperiencia
    ) {
        super(
            id,
            nome
        );

        this.numeroCredencial =
            numeroCredencial;

        this.anosExperiencia =
            anosExperiencia;
    }

    set numeroCredencial(
        novoNumeroCredencial
    ) {
        this.#numeroCredencial =
            novoNumeroCredencial;
    }

    get numeroCredencial() {
        return this.#numeroCredencial;
    }

    set anosExperiencia(
        novoAnosExperiencia
    ) {
        this.#anosExperiencia =
            novoAnosExperiencia;
    }

    get anosExperiencia() {
        return this.#anosExperiencia;
    }

    exibirDados() {
        console.log(
            `[${this.id}] - ` +
            `Nome: ${this.nome} | ` +
            `Credencial: ${this.numeroCredencial} | ` +
            `Experiência: ${this.anosExperiencia} anos`
        );
    }
}


module.exports = {
    Pessoa,
    Atleta,
    Arbitro
};