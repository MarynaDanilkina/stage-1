import { storage } from '../server/store';
import { Winners } from '../type';
import { pagesWinners } from '../index';
export function drawWinners() {
    return `
    <div class="winners__block">
        <h2 class="title">Garage (${storage.getWinnersCount()})</h2>
        <p class="page">Page #${pagesWinners}</p>
        <div class="winners__container">
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Wins</th>
                        <th>Best time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        ${storage.Winners.map((Winner) => drawCarWinner(Winner)).join('')}
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="pagination">
        <button class="button button_prevWin" id="prevWin">←</button>
        <button class="button button_nextWin" id="nextWin">→</button>
    </div>
  `;
}

export function drawCarWinner(Winner: Winners) {
    return `
        <tr>
            <td></td>
            <td>
              <div class="car " id="car__${Winner.winner.id}">
                <svg id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 400" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><style type="text/css">
          </style><g fill="${Winner.car.color}"><circle class="st0" cx="136" cy="358.6" r="44.4"/><circle class="st0" cx="366.4" cy="358.6" r="44.4"/><path class="st0" d="M469,331.4l-18.7-56.1c-5.6-16.9-21.4-28.3-39.2-28.3H81.2c-17.1,0-31,13.9-31,31v49.6c0,17.1,13.9,31,31,31   c0-30.2,24.5-54.8,54.8-54.8s54.8,24.5,54.8,54.8h120.9c0-30.2,24.5-54.8,54.8-54.8c30.2,0,54.8,24.5,54.8,54.8h28.2   C463.5,358.6,473.4,344.7,469,331.4z M438.6,292.7c-8.8,4.2-19.2,0.4-23.4-8.3c-4.2-8.8-0.4-19.2,8.3-23.4   C432.3,256.8,447.3,288.5,438.6,292.7z"/><path class="st0" d="M305.5,173.6c-9.8-11.8-24.4-18.6-39.7-18.6H146c-10.4,0-19.2,7.8-20.5,18.1l-9.1,73.8h250.1L305.5,173.6z    M208.3,236.6h-68.2l6.2-55.8h62V236.6z M228,180.8h50.6l43.4,55.8h-94V180.8z"/></g>
        </svg>
              </div>
              </td>
            <td>${Winner.car.name}</td>
            <td>${Winner.winner.wins}</td>
            <td>${Winner.winner.time}</td>
        </tr>
    `;
}
