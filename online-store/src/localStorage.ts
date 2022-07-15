function localStorageSort() {
    const SortContainer = <HTMLSelectElement>document.querySelector('select');
    if (localStorage.selectedIndex !== null) {
        SortContainer.selectedIndex = localStorage.selectedIndex;
    }
}
function localStorageFirm() {
    const firm: string = localStorage.getItem('firm') || '';
    if (localStorage.getItem('firm') !== null) {
        const arr = JSON.parse(firm);
        if (localStorage.getItem('firm') !== null) {
            const checkbox = document.querySelectorAll<HTMLElement>('.checkbox-box');
            checkbox.forEach((el) => {
                if (arr.length !== 0) {
                    for (let i = 0; i < arr.length; i++) {
                        if (el.dataset.firm) {
                            if (el.dataset.firm.indexOf(arr[i]) > -1) {
                                el.classList.add('active__button');
                            }
                        }
                    }
                }
            });
        }
    }
}
function localStorageSeason() {
    const season = localStorage.getItem('season') || '';
    if (localStorage.getItem('season') !== null) {
        const arr = JSON.parse(season);
        if (localStorage.getItem('season') !== null) {
            const checkbox = document.querySelectorAll<HTMLElement>('.checkbox-box');
            checkbox.forEach((el) => {
                if (arr.length !== 0) {
                    for (let i = 0; i < arr.length; i++) {
                        if (el.dataset.season) {
                            if (el.dataset.season.indexOf(arr[i]) > -1) {
                                el.classList.add('active__button');
                            }
                        }
                    }
                }
            });
        }
    }
}
function localStorageColor() {
    const color = localStorage.getItem('color') || '';
    if (localStorage.getItem('color') !== null) {
        const arr = JSON.parse(color);
        if (localStorage.getItem('color') !== null) {
            const checkbox = document.querySelectorAll<HTMLElement>('.checkbox-box');
            checkbox.forEach((el) => {
                if (arr.length !== 0) {
                    for (let i = 0; i < arr.length; i++) {
                        if (el.dataset.color) {
                            if (el.dataset.color.indexOf(arr[i]) > -1) {
                                el.classList.add('active__button');
                            }
                        }
                    }
                }
            });
        }
    }
}
function localStorageGender() {
    const gender = localStorage.getItem('gender') || '';
    if (localStorage.getItem('gender') !== null) {
        const arr = JSON.parse(gender);
        if (localStorage.getItem('gender') !== null) {
            const checkbox = document.querySelectorAll<HTMLElement>('.checkbox-box');
            checkbox.forEach((el) => {
                if (arr.length !== 0) {
                    for (let i = 0; i < arr.length; i++) {
                        if (el.dataset.gender) {
                            if (el.dataset.gender.indexOf(arr[i]) > -1) {
                                el.classList.add('active__button');
                            }
                        }
                    }
                }
            });
        }
    }
}
function localStorageSize() {
    const size = localStorage.getItem('size') || '';
    if (localStorage.getItem('size') !== null) {
        const arr = JSON.parse(size);
        if (localStorage.getItem('size') !== null) {
            const checkbox = document.querySelectorAll<HTMLElement>('.checkbox-box');
            checkbox.forEach((el) => {
                if (arr.length !== 0) {
                    for (let i = 0; i < arr.length; i++) {
                        if (el.dataset.size) {
                            if (el.dataset.size.indexOf(arr[i]) > -1) {
                                el.classList.add('active__button');
                            }
                        }
                    }
                }
            });
        }
    }
}
function localStoragePopular() {
    const arr = localStorage.getItem('popular') || '';
    if (localStorage.getItem('popular') !== null) {
        const checkbox = document.querySelectorAll<HTMLElement>('.checkbox-box');
        checkbox.forEach((el) => {
            if (arr.length !== 0) {
                for (let i = 0; i < arr.length; i++) {
                    if (el.dataset.popular) {
                        if (el.dataset.popular.indexOf(arr[i]) > -1) {
                            el.classList.add('active__button');
                        }
                    }
                }
            }
        });
    }
}
function localStorageMinPrice() {
    const rangeMinPrice = localStorage.getItem('rangeMinPrice') || '0';
    const rangePrice = document.querySelectorAll<HTMLInputElement>('.range-slider input[type="range"]');
    if (localStorage.getItem('rangeMinPrice') !== null) {
        rangePrice[0].value = `${rangeMinPrice}`;
    }
}
function localStorageMaxPrice() {
    const rangeMaxPrice = localStorage.getItem('rangeMaxPrice') || '0';
    const rangePrice = document.querySelectorAll<HTMLInputElement>('.range-slider input[type="range"]');
    if (localStorage.getItem('rangeMaxPrice') !== null) {
        rangePrice[1].value = `${rangeMaxPrice}`;
    }
}
function localStorageMinQuantit() {
    const rangeMinQuantit = localStorage.getItem('rangeMinQuantit') || '0';
    const rangeQuantity = document.querySelectorAll<HTMLInputElement>('.range-slider__quantity input[type="range"]');
    if (localStorage.getItem('rangeMinQuantit') !== null) {
        rangeQuantity[0].value = `${rangeMinQuantit}`;
    }
}
function localStorageMaxQuantit() {
    const rangeMaxQuantit = localStorage.getItem('rangeMaxQuantit') || '0';
    const rangeQuantity = document.querySelectorAll<HTMLInputElement>('.range-slider__quantity input[type="range"]');
    if (localStorage.getItem('rangeMaxQuantit') !== null) {
        rangeQuantity[1].value = `${rangeMaxQuantit}`;
    }
}
export {
    localStorageFirm,
    localStorageSeason,
    localStorageColor,
    localStorageGender,
    localStorageSize,
    localStoragePopular,
    localStorageSort,
    localStorageMinPrice,
    localStorageMaxPrice,
    localStorageMinQuantit,
    localStorageMaxQuantit,
};
