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
import history from '../history'
import URI from 'urijs';


export default class 
AuthButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showLogOut: false,
        };
        
        this.NONCE_LEN = 16;

        this.toggleLogOut = this.toggleLogOut.bind(this);
        this.handleMemberMenu = this.handleMemberMenu.bind(this);
        this.onTicketClick = this.onTicketClick.bind(this);
        this.onOrderClick = this.onOrderClick.bind(this);
    }

    toggleLogOut(ev) {
        this.setState({showLogOut: !this.state.showLogOut});
    }

    handleMemberMenu() {
      let { location } = this.props;
      let memberLocation = '/a/member/';
      let showMemberOptions = location.match(memberLocation) ? false : true;
      return showMemberOptions;
    }

    onTicketClick() {
      this.setState({showLogOut: !this.state.showLogOut}, () => history.push('/a/member/orders'));      
    }

    onOrderClick() {
      this.setState({showLogOut: !this.state.showLogOut}, () => history.push('/a/member/tickets'));
    }

    render() {
        let {isLoggedUser, doLogin, member, initLogOut } = this.props;
        let profile_pic = member ? member.pic : '';

        if (isLoggedUser) {
            return (
                <div className="user-menu" onMouseEnter={this.toggleLogOut} onMouseLeave={this.toggleLogOut}>
                    <span className="user-greeting">{member && member.first_name ? `Hi ${member.first_name}` : ''}&nbsp;</span>
                    <div className="profile-pic">
                        <img src={profile_pic} />
                    </div>
                    <div className="dropdown-container">
                        {this.handleMemberMenu() &&
                        <React.Fragment>
                            <span className="dropdown-item" onClick={() => { this.onTicketClick(); }}>
                                {T.translate("nav_bar.my-orders")}
                            </span>
                            <span className="dropdown-item" onClick={() => { this.onOrderClick(); }}>
                                {T.translate("nav_bar.my-tickets")}
                            </span>
                        </React.Fragment>
                        }
                        <span className="dropdown-item" onClick={() => { initLogOut(); }}>
                            {T.translate("landing.sign_out")}
                        </span>
                        <span className="dropdown-item" onClick={() => { this.props.clearState(); }}>
                            Clear State
                        </span>                                            
                    </div>                    
                </div>
            );
        } else {
            return (
                <div className="user-menu">
                    <button className="btn btn-primary btn-xs login" onClick={() => { doLogin(); }}>
                        {T.translate("landing.sign_in")}
                    </button>
                </div>
            );
        }

    }
}
