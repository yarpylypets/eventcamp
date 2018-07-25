import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import moment from 'moment';
import { request } from '../../api';
import { NavLink } from 'react-router-dom';
import { getValueFromParams } from '../../helper';
import { categories, cities, free } from '../../fixtures';
import { listRecources, globalRecources } from '../../recources';

class LastPosts extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (JSON.stringify(this.props.lastPosts) == JSON.stringify(nextProps.lastPosts)) {
            return false;
        }
        return true;
    }

    componentDidMount(){
        if (this.props.lastPosts.list) return;
        request.getLastPosts().then(posts => {
            store.dispatch({
                type: 'LAST_POSTS_UPDATE',
                list: posts
            });
        })
    }

    render(){
        if (!this.props.lastPosts.list) return <div></div>;
        const lastPosts = this.props.lastPosts.list.map(post => <li key={post.id} className='last-post-rightside'>           
            <NavLink to={`/${'events'}/${getValueFromParams(cities, post.acf.cities, 'name', 'url')}/${getValueFromParams(categories, post.categories[0], 'id', 'url')}/${post.id}`}>
                <div className="row">
                    <div className="col-12">
                        <div className="last-post-title"  dangerouslySetInnerHTML={{__html: post.title.rendered}}></div>
                    </div>
                    <div className="col-6">
                        <div className="last-post-location">
                            {post.acf.cities} {post.acf.location}
                        </div>
                        <div className="last-post-date">
                            {post.acf.dateOf ? moment(post.acf.dateOf, "YYYY-MM-DD").format("DD MMM YYYY"):''}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="last-post-price">
                            {free.indexOf(post.acf.price) === -1 ? (post.acf.price + '' + post.acf.currency || '') : globalRecources.free}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="last-post-tags">{post.acf.tags ?
                            post.acf.tags.split(',').map(tag =>
                                <span className="tagOpt" key={tag}>{tag}</span>
                            ) : ''}</div>
                    </div>

                </div>
            </NavLink>
        </li>);

        return (
            <div className="last-post-list">
                <h4>{listRecources.lastEvent}</h4>
                <ul>
                    {lastPosts}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        lastPosts: store.lastPosts
    }
};

export default connect(mapStateToProps)(LastPosts);