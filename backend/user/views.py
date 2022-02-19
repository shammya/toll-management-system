from backend.serializers import *

from django.shortcuts import render, redirect
from django.http import Http404, HttpResponse, JsonResponse
from django.db import connection


from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response

# class for the home page backend
class Home(APIView):
    def get(self, request, format=None):
        # if the user is logged in then
        if 'vehicle' in request.session:
            # create a new session
            current_user = request.session['vehicle']
            # get data from db cursor
            cursor = connection.cursor()
            cursor.execute("SELECT * FROM Offer")
            offers=cursor.fetchall()
            # convert the data from db to a py dictionary
            offersdata = []
            for off in offers:
                type = off[1]
                amount = off[2]
                time = off[3]

                row = {'offerType' : type, 'offerAmount' : amount, 'offerTime' : time}

                offersdata.append(row)
            # serialize the dictionary
            serializedOffers =  OfferSerializer(offersdata, many=True).data
            print(serializedOffers)
            # return the dictionary as json response
            return JsonResponse({
                "offers" : serializedOffers,
                }, safe=False)
        # if the user is not logged in then
        else:
            # send error msg from backend
            return JsonResponse({
                "errorMsg" : "session expired, redirect to home",
                }, safe=False)

# class for login backend
class Login(APIView):
    def post(self, request, format=None):
        # get the login vehicle no and password
        vehicle = request.POST.get('vehicle')
        password = request.POST.get('password')

        ###########################################
        # create a dynamic query here to check if the 
        # following (user+pass) exists and figure out
        # if login success or failure
        ###########################################

        check_user = True
        if check_user:
            # if user is logged in
            request.session['vehicle'] = vehicle
            return JsonResponse({
                "loginSuccess": True,
                }, safe=False)
        else:
            return JsonResponse({
                "loginSuccess": False,
                "errorMsg" : "login failed, retry to login",
                }, safe=False)

# class for login backend
class Signup(APIView):
    def post(self, request, format=None):
        # get the login vehicle no and password
        vehicle = request.POST.get('vehicle')
        password = request.POST.get('password')

        ###########################################
        # create a dynamic query here to check if the 
        # following (user+pass) exists
        ###########################################
        
        alreadyExists = False
        if alreadyExists:
            return JsonResponse({
                "signupSuccess": False,
                "errorMsg" : "signup failed, duplicate name",
                }, safe=False)
        else:
            ###########################################
            # create a query here to save the 
            # following (user+pass) to db
            ###########################################
            return JsonResponse({
                "signupSuccess": True,
                })

# class for login backend
class Logout(APIView):
    def post(self, request, format=None):
        try:
            del request.session['vehicle']
        except:
            return JsonResponse({
                    "logoutSuccess": False,
                    "errorMsg": "session could not be deleted",
                    })
        return JsonResponse({
                    "logoutSuccess": True,
                    })