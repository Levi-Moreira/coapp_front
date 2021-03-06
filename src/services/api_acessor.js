import axios from 'axios'

const MASTER_TOKEN = 'Token 3795120644e36ad156daac35a989db2dad78e154';

export const BASE_URL = 'http://www.cohabitat.com.br'
const API_BASE_URL = 'http://www.cohabitat.com.br/api/v1/';

export function signIn(username, password, sucessCompletionHandler, errorCompletionHangler){

    var data = {user : {
      username: username,
      password: password
    }};

    var authOptions = {
       method: 'POST',
       url: API_BASE_URL+'users/sign_in',
       data: JSON.stringify(data),
       headers: {
           'Authorization': MASTER_TOKEN,
           'Content-Type': 'application/json'
       },
       json: true
     };


     axios(authOptions)
      .then(function(response){
        sucessCompletionHandler(response.data, response.status);
      })
      .catch(function(error){
        errorCompletionHangler(error);
      });
  }

export function retrieveContactInfos(coworking_id, authentication_token, sucessCompletionHandler, errorCompletionHangler){
      var authOptions = {
         method: 'GET',
         url: API_BASE_URL+'coworkings/'+coworking_id+'/contact_infos',
         headers: {
             'Authorization': 'Token '+ authentication_token,
             'Content-Type': 'application/json'
         },
         json: true
       };


       axios(authOptions)
        .then(function(response){
          sucessCompletionHandler(response.data, response.status);
        })
        .catch(function(error){
          errorCompletionHangler(error);
        });
    }

export function createNewContactInfo(coworking_id, name, phone, email,authentication_token, sucessCompletionHandler, errorCompletionHangler){
      console.log(authentication_token);
        var data = {contact_info : {
          name: name,
          phone: phone,
          email: email,
        }};

        var authOptions = {
           method: 'POST',
           url: API_BASE_URL+'coworkings/'+coworking_id+'/contact_infos',
           data: JSON.stringify(data),
           headers: {
               'Authorization': 'Token '+authentication_token,
               'Content-Type': 'application/json'
           },
           json: true
         };


         axios(authOptions)
          .then(function(response){
            sucessCompletionHandler(response.data, response.status);
          })
          .catch(function(error){
            errorCompletionHangler(error);
          });
      }

export function editContactInfo(coworking_id, contact_id, name, phone, email,authentication_token, sucessCompletionHandler, errorCompletionHangler){

              var data = {contact_info : {
                id : contact_id,
                name: name,
                phone: phone,
                email: email,
              }};

              var authOptions = {
                 method: 'PATCH',
                 url: API_BASE_URL+'coworkings/'+coworking_id+'/contact_infos/'+contact_id,
                 data: JSON.stringify(data),
                 headers: {
                     'Authorization': 'Token '+authentication_token,
                     'Content-Type': 'application/json'
                 },
                 json: true
               };


               axios(authOptions)
                .then(function(response){
                  sucessCompletionHandler(response.data, response.status);
                })
                .catch(function(error){
                  errorCompletionHangler(error);
                });
            }

export function deleteContactInfos(coworking_id, contact_id,  authentication_token, sucessCompletionHandler, errorCompletionHangler){
                  var authOptions = {
                     method: 'DELETE',
                     url: API_BASE_URL+'coworkings/'+coworking_id+'/contact_infos/'+contact_id,
                     headers: {
                         'Authorization': 'Token '+ authentication_token,
                         'Content-Type': 'application/json'
                     },
                     json: true
                   };


                   axios(authOptions)
                    .then(function(response){
                      sucessCompletionHandler(response.data, response.status);
                    })
                    .catch(function(error){
                      errorCompletionHangler(error);
                    });
                }
