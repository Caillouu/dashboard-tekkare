<template>
  <div>
    <div class="sticky z-40 top-0 bg-primary/70 backdrop-blur-lg border-b border-border p-4 mb-12">
      <a href="/">
        <img src="assets/img/logo.svg" class="h-6 w-auto" alt="Tekkare">
      </a>
    </div>
    <div class="container relative mb-12 px-4">
      <div class="overflow-hidden rounded-[0.5rem] border bg-background shadow">
        <slot />
      </div>
    </div>
  </div>
</template>