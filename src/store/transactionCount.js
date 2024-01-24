import { defineStore } from 'pinia';

export const useTransactionCountStore = defineStore('transactionCount', {
    state: () => ({
        count: 0,
    }),
    actions: {
        increment() {
            this.count++;
        },
        decrement() {
            this.count--;
        },
    },
});
