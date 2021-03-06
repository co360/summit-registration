/**
 * Copyright 2019
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

import React from 'react'
import T from 'i18n-react/dist/i18n-react'

import { daysBetweenDates, getFormatedDate } from '../utils/helpers';

class TicketOptions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.handleTicketName = this.handleTicketName.bind(this);
        this.handleSummitLocation = this.handleSummitLocation.bind(this);
        this.handleTicketDate = this.handleTicketDate.bind(this);
        this.handleTicketRole = this.handleTicketRole.bind(this);
    }

    handleTicketName(ticket) {
      let {summit} = this.props;
      let ticketName = summit.ticket_types.find(t => t.id === ticket.ticket_type_id);
      return ticketName.name ? ticketName.name : null;
    }

    handleTicketDate(ticket) {
      let {summits} = this.props;
      let summit = summits.find(s => s.id === ticket.owner.summit_id);
      let dateRange = daysBetweenDates(summit.start_date, summit.end_date, summit.time_zone_id);
      
      if(dateRange.length > 1) {
        let startDate = getFormatedDate(dateRange[0], summit.time_zone_id);
        let endDate = getFormatedDate(dateRange[dateRange.length-1], summit.time_zone_id);
        let startYear = startDate.substring(startDate.length, startDate.length-4);
        let endYear = endDate.substring(endDate.length, endDate.length-4);
        if (startYear === endYear) startDate = startDate.substring(0, startDate.length-4);
        let summitDate = `${startDate} - ${endDate}`;
        return summitDate;
      } else {
        let summitDate = getFormatedDate(summit.start_date, summit.time_zone_id);
        return summitDate;
      }          
    }

    handleTicketRole(badge) {
      let roles = [];
      
      if(badge && badge.features) {
        badge.features.map(f => {
        roles.push(f.name);
      });}
      if(roles.length) {
        return roles.join(', ');
      } else {
        return "Attendee";
      }
    }

    handleSummitLocation(summit) {
      let location = summit.locations.filter(l => l.class_name === "SummitVenue").find(l => l.is_main === true);      
      if(location) {
        return `${location.city}, ${location.country}`;
      } else {
        return null;
      }
    }


    render() {

      let {guest, summit, ticket, now} = this.props;

        return (
            <div className="order-info-wrapper">
                {guest && 
                <React.Fragment>
                  <div className="row">
                    <div className="col-md-12 info">
                      <h4>{summit.name}</h4>
                      <p>{this.handleTicketDate(ticket)} <br />{this.handleSummitLocation(summit)} </p>
                      <p>{this.handleTicketName(ticket)}</p>
                      <p className="role-badge">{this.handleTicketRole(ticket.badge)}</p>
                    </div>
                  </div>
                </React.Fragment>
                }
                {!guest && summit.start_date > now &&
                <div className="row">
                    <div className="col-md-12">                        
                        <a onClick={this.props.cancelOrder} className="cancel">{T.translate("order_info.cancel_order")}</a>
                    </div>
                </div>
                }
                {/* {guest && 
                <div className="row">
                    <div className="col-md-12">
                        <a onClick={this.props.downloadTicket}>{T.translate("order_info.download")}<br/></a>                        
                    </div>
                </div>
                } */}
            </div>
        );
    }
}

export default TicketOptions;
