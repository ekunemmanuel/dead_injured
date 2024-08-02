
export function useCpu() {
  const { numberOfFields, hasStarted } = useGeneral();
  const cpuNumber = ref<string[]>(generateUniqueCpuNumber());
  const cpuPreviousGuesses = ref<{ guessedNumber: string; dead: number; injured: number }[]>([]);
  const playerNumber = ref<string[]>(Array(numberOfFields).fill(''));

  // const storeCpuNumber = useLocalStorage('cpu-number', [''] as string[]); // key and default value
  // storeCpuNumber.value = cpuNumber.value;

  const storeCpuPreviousGuesses = useLocalStorage('cpu-previous-guesses', [] as { guessedNumber: string; dead: number; injured: number }[]); // key and default value
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
        guessCopy[i] = '';
        playerNumberCopy[i] = '';
      }
    }

    for (let i = 0; i < numberOfFields; i++) {
      if (guessCopy[i] !== '' && playerNumberCopy.includes(guessCopy[i])) {
        injuredCount++;
        playerNumberCopy[playerNumberCopy.indexOf(guessCopy[i])] = '';
      }
    }

    return { dead: deadCount, injured: injuredCount };
  }

  function makeCpuGuess() {
    const guess = generateUniqueCpuNumber(); // Simplified guessing logic for example purposes
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
      alert(`CPU guessed: ${guess.join('')}, Dead: ${dead}, Injured: ${injured}`);
    }
  }

  return {
    cpuNumber,
    // storeCpuNumber,
    generateUniqueCpuNumber
  };
}
