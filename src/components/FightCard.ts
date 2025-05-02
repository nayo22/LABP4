export class FightCard extends HTMLElement {
    static get observedAttributes() {
      return ['data-id', 'data-a', 'data-b', 'data-selected', 'img-a', 'img-b'];
    }

    private dataId!: string;
    private fighterA!: string;
    private fighterB!: string;
    private selected!: string;
    private imgA!: string;
    private imgB!: string;

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    attributeChangedCallback() {
      this.dataId = this.getAttribute('data-id') || '';
      this.fighterA = this.getAttribute('data-a') || '';
      this.fighterB = this.getAttribute('data-b') || '';
      this.selected = this.getAttribute('data-selected') || '';
      this.imgA = this.getAttribute('img-a') || '';
      this.imgB = this.getAttribute('img-b') || '';
      this.render();
    }

    handleVote(choice: 'a' | 'b') {
      if (!this.dataId || this.selected) return;
      const event = new CustomEvent('cast-vote', {
        detail: { fightId: this.dataId, choice },
        bubbles: true,
        composed: true
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
            padding: 10px;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-family: sans-serif;
            background: #f9f9f9;
          }
          .option {
            flex: 1;
            padding: 10px;
            margin: 5px;
            text-align: center;
            border-radius: 6px;
            cursor: pointer;
            border: 2px solid transparent;
            transition: all 0.3s ease-in-out;
          }
          .option:hover {
            background-color: #eee;
          }
          .selected {
            border-color: #007BFF;
            background-color: #e6f0ff;
          }
          .fighter-img {
            width: 120px;
            height: 120px;
            object-fit: cover;
            border-radius: 50%;
            box-shadow: 0 0 4px rgba(0,0,0,0.2);
            margin-bottom: 8px;
          }
          .fighter-name {
            font-weight: bold;
            font-size: 16px;
          }
        </style>
        <div class="card">
          <div class="option ${this.selected === 'a' ? 'selected' : ''}" id="a">
            <img src="/assets/${this.imgA}" class="fighter-img" alt="${this.fighterA}" />
            <div class="fighter-name">${this.fighterA}</div>
          </div>
          <div class="option ${this.selected === 'b' ? 'selected' : ''}" id="b">
            <img src="/assets/${this.imgB}" class="fighter-img" alt="${this.fighterB}" />
            <div class="fighter-name">${this.fighterB}</div>
          </div>
        </div>
      `;

      this.shadowRoot.querySelector('#a')?.addEventListener('click', () => this.handleVote('a'));
      this.shadowRoot.querySelector('#b')?.addEventListener('click', () => this.handleVote('b'));
    }
  }

  customElements.define('fight-card', FightCard);