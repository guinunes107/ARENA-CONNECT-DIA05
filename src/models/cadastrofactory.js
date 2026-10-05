const {
    Atleta,
    Arbitro
} = require('./pessoa');

const Turma =
    require('./turma');

const Equipe =
    require('./equipe');

class CadastroFactory {

    static criarTurma(id, nome) {
        const turma =
            new Turma(
                id,
                nome
            );

        if (!turma.nome) {
            throw new Error(
                'Nome da turma inválido.'
            );
        }

        return turma;
    }

    static criarAtleta(
        id,
        nome,
        modalidade,
        idade,
        idTurma
    ) {
        const atleta =
            new Atleta(
                id,
                nome,
                modalidade,
                idade,
                idTurma
            );

        if (!atleta.nome) {
            throw new Error(
                'Nome atleta inválido.'
            );
        }

        if (
            atleta.idTurma ===
            undefined
        ) {
            throw new Error(
                'Turma do atleta inválida.'
            );
        }

        return atleta;
    }

    static criarArbitro(
        id,
        nome,
        numeroCredencial,
        anosExperiencia
    ) {
        const arbitro =
            new Arbitro(
                id,
                nome,
                numeroCredencial,
                anosExperiencia
            );

        if (!arbitro.nome) {
            throw new Error(
                'Nome do árbitro inválido.'
            );
        }

        return arbitro;
    }

    static criarEquipe(
        nome,
        idEquipe,
        idTurma,
        modalidade
    ) {
        const equipe =
            new Equipe(
                nome,
                idEquipe,
                idTurma,
                modalidade
            );

        if (
            equipe.idTurma ===
            undefined
        ) {
            throw new Error(
                'Turma da equipe inválida.'
            );
        }

        if (!equipe.modalidade) {
            throw new Error(
                'Modalidade inválida.'
            );
        }

        return equipe;
    }
}

module.exports = CadastroFactory;