class Api::V1::TravelsController < ApiController
  def index
    render json: Travel.all
  end
end