import React, {Component} from 'react';
import {connect} from 'react-redux';
import {requestStories, requestStoryIds, requestCommenters} from '../actions/index';
import {bindActionCreators} from 'redux';

const mapStateToProps = state => {
    return {
        stories: state.stories
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({requestStories, requestStoryIds, requestCommenters}, dispatch);
};

class StoryList extends Component {
    componentDidMount() {
        if(!this.props.stories.data) {
            this.props.requestStoryIds();
        }
    }

    componentDidUpdate() {
        if(this.props.stories.newIds) {
            this.props.requestStories(this.props.stories.ids);
        }
    }


    showLoader() {
        if(this.props.stories.isFetching) {
            return <img className="loader" src="/img/GD.gif" />
        }        
    }

    renderList() {
        if(this.props.stories.data) {
            return this.props.stories.data.map(item => {
                return (
                    <li key={item.id}><a href={item.url}>{item.title}</a></li>
                )
            });
        }
    }

    render() {
        return (
            <div className="story-container">
                <h3>Top 30 stories</h3>
                <ul className="story-list">
                {this.renderList()}
                </ul>                
                {this.showLoader()}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryList);