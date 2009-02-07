require 'rubygems'
require 'sinatra'

set :static, true
set :public, File.join(File.dirname(__FILE__), '..', 'src')

get '/' do
  erb :index
end