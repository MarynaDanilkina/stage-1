import { items, count } from '../server/store';
import { getCar } from './car';
export function getGarage() {
    return `
            <div class="garage__form">
              <form class="form new-form" id="new-form">
                <input class="input" id="new-name" name="name" type="text" required />
                <input class="color" id="new-color" name="color" type="color" value="#ffffff"/>
                <button class="button__form" type="submit">Create</button>
              </form>
              <form class="form edit-form" id="edit-form">
                <input class="input" id="edit-name" name="name" type="text" disabled required/>
                <input class="color" id="edit-color" name="color" type="color" value="#ffffff" disabled/>
                <button class="button__form" id="edit-btn" type="submit" disabled >Update</button>
              </form>
            </div>
            <ul class="garage__list">
              <li class="li"><button class="bttn button-race" id="race">Race</button></li>
              <li class="li"><button class="bttn button-reset" id="reset" disabled>Reset</button></li>
              <li class="li"><button class="button-generate" id="generate">Generate</button></li>
            </ul>  
              <div class="garage__block">
                <h2 class="title">Garage (${count})</h2>
                <p class="page">Page #1</p>
                <ul class="cars">
                  <li class="li">
                    ${items.map((car) => getCar(car)).join('')}
                  </li>
                </ul>
              </div>
            </ul>
`;
}
