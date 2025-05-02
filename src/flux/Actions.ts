import { AppDispatcher } from './Dispatcher';

export const CounterActionTypes = {
    INCREMENT_COUNT: 'INCREMENT_COUNT',
    DECREMENT_COUNT: 'DECREMENT_COUNT'
};

export const UserActionTypes = {
    SAVE_USER: 'SAVE_USER',
};

export const CounterActions = {
    increment: (value: number) => {
        AppDispatcher.dispatch({
            type: CounterActionTypes.INCREMENT_COUNT,
            payload: value,
        });
    },
    decrement: (value: number) => {
        AppDispatcher.dispatch({
            type: CounterActionTypes.DECREMENT_COUNT,
            payload: value,
        });
    },
};

export const UserActions = {
    saveUser: (user: { name: string; age: number }) => {
        AppDispatcher.dispatch({
            type: UserActionTypes.SAVE_USER,
            payload: user,
        });
    },
};

export const VoteActionTypes = {
    CAST_VOTE: 'CAST_VOTE',
    RESET_VOTES: 'RESET_VOTES'
};

export const VoteActions = {
    castVote: (fightId: string, choice: 'a' | 'b') => {
        AppDispatcher.dispatch({
            type: VoteActionTypes.CAST_VOTE,
            payload: { fightId, choice },
        });
    },
    resetVotes: () => {
        AppDispatcher.dispatch({
            type: VoteActionTypes.RESET_VOTES
        });
    }
};
