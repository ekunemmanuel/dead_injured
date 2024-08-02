export function useGameLogic() {
  const { cpuNumber, generateUniqueCpuNumber } = useCpu();
  const { playerNumberId, playerGuessedNumberId, playerNumber, playerGuessedNumber, playerPreviousGuesses, isPlayerGuessedNumberValid, playerGuesses, storePlayerPreviousGuesses } = usePlayer();
  const { handleBackspace, moveToNext, moveToPrevious, numberOfFields, focusFirstInput, handleInput } = useGeneral();

  const hasWon = ref(false);
  const gameStartedTimer = ref('00:00:00');
  const timerStart = ref();
  const timerInterval = ref();
  const counter = ref(5);
  const counterFunction = ref();
  const timer = ref()
  const storeBestOf = useLocalStorage('best-of', [] as string[]); // key and default value

  function updateTimer() {
    if (timerStart.value) {
      const elapsed = Math.floor((Date.now() - timerStart.value) / 1000);
      const hours = Math.floor(elapsed / 3600).toString().padStart(2, '0');
      const minutes = Math.floor((elapsed % 3600) / 60).toString().padStart(2, '0');
      const seconds = (elapsed % 60).toString().padStart(2, '0');
      gameStartedTimer.value = `${hours}:${minutes}:${seconds}`;
    }
  }

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
      submitPlayerGuessedNumber();
    } else if (event.key === 'ArrowLeft') {
      moveToPrevious(index, inputPrefix);
    } else if (event.key === 'ArrowRight') {
      moveToNext(index, numberArray, inputPrefix);
    }

    // Start timer if not already started
    if (!timerStart.value) {
      timerStart.value = Date.now();
      timerInterval.value = setInterval(updateTimer, 1000);
    }
  }

  function handleGuessedInput(v: number, index: number) {
    handleInput(v, index, playerGuessedNumber, playerNumber, playerNumberId, playerGuessedNumberId);
  }

  function submitPlayerGuessedNumber() {
    if (!isPlayerGuessedNumberValid.value) {
      alert('Please fill in all fields before submitting.');
      return;
    }

    const duplicates = playerGuessedNumber.value.filter((num, index, self) => self.indexOf(num) !== index && num !== '');
    if (duplicates.length > 0) {
      alert(`Duplicate numbers found: ${duplicates.join(', ')}. Please make sure all numbers are unique.`);
      return;
    }

    let deadCount = 0;
    let injuredCount = 0;
    const playerGuessedNumberArray = playerGuessedNumber.value;
    const cpuCopy = [...cpuNumber.value];
    const playerCopy = [...playerGuessedNumberArray];

    for (let i = 0; i < numberOfFields; i++) {
      if (playerCopy[i] === cpuCopy[i]) {
        deadCount++;
        playerCopy[i] = '';
        cpuCopy[i] = '';
      }
    }

    for (let i = 0; i < numberOfFields; i++) {
      if (playerCopy[i] !== '' && cpuCopy.includes(playerCopy[i])) {
        injuredCount++;
        cpuCopy[cpuCopy.indexOf(playerCopy[i])] = '';
      }
    }

    playerPreviousGuesses.value.unshift({
      guessedNumber: playerGuessedNumberArray.join(''),
      dead: deadCount,
      injured: injuredCount,
    });

    storePlayerPreviousGuesses.value = playerPreviousGuesses.value;

    playerGuessedNumber.value = Array(numberOfFields).fill('');
    focusFirstInput(playerGuessedNumberId);

    if (deadCount === numberOfFields) {
      hasWon.value = true;

      clearInterval(counterFunction.value);
      counterFunction.value = setInterval(() => {
        counter.value--;
      }, 1000);

      // Save the best of score
      storeBestOf.value = [...storeBestOf.value, gameStartedTimer.value];

      clearTimeout(timer.value);
      timer.value = setTimeout(() => {
        startNewGame();
        counter.value = 5;
        hasWon.value = false;
      }, 5500);

      // Stop the timer when the player wins
      clearInterval(timerInterval.value);
    } else {
      alert(`Dead: ${deadCount}, Injured: ${injuredCount}`);
    }
  }

  function startNewGame() {
    playerNumber.value = Array(numberOfFields).fill('');
    playerGuessedNumber.value = Array(numberOfFields).fill('');
    playerPreviousGuesses.value = [];
    storePlayerPreviousGuesses.value = [];
    cpuNumber.value = generateUniqueCpuNumber();
    // storeCpuNumber.value = cpuNumber.value;
    hasWon.value = false;
    focusFirstInput(playerGuessedNumberId);

    // Do not start the timer immediately
    gameStartedTimer.value = '00:00:00';
    timerStart.value = null;
    cancelNewGame()
  }

  function cancelNewGame() {
    clearTimeout(timer.value);
    clearInterval(timerInterval.value);
    clearInterval(counterFunction.value);
    counter.value = 5;
    timerStart.value = null;
  }

  onMounted(() => {
    focusFirstInput(playerGuessedNumberId);
  });

  return {
    playerGuesses,
    playerGuessedNumber,
    numberOfFields,
    playerGuessedNumberId,
    counter,
    hasWon,
    gameStartedTimer,
    handleGuessedInput,
    onKeydown,
    startNewGame,
    cancelNewGame,
    submitPlayerGuessedNumber,
    // storeCpuNumber,
  };
}
