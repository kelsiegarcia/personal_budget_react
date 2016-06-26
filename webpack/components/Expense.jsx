import React from 'react';

class Expense extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expense: props, editView: false};
    this.paidClick = this.paidClick.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  paidClick() {
    $.ajax({
      url: `/api/expenses/${this.state.expense.id}`,
      type: 'PUT',
      data: { expense: {paid: !this.state.expense.paid} },
      dataType: 'JSON'
    }).done( expense => {
      this.setState({ expense });
    }).fail( data => {
      alert('Did not update');
    });
  }

  toggleEdit() {
    this.setState({ editView: !this.state.editView });
  }

  handleEdit(e) {
    e.preventDefault();
    let name = this.refs.name.value;
    let category = this.refs.category.value;
    let amount = this.refs.amount.value;
    let due_date = this.refs.dueDate.value;
    $.ajax({
      url:`/api/expenses/${this.state.expense.id}`,
      type:'PUT',
      data: { expense: { name, category, amount, due_date } },
      dataType: 'JSON'
    }).done( expense => {
      this.setState({ expense, editView: false });
    }).fail( data => {
      alert('Did not Edit');
    });
  }

  edit() {
    return(
      <form onSubmit={this.handleEdit.bind(this)}>
        <tr>
          <td>
            <input ref='name' type='text' placeholder='name' defaultValue={this.state.expense.name} />
          </td>
          <td>
            <input ref='category' type='text' placeholder='category' defaultValue={this.state.expense.category} />
          </td>
          <td>
            <input ref='amount' type='number' placeholder='amount' defaultValue={this.state.expense.amount} />
          </td>
          <td>
            <input ref='dueDate' type='date' placeholder='due date' defaultValue={this.state.expense.due_date} /> 
          </td>
          <td>
            <p>_</p>
          </td>
          <td>
            <input type='submit' value='Update' className='btn' />           
          </td>
          <td>
            <button className="btn grey" onClick={this.toggleEdit}>Cancel</button>
          </td>
        </tr>
      </form>
    )
  }

  show() {
    let expense = this.state.expense;
    let key = expense.id
    return (
     <tr> 
       <td>{expense.name}</td>
       <td>{expense.category}</td>
       <td>{expense.amount}</td>
       <td>{expense.due_date}</td>
       <td>
         <input type="checkbox" checked={expense.paid} id={key} />
         <label for={key} onClick={this.paidClick}>Paid</label>
       </td>
       <td>
       <button className="btn" onClick={this.toggleEdit}>Edit</button>
       </td>
       <td>
         <button className="btn red" onClick={() => this.props.deleteExpense(expense.id)}>Delete</button>
       </td>
     </tr>
    )  
  }

  render() {
    if(this.state.editView) {
      return( this.edit() )
    } else {
      return( this.show() )
    }
  }
}

export default Expense;
