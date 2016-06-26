class Expense < ActiveRecord::Base
  validates_presence_of :name, :category, :amount
end
