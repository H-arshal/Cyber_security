import api from './axios';

export type LoginRequest = { username: string; password: string };
export type LoginResponse = { username: string; token: string };

export type RegisterRequest = { username: string; password: string };

export type CredentialRequest = { sitename: string; username: string; password: string };
export type CredentialResponse = { username: string; decryptedPassword: string; sitename: string };

export const AuthApi = {
  login: (data: LoginRequest) => api.post<LoginResponse>('/login', data).then((r) => r.data),
  register: (data: RegisterRequest) => api.post('/register', data).then((r) => r.data),
};

export const CredentialApi = {
  add: (data: CredentialRequest) => api.post('/addcredentials', data).then((r) => r.data),
  getBySitename: (sitename: string) => api.get<CredentialResponse>('/getbysitename', { params: { sitename } }).then((r) => r.data),
  update: (sitename: string, body: { newPassword?: string; newUsername?: string }) =>
    api.put(`/updatecredentials/${encodeURIComponent(sitename)}`, body).then((r) => r.data),
  remove: (sitename: string, siteUsername: string) =>
    api
      .delete('/deleteCredentials', { params: { sitename, siteUsername } })
      .then((r) => r.data),
  search: (keyword: string) => api.get<CredentialResponse[]>(`/getcredentials/${encodeURIComponent(keyword)}`).then((r) => r.data),
};
