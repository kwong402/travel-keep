class Api::V1::DestinationsController < ApiController
  before_action :authenticate_user

  def show
  end

  protected

  def authenticate_user
    if !user_signed_in?
      render json: {error: ["You need to be signed in first"]}
    end
  end
end