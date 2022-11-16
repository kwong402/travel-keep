require 'amadeus'

class AmadeusApi
  attr_accessor :amadeus

  def initialize()
    @amadeus = Amadeus::Client.new({
      client_id: "#{ENV['AMADEUS_API_KEY']}",
      client_secret: "#{ENV['AMADEUS_API_SECRET']}"
    })
  end

  def fetch_cities(keyword)
    response = amadeus.reference_data.locations.get(
      keyword: keyword,
      subType: Amadeus::Location::CITY
    )
    results = response.data
  end

end