const fs = require('fs');
const path = require('path');
const prompt = require('prompt-sync')();

const Modalidade = require('./Modalidade');
const CadastroFactory = require('./cadastrofactory');

class ArenaConnect {
    static #instancia = null;

    static getInstancia() {
        if (!ArenaConnect.#instancia) {
            ArenaConnect.#instancia = new ArenaConnect();
        }

        return ArenaConnect.#instancia;
    }

    constructor() {
        if (ArenaConnect.#instancia) {
            throw new Error(
                'ArenaConnect já existe. Use ArenaConnect.getInstancia().'
            );
        }

        this.turmas = [];
        this.atletas = [];
        this.arbitros = [];
        this.equipes = [];

        this.idTurmaContador = 1;
        this.idAtletaContador = 1;
        this.idArbitroContador = 1;
        this.idEquipeContador = 1;
    }

    adicionarTurma() {
        const nome = prompt('Nome da nova turma: ');

        try {
            const novaTurma = CadastroFactory.criarTurma(
                this.idTurmaContador,
                nome
            );

            this.turmas.push(novaTurma);
            this.idTurmaContador++;

            console.log('✔ Turma registrada com sucesso!');
        } catch (erro) {
            console.log(`✖ Turma não registrada: ${erro.message}`);
        }
    }

    listarTurmas() {
        console.log('\n=== LISTA DE TURMAS ===');

        if (this.turmas.length === 0) {
            console.log('Nenhuma turma no sistema.');
            return;
        }

        this.turmas.forEach(turma => turma.exibirDados());
    }

    buscarTurmaOuFalhar(idTurma) {
        const turma = this.turmas.find(
            turma => turma.id === idTurma
        );

        if (!turma) {
            throw new Error(
                `Turma com ID ${idTurma} não existe.`
            );
        }

        return turma;
    }

    buscarAtletaOuFalhar(idAtleta) {
        const atleta = this.atletas.find(
            atleta => atleta.id === idAtleta
        );

        if (!atleta) {
            throw new Error(
                `Atleta com ID ${idAtleta} não existe.`
            );
        }

        return atleta;
    }

    buscarEquipeOuFalhar(idEquipe) {
        const equipe = this.equipes.find(
            equipe => equipe.idEquipe === idEquipe
        );

        if (!equipe) {
            throw new Error(
                `Equipe com ID ${idEquipe} não existe.`
            );
        }

        return equipe;
    }

    adicionarAtleta() {
        this.listarTurmas();

        if (this.turmas.length === 0) {
            return;
        }

        const idTurma = parseInt(
            prompt('ID da Turma: ')
        );

        const nome = prompt(
            'Nome do Atleta: '
        );

        const modalidade = prompt(
            'Modalidade do Atleta: '
        );

        const idade = parseInt(
            prompt('Idade do Atleta: ')
        );

        try {
            const turma =
                this.buscarTurmaOuFalhar(idTurma);

            const novoAtleta =
                CadastroFactory.criarAtleta(
                    this.idAtletaContador,
                    nome,
                    modalidade,
                    idade,
                    idTurma
                );

            this.atletas.push(novoAtleta);

            this.idAtletaContador++;

            console.log(
                `✔ Atleta ${novoAtleta.nome} registrado com sucesso na turma ${turma.nome}!`
            );
        } catch (erro) {
            console.log(
                `✖ Atleta não registrado: ${erro.message}`
            );
        }
    }

    listarAtletas() {
        console.log('\n=== LISTA DE ATLETAS ===');

        if (this.atletas.length === 0) {
            console.log('Nenhum atleta no sistema.');
            return;
        }

        this.atletas.forEach(atleta => {
            const turma = this.turmas.find(
                turma => turma.id === atleta.idTurma
            );

            atleta.exibirDados();

            console.log(
                `Turma: ${
                    turma
                        ? turma.nome
                        : 'Turma não encontrada'
                }`
            );

            console.log('----------------------');
        });
    }

    adicionarArbitro() {
        const nome = prompt(
            'Nome do Árbitro: '
        );

        const numeroCredencial = parseInt(
            prompt('Número de Credencial: ')
        );

        const anosExperiencia = parseInt(
            prompt('Anos de Experiência: ')
        );

        try {
            const novoArbitro =
                CadastroFactory.criarArbitro(
                    this.idArbitroContador,
                    nome,
                    numeroCredencial,
                    anosExperiencia
                );

            this.arbitros.push(novoArbitro);

            this.idArbitroContador++;

            console.log(
                '✔ Árbitro registrado com sucesso!'
            );
        } catch (erro) {
            console.log(
                `✖ Árbitro não registrado: ${erro.message}`
            );
        }
    }

    listarArbitros() {
        console.log('\n=== LISTA DE ÁRBITROS ===');

        if (this.arbitros.length === 0) {
            console.log('Nenhum árbitro no sistema.');
            return;
        }

        this.arbitros.forEach(
            arbitro => arbitro.exibirDados()
        );
    }

