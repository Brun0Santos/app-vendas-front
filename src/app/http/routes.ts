import axios, { AxiosInstance } from 'axios';

export const httpCliente: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/',
});
