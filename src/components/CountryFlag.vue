<script>
import axios from 'axios';
import { Icon } from '@iconify/vue';
import TheScore from './TheScore.vue';
export default {
  components: {Icon, TheScore},
  data() {
    return {
      countries: [],
    //   Generate random numbers and store it in an array in a rearraged order
      getRandomNumbers(array) {
        for (let i = array.length -1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array
      },
      optLetter: ['A', 'B', 'C', 'D'],
      correctOptions: [],
      // Determine whether answer is correct or not
      correct: false,

      // Determine the selected country from the options
      selectedCountry: null,

      // Helps to apply the correct option option styles to show the user the correct answer when they choose the wrong answer
      validationHelper: null,
      totalScore: 0,
      // Determine how many questions to be asked
      counter: 0,
      // starts the quiz when it becomes true
      start: false,
      // shows the quiz description when start is false
      notStarted: true
    }
  },

  
  methods: {
    // Fetch questions from the API
    getQuestion() {
        axios.get('https://restcountries.com/v3.1/all')
        .then(response => {
        const shuffledCountries = this.getRandomNumbers(response.data)
        const incorroctOptions = shuffledCountries.slice(1, 5)
        this.correctOptions = shuffledCountries.slice(0, 1)
        this.countries = this.getRandomNumbers(incorroctOptions.concat(this.correctOptions))
        this.correct = false
        this.selectedCountry = null
        this.validationHelper = false
        this.counter++
        this.start = true
        this.notStarted = false
        console.log(this.countries)

      })
        .catch(error => console.log(error))
    },

    tryAgain() {
        // Restart quiz by refetching the questions and also resetting some variables to default
        axios.get('https://restcountries.com/v3.1/all')
        .then(response => {
        const shuffledCountries = this.getRandomNumbers(response.data)
        const incorroctOptions = shuffledCountries.slice(1, 4)
        this.correctOptions = shuffledCountries.slice(0, 1)
        this.countries = this.getRandomNumbers(incorroctOptions.concat(this.correctOptions))
        this.counter = 0
        this.totalScore = 0

      })
        .catch(error => console.log(error))
    },
    // Check if answer is right or wrong when an option is selected
    getAnswer(event) {
      if(event === this.correctOptions[0]) {
        this.selectedCountry = event
        this.correct = true
        this.validationHelper = true
        this.totalScore += 1
      } else {
        this.selectedCountry = event
        this.correct = false
        this.validationHelper = true
        this.totalScore
      }
    }
  },

}
</script>

<template>
  <div v-show="notStarted" class="flex flex-col pt-10 h-screen space-y-6 px-8">
    <h1 class="text-3xl text-white font-bold mx-auto h-auto">Welcome to country flag quiz</h1>
        <p class="text-white text-lg mx-auto">Test your knowledge and challenge yourself with this exciting quizes.You'll be presented with flags from various nations, and your task is to guess which country each flag belongs to. Put your visual recognition skills to the test and see how many flags you can correctly identify!. <span class="italic">let's goooooo!!!!!! </span> 
        </p>
        <div class="mx-auto">
            <router-link @click="getQuestion" class="text-white ring-2 ring-inset ring-white hover:ring-transparent hover:bg-[#000534] py-3 px-7 rounded-lg mr-6" to="/flag">start quiz</router-link>
        </div>
  </div>
  <div v-show="start" class="h-screen flex w-[100%]">
    <div v-show="counter < 5" class="m-auto space-y-2">
      <h1 class="text-3xl font-mono uppercase text-white">Country quiz</h1>
      <div class="bg-white rounded-2xl drop-shadow-sm w-96 mx-auto h-auto pb-8 px-0">
        <img src="../assets/undraw_adventure_4hum 1.svg" alt="" class="absolute right-0 -top-20">
        <div class="px-6 pt-14">
            <!-- Quiz question from the correctOption array. -->
          <div v-for="correctAnswer in correctOptions" :key="correctAnswer" class="text-lg font-bold text-sky-950 font-mono"> 
            <p class="text-4xl">{{ correctAnswer.flag }}</p>
            
            <span>Which country does this flag belong to?</span> 
            {{ console.log(correctAnswer.flags.png) }}
          </div>
          <div v-for="(country, index) in countries" :key="country.id" class="flex flex-col w-full space-y-3 mt-8">
            <button @click="getAnswer(country)" 
            :disabled="selectedCountry"
             class="font-mono ring-2 ring-[#0288D1] ring-inset py-2 pl-3 text-left rounded-lg text-[#0288D1] hover:bg-amber-500 hover:ring-0 hover:text-white transition-all duration-500 ease-in-out flex justify-between pr-3"
            :class="{'bg-green-500 ring-0 ring-transparent hover:bg-green-500': correct && country === correctOptions[0]  && country === selectedCountry, 
            'bg-green-500 ring-0 ring-transparent hover:bg-green-500': country === correctOptions[0] && validationHelper,
            'bg-red-500 ring-0 ring-transparent hover:bg-red-500':!correct && country !== correctOptions[0] && country === selectedCountry
            }"
            >
              <div>
                <span 
                class="mr-4"
                :class="{'text-gray-50': country === correctOptions[0] && validationHelper,
                'text-white':!correct && country !== correctOptions[0] && country === selectedCountry}"
                >{{ optLetter[index] }}</span>
                <span :class="{'text-gray-50':correct && country === correctOptions[0] && country === selectedCountry,
                'text-gray-50': country === correctOptions[0] && validationHelper,
                'text-white':!correct && country !== correctOptions[0] && country === selectedCountry}">{{country.name.common}}
                </span>
              </div>
              <Icon icon="emojione-monotone:white-heavy-check-mark" 
              color="white" class="text-white self-center" 
              v-show="!correct && country === correctOptions[0] && validationHelper"/>
              <Icon icon="emojione-monotone:white-heavy-check-mark" 
              color="white" class="text-white self-center" 
              v-show="correct && country === correctOptions[0] && validationHelper"/>

              <Icon icon="fa6-solid:xmark" color="white" class="text-white self-center" v-show="!correct && country !== correctOptions[0] && country === selectedCountry"/>
              </button>          
          </div>
        </div>
        <div class="flex justify-end px-6 pt-5">
          <button v-show="selectedCountry" @click="getQuestion" class="text-white bg-amber-500 rounded-lg py-2 px-8 float-right hover:bg-amber-700 transition-all duration-300 ease-in-out">
              NEXT
          </button>
        </div>
      </div>
    </div>
    <TheScore @retry="tryAgain" :score="totalScore" v-show="counter >= 5"/>
  </div>
</template>