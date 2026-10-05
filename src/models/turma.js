class Turma {

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
            `[${this.id}] - ${this.nome}`
        );
    }
}

module.exports = Turma;