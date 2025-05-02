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
			console.log(`[RECEIVED] Guardando voto: ${fightId} = ${choice}`);
			VoteActions.castVote(fightId, choice);
		});
		this.render();
	}

	render(state = store.getState()) {
		if (!this.shadowRoot) return;

		this.shadowRoot.innerHTML = `
      <style>
  :host {
    display: block;
    min-height: 100vh;
    background-image: url('../../public/img/bg.png');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    padding: 20px;
    box-sizing: border-box;
  }

  h1 {
    text-align: center;
    font-family: 'Segoe UI', sans-serif;
    font-size: 2rem;
    color: white;
    margin-bottom: 20px;
  }

  .button-container {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }

  button#reset-btn {
    padding: 12px 28px;
    background:rgb(255, 86, 221);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s;
  }

  button#reset-btn:hover {
    background:rgb(212, 131, 201);
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: 32px;
    max-width: 800px;
    margin: auto;
  }
</style>

      <h1>🌚La Velada del Año - Votacionesss pro😈 </h1>
      <div class="button-container">
  <button id="reset-btn">Reiniciar Votaciones GG</button>
    </div>

      <div class="container">
      ${fights
				.map(
					(fight) => `
        <fight-card
          data-id="${fight.id}"
          data-a="${fight.a}"
          data-b="${fight.b}"
          data-img-a="${fight.imgA}"
          data-img-b="${fight.imgB}"
          data-selected="${state.votes[fight.id] ?? ''}"
        ></fight-card>
      `
				)
				.join('')}

      </div>
    `;

		// Escucha al botón luego del render
		this.shadowRoot.querySelector('#reset-btn')?.addEventListener('click', () => {
			if (confirm('¿Seguro que quieres reiniciar todos los votos?')) {
				import('../flux/Actions').then(({ VoteActions }) => {
					VoteActions.resetVotes();
				});
			}
		});
	}
}

customElements.define('app-container', AppContainer);
export default AppContainer;
