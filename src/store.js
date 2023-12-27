import Vuex from 'vuex'

export default new Vuex.Store({
    state: {
        titulo: 'Equipes Médicas',
        equipe: {
            enfermeiro: '',
            socorrista: '',
            medico: '',
            carro: '',
            telefone: '',
            kitDeReanimacao: ''
        },
        equipes: [],
        enfermeiros: [],
        socorristas: [],
        medicos: [],
        equipamentos: {
            carros: [],
            telefones: [],
            kitsDeReanimacao: []
        }
    },
    getters: {
        totalEnfermeiros(state) {
            return state.enfermeiros.length
        },
        enfermeirosPorEscala(state) { 
            return escala => !escala ? state.enfermeiros : state.enfermeiros.filter(e => e.escala === escala)
        },
        totalEnfermeirosPorEscala: (state, getters) => escala => getters.enfermeirosPorEscala(escala).length,
        socorristasPorTurno(state) { 
            return turno => !turno ? state.socorristas : state.socorristas.filter(s => s.turno === turno)
        },
        totalSocorristas: state => state.socorristas.length,
        totalSocorristasPorTurno: (state, getters) => turno => getters.socorristasPorTurno(turno).length,
        totalMedicos(state) {
            return state.medicos.length
        },
        medicosPorEscala(state) { 
            return escala => !escala ? state.medicos : state.medicos.filter(m => m.escala === escala)
        },
        totalMedicosPorEscala: (state, getters) => escala => getters.medicosPorEscala(escala).length,
        getEquipes: state => state.equipes,
    },
    mutations: {
        setItemEquipe: (state, item) => {

            let t = item.tipo
            let d = item.dados

            if(t == 'enfermeiros') state.equipe.enfermeiro = d.nome
            if(t == 'socorristas') state.equipe.socorrista = d.nome
            if(t == 'medicos') state.equipe.medico = d.nome
            if(t == 'carros') state.equipe.carro = d.placa
            if(t == 'telefones') state.equipe.telefone = d.telefone
            if(t == 'kits-de-reanimacao') state.equipe.kitDeReanimacao = d.kit
            
        },
        setEnfermeiros: (state, payload) => {
            state.enfermeiros = payload
        },
        setSocorristas: (state, payload) => {
            state.socorristas = payload
        },
        setMedicos: (state, payload) => {
            state.medicos = payload
        },
        setCarros: (state, payload) => {
            state.equipamentos.carros = payload
        },
        setTelefones: (state, telefones) => {
            state.equipamentos.telefones = telefones
        },
        setKitsDeReanimacao: (state, payload) => {
            state.equipamentos.kitsDeReanimacao = payload
        },
        adicionarEquipeEmEquipes: (state, payload) => {
            state.equipes.push(payload)
            state.equipe = {}
        },
        setEquipes: (state, payload) => {
            state.equipes = payload;
        },
        removerEquipe: (state, equipeId) => {
            const index = state.equipes.findIndex(equipe => equipe.id === equipeId);
            if (index !== -1) {
                state.equipes.splice(index, 1);
            }
        }, 
    },
    actions: {
        fetchEquipamentos(context, { carros, telefones, kitsDeReanimacao }) {
            fetch('http://localhost:3000/equipamentos')
                .then(response => response.json())
                .then(dados => {
                    if(carros) context.commit('setCarros', dados.carros)
                    if(telefones) context.commit('setTelefones', dados.telefones)
                    if(kitsDeReanimacao) context.commit('setKitsDeReanimacao', dados.kitsDeReanimacao)
                })
        },
        fetchProfissionais(context) {
            fetch('http://localhost:3000/enfermeiros')
                .then(response => response.json())
                .then(dados => context.commit('setEnfermeiros', dados))

            fetch('http://localhost:3000/socorristas')
                .then(response => response.json())
                .then(dados => context.commit('setSocorristas', dados))

            fetch('http://localhost:3000/medicos')
                .then(response => response.json())
                .then(dados => context.commit('setMedicos', dados))
        },
        salvarEquipe(context) {
            fetch('http://localhost:3000/equipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(context.state.equipe),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Equipe salva com sucesso:', data);
                context.commit('adicionarEquipeEmEquipes', data);
            })
            .catch((error) => {
                console.error('Erro:', error);
            });
        },
        fetchEquipes(context) {
            fetch('http://localhost:3000/equipes')
                .then(response => response.json())
                .then(dados => context.commit('setEquipes', dados))
                .catch((error) => {
                    console.error('Erro:', error);
                });
        },
        excluirEquipe(context, equipeId) {
            fetch(`http://localhost:3000/equipes/${equipeId}`, {
                method: 'DELETE',
            })
            .then(() => {
                context.commit('removerEquipe', equipeId);
            })
            .catch((error) => {
                console.error('Erro:', error);
            });
        },
    }
})