from backend.serializers import *
from django.db import connection
from django.http import Http404, HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from user import conf


# class for the home page backend
class Home(APIView):
    def get(self, request, format=None):
        # if the user is logged in then
        if conf.vehicleRegNo:
            # get data from db cursor
            cursor = connection.cursor()
            cursor.execute("SELECT * FROM Offer")
            offers=cursor.fetchall()
            cursor.close()
            # convert the data from db to a py dictionary
            offersdata = []
            for off in offers:
                offid = off[0]
                type = off[1]
                amount = off[2]
                time = off[3]

                row = {'offerID' : offid, 'offerType' : type, 'offerAmount' : amount, 'offerTime' : time}

                offersdata.append(row)
            # serialize the dictionary
            serializedOffers =  OfferSerializer(offersdata, many=True).data
            # print(serializedOffers)
            # return the dictionary as json response
            return JsonResponse({
                "userdata" : {"username" : conf.name, "email" : conf.email, "balance" : conf.balance},
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
        print("123"+str(56))
        # get the login vehicle no and password
        vehicle = request.data['vehicle']
        password = request.data['password']
        print(vehicle, password)

        vehicleRegNo1=vehicle
        nid1=""
        vehicleType1=""
        balance1=0
        password1=password
        name1=""
        email1=""
        phoneNo1=""
        address1=""
        sql="SELECT OwnerNID, vehicleType, balance FROM Vehicle WHERE vehicleRegNo = \""+vehicle+"\""
        # print("check in")
        
        cursor = connection.cursor()
        cursor.execute(sql)
        ROW=cursor.fetchall()
        cursor.close()
        # print("data found")
        
        if len(ROW) == 0 :
            return JsonResponse({
                "loginSuccess": False,
                "errorMsg" : "login failed, retry to login",
                }, safe=False)
        else: 
            nid1=ROW[0][0]
            vehicleType1=ROW[0][1]
            balance1=ROW[0][2]
        
        sql="SELECT name, email, phoneNo, address FROM User WHERE NID = \""+nid1+"\" AND password = \""+password+"\""
        cursor = connection.cursor()
        cursor.execute(sql)
        ROW=cursor.fetchall()
        cursor.close()

        if len(ROW) == 0 :
            return JsonResponse({
                "loginSuccess": False,
                "errorMsg" : "login failed, retry to login",
                }, safe=False)
        else:
            name1=ROW[0][0]
            email1=ROW[0][1]
            phoneNo1=ROW[0][2]
            address1=ROW[0][3]
            conf.login(nid1, password1, name1, email1, phoneNo1, address1, vehicleRegNo1, vehicleType1, balance1)
            # print(conf.vehicle)
            # print("check final")
            return JsonResponse({
                "loginSuccess": True,
                }, safe=False)

# class for login backend
class Signup(APIView):
    def post(self, request, format=None):
        # get the login vehicle no and password
        license = request.data['license']
        nid = request.data['nid']
        password = request.data['password']
        fname = request.data['fname']
        lname = request.data['lname']
        name = fname + " " + lname
        email = request.data['email']
        mobileno = request.data['mobileno']
        address = request.data['address']
        vehicletype = request.data['vehicletype']

        ###########################################
        # create a dynamic query here to check if the 
        # following (user+pass) exists
        ###########################################
        sql="SELECT * FROM Vehicle WHERE vehicleRegNo = \""+license+"\""
        cursor = connection.cursor()
        cursor.execute(sql)
        ROW=cursor.fetchall()
        cursor.close()

        if len(ROW) != 0 :
            return JsonResponse({
                "signupSuccess": False,
                "errorMsg" : "signup failed, duplicate name",
                }, safe=False)
        else:
            sql="INSERT INTO User (NID,password,name,email,phoneNo,address) VALUES (\""+nid+"\",\""+password+"\",\""+name+"\",\""+email+"\",\""+mobileno+"\",\""+address+"\")"
            cursor = connection.cursor()
            cursor.execute(sql)
            sql="INSERT INTO Vehicle (vehicleRegNo,ownerNID,vehicleType,balance) VALUES (\""+license+"\",\""+nid+"\",\""+vehicletype+"\",0)"
            cursor.execute(sql)
            cursor.close()
            return JsonResponse({
                "signupSuccess": True,
                })

# class for login backend
class Logout(APIView):
    def post(self, request, format=None):
        try:
            conf.logout()
        except:
            return JsonResponse({
                    "logoutSuccess": False,
                    "errorMsg": "session could not be deleted",
                    })
        return JsonResponse({
                    "logoutSuccess": True,
                    })
