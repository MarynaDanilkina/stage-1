export let requestID: number;
export function animation(car: HTMLElement, distanceEl: number, timeAn: number) {
    const start = performance.now();
    const requestID: { id: number } = { id: 0 };
    requestAnimationFrame(function animate(time: number) {
        let timeFraction = (time - start) / timeAn;
        if (timeFraction > 1) timeFraction = 1;
        car.style.transform = `translateX(${timeFraction * distanceEl}px)`;
        if (timeFraction < 1) {
            requestID.id = requestAnimationFrame(animate);
        }
    });
    return requestID;
}
