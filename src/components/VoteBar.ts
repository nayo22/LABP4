// src/components/VoteBar.ts
import { store, State } from '../flux/Store';

class VoteBar extends HTMLElement {
  static get observedAttributes() {
    return ['fight-id'];
  }

  private fightId = '';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    store.subscribe((state: State) => this.handleChange(state));
    this.attributeChangedCallback();
  }

  attributeChangedCallback() {
    this.fightId = this.getAttribute('fight-id') || '';
    this.render();
  }

  handleChange(state: State) {
    this.render(state);
  }

  render(state = store.getState()) {
    if (!this.shadowRoot || !this.fightId) return;

    const allVotes = Object.entries(state.votes)
      .filter(([id]) => id === this.fightId)
      .map(([, value]) => value)

    const total = allVotes.length;
    const aVotes = allVotes.filter((v) => v === 'a').length;
    const bVotes = allVotes.filter((v) => v === 'b').length;

    const aPct = total > 0 ? Math.round((aVotes / total) * 100) : 0;
    const bPct = total > 0 ? Math.round((bVotes / total) * 100) : 0;

    this.shadowRoot.innerHTML = `
      <style>
        .bar-container {
          display: flex;
          height: 20px;
          width: 100%;
          background: #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
          margin-top: 8px;
        }
        .a-bar {
          background: #007BFF;
          width: ${aPct}%;
          transition: width 0.3s;
        }
        .b-bar {
          background: #FF4136;
          width: ${bPct}%;
          transition: width 0.3s;
        }
        .labels {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          margin-top: 4px;
          font-family: sans-serif;
        }
      </style>
      <div class="bar-container">
        <div class="a-bar"></div>
        <div class="b-bar"></div>
      </div>
      <div class="labels">
        <span>A: ${aPct}%</span>
        <span>B: ${bPct}%</span>
      </div>
    `;
  }
}

customElements.define('vote-bar', VoteBar);
