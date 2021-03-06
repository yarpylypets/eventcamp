import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {calGoggle} from '../../urls';

class Calendar extends Component {
    render(){
        if (!this.props.data) return <div>Загрузка...</div>;
        let data = this.props.data,
            date = data.acf.dateOf.replace(/-/ig, ''),
            location = data.acf.cities + ',' + data.acf.location,
            calGoggles = calGoggle + encodeURI(data.title.rendered) + '&dates=' + date + 'T000000/' + date + 'T235959&location=' + encodeURI(location) + '&details=' + window.location.href + ' +&trp=false&sprop=' + encodeURI(location.href) + 'sprop=name:Event-camp';

        return (
            <div className="calendar-link">
                <p>Добавьте в календарь</p>
                <a href={calGoggles}>
                    <img src="http://board.it-mir.net.ua/wp-content/uploads/2018/06/google.png" className="googleCal" />
                </a>
            </div>
        )
    }
}

export default Calendar;