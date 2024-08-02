
export function useCpu() {
  const { numberOfFields, focusFirstInput, hasStarted } = useGeneral();
  const cpuNumber = ref<string[]>(generateUniqueCpuNumber());
  const cpuPreviousGuesses = ref<{
    guessedNumber: string;
    dead: number;
    injured: number;
  }[]>([]);

  const playerNumber = ref<string[]>(Array(4).fill(''));

  const storeCpuNumber = useLocalStorage(
    'cpu-number', // key
    [''] as string[], // default value
  )

  storeCpuNumber.value = cpuNumber.value;


  const storeCpuPreviousGuesses = useLocalStorage(
    'cpu-previous-guesses', // key
    [] as { guessedNumber: string; dead: number; injured: number }[], // default value
  );

  storeCpuPreviousGuesses.value = [...cpuPreviousGuesses.value];

  const cpuGuesses = computed(() => storeCpuPreviousGuesses.value.length === 0 ? cpuPreviousGuesses.value : storeCpuPreviousGuesses.value);

  function generateUniqueCpuNumber(): string[] {
    const digits = '0123456789'.split('');
    const cpuNum: string[] = [];

    while (cpuNum.length < numberOfFields) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      const digit = digits.splice(randomIndex, 1)[0];
      cpuNum.push(digit);
    }



    return cpuNum;
  }

  function evaluateCpuGuess(guess: string[]): { dead: number; injured: number } {
    let deadCount = 0;
    let injuredCount = 0;
    const guessCopy = [...guess];
    const playerNumberCopy = [...playerNumber.value];

    for (let i = 0; i < numberOfFields; i++) {
      if (guessCopy[i] === playerNumberCopy[i]) {
        deadCount++;
        guessCopy[i] = ''; // Mark this digit as matched
        playerNumberCopy[i] = ''; // Mark this digit as matched
      }
    }

    for (let i = 0; i < numberOfFields; i++) {
      if (guessCopy[i] !== '' && playerNumberCopy.includes(guessCopy[i])) {
        injuredCount++;
        playerNumberCopy[playerNumberCopy.indexOf(guessCopy[i])] = ''; // Remove this digit from the player's number
      }
    }

    return { dead: deadCount, injured: injuredCount };
  }

  function makeCpuGuess() {
    // Generate a guess based on previous results
    let guess = generateUniqueCpuNumber(); // For now, we generate a random guess

    if (cpuPreviousGuesses.value.length > 0) {
      // Implement logic to learn from previous guesses
      // For simplicity, we use random guess here, but you can implement more sophisticated logic
      // such as narrowing down the guess based on previous dead and injured counts.
    }

    const { dead, injured } = evaluateCpuGuess(guess);

    cpuPreviousGuesses.value.unshift({
      guessedNumber: guess.join(''),
      dead: dead,
      injured: injured,
    });

    storeCpuPreviousGuesses.value = cpuPreviousGuesses.value;

    if (dead === numberOfFields) {
      alert('CPU won!');
      storeCpuPreviousGuesses.value = [];
      hasStarted.value = false;
    } else {
      alert(`CPU Guess: ${guess.join('')}, Dead: ${dead}, Injured: ${injured}`);
    }
  }

  return {
    numberOfFields,
    cpuNumber,
    cpuPreviousGuesses,
    cpuGuesses,
    makeCpuGuess,
    playerNumber,
  };
}
