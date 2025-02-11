declare global {
	namespace NodeJS {
		interface ProcessEnv {
			GATEWAY_TOKEN: string;
		}
	}
}
