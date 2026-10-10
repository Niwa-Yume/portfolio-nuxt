<script setup lang="ts">
// Heure de Genève en temps réel, sans dépendance : Intl gère le fuseau et l'heure d'été.
// Calculée uniquement côté client : une heure figée au prérendu serait fausse.
const formatter = new Intl.DateTimeFormat('fr-CH', {
  timeZone: 'Europe/Zurich',
  hour: '2-digit',
  minute: '2-digit'
})

const now = ref<Date | null>(null)
let timer: ReturnType<typeof setTimeout> | undefined

function tick() {
  now.value = new Date()
  // Se recale sur le début de la minute suivante
  timer = setTimeout(tick, 60_000 - (Date.now() % 60_000))
}

onMounted(tick)
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <span class="inline-flex items-center gap-1 tabular-nums">
    Genève,
    <time
      v-if="now"
      :datetime="now.toISOString()"
    >{{ formatter.format(now) }}</time>
    <span
      v-else
      aria-hidden="true"
    >--:--</span>
  </span>
</template>
