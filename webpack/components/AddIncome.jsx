import React from 'react';

class AddIncome extends React.Component {
  constructor(props) {
    super(props);
  }

  addIncome(e) {
    e.preventDefault();
    let income_name = this.refs.incomeName.value;
    let income_category = this.refs.incomeCategory.value;
    let income_amount = this.refs.incomeAmount.value;
    let pay_day = this.refs.payDay.value;
    $.ajax({
      url: '/api/income',
      type: 'POST',
      data: { income: { income_name, income_category, income_amount, pay_day  } },
      dataType: 'JSON'
    }).done( income => {
      this.props.addIncome(income);
      this.refs.addForm.reset();
    }).fail( response => {
      alert('fail');
    });
  }

  render() {
    return(
      <div className='container'>
        <div className='col s12 m10 offset-m1'>
          <h4>Add Income</h4>
          <form ref='addForm' onSubmit={this.addIncome.bind(this)}>
            <input type='text' placeholder='Income Name' ref='incomeName' required />
            <input type='text' placeholder='Income Category' ref='incomeCategory' required />
            <input type='number' placeholder='Income Amount' ref='incomeAmount' required />
            <input type='date' placeholder='Payday' ref='payDay' />  
            <input type='submit' className='btn white  blue-text' />
          </form>
        </div>
      </div>
    )
  }
}

export default AddIncome;