class Api::IncomeController < ApplicationController
  before_action :income, except: :index

  def index
    render json: Income.all.order(:name)
  end

  def show
    render json: @Income
  end

  def create
    @income = Income.create(income_params)
    if @income.save
      render json: @income
    else
      render json: { errors: @income.errors.full_messages }
    end
  end

  def update
    if @income.update(income_params)
      render json: @income.reload
    else
      render json: {errors: @income.errors.full_messages}
    end
  end

  def destroy
    @income.destroy
    render json: true
  end 

  private

  def income_params
    params.require(:income).permit(:name, :category, :payday, :amount)
  end

  def income
    @income = Income.find_by(id: params[:id])
  end
end
