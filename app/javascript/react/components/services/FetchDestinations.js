class FetchDestinations {

  static async getDestinations(userInput) {
    try {
      const response = await fetch(`api/v1/destinations?city_name=${userInput}`)
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const destinations = await response.json()
      return destinations
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
}

export default FetchDestinations