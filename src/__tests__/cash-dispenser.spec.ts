import { scenarios, scenario, setupForRspec, Stage } from 'js-given';

import {
    CashDispenser,
    Card,
    Account,
    ReturnedCashResult,
} from '../cash-dispenser';

setupForRspec(describe, it);

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

class CashDispenserStage extends Stage {
    private account: Account;
    private card: Card;
    private dispenser: CashDispenser;
    private cashRequestResult: ReturnedCashResult;

    the_account_is_in_credit_with_a_balance_of_$_euros(amount: number): this {
        this.account = new Account(amount);
        return this;
    }

    the_card_is_valid(): this {
        this.card = new Card(this.account);
        return this;
    }

    the_dispenser_contains_$_euros_of_cash(amount: number): this {
        this.dispenser = new CashDispenser(amount);
        return this;
    }

    the_customer_requests_$_euros_of_cash(amount: number): this {
        this.cashRequestResult = this.dispenser.requestCash(this.card, amount);
        return this;
    }

    ensure_the_account_balance_is_$_euros(amount: number): this {
        expect(this.account.getBalance()).toBe(amount);
        return this;
    }

    ensure_$_euros_of_cash_are_dispensed(amount: number): this {
        expect(this.cashRequestResult.dispendedCash).toBe(amount);
        return this;
    }

    ensure_the_card_is_returned(): this {
        expect(this.cashRequestResult.cardReturned).toBe(true);
        return this;
    }
}

scenarios('cash-dispenser', CashDispenserStage, ({ given, when, then }) => ({
    account_is_in_positive_credit: scenario({}, () => {
        given()
            .the_account_is_in_credit_with_a_balance_of_$_euros(1000)
            .and()
            .the_card_is_valid()
            .and()
            .the_dispenser_contains_$_euros_of_cash(5000);

        when().the_customer_requests_$_euros_of_cash(20);

        then()
            .ensure_the_account_balance_is_$_euros(980)
            .and()
            .ensure_$_euros_of_cash_are_dispensed(20)
            .and()
            .ensure_the_card_is_returned();
    }),
}));

describe('cash dispenser', () => {
    it('should dispense cash when in credit +', () => {
        const account = new Account(100);
        const card = new Card(account);
        const cashDispenser = new CashDispenser(5000);

        const result = cashDispenser.requestCash(card, 20);

        expect(result.ok).toBe(true);
        expect(result.cardReturned).toBe(true);
        expect(result.dispendedCash).toBe(20);
        expect(account.getBalance()).toBe(80);
        expect(result.errorMessage).toBe(null);
    });
});
