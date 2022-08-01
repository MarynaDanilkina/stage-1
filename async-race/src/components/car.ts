export type Car = {
    name: string;
    color: string;
    id: number;
};
export function drawCar(car: Car) {
    return `
  <div class="cars__buttons">
    <button class="btn button__select" id="select-car${car.id}">Select</button>
    <button class="btn button__remove" id="remove-car${car.id}">Remove</button>
    <p class="model">${car.name}</p>
  </div>
  <div class="cars__container">
    <div class="cars-info">
      <div class="cars-container__button">
        <button class="button-car button__start" id="start-car${car.id}">A</button>
        <button class="button-car button__stop" id="stop-car${car.id}" disabled>B</button>
      </div>
      <div class="car " id="car__${car.id}">
        <svg id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 400" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><style type="text/css">
          </style><g fill="${car.color}"><circle class="st0" cx="136" cy="358.6" r="44.4"/><circle class="st0" cx="366.4" cy="358.6" r="44.4"/><path class="st0" d="M469,331.4l-18.7-56.1c-5.6-16.9-21.4-28.3-39.2-28.3H81.2c-17.1,0-31,13.9-31,31v49.6c0,17.1,13.9,31,31,31   c0-30.2,24.5-54.8,54.8-54.8s54.8,24.5,54.8,54.8h120.9c0-30.2,24.5-54.8,54.8-54.8c30.2,0,54.8,24.5,54.8,54.8h28.2   C463.5,358.6,473.4,344.7,469,331.4z M438.6,292.7c-8.8,4.2-19.2,0.4-23.4-8.3c-4.2-8.8-0.4-19.2,8.3-23.4   C432.3,256.8,447.3,288.5,438.6,292.7z"/><path class="st0" d="M305.5,173.6c-9.8-11.8-24.4-18.6-39.7-18.6H146c-10.4,0-19.2,7.8-20.5,18.1l-9.1,73.8h250.1L305.5,173.6z    M208.3,236.6h-68.2l6.2-55.8h62V236.6z M228,180.8h50.6l43.4,55.8h-94V180.8z"/></g>
        </svg>
      </div>  
    </div>
    <div class="finish" id="finish__${car.id}">
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 753.23 753.23"
          xml:space="preserve">
        <g>
          <g id="Flag">
            <g>
              <path d="M665.644,45.406c-10.475-6.426-23.632-6.874-34.577-1.201c-27.917,14.453-55.387,26.41-108.419,26.41
                c-58.352,0-85.821-14.476-117.668-31.235C369.907,20.926,330.174,0,254.427,0c-52.42,0-87.445,10.027-115.739,22.267
                C133.486,9.25,120.823,0,105.923,0c-19.49,0-35.308,15.794-35.308,35.308v682.615c0,19.514,15.818,35.308,35.308,35.308
                s35.308-15.794,35.308-35.308V429.012c29.988-15.724,57.646-28.858,113.197-28.858c58.328,0,85.821,14.477,117.645,31.236
                c35.072,18.454,74.781,39.38,150.575,39.38c68.804,0,107.336-16.948,140.878-34.296c11.746-6.073,19.09-18.172,19.09-31.377
                V75.559C682.615,63.248,676.189,51.808,665.644,45.406z M612,383.018c-22.503,9.957-48.23,17.136-89.353,17.136
                c-58.352,0-85.821-14.476-117.668-31.235c-35.073-18.454-74.806-39.38-150.552-39.38c-50.82,0-85.327,9.392-113.197,21.138
                V99.474c29.988-15.724,57.646-28.858,113.197-28.858c58.328,0,85.821,14.476,117.645,31.235
                c35.072,18.454,74.781,39.38,150.575,39.38c37.355,0,65.79-4.99,89.353-12.334V383.018z"/></g>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g>
            </g><g>
        </g>
      </svg>
    </div>
  </div>`;
}
