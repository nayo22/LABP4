// src/components/AppContainer.ts
import { State, store } from '../flux/Store';
import { VoteActions } from '../flux/Actions';
import { fights } from '../assets/fightData';
import './FightCard';
import './VoteBar';

class AppContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    store.subscribe((state: State) => this.render(state));
    this.shadowRoot?.addEventListener('cast-vote', (e: Event) => {
      const custom = e as CustomEvent;
      const { fightId, choice } = custom.detail;
      VoteActions.castVote(fightId, choice);
    });
    this.render();
  }

  render(state = store.getState()) {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        h1 {
          text-align: center;
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 900px;
          margin: auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        button#reset-btn {
          margin: 20px auto;
          padding: 10px 20px;
          background-color: #dc3545;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
        }
        button#reset-btn:hover {
          background-color: #bb2d3b;
        }
      </style>

      <h1>🔥 La Velada del Año - Votaciones 🔥</h1>
      <button id="reset-btn">🧹 Reiniciar Votaciones</button>
      <div class="container">
      ${fights.map((fight) => `
        <fight-card
          data-id="${fight.id}"
          data-a="${fight.a}"
          data-b="${fight.b}"
          data-img-a="${fight.imgA}"
          data-img-b="${fight.imgB}"
          data-selected="${state.votes[fight.id] ?? ''}"
        ></fight-card>
      `).join('')}
      
      </div>
    `;

    // Escucha al botón luego del render
    this.shadowRoot.querySelector('#reset-btn')?.addEventListener('click', () => {
      if (confirm("¿Seguro que quieres reiniciar todos los votos?")) {
        import('../flux/Actions').then(({ VoteActions }) => {
          VoteActions.resetVotes();
        });
      }
    });
  }
}

customElements.define('app-container', AppContainer);
export default AppContainer;
