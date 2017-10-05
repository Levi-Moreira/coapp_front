import axios from 'axios'

const MASTER_TOKEN = 'Token 3795120644e36ad156daac35a989db2dad78e154';

const BASET_URL = 'http://www.cohabitat.com.br/api/v1/';

export function signIn(username, password, sucessCompletionHandler, errorCompletionHangler){

    var data = {user : {
      username: username,
      password: password
    }};

    var authOptions = {
       method: 'POST',
       url: BASET_URL+'users/sign_in',
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
