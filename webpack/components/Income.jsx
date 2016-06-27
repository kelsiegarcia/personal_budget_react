import React from 'react';

class Income extends React.Component {
  constructor(props) {
    super(props);
    this.state = { income: props, editView: false};
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    this.setState({ editView: !this.state.editView });
  }

  handleEdit(e) {
    e.preventDefault();
    let income_name = this.refs.incomeName.value;
    let income_category = this.refs.incomeCategory.value;
    let income_Amount = this.refs.income_Amount.value;
    let pay_day = this.refs.payDay.value;
    $.ajax({
      url:`/api/income/${this.state.income.id}`,
      type:'PUT',
      data: { income: { income_name, income_category, income_amount, pay_day } },
      dataType: 'JSON'
    }).done( income => {
      this.setState({ income, editView: false });
    }).fail( data => {
      alert('Did not Edit');
    });
  }

  edit() {
    return(
      <form onSubmit={this.handleEdit.bind(this)}>
        <tr>
          <td>
            <input ref='incomeName' type='text' placeholder='Income Name' defaultValue={this.state.income.income_name} />
          </td>
          <td>
            <input ref='incomeCategory' type='text' placeholder='Income Category' defaultValue={this.state.income.income_category} />
          </td>
          <td>
            <input ref='incomeAmount' type='number' placeholder='Income Amount' defaultValue={this.state.income.income_amount} />
          </td>
          <td>
            <input ref='payDay' type='date' placeholder='Payday' defaultValue={this.state.income.pay_day} /> 
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
    let income = this.state.income;
    let key = income.id
    return (
     <tr> 
       <td>{income.income_name}</td>
       <td>{income.income_category}</td>
       <td>{income.income_amount}</td>
       <td>{income.pay_day}</td>
       <td>
       <button className="btn cyan darken-2" onClick={this.toggleEdit}>Edit</button>
       </td>
       <td>
         <button className="btn cyan darken-3" onClick={() => this.props.deleteIncome(income.id)}>X</button>
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

export default Income;
