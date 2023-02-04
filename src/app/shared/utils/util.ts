export class Util {

    static toggleClass(element: HTMLElement, className: string) {
        element.classList.contains(className) ? element.classList.remove(className) : element.classList.add(className);
    }

}