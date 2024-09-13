<script setup>
  import { Separator } from '@/components/ui/separator'

  const switchLocalePath = useSwitchLocalePath()

</script>

<template>
  <div>
    <div class="flex justify-between sticky z-40 top-0 bg-primary/70 backdrop-blur-lg border-b border-border p-4 mb-12">
      <a href="#" class="inline-block">
        <img src="assets/img/logo.svg" class="h-6 w-auto" alt="Tekkare">
      </a>
      <div class="flex">
        <NuxtLink :to="switchLocalePath('fr')" :class="$i18n.locale === 'fr' ? 'font-bold' : ''" class="text-white">FR</NuxtLink>
        <Separator orientation="vertical" class="mx-2" />
        <NuxtLink :to="switchLocalePath('en')" :class="$i18n.locale === 'en' ? 'font-bold' : ''" class="text-white">EN</NuxtLink>
      </div>
    </div>
    <div class="container relative mb-12 px-4">
      <div class="overflow-hidden rounded-[0.5rem] border bg-background shadow">
        <slot />
      </div>
    </div>
  </div>
</template>