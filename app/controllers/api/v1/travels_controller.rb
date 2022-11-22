require 'amadeus'
require 'dotenv'

class Api::V1::TravelsController < ApiController
  def index
    render json: Travel.all
  end

  def create
    travel = Travel.new(travel_params)
    destination = Destination.find_by(amadeus_api_id: params[:destination_id])

    if destination
      travel.destination = destination
    else
      amadeus = Amadeus::Client.new({
        client_id: "#{ENV['AMADEUS_API_KEY']}",
        client_secret: "#{ENV['AMADEUS_API_SECRET']}"
      })
      response = amadeus.reference_data.location(params[:destination_id]).get.data
      destination = Destination.new(
        city_name: response["address"]["cityName"],
        state: response["address"]["stateCode"],
        country: response["address"]["countryName"],
        amadeus_api_id: response["id"]
      )
      destination.save
      travel.destination = destination
    end

    travel.user = current_user
    if travel.save
      render json: travel, serializer: TravelSerializer
    else
      render json: { error: travel.errors.full_messages }
    end
  end

  def update
    travel_to_update = Travel.find(params["id"])
    travel_to_update.update(travel_params)
    if travel_to_update.save
      render json: travel_to_update, serializer: TravelSerializer
    else
      render json: { error: travel_to_update.errors.full_messages }
    end
  end

  def destroy
    travel = Travel.find(params["id"])
    
    if current_user.is == travel.user_id
      travel.destroy
      travels = current_user.list
      render json: {travels: travels, user: current_user } #double check here
    else
      render json: { error: travel.errors.full_messages }
    end
  end

  private

  def travel_params
    params.require(:travel).permit(:body)
  end
end