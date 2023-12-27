<template>
    <div>
        <ul class="list-group">
            <li class="list-group-item" v-for="(equipe, indice) in equipes" :key="indice">
             <equipe :dados="equipe" :numero="indice + 1" /> 
              <div class=" btn-group mr-2 mt-3" role="group" >
                <button type="button" @click="excluirEquipe(equipe)" class="btn btn-danger">Excluir</button>
              </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Equipe from '@/components/Equipe'

export default {
    name: 'ListaEquipes',
    components: {
        Equipe
    },
    computed: {
        ...mapState(['equipes']), 
    },
    methods: {
        excluirEquipe(equipe){
            this.$store.dispatch('excluirEquipe', equipe.id);
        },
    },
    created() {
       this.$store.dispatch('fetchEquipes');
    },
}
</script>
