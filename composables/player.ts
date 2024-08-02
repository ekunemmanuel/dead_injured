

export function usePlayer() {
  const { numberOfFields } = useGeneral();
  const playerNumberId = 'playerNumber';
  const playerGuessedNumberId = 'playerGuessedNumber';
  const playerNumber = ref<string[]>(Array(numberOfFields).fill('')); // Player's number
  const playerGuessedNumber = ref<string[]>(Array(numberOfFields).fill('')); // Player's guessed number
  const playerPreviousGuesses = ref<{ guessedNumber: string; dead: number; injured: number }[]>([]);

  const storePlayerNumber = useLocalStorage('player-number', [''] as string[]); // key and default value
  storePlayerNumber.value = [...playerNumber.value];

  const storePlayerPreviousGuesses = useLocalStorage('player-previous-guesses', [] as { guessedNumber: string; dead: number; injured: number }[]); // key and default value
  storePlayerPreviousGuesses.value = [...playerPreviousGuesses.value];

  const playerGuesses = computed(() => storePlayerPreviousGuesses.value.length === 0 ? playerPreviousGuesses.value : storePlayerPreviousGuesses.value);

  const isPlayerNumberValid = computed(() => playerNumber.value.every(num => num !== ''));
  const isPlayerGuessedNumberValid = computed(() => playerGuessedNumber.value.every(num => num !== ''));


  return {
    playerNumberId,
    playerGuessedNumberId,
    playerNumber,
    playerGuessedNumber,
    isPlayerNumberValid,
    playerGuesses,
    isPlayerGuessedNumberValid,
    storePlayerPreviousGuesses,
    playerPreviousGuesses
  };
}

