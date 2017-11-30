import {
    STORY_PENDING, STORY_FULFILLED, STORY_REJECTED,
    STORY_ID_PENDING, STORY_ID_FULFILLED, STORY_ID_REJECTED
} from '../actions'

const defaultState = {
    isFetching: null,
    fetchComments: false,
    data: null,
}

const storyReducer = (state = defaultState, action) => {
    switch (action.type) {
        case STORY_ID_PENDING:
            return Object.assign({}, state, {
                isFetching: true
            });

        case STORY_ID_FULFILLED:
            return Object.assign({}, state, {
                newIds: true,
                ids: action.payload.data
            });

        case STORY_REJECTED:
            return state;

        case STORY_ID_PENDING:
            return state;
    
        case STORY_FULFILLED:
            return Object.assign({}, state, {
                isFetching: false,
                newIds: false,
                data: action.payload.map(story => story.data)
            });

        case STORY_ID_REJECTED:
            return state;

        default:
            return state;
    }
};

export default storyReducer;