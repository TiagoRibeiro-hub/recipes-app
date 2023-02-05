export class Util {

    static css = class {
        static toggleClass(element: HTMLElement, className: string) {
            element.classList.contains(className) ? element.classList.remove(className) : element.classList.add(className);
        }
    };

    static arrays = class {
        static insertOrRemoveItem<T>(array: T[], predicate: any, condition: boolean, arrayOptional: T[] = undefined): T[] {
            if(arrayOptional === undefined) {
                arrayOptional = array;
            }
            const value = array.find(predicate);
            if(condition) {
                arrayOptional.push(value);
            } else {
                arrayOptional = this.removeItem(arrayOptional, obj => obj !== value);
            }
            return arrayOptional;
        }
    
        static removeItem<T>(array: T[], predicate: any): T[] {
            return array.filter(predicate);
    
        }
    };
}