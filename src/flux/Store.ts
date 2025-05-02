// src/flux/Store.ts
import { AppDispatcher, Action } from './Dispatcher';
import { CounterActionTypes, UserActionTypes, VoteActionTypes } from './Actions';

export type User = {
  name: string;
  age: number;
};

export type State = {
  count: number;
  user: User | null;
  votes: Record<string, 'a' | 'b'>;
};

type Listener = (state: State) => void;

class Store {
  private _myState: State = {
    count: 0,
    user: null,
    votes: {}
  };

  private _listeners: Listener[] = [];

  constructor() {
    AppDispatcher.register(this._handleActions.bind(this));
  }

  getState() {
    return this._myState;
  }

  private _handleActions(action: Action): void {
    switch (action.type) {
      case CounterActionTypes.INCREMENT_COUNT:
        if (typeof action.payload === 'number') {
          this._myState.count += action.payload;
        }
        this._emitChange();
        break;

      case CounterActionTypes.DECREMENT_COUNT:
        if (typeof action.payload === 'number') {
          this._myState.count -= action.payload;
        }
        this._emitChange();
        break;

      case UserActionTypes.SAVE_USER:
        if (typeof action.payload === 'object') {
          this._myState.user = action.payload as User;
        }
        this._emitChange();
        break;

      case VoteActionTypes.CAST_VOTE:
        if (typeof action.payload === 'object') {
          const { fightId, choice } = action.payload as { fightId: string; choice: 'a' | 'b' };
          this._myState.votes = {
            ...this._myState.votes,
            [fightId]: choice
          };
        }
        this._emitChange();
        break;

      case VoteActionTypes.RESET_VOTES:
        this._myState.votes = {};
        this._emitChange();
        break;
    }
  }

  private _emitChange(): void {
    const state = this.getState();
    for (const listener of this._listeners) {
      listener(state);
    }
  }

  subscribe(listener: Listener): void {
    this._listeners.push(listener);
    listener(this.getState());
  }

  unsubscribe(listener: Listener): void {
    this._listeners = this._listeners.filter(l => l !== listener);
  }
}

export const store = new Store();

