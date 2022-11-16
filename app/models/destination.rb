class Destination < ApplicationRecord
  validates :city_name, presence: true
  # validates :country, presence: true
  # validates :airport, presence: true
end