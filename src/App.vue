<template>
  <router-view></router-view>
  <div v-if="$route.path === '/'" class="container">
    <Header />
    <Balance :total="total" /><br>
    <h4>
      Total Transactions: <h1>{{ transactionCountStore.count }}</h1>
    </h4>
    <IncomeExpenses :income="income" :expenses="expenses" />
    <TransactionList
        :transactions="transactions"
        @transactionDeleted="handleTransactionDeleted"
    />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import IncomeExpenses from './components/IncomeExpenses.vue';
import TransactionList from './components/TransactionList.vue';
import AddTransaction from './components/AddTransaction.vue';
import { useTransactionCountStore } from './store/transactionCount';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, deleteDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA3IttEIo6xfRsCGDiMsEpOnAJs94alo00",
  authDomain: "drumre-15d77.firebaseapp.com",
  projectId: "drumre-15d77",
  storageBucket: "drumre-15d77.appspot.com",
  messagingSenderId: "91050764028",
  appId: "1:91050764028:web:d86960424bb76444b09979",
  databaseURL: "https://drumre-15d77-default-rtdb.europe-west1.firebasedatabase.app/"
};
const APIKEY = '7ed9cecf1c8468086891b0434dfa7e1e';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const toast = useToast();
const transactions = ref([]);
const transactionCountStore = useTransactionCountStore();


onMounted(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'transactions'));
    transactions.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
});

// Get total
const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);
});

// Get income
const income = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    .toFixed(2);
});

// Get expenses
const expenses = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    .toFixed(2);
});

// Submit transaction
const handleTransactionSubmitted = async (transactionData) => {
  try {
    const docRef = await addDoc(collection(db, 'transactions'), {
      text: transactionData.text,
      amount: transactionData.amount
    });
    transactions.value.push({ id: docRef.id, ...transactionData });
    transactionCountStore.increment();
    toast.success('Transaction added.');
  } catch (error) {
    console.error('Error adding transaction:', error);
  }
};

// Delete transaction
const handleTransactionDeleted = async (id) => {
  try {
    await deleteDoc(doc(db, 'transactions', id));
    transactions.value = transactions.value.filter(transaction => transaction.id !== id);
    transactionCountStore.decrement();
    toast.success('Transaction deleted.');
  } catch (error) {
    console.error('Error deleting transaction:', error);
  }
};

</script>
