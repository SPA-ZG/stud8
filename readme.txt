Raspakirati zip i otvoriti u željenom IDE-u ili kroz terminal pozicioniranjem u root directory raspakiranog direktorija upisati naredbe redom:
npm install te potom npm run dev

Pošto ne postoji upravljanje korisnicima, vjerojatno će baza biti napunjena vrijednostima drugih studenata tako da slobodno pobrišite sve "račune" i osviježite stranicu da Vam counter radi ispravno.

Sve tražene funkcionalnosti aplikacije su ostvarene:

1. interpolation/one-way binding
    -> Primjer  src/components/Balance.vue:3   <h1 id="balance">€{{ total }}</h1>
    -> Objašnjenje U ovom primjeru, {{ total }} zamijenjen je vrijednošću varijable total iz JavaScript bloka.

2. two-way binding
    -> Primjer src/componenets/AddTransaction.vue:18         v-model="amount"
    -> Objašnjenje Dvosmjerno vezivanje u Vue.js-u se najčešće postiže korištenjem direktive v-model.

3. methods
    -> Primjer src/componenets/AddTransaction.vue:37 const onSubmit = () => {
    -> Objašnjenje Metode su funkcije definirane unutar <script setup> bloka poput onSubmit funkcije.

4. computed properties
    -> Primjer src/App.vue:5     <Balance :total="total" /><br>
    -> Objašnjenje total, income i expenses su computeted properties. Definirani su korištenjem funkcije computed iz Vueove Composition API-ja, i njihove vrijednosti se izvode na temelju reaktivnog niza transakcija. Svako izračunato svojstvo se ponovno procjenjuje kada se promijeni bilo koja stavka niza transakcija.

5. barem jedan scoped style
    -> Primjer scr/components/TransactionList:34 <style scoped>
    -> Objašnjenje U ovom primjeru, oznaka <style> ima atribut scoped. To znači da će se CSS pravila unutar nje primjenjivati samo na predložak ove komponente, a ne na slične elemente izvan komponente.

6. koristiti barem jedan lifecycle hook
    -> Primjer src/App.vue:49 onMounted(async () => {
    -> Objašnjenje U ovom primjeru, onMounted je lifecycle hook koja se poziva nakon što je komponenta montirana, što znači da je njezin predložak prikazan u DOM-u.

7. routing (više stranica)
7.a rade linkovi (ne samo na root, već i moj-web.com/stranica1, moj-web.com/stranica2)
    -> Primjer u URL upisati "/route1" i "/route2" i ne zamjeriti na šaljivosti
7.b dinamičko usmjeravanje s 404 stranicom ("catch all")
    -> U URL upisati "/bilokakav-string" koji potom vodi na custom 404 stranicu

8. (barem) dvije komponente -> Primjer 8 komponenata unutar src/components
8.a komponenta bez stanja, koristiti properties
    -> Primjer scr/components/IncomeExpenses.vue
    -> Objašnjenje Komponenta nema nikakvo unutarnje stanje (tj. ne koristi ref ili reactive za lokalno upravljanje podacima). Ona se u potpunosti oslanja na podatke koji su joj proslijeđeni (preko props) kako bi odredila što će prikazati.
8.b komponenta sa stanjem
    -> Primjer src/components/AddTransaction.vue
    -> Objašnjenje Komponenta upravlja svojim unutarnjim stanjem koristeći Vueov sustav reaktivnosti (u ovom slučaju ref). Ovdje, text i amount su reaktivne varijable stanja koje su lokalne za komponentu i prate korisnički unos.

9. barem jedna komponenta mora emitirati barem jedan event
    -> Primjer src/components/AddTransaction.vue   emit('transactionSubmitted', transactionData);
    -> Objašnjenje Funkcija emit se koristi za emitiranje prilagođenog događaja iz dane komponente. U kodu, emit('transactionSubmitted', transactionData); emitira događaj nazvan transactionSubmitted. Ovaj događaj prenosi transactionData kao svoj teret.

10. store (Pinia)
    -> Primjer src/store/transactionCount.js
    -> Objašnjenje Ovdje se koristi Pinia, za definiranje i upravljanje stanjem povezanim s brojem transakcija.

11. asinkroni dohvat podataka s backenda, korišten Firebase
    -> Primjer src/App.vue:42 const app = initializeApp(firebaseConfig);