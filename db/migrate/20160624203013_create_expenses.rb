class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.string :name, null: false
      t.string :category, null: false
      t.date :due_date
      t.integer :amount, null: false
      t.boolean :paid
      

      t.timestamps null: false
    end
  end
end
