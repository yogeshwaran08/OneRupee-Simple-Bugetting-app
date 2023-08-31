# One Rupee - A Simple Home budgeting app

This app is desinged to Manage the personal budgeting.

## Tools used:

- Frontend : React native
- Backend : Firebase

## About this app

On Opening you will be greeted with a splash screen and redirected to the Home Screen. There you can see the a bottom navigation bar with four different options.

![Navigation bar Image](image.png)

### Home Screen Contents

Home screen have a Circular bar with two numbers where the bigger one is amount remaining and the smaller one is total income. Down to it there will be two indicators shows transactions happend today. Under the events there are card that will show the recent expenses, if you want more detail you can click the card.

## Add Accounts

This Page is inteded to add you accounts in the app. First blank is to choose weather the accounts is income/expense.
Amount spent/gained. Category Mode of expense/income This will loaded dynamically after selecting the type (i.e. Income/expense). Location dropdowner will have have the location to mentioned in different accuracy ranges. At last Description is to Describe the transaction. After filling all fields click add accounts to complete the transaction.

## Analysis

Pie chart is graphed for the expense category ratio and all data are mapped down side under sources.

## Pay by UPI

For Paying by UPI first scan the QR code and fill the required details and pay it by any UPI enabled app like Gpay, PhonePe, WhatsApp Pay, Amazon Pay etc.

## Feature Enhancement

- To Add Auth flow mechanism
- Improve UI for UX
- Add Income Sources for analysis

## Steps to Run the app

First of all clone the app from repository by

```
$ git clone https://github.com/yogeshwaran08/OneRupee---Simple-Personel-Bugetting-App.git
$ cd OneRupee---Simple-Personel-Bugetting-App
$ npm install
$ npm run android
```

If you face any error on package set up please refer the documentation of the package accordingly. Thankyou..
