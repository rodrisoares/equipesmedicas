<template>
    <div class="column">
        <div class=""><strong>Equipe {{ numero }}:</strong> </div>
        <div class="col-2">Enfermeiro: {{ dados.enfermeiro }}</div>
        <div class="col-2">Socorrista: {{ dados.socorrista }}</div>
        <div class="col-2">Médico: {{ dados.medico }}</div>
        <div class="col-2">Carro: {{ dados.carro }}</div>
        <div class="col-2">Telefone: {{ dados.telefone }}</div>
        <div class="col-2">Kit de Reanimação: {{ dados.kitDeReanimacao }}</div>
    </div>
</template>

<script>
export default {
    name: 'Equipe',
    props: {
        dados: Object,
        numero: Number,
    }
}
</script>