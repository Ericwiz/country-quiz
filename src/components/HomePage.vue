<script>
export default {
    
}
</script>

<template>
    <div class="h-screen pt-16 flex space-y-6 flex-col align-top">
        <h1 class="text-3xl text-white italic mx-auto h-auto">Welcome to <span class="text-white not-italic font-bold">country quiz!</span></h1>
        <!-- <p>Test your knowledge and challenge yourself with two exciting features.You'll be presented with flags from various nations, and your task is to guess which country each flag belongs to. Put your visual recognition skills to the test and see how many flags you can correctly identify!</p> -->
        <p class="mx-auto text-white">👇 👇 please select quiz type below 👇 👇</p>

        <div class="mx-auto">
            <router-link class="text-white ring-2 ring-inset ring-white hover:ring-transparent hover:bg-[#000534] py-3 px-7 rounded-lg mr-6" to="/flag">Country Flag</router-link>
            <router-link class="text-white ring-2 ring-inset ring-white hover:ring-transparent hover:bg-[#000534] py-3 px-7 rounded-lg mr-6" to="/capital">Country Capital</router-link>
        </div>
    </div>
</template>