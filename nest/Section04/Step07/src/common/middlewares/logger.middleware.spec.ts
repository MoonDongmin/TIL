import {LoggerMiddleware} from './logger.middleware';

describe('LoggerMiddlewareTsMiddleware', () => {
    it('should be defined', () => {
        expect(new LoggerMiddleware()).toBeDefined();
    });
});
