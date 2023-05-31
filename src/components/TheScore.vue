<script>
export default {
    props: ['score'],
    emits: ['retry']
}
</script>

<template>
    <div class="flex flex-col m-auto rounded-lg bg-white h-auto w-96" >
        <div class="m-auto space-y-10 py-4 place-self-center">
            <img src="../assets/undraw_winners_ao2o 2.svg">
            <h2 class="text-center font-bold text-4xl text-[#010426]">Results</h2>
            <p class="text-center text-lg text-[#010850]">you got <span class="text-3xl text-green-500">{{ score }}</span> correct answers</p>
            <p class="text-black text-center flex space-x-6"> 
                <button @click="$emit('retry')" class="text-center text-[#000534] ring-2 ring-[#010847] ring-inset py-3 px-7 rounded-lg">Try again</button>
                <router-link to="/" class="text-center text-[#000534] ring-2 ring-[#010847] ring-inset py-3 px-7 rounded-lg">Back home</router-link>
            </p>
        </div>
    </div>
</template>