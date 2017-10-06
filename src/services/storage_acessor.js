


export const PRIVATE_TOKEN = "PRIVATE_TOKEN";
export const COWORKING = "COWORKING";
export const USER = "USER";


export function placeInLocalStorage(key, value){
  localStorage.setItem(key,JSON.stringify(value));
}

export function placeInLocalSession(key, value){
  sessionStorage.setItem(key,JSON.stringify(value));
}

export function retrieveFromSession(key){
  if(sessionStorage.getItem(key)!=null){
    return JSON.parse(sessionStorage.getItem(key));
  }else{
    return null;
  }
}

export function retrieveFromStorage(key){

  if(localStorage.getItem(key)!=null){
    return JSON.parse(localStorage.getItem(key));
  }else{
    return null;
  }
}

export function removeFromSession(key){
  sessionStorage.removeItem(key);
}