    equipeJaExiste(idTurma, modalidade) {
        return this.equipes.some(
            equipe =>
                equipe.idTurma === idTurma &&
                equipe.modalidade === modalidade
        );
    }

    adicionarEquipe() {
        this.listarTurmas();

        if (this.turmas.length === 0) {
            return;
        }

        const idTurma = parseInt(
            prompt('ID da Turma: ')
        );

        try {
            const turma =
                this.buscarTurmaOuFalhar(idTurma);

            console.log(
                '\nModalidades disponíveis:'
            );

            Object.values(Modalidade).forEach(
                modalidade => {
                    console.log(`- ${modalidade}`);
                }
            );

            const modalidade = prompt(
                'Modalidade: '
            );

            if (
                this.equipeJaExiste(
                    idTurma,
                    modalidade
                )
            ) {
                throw new Error(
                    `A turma ${turma.nome} já possui uma equipe em "${modalidade}".`
                );
            }

            const nome = prompt(
                'Nome da equipe: '
            );

            const novaEquipe =
                CadastroFactory.criarEquipe(
                    nome,
                    this.idEquipeContador,
                    idTurma,
                    modalidade
                );

            this.equipes.push(novaEquipe);

            this.idEquipeContador++;

            console.log(
                `✔ Equipe registrada: ${turma.nome} em "${modalidade}"!`
            );
        } catch (erro) {
            console.log(
                `✖ Equipe não registrada: ${erro.message}`
            );
        }
    }

    listarEquipes() {
        console.log('\n=== LISTA DE EQUIPES ===');

        if (this.equipes.length === 0) {
            console.log(
                'Nenhuma equipe no sistema.'
            );
            return;
        }

        this.equipes.forEach(equipe => {
            const turma = this.turmas.find(
                turma =>
                    turma.id === equipe.idTurma
            );

            const nomesAtletas =
                equipe.atletas
                    .map(idAtleta =>
                        this.atletas.find(
                            atleta =>
                                atleta.id === idAtleta
                        )
                    )
                    .filter(atleta => atleta)
                    .map(atleta => atleta.nome);

            equipe.exibir(
                turma
                    ? turma.nome
                    : 'TURMA NÃO ENCONTRADA',
                nomesAtletas
            );
        });
    }

    removerEquipe() {
        this.listarEquipes();

        if (this.equipes.length === 0) {
            return;
        }

        const idEquipe = parseInt(
            prompt('ID da Equipe a remover: ')
        );

        try {
            const equipe =
                this.buscarEquipeOuFalhar(
                    idEquipe
                );

            this.equipes =
                this.equipes.filter(
                    equipeAtual =>
                        equipeAtual.idEquipe !==
                        equipe.idEquipe
                );

            console.log(
                '✔ Equipe removida. Os atletas continuam no sistema.'
            );
        } catch (erro) {
            console.log(
                `✖ Não foi possível remover: ${erro.message}`
            );
        }
    }

    vincularAtletaEquipe() {
        this.listarEquipes();

        if (this.equipes.length === 0) {
            return;
        }

        const idEquipe = parseInt(
            prompt('ID da Equipe: ')
        );

        try {
            const equipe =
                this.buscarEquipeOuFalhar(
                    idEquipe
                );

            this.listarAtletas();

            if (this.atletas.length === 0) {
                return;
            }

            const idAtleta = parseInt(
                prompt('ID do Atleta: ')
            );

            const atleta =
                this.buscarAtletaOuFalhar(
                    idAtleta
                );

            if (
                atleta.idTurma !==
                equipe.idTurma
            ) {
                throw new Error(
                    `${atleta.nome} não pertence à turma dessa equipe.`
                );
            }

            if (
                !equipe.adicionarAtleta(
                    idAtleta
                )
            ) {
                throw new Error(
                    `${atleta.nome} já está nessa equipe.`
                );
            }

            console.log(
                `✔ ${atleta.nome} vinculado à equipe!`
            );
        } catch (erro) {
            console.log(
                `✖ Não foi possível vincular: ${erro.message}`
            );
        }
    }

    desvincularAtletaEquipe() {
        this.listarEquipes();

        if (this.equipes.length === 0) {
            return;
        }

        const idEquipe = parseInt(
            prompt('ID da Equipe: ')
        );

        try {
            const equipe =
                this.buscarEquipeOuFalhar(
                    idEquipe
                );

            const idAtleta = parseInt(
                prompt(
                    'ID do Atleta a remover da equipe: '
                )
            );

            const atleta =
                this.buscarAtletaOuFalhar(
                    idAtleta
                );

            if (
                !equipe.removerAtleta(
                    idAtleta
                )
            ) {
                throw new Error(
                    `${atleta.nome} não está nessa equipe.`
                );
            }

            console.log(
                `✔ ${atleta.nome} removido da equipe.`
            );
        } catch (erro) {
            console.log(
                `✖ Não foi possível desvincular: ${erro.message}`
            );
        }
    }

