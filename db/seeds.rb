User.delete_all
Destination.delete_all
Travel.delete_all

test = User.create(first_name: "Test", last_name: "Test", iata_code: "BOS", email: "test@test.com", password: "password")