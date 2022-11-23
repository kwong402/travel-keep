class FetchDestinations {
  static async getDestinations(userInput) {
    try {
      const response = await fetch(`/api/v1/destinations?city_name=${userInput}`)
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const destinations = await response.json()
      return destinations
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  static async getSelectedDestination(amadeus_api_id) {
    try {
      const response = await fetch(`/api/v1/destinations/search?amadeus_api_id=${amadeus_api_id}`)
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const destination = await response.json()
      return destination
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  static async getAirport(travel) {
    
  }
}

export default FetchDestinations