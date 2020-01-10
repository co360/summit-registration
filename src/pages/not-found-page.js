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

//import '../styles/not-found-page.less';


export default class NotFoundPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {

        };
    }

    componentWillMount() {

    }

    render(){

        return (
            <div className="not-found-container">
                <div className="error-message">
                    <h1>404</h1>
                    <h3>This URL does not match any page.</h3>
                </div>
            </div>
        );
    }
}


