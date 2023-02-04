export class TextUtils {
    
    /**
     * https://stackoverflow.com/a/1054862/5405197
     */
    static slugify = (phrase: string) => {
      
        return phrase.toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
      }
}