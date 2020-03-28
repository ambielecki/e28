<template>
    <div>
        <h2>Results</h2>
        <div v-for="(result, index) in results" :key="index">
            <ul>
                <li><b>Player: </b>{{ result.player }}</li>
                <li><b>Sport: </b>{{ result.sport }}</li>
                <li><b>Shuffled Word: </b>{{ result.shuffled_word }}</li>
                <li><b>Guess: </b>{{ result.guess }}</li>
                <li :class="[result.correct ? 'correct_true' : 'correct_false']"><b>Correct: </b>{{ result.correct ? 'Yes' : 'No' }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['results'],
    }
</script>

<style scoped>
    .correct_false {
        color: red;
    }

    .correct_true {
        color: green;
    }
</style>