    // =====================================================
    // PERSISTÊNCIA
    // =====================================================

    salvarEstado() {
        const caminhoArquivo =
            path.join(
                __dirname,
                '../../dados.json'
            );

        const estado = {
            turmas: this.turmas.map(
                turma => ({
                    id: turma.id,
                    nome: turma.nome
                })
            ),

            atletas: this.atletas.map(
                atleta => ({
                    id: atleta.id,
                    nome: atleta.nome,
                    modalidade:
                        atleta.modalidade,
                    idade: atleta.idade,
                    idTurma:
                        atleta.idTurma
                })
            ),

            arbitros: this.arbitros.map(
                arbitro => ({
                    id: arbitro.id,
                    nome: arbitro.nome,
                    numeroCredencial:
                        arbitro.numeroCredencial,
                    anosExperiencia:
                        arbitro.anosExperiencia
                })
            ),

            equipes: this.equipes.map(
                equipe => ({
                    nome: equipe.nome,
                    idEquipe:
                        equipe.idEquipe,
                    idTurma:
                        equipe.idTurma,
                    modalidade:
                        equipe.modalidade,

                    atletas:
                        [...equipe.atletas]
                })
            ),

            contadores: {
                idTurmaContador:
                    this.idTurmaContador,

                idAtletaContador:
                    this.idAtletaContador,

                idArbitroContador:
                    this.idArbitroContador,

                idEquipeContador:
                    this.idEquipeContador
            }
        };

        fs.writeFileSync(
            caminhoArquivo,
            JSON.stringify(
                estado,
                null,
                2
            ),
            'utf8'
        );

        console.log(
            '✔ Dados salvos com sucesso em dados.json!'
        );
    }

    carregarEstado() {
        const caminhoArquivo =
            path.join(
                __dirname,
                '../../dados.json'
            );

        if (
            !fs.existsSync(
                caminhoArquivo
            )
        ) {
            console.log(
                'ℹ Nenhum arquivo de dados encontrado. Sistema iniciado vazio.'
            );

            return;
        }

        try {
            const conteudo =
                fs.readFileSync(
                    caminhoArquivo,
                    'utf8'
                );

            const estado =
                JSON.parse(conteudo);

            // ===============================
            // TURMAS
            // ===============================

            this.turmas =
                (estado.turmas || []).map(
                    turmaDados =>
                        CadastroFactory.criarTurma(
                            turmaDados.id,
                            turmaDados.nome
                        )
                );

            // ===============================
            // ATLETAS
            // ===============================

            this.atletas =
                (estado.atletas || []).map(
                    atletaDados =>
                        CadastroFactory.criarAtleta(
                            atletaDados.id,
                            atletaDados.nome,
                            atletaDados.modalidade,
                            atletaDados.idade,
                            atletaDados.idTurma
                        )
                );

            // ===============================
            // ÁRBITROS
            // ===============================

            this.arbitros =
                (estado.arbitros || []).map(
                    arbitroDados =>
                        CadastroFactory.criarArbitro(
                            arbitroDados.id,
                            arbitroDados.nome,
                            arbitroDados.numeroCredencial,
                            arbitroDados.anosExperiencia
                        )
                );

            // ===============================
            // EQUIPES
            // ===============================

            this.equipes =
                (estado.equipes || []).map(
                    equipeDados => {

                        const equipe =
                            CadastroFactory.criarEquipe(
                                equipeDados.nome,
                                equipeDados.idEquipe,
                                equipeDados.idTurma,
                                equipeDados.modalidade
                            );

                        /*
                         * #atletas é privado.
                         *
                         * Por isso não fazemos:
                         *
                         * equipe.atletas =
                         *     equipeDados.atletas;
                         *
                         * Usamos o método público.
                         */

                        (
                            equipeDados.atletas || []
                        ).forEach(
                            idAtleta => {
                                equipe.adicionarAtleta(
                                    idAtleta
                                );
                            }
                        );

                        return equipe;
                    }
                );

            // ===============================
            // CONTADORES
            // ===============================

            if (estado.contadores) {
                this.idTurmaContador =
                    estado.contadores
                        .idTurmaContador;

                this.idAtletaContador =
                    estado.contadores
                        .idAtletaContador;

                this.idArbitroContador =
                    estado.contadores
                        .idArbitroContador;

                this.idEquipeContador =
                    estado.contadores
                        .idEquipeContador;
            }

            console.log(
                '✔ Dados carregados com sucesso!'
            );
        } catch (erro) {
            console.log(
                `✖ Erro ao carregar os dados: ${erro.message}`
            );
        }
    }
}

module.exports = { ArenaConnect };