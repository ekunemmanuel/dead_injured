<template>
  <UInput
    :id="id"
    type="text"
    class="otp-input"
    size="xl"
    maxlength="1"
    v-model="text"
    @input="onInput"
    @keypress="isNumber"
    @keydown="onKeydown"
  />
</template>

<script lang="ts" setup>

const props = defineProps<{ id: string }>();
const emit = defineEmits<{
  incoming: [value: number],
  onKeyDown: [event: KeyboardEvent]
}>();
const text = defineModel<string | number>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;

  if (target.value.length >= 1) {
    emit('incoming', +target.value);
  }
}

function isNumber(event: KeyboardEvent) {
  const charCode = event.which ? event.which : event.keyCode;

  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
  }
}

function onKeydown(event: KeyboardEvent) {
  emit('onKeyDown', event);
}

</script>

<style scoped>
</style>
