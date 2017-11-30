import {
    COMMENTER_PENDING, COMMENTER_FULFILLED, COMMENTER_REJECTED,
    STORY_ID_FULFILLED, STORY_ID_PENDING 
} from '../actions'

const defaultState = {
    isFetching: null,
    fetchComments: true,
    data: null,
}

const commenterReducer = (state = defaultState, action) => {
    switch (action.type) {
        case COMMENTER_PENDING:
            return Object.assign({}, state, {
                isFetching: true
            });
    
        case COMMENTER_FULFILLED:
            const commenters = action.payload
                .filter(comment => comment.data !== null && comment.data.by != undefined)
                .reduce((prev, curr) => {
                    if (prev[curr.data.by]) { 
                        prev[curr.data.by]++; 
                    } else {
                        prev[curr.data.by] = 1;
                    } 

                    return prev;
                }, {});
            
            const sortable = [];

            for (let commenter in commenters) {
                if (commenters.hasOwnProperty(commenter)) {
                    sortable.push([commenter, commenters[commenter]]);
                }
            }

            sortable.sort((a,b) => b[1] - a[1]);

            return Object.assign({}, state, {
                isFetching: false,
                fetchComments: false,
                data: sortable.slice(0,10)
            });

        case COMMENTER_REJECTED:
            return state;

        case STORY_ID_FULFILLED:
            return Object.assign({}, state, {
                fetchComments: true
            });

        default:
            return state;
    }
};

export default commenterReducer;