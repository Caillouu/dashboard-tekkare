<script setup lang="ts">
  const props = defineProps<{
    hospitals: Array<{ name: string }>;
  }>();

  const emit = defineEmits<{
    (e: 'select-hospital', hospital: { name: string }): void;
  }>();

  const open = ref(false);
  const value = ref<typeof props.hospitals[number] | null>(null);

  const selectedHospital = ref<{ name: string } | null>(null);

  function onSelect(hospital: { name: string }) {
    selectedHospital.value = hospital;
    open.value = false;
    emit('select-hospital', hospital);
  }
</script>

<template>
  <div class="flex items-center space-x-4">
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          variant="ghost"
          class="justify-start text-xl font-bold border-cyan-900 border-b rounded-none p-0 lg:text-3xl"
        >
          <template v-if="selectedHospital">
            {{ selectedHospital.name }}
          </template>
          <template v-else>
            + {{ $t('ChooseHospital') }}
          </template>
        </Button>
      </PopoverTrigger>
      <PopoverContent class="p-0 w-4/5 transform -translate-x-1/2 sm:w-full sm:translate-x-0" side="right" align="start">
        <Command>
          <CommandInput :placeholder="$t('SearchHospital')" />
          <CommandList>
            <CommandEmpty>{{ $t('NoResults') }}</CommandEmpty>
            <CommandGroup>
              <CommandItem
                v-for="hospital in hospitals"
                :key="hospital.name"
                :value="hospital.name"
                @select="onSelect(hospital)"
              >
                {{ hospital.name }}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>