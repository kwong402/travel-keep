require 'amadeus'
require 'dotenv'

class Api::V1::TravelsController < ApiController
  def index
    travels = Travel.where(user_id: current_user.id)
    render json: travels, each_serializer: TravelSerializer
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

  def search_airports
    amadeus = Amadeus::Client.new({
      client_id: "#{ENV['AMADEUS_API_KEY']}",
      client_secret: "#{ENV['AMADEUS_API_SECRET']}"
    })
    date = params[:departure_date]
    airports = []
    travels = Travel.where(user_id: current_user.id)
    travels.each do |travel|
      iata_code = amadeus.reference_data.location(travel.destination.amadeus_api_id).get.data["iataCode"]
      airports.push({"name" => travel.destination.city_name, "iata_code" => iata_code})
    end

    airports.each do |airport|
      flight_cost = amadeus.analytics.itinerary_price_metrics.get(originIataCode: current_user.iata_code, destinationIataCode: airport["iata_code"], departureDate: date, currencyCode: "USD")
      if flight_cost.data.length > 0
        airport["price"] = flight_cost.data[0]["priceMetrics"][2]["amount"].to_f
      end
    end
    cheapest_travel = airports.sort_by { |hash| hash["price"] }.first

    render json: cheapest_travel
  end

  def destroy
    travel = Travel.find(params["id"])
    
    if current_user.id == travel.user_id
      travel.destroy
      travels = Travel.where(user_id: current_user.id)
      render json: travels, each_serializer: TravelSerializer
    else
      render json: { error: travel.errors.full_messages }
    end
  end

  private

  def travel_params
    params.require(:travel).permit(:body)
  end
end