class Api::ExpensesController < ApplicationController
  before_action :expense, except: :index

  def index
    render json: Expense.all.order(:name)
  end

  def show
    render json: @expense
  end

  def create
    @expense = Expense.create(expense_params)
    if @expense.save
      render json: @expense
    else
      render json: { errors: @expense.errors.full_messages }
    end
  end

  def update
    if @expense.update(expense_params)
      render json: @expense.reload
    else
      render json: {errors: @expense.errors.full_messages}
    end
  end

  def destroy
    @expense.destroy
    render json: true
  end 

  private

  def expense_params
    params.require(:expense).permit(:name, :category, :due_date, :amount, :paid)
  end

  def expense
    @expense = Expense.find_by(id: params[:id])
  end
end