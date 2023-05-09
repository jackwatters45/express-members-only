/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "passport-stub" {
	import { RequestHandler } from "express";
	import { Strategy as PassportStrategy } from "passport";

	function install(app: any): void;
	function uninstall(): void;
	function createMiddleware(): RequestHandler;

	function login(user: any): void;
	function logout(): void;
	function isAuthenticated(): boolean;

	class Strategy extends PassportStrategy {
		authenticate(): void;
	}

	export {
		install,
		uninstall,
		createMiddleware,
		login,
		logout,
		isAuthenticated,
		Strategy,
	};
}
