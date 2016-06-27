class CreateIncomes < ActiveRecord::Migration
  def change
    create_table :incomes do |t|
      t.string :name
      t.integer :amount
      t.string :category
      t.date :payday

      t.timestamps null: false
    end
  end
end
