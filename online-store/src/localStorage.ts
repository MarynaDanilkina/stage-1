function localStorageSort() {
    const SortContainer = <HTMLSelectElement>document.querySelector('select');
    if (localStorage.selectedIndex !== null) {
        SortContainer.selectedIndex = localStorage.selectedIndex;
    }
}
export { localStorageSort };
