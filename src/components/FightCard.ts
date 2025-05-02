// src/components/FightCard.ts
import { VoteActions } from '../flux/Actions';

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
    VoteActions.castVote(this.dataId, choice);
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          display: flex;
          justify-content: space-between;
          padding: 10px;
          border: 2px solid #ddd;
          border-radius: 8px;
          font-family: sans-serif;
        }
        .option {
          flex: 1;
          padding: 10px;
          margin: 5px;
          text-align: center;
          border-radius: 6px;
          cursor: pointer;
          border: 2px solid transparent;
          transition: background 0.2s, border 0.2s;
        }
        .option:hover {
          background-color: #f0f0f0;
        }
        .selected {
          border-color: #007BFF;
          background-color: #e6f0ff;
        }
        img {
          width: 100px;
          height: auto;
          border-radius: 6px;
          margin-bottom: 8px;
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
    `;

    this.shadowRoot.querySelector('#a')?.addEventListener('click', () => this.handleVote('a'));
    this.shadowRoot.querySelector('#b')?.addEventListener('click', () => this.handleVote('b'));
  }
}

customElements.define('fight-card', FightCard);
