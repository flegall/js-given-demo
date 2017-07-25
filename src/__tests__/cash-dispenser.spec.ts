import { CashDispenser, Card, Account } from '../cash-dispenser';

/*
    Scenario 1: Account is in credit+
    Given the account is in credit
        And the card is valid
        And the dispenser contains cash
    When the customer requests cash
    Then ensure the account is debited
        And ensure cash is dispensed    
        And ensure the card is returned
*/

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
