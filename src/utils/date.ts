import * as moment from 'moment';

export const fixDate = (date: Date) => {
  return moment(date, 'DD/MM/YYYY').toISOString();
};
