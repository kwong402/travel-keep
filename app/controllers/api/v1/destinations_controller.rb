require 'amadeus'
require 'dotenv'

class Api::V1::DestinationsController < ApiController
  before_action :authenticate_user

  def index
    amadeus = Amadeus::Client.new({
      client_id: "#{ENV['AMADEUS_API_KEY']}",
      client_secret: "#{ENV['AMADEUS_API_SECRET']}"
    })

    city = params[:city_name]
    response = amadeus.reference_data.locations.get(keyword: city, subType: 'CITY')
    render json: response.data
  end

  def create
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
      if destination.save
        render json: destination, serializer: DestinationSerializer
      else
        render json: { error: destination.errors.full_messages }, status: :unprocessable_entity
      end
  end

  def search
    amadeus = Amadeus::Client.new({
      client_id: "#{ENV['AMADEUS_API_KEY']}",
      client_secret: "#{ENV['AMADEUS_API_SECRET']}"
    })

    id = params[:amadeus_api_id]
    response = amadeus.reference_data.location(id).get

    render json: response.data
  end

  protected

  def destination_params
    params.require(:destination).permit(:city_name)
  end

  def authenticate_user
    if !user_signed_in?
      render json: {error: ["You need to be signed in first"]}
    end
  end
end