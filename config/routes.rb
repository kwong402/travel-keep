Rails.application.routes.draw do
  root 'main#index'
  devise_for :users
  
  get '/destinations', to: 'homes#authenticated'
  get '/travels/new', to: 'homes#authenticated'

  namespace :api do
    namespace :v1 do
      get '/destinations/search' => 'destinations#search'
      resources :destinations, only: [:index] do
        resources :travels, only: [:create]
      end

      resources :travels, only: [:index, :update, :delete]
    end
  end
end