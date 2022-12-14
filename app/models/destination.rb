class Destination < ApplicationRecord
  validates :city_name, presence: true
  validates :amadeus_api_id, presence: true

  has_many :travels
end