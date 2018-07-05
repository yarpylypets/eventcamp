import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import store from '../store';
import {request} from '../api';
import moment from 'moment';
import Filters from './filters';
import Exchange from './exchange';
import Pagination from './Pagination';
import LastPosts from './list/LastPosts';
import {NavLink} from 'react-router-dom';
import {categories, cities, free} from '../fixtures';

class EventList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title : 'События и конференции'
        };
    }

    componentWillMount(){
    }

    componentDidMount(){
        const initialParams = this.props.match.params;
        return request.getListPosts(initialParams).then(posts => {
                store.dispatch({
                    type: 'EVENT_LIST_UPDATE',
                    list: posts
                });
        })
    }

    render(){
        if (!this.props.posts.length) return <div className="loader"></div>;
        const articleElements = this.props.posts.map(article => <li key={article.id} className='event_list'>
            <NavLink to = {`${'kiev'}/${getParamValue(categories, article.categories[0], 'url')}/${article.id}`}>
                <div className="row">
                    <div className="col-3">
                        <img src={article.acf.picture || 'http://board.it-mir.net.ua/wp-content/uploads/2018/05/nophoto.jpg'} className="event_list-img"/>
                    </div>
                    <div className="col-6">
                        <div className="event_list-title"  dangerouslySetInnerHTML={{__html: article.title.rendered}}></div>
                        <div className="event_list-description" dangerouslySetInnerHTML={{__html: article.excerpt.rendered}}></div>
                        <div className="event_list-tags">{article.acf.tags ?
                                                        article.acf.tags.split(',').map(tag =>
                                                            <span className="tagOpt">{tag}</span>
                                                        ) : ''}</div>
                    </div>
                    <div className="col-3">
                        <div className="event_list-price">
                            {free.indexOf(article.acf.price)===-1 ? (article.acf.price + '' + article.acf.currency || '') : 'бесплатно'}
                        </div>
                        <div className="event_list-location">
                            {article.acf.cities} {article.acf.location}
                        </div>
                        <div className="event_list-date">
                            {article.acf.dateOf ? moment(article.acf.dateOf, "YYYY-MM-DD").format("Do MMM YYYY"):''}
                        </div>
                        <div className="event_list-action">
                            <button className="event_list-actionMore">Подробнее</button>
                        </div>
                    </div>
                </div>
            </NavLink>
        </li>);
        let categoryTitle = this.props.categories ? getParamValue(categories, this.props.categories, 'name') + '. ' : '',
            cityTitle = this.props.cities ? ' в городе ' + getParamValue(cities, this.props.cities, 'name') : '';
        document.title = categoryTitle + this.state.title + cityTitle
        return (
            <div className="container">
                <div className="row">
                    <div className="col-9">
                        <h1>{categoryTitle + this.state.title + cityTitle}</h1>
                        {articleElements}
                    </div>
                    <div className="col-3">
                        <Filters/>
                        <LastPosts/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Pagination/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        posts: store.filterState.list,
        categories : store.filterState.categories,
        cities : store.filterState.cities
    }
};

const getParamValue = function(categories, id, param){
    var currentCategory = categories.filter(function(item){
        return (item.id == id)
    });
    return currentCategory[0][param]
};

export default connect(mapStateToProps)(EventList);