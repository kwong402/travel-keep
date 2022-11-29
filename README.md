<h1 align="center">Travel Keep</h1>

<i>Travel Keep is a site that can help users brainstorm and organize their travel plans by searching for desired destinations and saving it in their Travels List. A price analysis form can analyze the saved travels and determine which destination has the most affordable price given the travel day.</i>
<br>

</p>

<p align="center">
  <a href="https://travel-keep.onrender.com"><strong>travel-keep.onrender.com</strong></a>
  <br>
</p>

## 🚀 Programming

- Backend: Ruby 2.7.3, Rails 5.2.5
- Frontend: React
- Database: PostgreSQL
- Third party APIs: Amadeus API

## ▶️ Development
Prerequisite: have Yarn installed, and Ruby version 2.7.3.

1. Clone the repository
    ```sh
    git clone https://github.com/kwong402/travel-keep.git
    ```
    
2. Install Ruby gems
    ```sh
    bundle exec bundle install
    ```
    
3. Install Packages with Yarn
    ```sh
    yarn install
    ```
    
4. Start Ruby server
    ```sh
    rails server
    ```
    
5. Start webpack-dev-server
    ```sh
    yarn run start
    ```
    
6. Open the development site **[localhost:3000](http://localhost:3000)**
    
## 🤝 Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create.
Any contributions you make are **greatly appreciated**.

1. Clone the Project
2. Create your Feature Branch (`git checkout -b feature-contributing main`)
3. Commit your Changes (`git commit -m 'contribute to new feature'`)
4. Push to the Branch (`git push origin head`)
5. Open a Pull Request

## Features in Progress

Travel Keep is a fully functional tool for brainstorming and organizing travel ideas. However, there are more features coming, including:

- Ability to see and add activities or points of interest to travel ideas
- Ability to select a flight for a planned destination
- Ability to create an itinerary and book hotel and/or car rentals
- Mobile device optimizations

## Known Issues

Fixes are in progress for these known issues, mainly with the Amadeus free membership plan:

- Mostly popular cities will be found in the destination search.
- When searching a flight price analysis on saved travels, it will take some time to load the result. An error message alerts the user to wait a few minutes before searching again due to the Amadeus API network rate limit.

## 👩🏻‍💻 Author

Connect with the developer.

- [LinkedIn][linkedin]
- [Email][email]
- [GitHub][github]

**Love Travel-Keep? Give this repo a star :star: :arrow_up:.**

[linkedin]: https://www.linkedin.com/in/kwong402/
[email]: mailto:kwong402@gmail.com
[github]: https://github.com/kwong402

## Other Notes

Thank you to the Launch Academy staff (Kerrin Gillis and Nick Alberts) for their support in development