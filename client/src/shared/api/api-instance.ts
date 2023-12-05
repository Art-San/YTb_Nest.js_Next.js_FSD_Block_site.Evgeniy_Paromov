import axios, { AxiosError, AxiosRequestConfig } from 'axios'

export const apiInstance = axios.create({
	baseURL: '/api', // вернули на 3:07:57
	// baseURL: 'http://localhost:3000', // 3:06:00 вызывает проблему с CORS
	withCredentials: true,
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
