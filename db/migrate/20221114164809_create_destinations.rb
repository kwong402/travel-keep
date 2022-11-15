class CreateDestinations < ActiveRecord::Migration[5.2]
  def change
    create_table :destinations do |t|
      t.string :city_name, null: false
      t.string :state
      t.string :country, null: false
      t.string :airport, null: false

      t.timestamps null: false
    end
  end
end