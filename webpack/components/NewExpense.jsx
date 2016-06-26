import React from 'react';

class NewExpense extends React.Component {
  constructor(props) {
    super(props);
  }

  addExpense(e) {
    e.preventDefault();
    let name = this.refs.name.value;
    let category = this.refs.category.value;
    let amount = this.refs.amount.value;
    let due_date = this.refs.dueDate.value;
    $.ajax({
      url: '/api/expenses',
      type: 'POST',
      data: { expense: { name, category, amount, due_date } },
      dataType: 'JSON'
    }).done( expense => {
      this.props.addExpense(expense);
      this.refs.addForm.reset();
    }).fail( response => {
      alert('fail');
    });
  }

  render() {
    return(
      <div className='container'>
        <div className='col s12 m10 offset-m1'>
          <h4>Add Expense</h4>
          <form ref='addForm' onSubmit={this.addExpense.bind(this)}>
            <input type='text' placeholder='Name' ref='name' required />
            <input type='text' placeholder='Category' ref='category' required />
            <input type='number' placeholder='Amount' ref='amount' required />
            <input type='date' placeholder='Due Date' ref='dueDate' />  
            <input type='submit' className='btn' />
          </form>
        </div>
      </div>
    )
  }
}

export default NewExpense;