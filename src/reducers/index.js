import {combineReducers} from 'redux';

import storyReducer from './story';
import commenterReducer from './commenter';


const reducers = combineReducers({
    stories: storyReducer,
    commenters: commenterReducer
});

export default reducers;

