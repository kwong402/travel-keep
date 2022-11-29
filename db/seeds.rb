User.delete_all
Destination.delete_all
Travel.delete_all

test = User.create(first_name: "Test", last_name: "Test", iata_code: "BOS", email: "test@test.com", password: "password")
karen = User.create(first_name: "Karen", last_name: "Wong", iata_code: "BOS", email: "karen@launch.com", password: "launchAcademy")

destination_1 = Destination.create(city_name: "SAN FRANCISCO", state: "CA", country: "UNITED STATES OF AMERICA", amadeus_api_id: "CSFO")
destination_2 = Destination.create(city_name: "MIAMI", state: "FL", country: "UNITED STATES OF AMERICA", amadeus_api_id: "CMIA")

travel_1 = Travel.create(body: "See the Golden Gate Bridge", destination: destination_1, user: karen)
travel_1 = Travel.create(body: "Beaches in the winter", destination: destination_2, user: karen)