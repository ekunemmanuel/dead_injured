<template>
  <div class="p-4">
    <div v-if="hasStarted" class="flex flex-col gap-4 max-w-[500px]">
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
        <div class="flex gap-2">
          <div class="flex gap-4 flex-col">
            <p>
              <strong>Cpu's Guess</strong>
            </p>
            <div v-for="(guess, index) in previousGuesses" :key="index">
              <div>{{ guess.playerGuessedNumber }}</div>
              <div>Dead: {{ guess.dead }}, Injured: {{ guess.injured }}</div>
            </div>
          </div>
          <div class="flex gap-4 flex-col">
            <p>
              <strong>Player's Guess</strong>
            </p>
            <div v-for="(guess, index) in previousGuesses" :key="index">
              <div>{{ guess.playerGuessedNumber }}</div>
              <div>Dead: {{ guess.dead }}, Injured: {{ guess.injured }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col gap-4 max-w-[500px]">
      <p>
        Type your number below. To start the game, click the "Start Game" button.
      </p>
      <div class="flex gap-4">
        <MyInput v-for="(field, index) in numberOfFields" :key="index" :id="`${playerNumberId}-input-${index}`"
          v-model="playerNumber[index]" @incoming="(v) => handlePlayerInput(v, index)" @onKeyDown="onKeydown" />
      </div>
      <UButton @click="startGame" block>Start Game</UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
const numberOfFields = 4;

const cpu = ref(['1', '2', '3', '4']); // CPU's number
const playerGuessedNumberId = 'playerGuessedNumber';
const playerGuessedNumber = ref<string[]>(Array(numberOfFields).fill('')); // Player's guessed number
const previousGuesses = ref<{
  playerGuessedNumber: string;
  dead: number;
  injured: number;
}[]>([]); // Previous guesses

const playerNumberId = 'playerNumber';
const playerNumber = ref<string[]>(Array(numberOfFields).fill('')); // Player's number

const hasStarted = ref(false);

function handleInput(v: number, index: number, numberArray: Ref<string[]>) {
  if (v < 0 || v > 9) {
    return;
  }

  // Check if the number is already used in another field
  if (numberArray.value.some((num, i) => num === v.toString() && i !== index)) {
    alert(`The number ${v} is already used. Please choose a different number.`);
    numberArray.value[index] = ''; // Clear the input
    return;
  }

  numberArray.value[index] = v.toString();
  moveToNext(index, numberArray);
}

function handleBackspace(index: number, numberArray: Ref<string[]>, inputPrefix: string) {
  numberArray.value[index] = ''; // Clear the current input
  moveToPrevious(index, inputPrefix);
}

function moveToNext(index: number, numberArray: Ref<string[]>) {
  if (index < numberOfFields - 1) {
    const nextInput = document.getElementById(
      `${numberArray.value === playerNumber.value ? playerNumberId : playerGuessedNumberId}-input-${index + 1}`
    );
    if (nextInput) {
      nextInput.focus();
    }
  }
}

function moveToPrevious(index: number, inputPrefix: string) {
  if (index > 0) {
    const prevInput = document.getElementById(`${inputPrefix}-input-${index - 1}`);
    if (prevInput) {
      prevInput.focus();
    }
  }
}

function focusFirstInput(inputPrefix: string) {
  const firstInput = document.getElementById(`${inputPrefix}-input-0`);
  if (firstInput) {
    firstInput.focus();
  }
}

function handleGuessedInput(v: number, index: number) {
  handleInput(v, index, playerGuessedNumber);
}

function handlePlayerInput(v: number, index: number) {
  handleInput(v, index, playerNumber);
}

const isPlayerNumberValid = computed(() => playerNumber.value.every((num) => num !== ''));
const isPlayerGuessedNumberValid = computed(() => playerGuessedNumber.value.every((num) => num !== ''));

function onKeydown(event: KeyboardEvent) {
  const target = event.target as HTMLInputElement;
  const index = parseInt(target.id.split('-').pop() as string);
  const inputPrefix = target.id.includes(playerNumberId) ? playerNumberId : playerGuessedNumberId;
  const numberArray = target.id.includes(playerNumberId) ? playerNumber : playerGuessedNumber;

  if (event.key === 'Backspace') {
    if (numberArray.value[index] === '') {
      handleBackspace(index, numberArray, inputPrefix);
      event.preventDefault(); // Prevent the default backspace action
    }
  } else if (event.key === 'Enter') {
    if (isPlayerGuessedNumberValid.value) {
      submitplayerGuessedNumber();
    } else if (isPlayerNumberValid.value) {
      startGame();
    } else {
      alert('Please fill in all fields before submitting.');
    }
  } else if (event.key === 'ArrowLeft') {
    moveToPrevious(index, inputPrefix);
  } else if (event.key === 'ArrowRight') {
    moveToNext(index, numberArray);
  }
}

function submitplayerGuessedNumber() {
  if (!isPlayerGuessedNumberValid.value) {
    alert('Please fill in all fields before submitting.');
    return;
  }
  // Check for duplicates in playerGuessedNumber
  const duplicates = playerGuessedNumber.value.filter((num, index, self) => self.indexOf(num) !== index && num !== '');
  if (duplicates.length > 0) {
    alert(`Duplicate numbers found: ${duplicates.join(', ')}. Please make sure all numbers are unique.`);
    return;
  }

  // Calculate Dead and Injured
  let deadCount = 0;
  let injuredCount = 0;
  const playerGuessedNumberArray = playerGuessedNumber.value;

  const cpuCopy = [...cpu.value];
  const playerCopy = [...playerGuessedNumberArray];

  for (let i = 0; i < numberOfFields; i++) {
    if (playerCopy[i] === cpuCopy[i]) {
      deadCount++;
      playerCopy[i] = ''; // Mark this digit as matched
      cpuCopy[i] = ''; // Mark this digit as matched
    }
  }

  for (let i = 0; i < numberOfFields; i++) {
    if (playerCopy[i] !== '' && cpuCopy.includes(playerCopy[i])) {
      injuredCount++;
      cpuCopy[cpuCopy.indexOf(playerCopy[i])] = ''; // Remove this digit from the CPU's number
    }
  }

  previousGuesses.value.unshift({
    playerGuessedNumber: playerGuessedNumberArray.join(''),
    dead: deadCount,
    injured: injuredCount,
  });

  // Clear all inputs
  playerGuessedNumber.value = Array(numberOfFields).fill('');

  // Focus the first input
  focusFirstInput(playerGuessedNumberId);

  if (deadCount === numberOfFields) {
    alert('You won!');
  }

  alert(`Dead: ${deadCount}, Injured: ${injuredCount}`);
}

function startGame() {
  if (isPlayerNumberValid.value) {
    hasStarted.value = true;
    focusFirstInput(playerGuessedNumberId);
  } else {
    alert('Please fill in all fields before starting the game.');
  }
}
</script>

<style scoped></style>
