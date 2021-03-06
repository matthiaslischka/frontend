export default class PersonBalanceFactory {

  constructor(transactions) {
    this.transactions = transactions;
  }

  /**
   * @param {string} ownName
   * @return {{me: {name: string, amount: number}, persons: Array}}
   */
  computeBalanceForPerson(ownName) {

    let summaries = this.transactions
      .filter(tx => {
        return tx.debtee === ownName || tx.debtor === ownName;
      }).map(tx => {
        if (tx.debtor === ownName) {
          return {
            debtee: tx.debtee,
            amount: tx.amount * (-1),
            debtor: tx.debtor
          };
        } else {
          return tx;
        }
      }).map(tx => {
        if (tx.debtee === ownName) {
          return {name: tx.debtor, amount: tx.amount};
        } else {
          return {name: tx.debtee, amount: tx.amount};
        }
      });

    let total = summaries.reduce((sum, tx) => sum + tx.amount, 0);

    return {
      me: {name: ownName, amount: total},
      persons: summaries
    };
  }
}
