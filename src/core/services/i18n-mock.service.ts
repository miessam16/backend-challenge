export class I18nMockService {
    translate(key: string, options?: {
        lang?: string;
        args?: Array<{
            [k: string]: any;
        } | string> | {
            [k: string]: any;
        };
    }): any {
        return translations[options.lang][key.split('.')[1]];
    }
}
export const translations = {
    en: {
        WELCOME: 'Hello World!'
    },
    ar: {
        WELCOME: 'اهلا'
    }
};
