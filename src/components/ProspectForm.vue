<template>
    <div class="prospect-form-container">
        <div>
            <label>Email</label>
            <div><input v-model="email.to" @blur="abandon()"/></div>
        </div>
        <div>
            <label>Subject</label>
            <div><input v-model="email.subject"/></div>
        </div>
        <div>
            <label>Text</label>
            <div><input v-model="email.text"/></div>
        </div>
        <div>
            <label>Html</label>
            <div><input v-model="email.html"/></div>
        </div>
        <div>
            <label>Delay in milliseconds</label>
            <div><input v-model="settings.delay"/></div>
        </div>
        <div>
            <!-- <button @click="abandon()">Abandon</button> -->
            <button @click="save()">Save</button>
        </div>
        <div class="cookie-display-container">
            <div>
                <div v-for="cookie in getCookies()" :key="cookie"> {{cookie.value}}</div>
            </div>
        </div>
    </div>
</template>
    
<script lang='ts'>
import { EmailerService } from "@/sevices/emailer.service"
import { Email, defaultEmail } from "@/models/email.model"
import { CookiePair } from "@/models/cookie.model"
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            email: defaultEmail,
            settings: {
                delay: 600000,
            }
        }
    },
    methods: {
        async abandon() {
            //cookie will expire in 10 minutes
            const cookieExpiration = 3600;

            const payload = {
                ...this.email,
                delay: this.settings.delay
            }

            if (this.email.to && this.email.to.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) && this.getCookie(`emailerEmail(${this.email.to})`) == null) {
                document.cookie = `emailerEmail(${this.email.to})=${this.email.to}; max-age=${cookieExpiration};`;

                await EmailerService.SendDelayedEmail(payload).then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                });
            }
        },

        async save() {
            const payload = {
                email: this.email.to
            }

            if (confirm("Are you sure you want to save?")) {
                await EmailerService.StopDelayedEmail(payload).then((response) => {
                    this.email = defaultEmail;
                });
            }
        },

        getCookies(): Array<CookiePair> {
            let cookies: Array<string> = decodeURIComponent(document.cookie).trim().split(";");
            let cookiePairs: Array<CookiePair> = [];

            cookies.forEach((cookie) => {
                let cookiePairArray: Array<string> = cookie.trim().split("=");
                cookiePairs.push({key: cookiePairArray[0], value: cookiePairArray[1]});
            });

            return cookiePairs;
        },

        getCookie(cookieKey: string): CookiePair|null {
            let cookiePair: CookiePair = this.getCookies().filter((cookie) => {return cookie.key == cookieKey})[0];

            if (cookiePair == undefined) return null;

            return cookiePair;
        }
    },
})
</script>
    
<style scoped>
.prospect-form-container {
    display: grid;
    grid-template-columns: auto;
    gap: 1em;
}

.cookie-display-container {
    display: grid;
    place-items: center;
}

.cookie-display-container div {
    max-width: 30em;
    word-break: break-all;
}
</style>