<template>
    <div>
        <div v-if="tipo == 'socorristas'">
            <select class="form-control form-control-sm" v-model="turno">
                <option value="">Todos</option>
                <option value="manhã">Manhã</option>
                <option value="tarde">Tarde</option>
                <option value="noite">Noite</option>
            </select>
        </div>
        <div v-if="tipo == 'enfermeiros'">
            <select class="form-control form-control-sm" v-model="escalaEnfermeiros">
                <option value="">Todos</option>
                <option value="12x36">12x36</option>
                <option value="24x48">24x48</option>
            </select>
        </div>
        <div v-if="tipo == 'medicos'">
            <select class="form-control form-control-sm" v-model="escalaMedicos">
                <option value="">Todos</option>
                <option value="12x36">12x36</option>
                <option value="24x48">24x48</option>
            </select>
        </div>
        <item 
            v-for="(item, indice) in itens" 
            :key="indice"
            :dados="item"
            :tipo="tipo"
        />
       
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import Item from '@/components/Item.vue'

export default {
    name: 'ListaItens',
    components: { 
        Item
    },
    data: () => ({
        turno: '',
        escalaEnfermeiros: '',
        escalaMedicos: ''
    }),
    props: {
        tipo: String
    },
    computed: {
        ...mapState({
            enfermeiros: state => state.enfermeiros,
            medicos: state => state.medicos,
            carros: state => state.equipamentos.carros,
            telefones: state => state.equipamentos.telefones,
            kitsDeReanimacao: state => state.equipamentos.kitsDeReanimacao
        }),
        ...mapGetters({
            socorristasPorTurno: 'socorristasPorTurno',
            totalSocorristasPorTurno: 'totalSocorristasPorTurno',
            enfermeirosPorEscala: 'enfermeirosPorEscala',
            totalEnfermeirosPorEscala: 'totalEnfermeirosPorEscala',
            medicosPorEscala: 'medicosPorEscala',
            totalMedicosPorEscala: 'totalMedicosPorEscala'
        }), 
        itens() {
            switch(this.tipo) {
                case 'enfermeiros': return this.enfermeirosPorEscala(this.escalaEnfermeiros)
                case 'socorristas': return this.socorristasPorTurno(this.turno, '10', 'abc', 500)
                case 'medicos': return this.medicosPorEscala(this.escalaMedicos)
                case 'carros': return this.carros
                case 'telefones': return this.telefones
                case 'kits-de-reanimacao': return this.kitsDeReanimacao
            }
            return []
        }
    }
}
</script>