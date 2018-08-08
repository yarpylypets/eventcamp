import React, { Component } from 'react';
import moment from 'moment';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import GoogleMap from './GoogleMap';
import { detailRecources } from '../../recources';

export default class DetailTabs extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        let data = this.props.data,
            address = data.acf.cities + ',' + data.acf.location;
        return(
            <Tabs>
                <TabList>
                    <Tab>{detailRecources.description}</Tab>
                    <Tab>{detailRecources.howToGet}</Tab>
                </TabList>
                <TabPanel>
                    <div className="event_text" dangerouslySetInnerHTML={{__html: data.content.rendered}}></div>
                </TabPanel>
                <TabPanel>
                    <div className="row">
                        <div className="col-7">
                            <GoogleMap address={address}/>
                        </div>
                        <div className="col-5 area-2_address">
                            {data.acf.cities}, {data.acf.location}<br/>
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
        )
    }
}