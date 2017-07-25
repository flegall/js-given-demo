import { CashDispenser, Card, Account } from '../cash-dispenser';

describe('cash dispenser', () => {
    it('should dispense cash when in credit +', () => {
        const account = new Account(100);
        const card = new Card(account);
        const cashDispenser = new CashDispenser(5000);

        const result = cashDispenser.requestCash(card, 20);

        expect(result.ok).toBe(true);
        expect(result.cardReturned).toBe(true);
        expect(result.dispendedCash).toEqual(20);
        expect(result.errorMessage).toBe(null);
    });
});
