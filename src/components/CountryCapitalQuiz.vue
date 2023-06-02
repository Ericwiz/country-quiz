<script>
import { Icon } from '@iconify/vue';
import TheScore from './TheScore.vue';
import countryQuiz from '../mixins/countryQuiz';
export default {
  components: {Icon, TheScore},
  mixins: [countryQuiz]

}
</script>

<template>
  <div v-show="notStarted" class="flex flex-col pt-10 h-screen space-y-6 px-8">
    <h1 class="text-3xl text-white font-bold mx-auto h-auto">Welcome to country capital quiz</h1>
        <p class="text-white text-lg mx-auto">In this section of the quiz, You'll be presented with capital of various nations, and your task is to guess which country each capital belongs to. Put your knowledge to  test and see how many questions you can correctly answer. <span class="italic">let's goooooo!!!!!! </span> 
        </p>
        <div class="mx-auto">
            <router-link @click="getQuestion" class="text-white ring-2 ring-inset ring-white hover:ring-transparent hover:bg-[#000534] py-3 px-7 rounded-lg mr-6" to="/capital">start quiz</router-link>
        </div>
  </div>
  <div v-show="start" class="h-screen flex w-[100%]">
    <div v-show="counter < 5" class="m-auto space-y-2">
      <h1 class="text-3xl font-mono uppercase text-white">Country quiz</h1>
      <div class="bg-white rounded-2xl drop-shadow-sm w-96 mx-auto h-auto pb-8 px-0">
        <img src="../assets/undraw_adventure_4hum1.svg" alt="" class="absolute right-0 -top-20">

        
        <div class="px-6 pt-14">
          <p v-for="correctAnswer in correctOptions" :key="correctAnswer" class="text-lg font-bold text-sky-950 font-mono"> 
            <span v-for="capital in correctAnswer.capital" :key="capital">{{ capital }}</span> 
            is the capital of?
          </p>
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