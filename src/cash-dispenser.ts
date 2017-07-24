export class Card {
    constructor(private account: Account) {}

    getAccount(): Account {
        return this.account;
    }
}

export class Account {
    constructor(private balance: number = 0) {}

    hasCredit(amount: number): boolean {
        return this.balance - amount >= 0;
    }

    recordCashDispensed(amount: number) {
        this.balance = this.balance - amount;
    }
}

type ReturnedCashResult = {
    ok: boolean;
    cardReturned: boolean;
    dispendedCash: number;
    errorMessage: string | null;
};

export class CashDispenser {
    constructor(private cashAmount: number) {}

    requestCash(card: Card, amount: number): ReturnedCashResult {
        if (!this.hasEnoughCash(amount)) {
            return {
                ok: false,
                cardReturned: true,
                dispendedCash: 0,
                errorMessage: 'Insufficient funds on this cash dispenser',
            };
        }

        if (card.getAccount().hasCredit(amount)) {
            card.getAccount().recordCashDispensed(amount);
            this.cashAmount = this.cashAmount - amount;
            return {
                ok: true,
                cardReturned: true,
                dispendedCash: amount,
                errorMessage: null,
            };
        } else {
            return {
                ok: false,
                cardReturned: true,
                dispendedCash: 0,
                errorMessage: 'Insufficient funds on your account',
            };
        }
    }

    private hasEnoughCash(amount: number): boolean {
        return this.cashAmount - amount >= 0;
    }
}
