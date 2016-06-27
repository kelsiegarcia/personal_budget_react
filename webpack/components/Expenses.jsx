import React from 'react';
import NewExpense from './NewExpense';
import Expense from './Expense';
import AddIncome from './AddIncome';
import Income from './Income';

class Expenses extends React.Component {
  constructor(props){
    super(props);
    this.state = { expenses: [], incomes: [] };
    this.deleteExpense = this.deleteExpense.bind(this);
  }

  deleteExpense(id) {
    $.ajax({
      url: `/api/expenses/${id}`,
      type: 'DELETE',
      dataType: 'JSON'
    }).done( data => {
      let expenses = this.state.expenses;
      let index = expenses.findIndex( e => e.id === id );
      this.setState({
        expenses: [
          ...expenses.slice(0, index),
          ...expenses.slice(index + 1, expenses.length)
        ]        
      });
    }).fail( data => {
      alert('Did not delete');
    });
  }

  deleteIncome(id) {
    $.ajax({
      url: `/api/income/${id}`,
      type: 'DELETE',
      dataType: 'JSON'
    }).done( data => {
      let incomes = this.state.incomes;
      let index = incomes.findIndex( i => i.id === id );
      this.setState({
        incomes: [
          ...incomes.slice(0, index),
          ...incomes.slice(index + 1, incomes.length)
        ]        
      });
    }).fail( data => {
      alert('Did not delete');
    });
  }

  addExpense(expense) {
    this.setState({ expenses: [{...expense}, ...this.state.expenses ] });
  }

  addIncome(income) {
    this.setState({ incomes: [{...income}, ... this.state.incomes] });
  }

  componentWillMount() {
    $.ajax({
      url: '/api/expenses',
      type: 'GET',
      dataType: 'JSON'
    }).done( expenses => {
      this.setState({ expenses });
    }).fail( data => {
      alert('Did not get expenses');
    });
  }


  displayGrid() {
    return this.state.expenses.map( expense => {
      let key = `expense-${expense.id}`
      return (<Expense {...expense} key={key} paidClick={this.paidClick} deleteExpense={this.deleteExpense} />)
    })
  }

  displayIncome() {
    return this.state.incomes.map( income => {
      let key = `income-${income.id}`
      return(<Income {...income} key={key} addIncome={this.addIncome} deleteIncome={this.deleteIncome} />)
    })
  }
  
  render() {
    return(
      <div className="row">
        <div className="col s6 card-panel teal lighten-5">
          <div>
            <NewExpense addExpense={this.addExpense.bind(this)} />
          </div>
          <div className='row highlight'>
            <table>
              <thead>
                <tr>
                  <th data-field="name">Name</th>
                  <th data-field="category">Category</th>
                  <th data-field="amount">Amount</th>
                  <th data-field="due_date">Due Date</th>
                  <th data-field="paid">Paid</th>
                  <th data-field="edit"></th>
                  <th data-field="delete"></th>
                </tr>
              </thead>

              <tbody>
                {this.displayGrid.bind(this)()}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col s6 card-panel cyan lighten-5">
          <div>
            <AddIncome addIncome={this.addIncome.bind(this)} />
          </div>
          <div className='row highlight'>
            <table>
              <thead>
                <tr>
                  <th data-field="income_name">Name</th>
                  <th data-field="income_category">Category</th>
                  <th data-field="amount">Amount</th>
                  <th data-field="payday">Payday</th>
                  <th data-field="edit"></th>
                  <th data-field="delete"></th>
                </tr>
              </thead>
              <tbody>
                {this.displayIncome.bind(this)()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Expenses;

