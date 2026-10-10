<script setup lang="ts">
defineProps<{
  image: {
    src: string
    alt: string
    caption?: string
  }
  index: number
}>()
</script>

<template>
  <!-- alt décrit l'image (lecteurs d'écran), caption est la légende visible -->
  <figure
    class="bg-white p-2 flex flex-col drop-shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105 hover:rotate-0 hover:z-10"
    :class="[
      index % 2 === 0 ? '-rotate-5' : 'rotate-5',
      index % 2 === 0 ? 'hover:-translate-x-4' : 'hover:translate-x-4'
    ]"
  >
    <NuxtImg
      :src="image.src"
      :alt="image.alt"
      width="128"
      height="128"
      densities="x1 x2"
      format="webp"
      loading="lazy"
      class="size-32 object-cover"
    />
    <figcaption
      v-if="image.caption"
      class="w-32 text-xs text-black font-serif font-medium text-center mt-2"
    >
      {{ image.caption }}
    </figcaption>
  </figure>
</template>
