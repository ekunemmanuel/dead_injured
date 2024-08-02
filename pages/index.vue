<template>
  <section class="">
    <UContainer class=" p-4 flex justify-between flex-wrap md:flex-row gap-4 items-start ">
      <div class="space-y-2 max-w-4xl">
        <h1 class="text-3xl">Dead Or Injured</h1>
        <p>
          "Dead or Injured" is an exciting number-guessing game where players pick and guess each other's 4-digit
          sequences.
          Correct digits in the right place are "dead," while correct digits in the wrong place are "injured." Play
          against
          the CPU or challenge friends in real-time. Test your logic and strategy to become the ultimate number-guessing
          champion!
        </p>

        <div>
          <UButton class="">
            Play Now
          </UButton>
        </div>
      </div>

      <!-- <div class="">
        <GameBoard />
      </div> -->
    </UContainer>

  </section>
  <section>
    <UContainer class="space-y-2 p-4">
      <h2 class="text-2xl">How to Play</h2>
      <p>
        The game is played between two players. The first player creates a 4-digit sequence, and the second player
        guesses the sequence. The second player receives feedback after each guess in the form of "dead" and "injured"
        counts.
      </p>
      <p>
        A "dead" count indicates that a digit is correct and in the right place. An "injured" count indicates that a
        digit is correct but in the wrong place. The second player continues to guess until they correctly guess the
        sequence.
      </p>
    </UContainer>
  </section>

  <section>
    <UContainer class="space-y-2 p-4">
      <h2 class="text-2xl">Rules</h2>
      <ul class="list-disc list-inside">
        <li>Players take turns guessing the 4-digit sequence.</li>
        <li>Correct digits in the right place are "dead."</li>
        <li>Correct digits in the wrong place are "injured."</li>
        <li>Players continue guessing until the sequence is correctly guessed.</li>
      </ul>
    </UContainer>
  </section>

  <GameTest />
</template>

<script lang="ts" setup>
useHead({
  title: 'Dead Or Injured',
  meta: [
    {
      name: 'description',
      content: `D"Dead or Injured" is an exciting number-guessing game where players pick and guess each other's 4-digit sequences. Correct digits in the right place are "dead," while correct digits in the wrong place are "injured." Play against the CPU or challenge friends in real-time. Test your logic and strategy to become the ultimate number-guessing champion!`
    }
  ]
})
</script>

<style></style>