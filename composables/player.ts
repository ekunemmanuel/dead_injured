export function usePlayer() {
  const { handleInput, numberOfFields, focusFirstInput,hasStarted } = useGeneral();
  const { cpuNumber } = useCpu();
  const playerNumberId = 'playerNumber';
  const playerGuessedNumberId = 'playerGuessedNumber';
  const playerNumber = ref<string[]>(Array(4).fill('')); // Player's number
  const playerGuessedNumber = ref<string[]>(Array(4).fill('')); // Player's guessed number
  const playerPreviousGuesses = ref<{
    guessedNumber: string;
    dead: number;
    injured: number;
  }[]>([]);

  const storePlayerNumber = useLocalStorage(
    'player-number', // key
    [''] as string[], // default value
  )
  storePlayerNumber.value = [...playerNumber.value];

  const storePlayerPreviousGuesses = useLocalStorage(
    'player-previous-guesses', // key
    [

    ] as { guessedNumber: string; dead: number; injured: number }[], // default value
  )

  storePlayerPreviousGuesses.value = [...playerPreviousGuesses.value];

  const playerGuesses = computed(() => storePlayerPreviousGuesses.value.length === 0 ? playerPreviousGuesses.value : storePlayerPreviousGuesses.value);


  const isPlayerNumberValid = computed(() => playerNumber.value.every((num) => num !== ''));
  const isPlayerGuessedNumberValid = computed(() => playerGuessedNumber.value.every((num) => num !== ''));

  function handleGuessedInput(v: number, index: number) {
    handleInput(v, index, playerGuessedNumber, playerNumber, playerNumberId, playerGuessedNumberId);
  }

  function handlePlayerInput(v: number, index: number) {
    handleInput(v, index, playerNumber, playerNumber, playerNumberId, playerGuessedNumberId);
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

    const cpuCopy = [...cpuNumber.value];
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

    playerPreviousGuesses.value.unshift({
      guessedNumber: playerGuessedNumberArray.join(''),
      dead: deadCount,
      injured: injuredCount,
    });

    storePlayerPreviousGuesses.value = playerPreviousGuesses.value;




    // Clear all inputs
    playerGuessedNumber.value = Array(numberOfFields).fill('');

    // Focus the first input
    focusFirstInput(playerGuessedNumberId);

    if (deadCount === numberOfFields) {
      alert('You won!');
      storePlayerPreviousGuesses.value = [];
      hasStarted.value = false;
    } else {
      alert(`Dead: ${deadCount}, Injured: ${injuredCount}`);
    }
  }




  return {
    playerNumberId,
    playerGuessedNumberId,
    playerNumber,
    playerGuessedNumber,
    isPlayerNumberValid,
    playerGuesses,
    isPlayerGuessedNumberValid,
    handleGuessedInput,
    handlePlayerInput,
    submitplayerGuessedNumber,
    storePlayerNumber
  };
}
