<template>
    <div class="prospect-form-container">
        <h2>Emailer</h2>
        <div>
            <label>Email</label>
            <div><input v-model="email.to" @blur="abandon()" type="email" :disabled="formState.isLoading"/></div>
        </div>
        <div>
            <h3>Settings</h3>
        </div>
        <div>
            <label>Subject</label>
            <div><input v-model="email.subject" :disabled="formState.isLoading"/></div>
        </div>
        <div>
            <label>Text</label>
            <div><input v-model="email.text" :disabled="formState.isLoading"/></div>
        </div>
        <div>
            <label>Html</label>
            <div><input v-model="email.html" :disabled="formState.isLoading"/></div>
        </div>
        <div>
            <label>Email Delay (minutes)</label>
            <div><input v-model="settings.emailDelay" type="number" :disabled="formState.isLoading"/></div>
        </div>
        <div>
            <label>Cookie Expiration Delay (minutes)</label>
            <div><input v-model="settings.cookieExpirationDelay" type="number" :disabled="formState.isLoading"/></div>
        </div>
        <div>
            <label>This button will stop the sending of email.</label>
            <div>
                <button @click="save()" :disabled="formState.isLoading">Save</button>
            </div>
        </div>
        <div>
            <h3>Emails used before</h3>
        </div>
        <div class="cookie-display-container">
            <textarea v-model="stringCookies" disabled rows="8" cols="50"/>
        </div>
    </div>
</template>
    
<script lang='ts'>
import EmailerService from "@/sevices/emailer.service"
import CookieService from "@/sevices/cookie.service"
import { Email, defaultEmail } from "@/models/email.model"
import { CookiePair } from "@/models/cookie.model"
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            email: defaultEmail as Email,
            settings: {
                emailDelay: 10, //Unit in minutes. Email will be sent after 10 minutes.
                cookieExpirationDelay: 10 //Unit in minutes. Cookie will expire after 10 minutes.
            },
            cookies: [] as Array<CookiePair>,
            formState: {
                isLoading: false,
            }
        }
    },
    mounted() {
        this.cookies = CookieService.getCookies();
    },
    methods: {
        async abandon() {
            this.formState.isLoading = true;

            const payload = {
                ...this.email,
                delay: this.delayInMilleseconds
            }

            if (this.email.to && this.email.to.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) && CookieService.getCookie(`emailerEmail(${this.email.to})`) == null) {
                const cookieExpiryDate = new Date();
                cookieExpiryDate.setMinutes(cookieExpiryDate.getMinutes()+this.settings.cookieExpirationDelay);
                document.cookie = `emailerEmail(${this.email.to})=${this.email.to}; expires=${cookieExpiryDate.toUTCString()};`;

                await EmailerService.SendDelayedEmail(payload).then((response) => {
                    console.log(response);
                    this.cookies = CookieService.getCookies();
                    console.log(this.cookies);
                }).catch((error) => {
                    console.log(error);
                });
            }

            this.formState.isLoading = false;
        },

        async save() {
            this.formState.isLoading = true;

            const payload = {
                email: this.email.to
            }

            if (confirm("Are you sure you want to save?")) {
                await EmailerService.StopDelayedEmail(payload).then((response) => {
                    this.email = defaultEmail;
                });
            }

            this.formState.isLoading = false;
        },
    },
    computed: {
        delayInMilleseconds(): number {
            return Number(this.settings.emailDelay * 60000);
        },
        stringCookies(): string {
            let returnValue = '';
            this.cookies.forEach((cookie, index) => {
                if (index != this.cookies.length - 1)
                    returnValue = returnValue + cookie.value + ',';
                else 
                    returnValue = returnValue + cookie.value;
            });

            return returnValue??'';
        }
    }
})
</script>
    
<style scoped>
.prospect-form-container {
    display: grid;
    grid-template-columns: auto;
    gap: 2px;
    padding: 2em;
    height: 40em;
    max-height: 40em;
    overflow-y: auto;
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