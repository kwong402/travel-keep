class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :iata_code, length: { is: 3 }

  has_many :destinations
end
