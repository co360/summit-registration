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

import { authErrorHandler } from "openstack-uicore-foundation/lib/methods";
import T from "i18n-react/dist/i18n-react";
import history from '../history'
import {
    getRequest,
    createAction,
    stopLoading,
    startLoading,
    showMessage,
    showSuccessMessage,
} from 'openstack-uicore-foundation/lib/methods';


export const GET_SUMMIT_BY_SLUG        = 'GET_SUMMIT_BY_SLUG';
export const GET_SUMMIT_BY_ID          = 'GET_SUMMIT_BY_ID';
export const GET_USER_SUMMITS          = 'GET_USER_SUMMITS';
export const SELECT_SUMMIT             = 'SELECT_SUMMIT';
export const GET_SUMMIT_REFUND_POLICY  = 'GET_SUMMIT_REFUND_POLICY';

export const getSummitBySlug = (slug) => (dispatch, getState) => {

    let { summitState: {summits} } = getState();

    let params = {
      expand: 'order_extra_questions.values'
    }
    
    let selectedSummit = summits.find(s => s.slug === slug);  

    dispatch(startLoading());

    if(selectedSummit) {        
        dispatch(stopLoading());
        dispatch(createAction(GET_SUMMIT_BY_SLUG)(selectedSummit));
    } else {
        return getRequest(
          dispatch(startLoading()),
          createAction(GET_SUMMIT_BY_SLUG),
          `${window.API_BASE_URL}/api/public/v1/summits/all/${slug}`,
          authErrorHandler
      )(params)(dispatch).then(() => {
            dispatch(stopLoading());
          }
      );   
    }            
     
}

export const getUserSummits = (from) => (dispatch, getState) => {  

  let { orderState: {memberOrders}, ticketState: {memberTickets}, summitState: {summits} } = getState();

  let summitsId;

  if(from === 'tickets') {    
    summitsId = [... new Set(memberTickets.map(p => p.owner.summit_id))];
  } else {
    summitsId = [... new Set(memberOrders.map(p => p.summit_id))];
  }
    
  const storedSummits = [... new Set(summits.map(p => p.id))];

  summitsId = summitsId.filter(s => storedSummits.indexOf(s) == -1);
  const summitCall = summitsId.map(s => dispatch(getSummitById(s)));
  
  Promise.all([...summitCall]).then(() => {
    dispatch(stopLoading());
    }
  );

}

export const getSummitById = (id, select = false) => (dispatch, getState) => {
    
  dispatch(startLoading());
  
  let params = {
    expand: 'order_extra_questions.values'
  }
  
  return getRequest(
      dispatch(startLoading()),
      createAction(GET_SUMMIT_BY_ID),
      `${window.API_BASE_URL}/api/public/v1/summits/all/${id}`,
      authErrorHandler
  )(params)(dispatch).then(() => {
        select ? dispatch(selectSummitById(id)) : dispatch(stopLoading());
      }
  );    
}

export const getSummitRefundPolicy = (id, select = false) => (dispatch, getState) => {

  let { loggedUserState } = getState();
  let { accessToken }     = loggedUserState;

  let params = {
    access_token : accessToken
  };
  
  dispatch(startLoading());
  
  return getRequest(
    dispatch(startLoading()),
    createAction(GET_SUMMIT_REFUND_POLICY),
    `${window.API_BASE_URL}/api/v1/summits/${id}/refund-policies`,
    authErrorHandler
  )(params)(dispatch).then((payload) => {
    console.log(payload);
    dispatch(stopLoading());
  });  
}

export const selectSummit = (summit) => (dispatch, getState) => {  
    
  dispatch(startLoading());

  dispatch(createAction(SELECT_SUMMIT)(summit));
  
  dispatch(stopLoading());

}

export const selectSummitById = (id) => (dispatch, getState) => {

  let { summitState: {summits} } = getState();
  
  let selectedSummit = summits.filter(s => s.id === id)[0];
  
  dispatch(startLoading());

  if(selectedSummit) {  
    dispatch(selectSummit(selectedSummit));
  } else {
    dispatch(getSummitById(id, true));
  }
  

}

