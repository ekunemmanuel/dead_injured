// useGameLogic.ts

export function useGameLogic() {
  const { } = useGeneral();
  const { cpuNumber, makeCpuGuess } = useCpu();
  const { playerGuessedNumber } = usePlayer();



  function handleCpuInput(value: string, index: number) {
    cpuNumber.value[index] = value;
  }

  //   <!-- <div v-else class="flex flex-col gap-4 max-w-[500px]">
  //   <p>Type your number below. To start the game, click the "Start Game" button.</p>
  //   <div class="flex gap-4">
  //     <MyInput v-for="(_, index) in numberOfFields" :key="index" :id="`${playerNumberId}-input-${index}`"
  //       v-model="playerNumber[index]" @incoming="(v) => handlePlayerInput(v, index)" @onKeyDown="onKeydown" />
  //   </div>
  //   <UButton @click="startGame" block>Start Game</UButton>
  // </div> -->

  return {
    cpuNumber,
    handleCpuInput,
  };
}
