Rails.application.routes.draw do
  root 'main#index'
  devise_for :users
  
  get '/destinations', to: 'homes'
  get '/travels/new', to: 'homes'

  namespace :api do
    namespace :v1 do
      get '/destinations/search' => 'destinations#search'
      resources :destinations, only: [:index] do
        resources :travels, only: [:create]
      end

      get '/travels/search_airports' => 'travels#search_airports'
      resources :travels, only: [:index, :update, :destroy]
    end
  end
end