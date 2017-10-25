import axios from 'axios'

const MASTER_TOKEN = 'Token 3795120644e36ad156daac35a989db2dad78e154';

export const BASE_URL = 'http://www.cohabitat.com.br'
const API_BASE_URL = 'http://www.cohabitat.com.br/api/v1/';

//Login function from LoginPage

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
//Contact functions from ConfigPage

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

//Resources functions from ResourcesPage

export function retrieveResourcesInfos(coworking_id, authentication_token, sucessCompletionHandler, errorCompletionHangler){
                  var authOptions = {
                     method: 'GET',
                     url: API_BASE_URL+'coworkings/'+coworking_id+'/resources',
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

export function createNewResourcesInfo(coworking_id, name, description, price,authentication_token, sucessCompletionHandler, errorCompletionHangler){
                  console.log(authentication_token);
                    var data = {resource : {
                      name: name,
                      description: description,
                      price: price,
                    }};
            
                    var authOptions = {
                       method: 'POST',
                       url: API_BASE_URL+'coworkings/'+coworking_id+'/resources',
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
            

export function editResourcesInfo(coworking_id, resource_id, name, description, price, authentication_token, sucessCompletionHandler, errorCompletionHangler){
                    
                var data = {resource : {
                    id : resource_id,
                    name: name,
                    description: description,
                    price: price,
                    }};
                    
                var authOptions = {
                    method: 'PATCH',
                    url: API_BASE_URL+'coworkings/'+coworking_id+'/resources/'+resource_id,
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
                    

export function deleteResourcesInfos(coworking_id, resource_id,  authentication_token, sucessCompletionHandler, errorCompletionHangler){
              var authOptions = {
                  method: 'DELETE',
                  url: API_BASE_URL+'coworkings/'+coworking_id+'/resources/'+ resource_id,
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

//Rooms functions from RoomsPage

export function retrieveRoomsInfos(coworking_id, authentication_token, sucessCompletionHandler, errorCompletionHangler){
              var authOptions = {
                 method: 'GET',
                 url: API_BASE_URL+'coworkings/'+coworking_id+'/rooms',
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

export function createNewRoomsInfo(coworking_id, name, description, price_hour, price_month, type, authentication_token, sucessCompletionHandler, errorCompletionHangler){
              console.log(authentication_token);
                var data = {room : {
                  name: name,
                  description: description,
                  price_hour: price_hour,
                  price_month: price_month,
                  type: type,
                }};
        
                var authOptions = {
                   method: 'POST',
                   url: API_BASE_URL+'coworkings/'+coworking_id+'/rooms',
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

export function editRoomsInfo(coworking_id, room_id, name, description, price_hour, price_month, type, authentication_token, sucessCompletionHandler, errorCompletionHangler){
            
            var data = {room : {
                id : room_id,
                name: name,
                description: description,
                price_hour: price_hour,
                price_month: price_month,
                type: type
            }};
              
            var authOptions = {
                method: 'PATCH',
                url: API_BASE_URL+'coworkings/'+coworking_id+'/rooms/'+room_id,
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

export function deleteRoomsInfos(coworking_id, room_id, authentication_token, sucessCompletionHandler, errorCompletionHangler){
              var authOptions = {
                 method: 'DELETE',
                 url: API_BASE_URL+'coworkings/'+coworking_id+'/rooms/'+room_id,
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

export function retrieveRoomsTypes(coworking_id, authentication_token, sucessCompletionHandler, errorCompletionHangler) {
            var authOptions = {
              method: 'GET',
              url: API_BASE_URL+'coworkings/'+coworking_id+'/rooms_type',
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

//Itens functions from ItemsPage

export function retrieveItemsInfos(coworking_id, authentication_token, sucessCompletionHandler, errorCompletionHangler){
  var authOptions = {
     method: 'GET',
     url: API_BASE_URL+'coworkings/'+coworking_id+'/items',
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
    });}

export function createNewItemsInfo(coworking_id, name, price, unity, description, type, authentication_token, sucessCompletionHandler, errorCompletionHangler){
  console.log(authentication_token);
    var data = {item : {
      name: name,
      price: price,
      unity: unity,
      description: description,
      type: type,
    }};

    var authOptions = {
       method: 'POST',
       url: API_BASE_URL+'coworkings/'+coworking_id+'/items',
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

export function editItemsInfo(coworking_id, item_id, name, price, unity, description, type, authentication_token, sucessCompletionHandler, errorCompletionHangler){

          var data = {item : {
            id : item_id,
            name: name,
            price: price,
            unity: unity,
            description: description,
            type: type,
          }};

          var authOptions = {
             method: 'PATCH',
             url: API_BASE_URL+'coworkings/'+coworking_id+'/items/'+item_id,
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

export function deleteItemsInfos(coworking_id, item_id, authentication_token, sucessCompletionHandler, errorCompletionHangler){
              var authOptions = {
                 method: 'DELETE',
                 url: API_BASE_URL+'coworkings/'+coworking_id+'/items/'+item_id,
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
export function retrieveItemsTypes(coworking_id, authentication_token, sucessCompletionHandler, errorCompletionHangler){
  var authOptions = {
     method: 'GET',
     url: API_BASE_URL+'coworkings/'+coworking_id+'/items_types',
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
    });}

//Itens functions from PlansPage

export function retrievePlansInfos(coworking_id, authentication_token, sucessCompletionHandler, errorCompletionHangler){
  var authOptions = {
     method: 'GET',
     url: API_BASE_URL+'coworkings/'+coworking_id+'/plans',
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
    });}
export function createNewPlansInfo(coworking_id, name, description, price, [resource_id], [room_id], [quantity_hours], [item_id], [quantity], authentication_token, sucessCompletionHandler, errorCompletionHangler){
  console.log(authentication_token);
    var data = { plan : {
      name: name,
      description: description,
      price: price,
      resources: [{
        resource: resource_id,
        quantity_hours: quantity_hours,
      }],
      rooms: [{
        room: room_id,
        quantity_hours: quantity_hours,
      }],
      items: [{
        item: item_id,
        quantity: quantity,
        },
    ]
    }};

    var authOptions = {
       method: 'POST',
       url: API_BASE_URL+'coworkings/'+coworking_id+'/plans',
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

export function editPlansInfo(coworking_id, plan_id, name, description, price, [resource_id] ,[room_id], [quantity_hours], [item_id], [quantity], authentication_token, sucessCompletionHandler, errorCompletionHangler){

              var data = {plan : {
                id : plan_id,
                name: name,
                description: description,
                price: price,
                resources: [{
                  resource: resource_id,
                  quantity_hours: quantity_hours,
                }],
                rooms: [{
                  room: room_id,
                  quantity_hours: quantity_hours,
                }],
                items: [{
                  item: item_id,
                  quantity: quantity,
                  },
              ]
              }};

              var authOptions = {
                 method: 'PATCH',
                 url: API_BASE_URL+'coworkings/'+coworking_id+'/plans/'+plan_id,
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

export function deletePlansInfos(coworking_id, plan_id, authentication_token, sucessCompletionHandler, errorCompletionHangler){
              var authOptions = {
                 method: 'DELETE',
                 url: API_BASE_URL+'coworkings/'+coworking_id+'/plans/'+ plan_id,
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