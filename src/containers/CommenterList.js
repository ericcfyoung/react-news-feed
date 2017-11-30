import React, {Component} from 'react';
import {connect} from 'react-redux';
import {requestCommenters} from '../actions/index';
import {bindActionCreators} from 'redux';

const mapStateToProps = state => {
    return {
        stories: state.stories,
        commenters: state.commenters
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({requestCommenters}, dispatch);
};

class CommenterList extends Component {
    componentDidUpdate() {
        if(!this.props.stories.isFetching && !this.props.commenters.isFetching &&
            this.props.stories.data && this.props.commenters.fetchComments) {
            this.props.requestCommenters(
                this.props.stories.data.reduce((accumulator, curr) => {
                    return accumulator.concat(curr.kids);
                }, [])
            );
        }
    }

    showLoader() {
        if(this.props.commenters.isFetching) {
            return <img className="loader" src="/img/GD.gif" />
        }        
    }

    renderList() {
        if(this.props.commenters.data) {
            return this.props.commenters.data.map(item => {
                return (
                    <tr key={item[0]}>
                        <td>{item[0]}</td>
                        <td>{item[1]}</td>
                    </tr>
                )
            });
        }
    }

    render() {
        return (
            <div className="commenter-container">
                <h3>Top 10 contributors</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Commenter Name</th>
                        <th>Total # of comments</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>
                {this.showLoader()}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommenterList);