<template>
  <div>
    
    <nav class="navbar navbar-light bg-light">
      <div class="container-md mt-3 ">
        <a class="navbar-brand" href="#">{{ tituloCustomizado }}</a>
      </div>
    </nav>

    <div class="container">

      <div class="row mt-5">
        <div class="col-6 p">
          <profissionais />
        </div>

        <div class="col-6">
          <equipamentos />
        </div>
      </div>

      <div class="row mt-5 mb-5 bg-light p-2">
        <div class="col">
          <configuracao-equipe />
        </div>
      </div>

      <div class="row mt-5 mb-5">
        <div class="col">
          <equipes />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

import ConfiguracaoEquipe from './ConfiguracaoEquipe.vue'
import Equipamentos from './Equipamentos.vue'
import Equipes from './Equipes.vue'
import Profissionais from './Profissionais.vue'

export default {
  components: { 
    ConfiguracaoEquipe,
    Equipamentos,
    Equipes,
    Profissionais
  },
  name: 'Index',
  props: {
    msg: String
  },
  computed: {
    tituloCustomizado() {
      return ` ${this.$store.state.titulo}`
    }
  },
  methods: {
    ...mapMutations([
      'setEnfermeiros', 
      'setSocorristas', 
      'setMedicos',
      'setCarros',
      'setTelefones',
      'setKitsDeReanimacao'
    ]),
    ...mapActions({
      fetchEquipamentos: (dispatch, payload) => {
        dispatch('fetchEquipamentos', payload)
      },
      fetchProfissionais: dispatch => {
        dispatch('fetchProfissionais')
      }
    })
  },
  created() {
   
   this.fetchEquipamentos({
      carros: true,
      telefones: true,
      kitsDeReanimacao: true
    })

    this.fetchProfissionais()
  }
}
</script>
