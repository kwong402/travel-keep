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

  static async getCheapestFlight(date, allTravels) {
    //go to the backend '/api/v1/destinations/price-analysis?ANY-INPUT'
    //iterate travels to grab destination id
    //search airport using destination id
    try {
      const response = await fetch(`/api/v1/destinations/`)
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const destination = await response.json()
      return destination
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
    //return either all price or just the lowest median price

  }
}

export default FetchDestinations