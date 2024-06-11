import { TranslateLoader } from '@ngx-translate/core';
import { Observable, from } from 'rxjs';


export class WebpackTranslateLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        return from((import(`../assets/i18n/${lang}.json`))); // This assumes a public folder containing translation files as LOCALE.json in the directory src/app/assets/i18n
    }
}