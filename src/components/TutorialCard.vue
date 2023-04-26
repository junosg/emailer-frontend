<template>
    <div class="tutorial-card">
        <h1>How to use?</h1>
        <ol>
            <li>Input an email</li>
            <li>Focus out on the email field to send a delayed email</li>
            <li>By default, you’ll received an email from dummytesteruser3@gmail.com after 10 minutes</li>
            <li>Tweak the settings below the email input field according to your needs</li>
            <li>Input another email not in <b>Emails used before</b></li>
            <li>Focus out again to send another delayed email</li>
        </ol>
        <h5 style="color: red;">!! Warning: After 15 minutes of inactivity, Render will stop the service until it is being used again. This might make the first request in a while to be too slow because Render will try to up the service again. !!</h5>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.tutorial-card {
    text-align: start;
    padding: 2em;
    width: 30em;
}

</style>