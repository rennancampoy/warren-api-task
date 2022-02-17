import * as moment from 'moment';

export const fixDate = (date: Date, toDate = false) => {
  const fixedDate = moment(date, 'DD/MM/YYYY');
  return toDate ? fixedDate.toDate() : fixedDate.toISOString();
};
