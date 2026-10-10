<script setup lang="ts">
const { footer } = useAppConfig()
</script>

<template>
  <UFooter
    class="z-10 bg-default"
    :ui="{ left: 'text-muted text-xs flex flex-col items-center gap-1 sm:items-start' }"
  >
    <template #left>
      <span>{{ footer.credits }} · <GenevaClock /></span>
      <span v-if="footer.sameAuthor">
        Par le même auteur :
        <ULink
          :to="footer.sameAuthor.to"
          target="_blank"
          class="underline underline-offset-2 hover:text-highlighted"
        >{{ footer.sameAuthor.label }}</ULink>
      </span>
    </template>

    <template #right>
      <template v-if="footer?.links">
        <UButton
          v-for="(link, index) of footer?.links"
          :key="index"
          v-bind="{ size: 'xs', color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>
  </UFooter>
</template>
