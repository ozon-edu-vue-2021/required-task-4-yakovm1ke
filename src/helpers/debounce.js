export function debounce(f, t) {
    let timeout;
    return function (args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => f(args), t)
    } 
}