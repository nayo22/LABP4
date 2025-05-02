export class FightCard extends HTMLElement {
	static get observedAttributes() {
		return ['data-id', 'data-a', 'data-b', 'data-img-a', 'data-img-b', 'data-selected'];
	}

	private dataId!: string;
	private fighterA!: string;
	private fighterB!: string;
	private imgA!: string;
	private imgB!: string;
	private selected!: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	attributeChangedCallback() {
		this.dataId = this.getAttribute('data-id') || '';
		this.fighterA = this.getAttribute('data-a') || '';
		this.fighterB = this.getAttribute('data-b') || '';
		this.imgA = this.getAttribute('data-img-a') || '';
		this.imgB = this.getAttribute('data-img-b') || '';
		this.selected = this.getAttribute('data-selected') || '';
		this.render();
	}

	handleVote(choice: 'a' | 'b') {
		if (!this.dataId || this.selected) return;

		const event = new CustomEvent('cast-vote', {
			bubbles: true,
			composed: true,
			detail: {
				fightId: this.dataId,
				choice,
			},
		});

		this.dispatchEvent(event);
	}

	render() {
		if (!this.shadowRoot) return;

		this.shadowRoot.innerHTML = `
      <style>
  .card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    font-family: 'Segoe UI', sans-serif;
  }

  .option {
    flex: 1;
    padding: 12px;
    margin: 0 10px;
    text-align: center;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    border: 2px solid transparent;
  }

  .option:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  .selected {
    border: 2px solidrgb(113, 113, 113);
    background-color:rgb(224, 199, 254);
  }

  img {
    width: 100px;
    height: auto;
    object-fit: contain;
    border-radius: 6px;
    margin-bottom: 6px;
  }

  .name {
    font-weight: 500;
    font-size: 1rem;
    color: #333;
  }
</style>
      <div class="card">
        <div class="option ${this.selected === 'a' ? 'selected' : ''}" id="a">
          <img src="${this.imgA}" alt="${this.fighterA}" />
          <div>${this.fighterA}</div>
        </div>
        <div class="option ${this.selected === 'b' ? 'selected' : ''}" id="b">
          <img src="${this.imgB}" alt="${this.fighterB}" />
          <div>${this.fighterB}</div>
        </div>
      </div>
      <vote-bar fight-id="${this.dataId}"></vote-bar>
    `;

		this.shadowRoot.querySelector('#a')?.addEventListener('click', () => this.handleVote('a'));
		this.shadowRoot.querySelector('#b')?.addEventListener('click', () => this.handleVote('b'));
	}
}

customElements.define('fight-card', FightCard);
