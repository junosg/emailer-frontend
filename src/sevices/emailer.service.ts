import { Axios } from "@/helpers/axios"

export default class EmailerService {
    static SendDelayedEmail(payload: object) {
        return Axios.post('/emailer/delayedEmail', payload)
    }

    static StopDelayedEmail(payload: object) {
        return Axios.post('/emailer/stopDelayedEmail', payload);
    }
}