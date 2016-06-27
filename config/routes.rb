Rails.application.routes.draw do 
  root 'home#index'  

  namespace :api do
    resources :expenses 
  end
  
  namespace :api do
    resources :income
  end

  get '*unmatched_route', to: 'home#index'
end

