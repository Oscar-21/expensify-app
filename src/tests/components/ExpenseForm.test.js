import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render ExpenseForm form', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm form with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render error with invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm  />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('should should set description on input change', () => {
  const value = 'new description';
  const wrapper = shallow(<ExpenseForm  />);
  wrapper.find('input').at(0).simulate('change', {
    target: { value } 
  });
  expect(wrapper.state('description')).toBe(value);
});

test('should should set note on textarea change', () => {
  const value = 'new description';
  const wrapper = shallow(<ExpenseForm  />);
  wrapper.find('textarea').simulate('change', {
    target: { value } 
  });
  expect(wrapper.state('note')).toBe(value);
});

test('should should set amount if valid input', () => {
  const value = '1.25';
  const wrapper = shallow(<ExpenseForm  />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value } 
  });
  expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {
  const initialState = '';
  const value = 'invalid';
  const wrapper = shallow(<ExpenseForm  />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value } 
  });
  expect(wrapper.state('amount')).toBe(initialState);
});

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ExpenseForm 
      expense={expenses[0]} 
      onSubmit={onSubmitSpy}
    />
  );
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount:expenses[0].amount,
    note:expenses[0].note,
    createdAt:expenses[0].createdAt,
  });
});

test('should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now);
});


test('should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now);
});

test('should update focus of calendar', () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
  expect(wrapper.state('calendarFocused')).toEqual(focused);
});