<template>
  <div class="bg-primary/10 p-2 rounded-lg space-y-4">
    <h1>OTP Input</h1>
    <p>
      Can you guess the 4-digit sequence? Try to guess the sequence in as few tries as possible. You will receive
      feedback.
    </p>
    <div class="flex justify-center gap-4">
      <div>
        <div class="flex gap-4">
          <MyInput v-for="(field, index) in numberOfFields" :key="index" :id="`otp-inputs-${index}`" v-model="otp[index]"
            @incoming="(v) => handleInput(v, index)" />
        </div>
        <UButton @click="submitOtp">Submit</UButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>



const numberOfFields = 4;
const otp = ref(Array(numberOfFields).fill(''));

function handleInput(v: number, index: number) {
  if (v < 0 || v > 9) {
    return;
  }
  otp.value[index] = v;
  moveToNext(index);

}

function moveToNext(index: number) {
  if (index < numberOfFields - 1) {
    const nextInput = document.getElementById(`otp-inputs-${index + 1}`);

    if (nextInput) {
      nextInput.focus();
    }
  }
}

function submitOtp() {
  alert(`Your OTP is: ${otp.value.join('')}`);
}
</script>

<style>
/* Add any additional styles here */
</style>
