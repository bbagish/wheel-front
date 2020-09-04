import http from "./httpService";

const apiEndpoint = "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    userName: user.userName,
    password: user.password
  });
}