
<script setup lang="ts">
defineProps({
  size: {
    type: Number,
    default: 12,
  },
})
</script>

<template>
  <main
    class="absolute left-0 h-full w-full overflow-y-auto"
    :style="`padding-left: ${size}px; padding-right: ${size}px`"
  >
    <slot />
  </main>
</template>
