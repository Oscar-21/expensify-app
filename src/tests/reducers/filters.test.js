import moment from 'moment';
    
import filtersReducer from '../../reducers/filters';

test('should set up default filter values', () => {
  const state = filtersReducer(undefined,{ type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'), 
  });
});

test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'amount',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'), 
  });
});

test('should set sortBy to date', () => {
  const initialState = {
    text: '',
    sortBy: 'amount',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'), 
  };
  const state = filtersReducer(initialState, { type: 'SORT_BY_DATE' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'), 
  });
});


test('should set text filter', () => {
  const text = 'foo';
  const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text });
  expect(state).toEqual({
    text,
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'), 
  });
});

test('should set start date', () => {
  const startDate = moment(0);

  const state = filtersReducer(
    undefined, 
    { 
      type: 'SET_START_DATE', 
      startDate 
    }
  );

  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate,
    endDate: moment().endOf('month'), 
  });
});

test('should set end date', () => {
  const endDate = moment(0);

  const state = filtersReducer(
    undefined, 
    { 
      type: 'SET_END_DATE', 
      endDate 
    }
  );

  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'), 
    endDate,
  });
});