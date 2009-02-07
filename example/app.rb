require 'rubygems'
require 'sinatra'

set :static, true
set :public, File.join(File.dirname(__FILE__), '..', 'spec', 'screw-unit')

get '/' do
  erb :index
end

get '/jquery-glowing.js' do
  content_type "text/javascript"
  File.read(File.join(File.dirname(__FILE__), '..', 'src', 'jquery-glowing.js'))
end

get '/jquery.color.js' do
  content_type "text/javascript"
  File.read(File.join(File.dirname(__FILE__), '..', 'src', 'jquery.color.js'))
end