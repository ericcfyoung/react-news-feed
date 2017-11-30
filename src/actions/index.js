import axios from 'axios'

export const STORY_PENDING = 'STORY_PENDING';
export const STORY_FULFILLED = 'STORY_FULFILLED';
export const STORY_REJECTED = 'STORY_REJECTED';

export const STORY_ID_PENDING = 'STORY_ID_PENDING';
export const STORY_ID_FULFILLED = 'STORY_ID_FULFILLED';
export const STORY_ID_REJECTED = 'STORY_ID_REJECTED';

export const COMMENTER_PENDING = 'COMMENTER_PENDING';
export const COMMENTER_FULFILLED = 'COMMENTER_FULFILLED';
export const COMMENTER_REJECTED = 'COMMENTER_REJECTED';

export const requestStoryIds = () => {
  return {
    type: 'STORY_ID',
    payload: axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
  }
}   

export const requestStories = ids => {
  return {
    type: 'STORY',
    payload: Promise.all(ids.slice(0,30).map(id => {
      return axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    }))
  }
}

export const requestCommenters = (comments) => {
  return {
    type: 'COMMENTER',
    payload: Promise.all(comments.map(id => {
      return axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    }))
  }
}