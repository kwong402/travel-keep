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
  end

  def search
    api = AmadeusApi.new.amadeus
    city = params[:city_name]
    response = api.reference_data.locations.get(keyword: city, subType: 'CITY')
    render json: response
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