export function useGeneral() {
  const numberOfFields = 4;
  const hasStarted = ref(false);



  function handleInput(v: number, index: number, numberArray: Ref<string[]>, playerNumber: Ref<string[]>, playerNumberId: string, playerGuessedNumberId: string) {
    if (v < 0 || v > 9) {
      return;
    }

    // Check if the number is already used in another field
    if (numberArray.value.some((num, i) => num === v.toString() && i !== index)) {
      alert(`The number ${v} is already used. Please choose a different number.`);
      numberArray.value[index] = ''; // Clear the input
      return;
    }

    const inputPrefix = numberArray.value === playerNumber.value ? playerNumberId : playerGuessedNumberId;

    numberArray.value[index] = v.toString();
    moveToNext(index, numberArray, inputPrefix);
  }

  function handleBackspace(index: number, numberArray: Ref<string[]>, inputPrefix: string) {
    numberArray.value[index] = ''; // Clear the current input
    moveToPrevious(index, inputPrefix);
  }


  function moveToNext(index: number, numberArray: Ref<string[]>, inputPrefix: string) {
    if (index < numberOfFields - 1) {
      const nextInput = document.getElementById(`${inputPrefix}-input-${index + 1}`);
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

  

  return {
    numberOfFields,
    handleInput,
    handleBackspace,
    moveToNext,
    moveToPrevious,
    focusFirstInput,
    hasStarted,
  };
}
