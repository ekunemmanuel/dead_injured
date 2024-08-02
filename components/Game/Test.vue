<template>
  <div class="p-4">
    <div class="flex flex-col gap-4 max-w-[500px]">
      <div class="space-y-2">
        <h2>Guess the number</h2>
        <div class="flex gap-4">
          <MyInput v-for="(_, index) in numberOfFields" :key="index" :id="`${playerGuessedNumberId}-input-${index}`"
            v-model="playerGuessedNumber[index]" @incoming="(v) => handleGuessedInput(v, index)"
            @onKeyDown="onKeydown" />
        </div>
        <div class="self- ">
          <UButton @click="submitplayerGuessedNumber" size="xl" block>Submit</UButton>
        </div>
      </div>
      <div class="space-y-2">
        <h2>Previous Guesses</h2>
        <div class="flex gap-2 justify-between">
          <div class="flex gap-4 flex-col">
            <p><strong>Player's Guesses</strong></p>
            <div v-for="(guess, index) in playerGuesses" :key="index">
              <div>{{ guess.guessedNumber }}</div>
              <div>Dead: {{ guess.dead }}, Injured: {{ guess.injured }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script lang="ts" setup>

const { handleBackspace, moveToNext, moveToPrevious, numberOfFields, hasStarted } = useGeneral();
const { playerNumberId, playerGuessedNumberId, playerNumber, playerGuessedNumber, isPlayerNumberValid, isPlayerGuessedNumberValid, handleGuessedInput, handlePlayerInput, submitplayerGuessedNumber, playerGuesses, storePlayerNumber } = usePlayer();


function onKeydown(event: KeyboardEvent) {
  const target = event.target as HTMLInputElement;
  const index = parseInt(target.id.split('-').pop() as string);
  const inputPrefix = target.id.includes(playerNumberId) ? playerNumberId : playerGuessedNumberId;
  const numberArray = target.id.includes(playerNumberId) ? playerNumber : playerGuessedNumber;

  if (event.key === 'Backspace') {
    if (numberArray.value[index] === '') {
      handleBackspace(index, numberArray, inputPrefix);
      event.preventDefault();
    }
  } else if (event.key === 'Enter' && isPlayerGuessedNumberValid.value) {
    submitplayerGuessedNumber();
  } else if (event.key === 'ArrowLeft') {
    moveToPrevious(index, inputPrefix);
  } else if (event.key === 'ArrowRight') {
    moveToNext(index, numberArray, inputPrefix);
  }
}

// function startGame() {

//   if (isPlayerNumberValid.value) {
//     hasStarted.value = true;
//     focusFirstInput(playerGuessedNumberId);
//     storePlayerNumber.value = playerNumber.value;
//     console.log('Player number:', playerNumber.value);

//   } else {
//     alert('Please fill in all fields before starting the game.');
//   }
// }

</script>

<style scoped></style>
