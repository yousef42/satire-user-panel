import { defaultApiV3 } from '../components/api';
import localStorageService from './localStorageService';

class JwtAuthService {
  // Dummy user object just for the demo

  // You need to send http request with email and passsword to your server in this method
  // Your server will return user object & a Token
  // User should have role property
  // You can define roles in app/auth/authRoles.jsx-
  loginWithEmailAndPassword = (email, password) => defaultApiV3().get('/Token/Get', {
      params: {
        username: email,
        password,
      },
      headers: {
        accept: '*/*',
        'Accept-Language': 'en-US',
      },
    })
    // .then(data => {
    //
    //   if (!data.data.IsSuccess) {
    //
    //   } else {
    //
    //   }
    //   (data.data.access_token)
    //   this.setSession(data.data.access_token);
    //   // Set user
    //   this.setUser(data);
    //   return data;
    // })
  ;

  // You need to send http requst with existing token to your server to check token is valid
  // This method is being used when user logged in & app is reloaded
  // loginWithToken = () => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(this.user);
  //     }, 100);
  //   }).then(data => {
  //     // Token is valid
  //     this.setSession(data.token);
  //     this.setUser(data);
  //     return data;
  //   });
  // };

  logout = () => {
    this.setSession(null);
    this.removeUser();
  };

  // Set token to all http request header, so you don't need to attach everytime
  setSession = (token) => {
    if (token) {
      localStorage.setItem('jwt_token', token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      localStorage.removeItem('jwt_token');
      delete api.defaults.headers.common.Authorization;
    }
  };

  // Save user to localstorage
  setUser = (user) => {
    localStorageService.setItem('auth_user', user);
  };

  // Remove user from localstorage
  removeUser = () => {
    localStorage.removeItem('auth_user');
  };
}

export default new JwtAuthService();
