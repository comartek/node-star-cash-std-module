import { StarCashClient } from "./star-cash-client";

describe('Star cash client', () => {
    it('should be define', () => {
        const client = new StarCashClient('');
        expect(client).toBeDefined();
    });
});