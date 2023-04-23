import { CookiePair } from "@/models/cookie.model";

export default class CookieService {
    static getCookies(): Array<CookiePair> {
        let cookies: Array<string> = decodeURIComponent(document.cookie).trim().split(";");
        let cookiePairs: Array<CookiePair> = [];

        cookies.forEach((cookie) => {
            let cookiePairArray: Array<string> = cookie.trim().split("=");
            cookiePairs.push({key: cookiePairArray[0], value: cookiePairArray[1]});
        });

        return cookiePairs;
    }

    static getCookie(cookieKey: string): CookiePair|null {
        let cookiePair: CookiePair = this.getCookies().filter((cookie) => {return cookie.key == cookieKey})[0];

        if (cookiePair == undefined) return null;

        return cookiePair;
    }
}