<template>
  <div>
    <div class="sticky z-40 top-0 bg-background/80 backdrop-blur-lg border-b border-border p-4 mb-12">
      <img src="assets/img/logo.svg" class="h-6 w-auto" alt="Tekkare">
    </div>
    <div class="container relative">
      <div class="overflow-hidden rounded-[0.5rem] border bg-background shadow">
        <slot />
      </div>
    </div>
  </div>
</template>