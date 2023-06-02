import axios from 'axios'
export default {
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