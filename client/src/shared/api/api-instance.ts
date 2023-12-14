import axios, { AxiosError, AxiosRequestConfig } from 'axios'

export const apiInstance = axios.create({
	// baseURL: '/api', // выключили на 6:04:31
	baseURL: 'http://localhost:3000', // на 6:04:31
	withCredentials: true, // решаем проблемы CORS
	headers: {
		'Content-Type': 'application/json',
	},
})

export const createInstance = <T>(
	config: AxiosRequestConfig,
	options?: AxiosRequestConfig
): Promise<T> => {
	return apiInstance({
		...config,
		...options,
	}).then((r) => r.data)
}

export type BodyType<Data> = Data

export type ErrorType<Error> = AxiosError<Error>
