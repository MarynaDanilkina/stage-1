import { drawGarage } from './garage';
import { drawWinners } from './winners';
export type Сars = {
    name: string;
    color: string;
    id: number;
};
export function drawPage() {
    const result = `
    <header class="header container">
          <button type="button" class="button garage_button">to garage</button>
          <button type="button" class="button winners_button">to winners</button>
        </header>
        <main class="main container">
          <div class="garage" id="garage">${drawGarage()}</div>
          <div class="winners" id="winners">${drawWinners()}</div>
          <div class="pagination">
            <button class="button button_prev" id="prev">←</button>
            <button class="button button_next" id="next">→</button>
          </div>
        </main> 
`;
    const div = document.createElement('div');
    div.innerHTML = result;
    document.body.appendChild(div);
}
