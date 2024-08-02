<template>
  <div class=" space-y-2">
    <div v-if="hasWon" v-confetti="{ duration: 5000 }" />
    <div class="flex justify-between">
      <small v-if="hasWon" class="block">
        You Won. A new game start in
        <span :class="[counter < 3 ? 'text-red-300' : 'text-primary']" class="animate-pulse">
          {{ counter }}
        </span>
      </small>
      <span>
        {{ gameStartedTimer }}
      </span>
    </div>

    <div class="bg-gray-700/40 overflow-auto rounded-md shadow-xl duration-300"
      :class="[playerGuesses.length > 0 ? 'h-[400px]' : 'h-[148px]']">
      <div class="flex flex-col gap-4">
        <div class="space-y-2 sticky p-2 top-0 bg-gray-700">
          <h2>Guess the number</h2>
          <div class="flex gap-4">
            <MyInput v-for="(_, index) in numberOfFields" :key="index" :id="`${playerGuessedNumberId}-input-${index}`"
              v-model="playerGuessedNumber[index]" @incoming="(v) => handleGuessedInput(v, index)"
              @onKeyDown="onKeydown" />
          </div>
          <div class="flex gap-4">
            <div v-if="!hasWon" class="flex-1">
              <UButton @click="submitPlayerGuessedNumber" size="xl" block>Submit</UButton>
            </div>
            <div v-else class="flex flex-1 gap-4">
              <div class="flex-1">
                <UButton @click="startNewGame" size="xl" block>New Game</UButton>
              </div>
              <div class="flex-1">
                <UButton @click="cancelNewGame" size="xl" block>Cancel</UButton>
              </div>
            </div>
          </div>
        </div>
        <div class="space-y-2 p-2" v-if="playerGuesses.length > 0">
          <h2>Previous Guesses</h2>
          <div class="flex gap-2 justify-between">
            <div class="flex gap-4 flex-col">
              <p><strong>Player's Guesses</strong></p>
              <div v-for="(guess, index) in playerGuesses" :key="index">
                <div>{{ guess.guessedNumber }}</div>
                <div>
                  Dead:
                  <span class="text-primary font-bold">{{ guess.dead }}</span>, Injured:
                  <span class="text-lime-300 font-medium">{{
                    guess.injured
                    }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { vConfetti } from "@neoconfetti/vue";
const {
  gameStartedTimer,
  onKeydown,
  handleGuessedInput,
  playerGuesses,
  numberOfFields,
  playerGuessedNumberId,
  playerGuessedNumber,
  submitPlayerGuessedNumber,
  cancelNewGame,
  startNewGame,
  counter,
  hasWon,
} = useGameLogic();
</script>

<style scoped></style>
