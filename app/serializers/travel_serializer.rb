class TravelSerializer < ActiveModel::Serializer
  attributes :id, :body, :current_user

  belongs_to :destination
  belongs_to :user
end