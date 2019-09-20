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

import React from 'react';
import { connect } from 'react-redux';
import OrderSummary from "../../components/order-summary";
import TicketPopup from "../../components/ticket-popup";
import TicketOptions from "../../components/ticket-options";

import { selectTicket } from '../../actions/ticket-actions';

import '../../styles/order-detail-page.less';

class OrderDetailPage extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        showPopup: false
      };

      this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup(ticket) {
    this.props.selectTicket(ticket);
    this.setState({
      showPopup: !this.state.showPopup  
    });  
  }

  render() {
      let {order, summit, ticket} = this.props;
      let {showPopup} = this.state;

      console.log(order);
      console.log(summit);

      return (
          <div className="order-detail">
              <div className="row" style={showPopup? {overflow: 'hidden'} : {overflow: 'auto'}}>
                  <div className="col-md-8">
                    <div className="order-detail__title">
                      <h4><b>{summit.name}</b></h4>
                      California, US / September 18, 2019
                    </div>
                    <div className="ticket-list">
                      {summit.ticket_types.map(s => {
                        return (
                          <React.Fragment key={s.id}>
                            <div className="ticket-type">
                              {s.name} Tickets x3
                            </div>
                            {order.tickets.map(t => {
                              return (
                                s.id === t.ticket_type_id ?                                
                                <div className="row" key={t.id} onClick={() => this.togglePopup(t)}>
                                  <div className="ticket complete p-2 col-sm-12 col-sm-offset-1">
                                      <div className="col-sm-6">
                                          <h4>Speaker</h4>
                                          100% Discount
                                          <p className="status">Ready to Use</p>
                                      </div>
                                      <div className="col-sm-5">
                                          ned.stark@winterfell.com
                                      </div>
                                      <div className="col-sm-1">
                                          <h4>&#10095;</h4>
                                      </div>
                                  </div>
                                </div> 
                                : null  
                              )
                            })}
                          <div className="separator"></div>
                          </React.Fragment>                   
                        )
                      })}                                                
                    </div>                      
                  </div>
                  <div className="col-md-4">
                      <OrderSummary order={order} summit={summit}/>
                      <TicketOptions />
                  </div>
              </div>
              {showPopup ?  
                <TicketPopup  
                  ticket={ticket}
                  closePopup={this.togglePopup.bind(this)}  
                />  
              : null  
              }
          </div>
      );
    }
}

const mapStateToProps = ({ loggedUserState, orderState, summitState, ticketState }) => ({
    member: loggedUserState.member,
    order: orderState.selectedOrder,
    summit: summitState.selectedSummit,
    ticket: ticketState.selectedTicket
})

export default connect(
    mapStateToProps,
    {
      selectTicket
    }
)(OrderDetailPage);