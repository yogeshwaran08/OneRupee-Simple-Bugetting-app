import {setData} from '../../utils/fbFunc';

// const user = useAuth();
export const setUpNewUser = async (uid: string, email: string | null) => {
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  await setData(`${uid}/`, {
    LastTransactionDate: `${date}/${month}/${year}`,
    noExpensesToday: 0,
    noIncomeToday: 0,
    totalExpense: 0,
    totalIncome: 0,
    email: email,
  });
};
