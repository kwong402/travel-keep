class CreateTravels < ActiveRecord::Migration[5.2]
  def change
    create_table :travels do |t|
      t.text :body
      t.belongs_to :destination
      t.belongs_to :user

      t.timestamps null: false
    end
  end
end
