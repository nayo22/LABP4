import { CounterActions, UserActions } from '../flux/Actions';
import { State, store } from '../flux/Store';

class ComponenteB extends HTMLElement {
	connectedCallback() {
		store.subscribe((state: State) => {
			this.handleChange(state);
		});
		this.attachShadow({ mode: 'open' });
		this.render();
	}

	handleChange(state: State) {
		this.render(state);
	}

	render(state = store.getState()) {
		if (!this.shadowRoot) return;

		this.shadowRoot.innerHTML = `
            <style>
            :host {
                display: block;
                margin: 12px auto;
                max-width: 600px;
                font-family: 'Segoe UI', sans-serif;
            }

            .card {
                display: flex;
                justify-content: space-between;
                background-color: #fafafa;
                padding: 16px;
                border-radius: 10px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                border: 1px solid #ddd;
                transition: background 0.3s;
            }

            .option {
                flex: 1;
                margin: 0 10px;
                padding: 14px;
                text-align: center;
                background-color: #f0f0f0;
                border-radius: 8px;
                cursor: pointer;
                user-select: none;
                font-size: 1rem;
                border: 2px solid transparent;
                transition: background-color 0.2s, border 0.2s;
            }

            .option:hover {
                background-color: #e2e2e2;
            }

            .selected {
                border-color: #007BFF;
                background-color: #d0e6ff;
            }

            vote-bar {
                margin-top: 8px;
                display: block;
            }
            </style>

            <div>
                <h3>Mi componente B</h3>
                <p> Información sobre el usuario </p>
                <p> Nombre: ${state.user?.name} </p>
                <p> Edad: ${state.user?.age} </p>
                <p> Contador: ${state.count} </p>
                <button id="inc">Incrementar</button>
                <button id="dec">Decrementar</button>
                <button id="saveUser">Guardar usuario</button>
            </div>
            <vote-bar fight-id="${this.dataId}"></vote-bar>
        `;
		this.shadowRoot.querySelector('#inc')?.addEventListener('click', () => {
			CounterActions.increment(1);
		});

		this.shadowRoot.querySelector('#dec')?.addEventListener('click', () => {
			CounterActions.decrement(1);
		});

		this.shadowRoot.querySelector('#saveUser')?.addEventListener('click', () => {
			const user = { name: 'Kevin', age: 23 };
			UserActions.saveUser(user);
		});
	}
}

export default ComponenteB;
