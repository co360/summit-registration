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


export default class SubmitButtons extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };

    }

    render() {
        let {step} = this.props;

        if (step > 3) return null;

        return (
            <div className="row submit-buttons-wrapper">
                <div className="col-md-12">
                    {step > 1 &&
                    <a href="" className="back-btn">
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        {T.translate("general.back")}
                    </a>
                    }

                    {step < 3 &&
                    <button className="btn btn-primary continue-btn">
                        {T.translate("general.continue")}
                    </button>
                    }

                    {step == 3 &&
                    <button className="btn btn-primary continue-btn">
                        {T.translate("general.pay_now")}
                    </button>
                    }

                </div>
            </div>
        );

    }
}
