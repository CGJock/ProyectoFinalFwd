from django.shortcuts import render

# Create your views here.
import os
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import ChatGrant
from rest_framework import request
import jwt
from user.models import USERS
from rest_framework.exceptions import AuthenticationFailed

# required for all twilio access tokens
# To set up environmental variables, see http://twil.io/secure

def twilio_token():
    token = request.COOKIES.get('jwt')
    if not token:
        raise AuthenticationFailed("No Autentificado")
    try:
        payload = jwt.decode(token, 'secret', algorithm='HS256')
           
    except jwt.ExpiredSignatureError :
        raise AuthenticationFailed("token expired")
        
    user =  USERS.objects.filter(pk=payload['id_user']).first()

    account_sid = os.environ['US8453ecc910064eb0a617ab0e197f4b96']
    api_key = os.environ['SK712d875d043b081ccb5238a27e38acae']
    api_secret = os.environ['TWILIO_API_KEY_SECRET']

    # required for Chat grants
    service_sid = 'IS78cd40c69c60467097057914e7fc3ea5'
    identity = 'user'

# Create access token with credentials
    token = AccessToken(account_sid, api_key, api_secret, identity=identity)

# Create an Chat grant and add to token
    chat_grant = ChatGrant(service_sid=service_sid)
    token.add_grant(chat_grant)

# Return token info as JSON
    print(token.to_jwt())