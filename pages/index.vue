<template>
  <section class="">
    <UContainer class=" p-2 flex justify-between flex-col md:flex-row md:gap-24 gap-4 items-center ">
      <div class="space-y-2 flex-1">
        <h1 class="text-3xl">Dead Or Injured</h1>
        <p>
          "Dead or Injured" is an exciting number-guessing game where players pick and guess each other's 4-digit
          sequences.
          Correct digits in the right place are "dead," while correct digits in the wrong place are "injured." Play
          against
          the CPU or challenge friends in real-time. Test your logic and strategy to become the ultimate number-guessing
          champion!
        </p>

        <!-- <div>
          <UButton class="">
            Play Now 
          </UButton>
        </div> -->
      </div>

      <GameBoard class="flex-1" />

    </UContainer>

  </section>
  <section>
    <UContainer class="space-y-2 p-2">
      <h2 class="text-2xl">How to Play</h2>
      <p>
        The game can be played in two modes:
      </p>
      <ul class="list-disc list-inside">
        <li>
          <strong>Against CPU:</strong> In this mode, you will play against the computer. The CPU generates a 4-digit
          sequence that you need to guess. You will receive feedback after each guess in the form of "dead" and
          "injured" counts.
        </li>
        <li>
          <strong>Human vs Human:</strong> In this mode, you and another player will take turns creating and guessing a
          4-digit sequence. The player who created the sequence will not guess but will provide feedback to the other
          player after each guess.
        </li>
      </ul>
      <p>
        A "dead" count indicates that a digit is correct and in the right place. An "injured" count indicates that a
        digit is correct but in the wrong place. The guessing continues until the sequence is correctly guessed.
      </p>
    </UContainer>
  </section>

  <section>
    <UContainer class="space-y-2 p-2">
      <h2 class="text-2xl">Rules</h2>
      <ul class="list-disc list-inside">
        <li>Players take turns guessing the 4-digit sequence in the Human vs Human mode.</li>
        <li>In the Against CPU mode, you guess the CPU's 4-digit sequence.</li>
        <li>Correct digits in the right place are "dead."</li>
        <li>Correct digits in the wrong place are "injured."</li>
        <li>Players or the CPU continue guessing until the sequence is correctly guessed.</li>
      </ul>
    </UContainer>
  </section>
  <section class="p-2" v-if="anouncement">
    <UContainer>
      <UAlert color="pink" variant="subtle" @close="() => {
        anouncement = false
      }" :close-button="{
          icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link', padded: false,
        }" title="Announcement: Human vs. Human Mode is Coming Soon!" description="
          We're excited to share that the Dead or Injured game is up and running with a thrilling CPU vs. Human mode! 🎉 However, for those eagerly awaiting the Human vs. Human mode, we’re still working on it. 
          We’re diving into the tech to make sure it
      " />
    </UContainer />
  </section>

</template>

<script lang="ts" setup>
const anouncement = ref(true)
useSeoMeta({
  ogTitle: 'Dead Or Injured',
  ogDescription: `Dead or Injured is an exciting number-guessing game where players pick and guess each other's 4-digit sequences. Correct digits in the right place are "dead," while correct digits in the wrong place are "injured." Play against the CPU or challenge friends in real-time. Test your logic and strategy to become the ultimate number-guessing champion!`,
  ogUrl: 'https://dead-injured.vercel.app/',
  twitterTitle: 'Dead Or Injured',
  twitterDescription: `Dead or Injured is an exciting number-guessing game where players pick and guess each other's 4-digit sequences. Correct digits in the right place are "dead," while correct digits in the wrong place are "injured." Play against the CPU or challenge friends in real-time. Test your logic and strategy to become the ultimate number-guessing champion!`,
})

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: './favicon.ico'
    }
  ],
  title: 'Dead Or Injured',
  meta: [
    {
      name: 'description',
      content: `Dead or Injured is an exciting number-guessing game where players pick and guess each other's 4-digit sequences. Correct digits in the right place are "dead," while correct digits in the wrong place are "injured." Play against the CPU or challenge friends in real-time. Test your logic and strategy to become the ultimate number-guessing champion!`
    }
  ]
})
</script>

<style></style>