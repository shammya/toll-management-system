# from django.shortcuts import render
# from django.http import HttpResponse
# from django.db import connection


# # Create your views here.

# def index(request):
#     cursor = connection.cursor()
#     cursor.execute("SELECT * FROM PaidTollList")
#     ROW=cursor.fetchall()
#     #ROW="hello"
#         #print(object.content)
#     return HttpResponse(ROW)


import datetime
from math import remainder
from sqlite3 import Cursor, Row
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from finance.serializers import *
from rest_framework.parsers import JSONParser

from user import conf


from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.shortcuts import render
from django.db import connection
# Create your views here.

from django.http import Http404
from rest_framework.views import APIView




    
# class SnippetList(APIView):
#     """
#     List all snippets, or create a new snippet.
#     """
#     def get(self, request, format=None):
#         cursor = connection.cursor()
#         cursor.execute("SELECT * FROM PaidTollList")
#         ROW1=cursor.fetchall()
#         print(ROW1)
        
        
        
#     #     dic = {}
#     #     data = []
#     #     totalcost = 0

#     #     for r in result:
#     #         month       = r[1]
#     #         year        = r[2]
#     #         salary      = r[3]
#     #         row = {'month': month, 'year': year, 'salary': salary}
#     #         totalcost = totalcost + int(r[3])
#     #         data.append(row)
#     #     data = sorted(data, key=lambda x: (datetime.strptime(x['month'][:3], '%b'), x['year']))
#     #     dic['data'] = data
#     #     dic['totalcost'] = totalcost
#     # # return render(request, 'employee/workh.html', {'login' : conf.login, 'data' : dic, 'msg' : msg, 'user' : conf.getuser()})
        
        
#     #     for r in ROW1:
            
#     #         one = r[1]
#     #         two = r[2]
#     #         three = r[3]
            
#     #         row = {'one' : one, 'two' : two, 'three' : three}
            
#     #         data.append(row)        
        
        
        
        
        
        
#         yourdata = [{"id": 1, "title": "Helllloooooo", "description": "hello here", "completed": True}, {"id": 1, "title": "bla", "description": "hello here", "completed": True}]
        
#         serializer = SnippetSerializer(yourdata, many=True).data
        
#         print(serializer)
#         return JsonResponse(serializer, safe=False)

#     def post(self, request, format=None):
        
#         serializer = SnippetSerializer(data=request.data)
    
#         print(serializer.initial_data)
#         if serializer.is_valid():
#             print(serializer.data)
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
class Recharge(APIView):
    
    def get(self, request, format=None):
        
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Offer")
        offers=cursor.fetchall()
        # print(offers)
        
        offersdata = []
        
        
        for off in offers:
            if off[1] == 'Recharge':
                type = off[1]
                amount = off[2]
                time = off[3]
                
                row = {'offerType' : type, 'offerAmount' : amount, 'offerTime' : time}
                
                offersdata.append(row)
            
        offerserializer = OfferSerializer(offersdata, many=True).data
        
        print(offerserializer)
        
        vehicle = conf.vehicleRegNo
        sql="SELECT * FROM Recharge WHERE vehicleRegNo = \'"+vehicle+"\'"
        
        cursor.execute(sql)
        recharges = cursor.fetchall()
        
        rechargedata = []
        
        for rec in recharges:
            
            vehicleNo = rec[1]
            gatewayNo = rec[2]
            offerNo = rec[3]
            amount = rec[4]
            date = rec[5]
            print(date)
            
            row = {'vehicleRegNo' : vehicleNo, 'gatewayName' : gatewayNo, 'offerID' : offerNo, 'amount' : amount, 'date' : date}
            
            rechargedata.append(row)
        
        rechargeserializer = RechargeSerializer(rechargedata, many=True).data
        print(rechargeserializer)
        
        # return JsonResponse(offerserializer, rechargeserializer, safe=False)
    
        # return Response({
        #     "**EQUITY**":  RechargeSerializer(rechargedata, many=True).data,
        #     "**FNO**": RechargeSerializer(rechargedata, many=True).data
        # })
        
        cursor.close()
        return JsonResponse({
            "rechargeHistory": rechargeserializer,
            "offers": offerserializer
        })
        
    def post(self, request, format=None):
        
        
        rechargeInfo = request.data
        print("Recharge::post()")
        offerID = rechargeInfo['offerID']
        gateway = rechargeInfo['gatewayName']
        amount = rechargeInfo['amount']
        date = datetime.today().strftime('%Y-%m-%d')
        # vehicleRegNo = request.POST.get('vehicle')
        
        cursor = connection.cursor()
        sql="SELECT MAX(rechargeID) FROM Recharge;"
        cursor.execute(sql)
        ROW=cursor.fetchall()
        rid=ROW[0][0]
        rid=rid+1
        
        
        sql="INSERT INTO Recharge (rechargeID,vehicleRegNo,gatewayName,offerID,amount,date) VALUES ("+str(rid)+",\""+conf.vehicleRegNo+"\",\""+gateway+"\","+str(offerID)+","+str(amount)+",\""+date+"\")"
        cursor.execute(sql)
        
        TotalOfferAmount = amount
        
        if(offerID != ''):
            
            sql="SELECT offerAmount FROM Offer WHERE offerID = "+str(offerID)
            cursor.execute(sql)
            ROW=cursor.fetchall()
            offerAmount=ROW[0][0]
            TotalOfferAmount=amount+(offerAmount*amount/100)
            #added as percentage.if not percentage TotalOfferAmount=amount+offerAmount
            
        sql="SELECT balance FROM Vehicle WHERE vehicleRegNo = \""+conf.vehicleRegNo+"\""
        cursor.execute(sql)
        ROW=cursor.fetchall()
        prevBalance=ROW[0][0]
        newBalance=prevBalance+TotalOfferAmount

        #to update the vehicle balance
        
        sql="UPDATE  Vehicle SET Balance = "+str(newBalance)+" WHERE vehicleRegNo = \""+conf.vehicleRegNo+"\""
        cursor.execute(sql)
            
        
        
        # here sql query is needed for entry for a recharge for specific vehicle reg no and increase his main balance/vehicle balance
        cursor.close()
        return JsonResponse(True, safe = False)
    
class Due(APIView):
    
    def get(self, request, format=None):
        
        cursor = connection.cursor()
        # here sql query is needed
        # search dues for specific users
        sql="SELECT * from Due WHERE vehicleRegNo = \""+conf.vehicleRegNo+"\""
        cursor.execute(sql)
        dues=cursor.fetchall()
        print("===========")
        print(dues)
        print("===========")
        duesdata = []
        
        for due in dues:
            
            remainderID = due[0]
            vehicleNo = due[1]
            boothid = due[2]
            sql="SELECT name FROM TollBooth WHERE boothID = "+str(boothid)
            
            cursor.execute(sql)
            ROW=cursor.fetchall()
            boothname=ROW[0][0]
            
            amount = due[3]
            date = due[5]
            print(date)
            
            row = {'reminderId' : remainderID, 'vehicleRegNo' : vehicleNo, 'boothName' : boothname, 'dueAmount' : amount, 'date' : date}
            
            duesdata.append(row)
            
        cursor.close()
        
        return JsonResponse(duesdata, safe=False)
        
    
    def post(self, request, format=None):
        
        
        cursor = connection.cursor()
        
        paylist = request.data
        payamount = 0
        gotamountfromql = 0
        for pay in paylist:
            
            remainderID = pay['reminderID']
            print(remainderID)
            # here a sql query is needed for searching the dues for specific users and fetch them to get the toll amount
            
            sql="SELECT amount FROM Due WHERE remainderID =  "+str(remainderID)
            cursor.execute(sql)
            ROW=cursor.fetchall()
            gotamountfromql=ROW[0][0]
            
            payamount += gotamountfromql
        # here a sql query is needed for the specific user if he can pay for the certain amount from his account balance
        
        balance = 0
        sql="SELECT balance FROM Vehicle WHERE vehicleRegNo = \""+conf.vehicleRegNo+"\""
        cursor.execute(sql)
        ROW=cursor.fetchall()
        balance=ROW[0][0]
        
        
        if(balance >= payamount):
            # here a sql query is needed to clear the dues for the specific user
            # delete operation for users
            # got the reminderID from remainderIDList
            # should this true value be in any variable???
            
            for pay in paylist:
    
                remainderID = pay['reminderID']
                print(remainderID)
                # here a sql query is needed for searching the dues for specific users and fetch them to get the toll amount
                sql="SELECT amount FROM Due WHERE remainderID =  "+str(remainderID)
                cursor.execute(sql)
                ROW=cursor.fetchall()
                gotamountfromql=ROW[0][0]
                sql="SELECT routeID FROM Due WHERE remainderID =  "+str(remainderID)
                cursor.execute(sql)
                ROW=cursor.fetchall()
                routeID=ROW[0][0]
                sql="SELECT MAX(paymentID) FROM Payment"
                cursor.execute(sql)
                ROW=cursor.fetchall()
                pid=ROW[0][0]
                pid=pid+1
                date=datetime.today().strftime('%Y-%m-%d')

                sql="INSERT INTO Payment (paymentID,vehicleRegNo,routeID,amount,date) VALUES ("+str(pid)+",\""+str(conf.vehicleRegNo)+"\",2,"+str(gotamountfromql)+",\""+date+"\")"
                cursor.execute(sql)
                sql="DELETE FROM Due WHERE remainderID = "+str(remainderID)
                cursor.execute(sql)
            
            
            cursor.close()
            return JsonResponse(True, safe=False)
        
        else:
            
            cursor.close()
            return JsonResponse(False, safe=False)
        
        
class RouteSelection(APIView):
    
    def get(self, request, format = None):
        
        # here toll booth table has to be update
        # where in place of location two parameters will be given
        # a X and Y position
        
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM TollBooth")
        tollbooths = cursor.fetchall()
        
        tollBoothData = []
        
        for tolls in tollbooths:
            
            boothID = tolls[0]
            posX = tolls[2]
            posY = tolls[3]
            location = tolls[1]
            
            row = {'boothID' : boothID, 'posX' : posX, 'posY' : posY, 'location' : location}
            
            tollBoothData = tollBoothData.append(row)
            
        cursor.close()
        return JsonResponse(tollBoothData, safe=False)
    
    def post(self, request, format = None):
        
        selectedTolllist = request.data
        cursor = connection.cursor()
        
        totalTollamount = 0
        gotamountfromql = 0
        tollAmount = []
        for toll in selectedTolllist:
            
            boothID = toll['boothID']
            
            sql="SELECT amount FROM TollAmount WHERE boothID = "+str(boothID)+" AND vehicleType = \""+conf.vehicleType+"\""
            
            cursor.execute(sql)
            
            ROW=cursor.fetchall()
            gotamountfromql=ROW[0]
            
            
            # here a sql query is needed for searching the tollbooth and tollamount for specific vehicleType get the toll amount
            totalTollamount += gotamountfromql
        
        row = {'tollAmount' : totalTollamount}
        
        tollAmount.append(row)
        
        cursor.close()
        
        return JsonResponse(tollAmount, safe = False)
    
    
class PaymentRoute(APIView):
    
    def post(self, request, format = None):
        
        selectedTolllist = request.data
        
        
        cursor = connection.cursor()

        totalTollamount = 0
        gotamountfromql = 0
        tollAmount = []
        selectedTolls = []
        
        
        
        for toll in selectedTolllist:
            
            boothID = toll['boothID']
            selectedTolls.append(boothID)
            
            sql="SELECT amount FROM TollAmount WHERE boothID = "+str(boothID)+" AND vehicleType = \""+conf.vehicleType+"\""
            
            cursor.execute(sql)
            
            ROW=cursor.fetchall()
            gotamountfromql=ROW[0]
            
            
            # here a sql query is needed for searching the tollbooth and tollamount for specific vehicleType get the toll amount 
            totalTollamount += gotamountfromql
            
            
        
        # here a query is needed to check the balance for user againnts the total toll amount
        
        sql="SELECT balance FROM Vehicle WHERE vehicleRegNo = \""+conf.vehicleRegNo+"\""
        
        cursor.execute(sql)
        ROW=cursor.fetchall()
        balance=ROW[0][0]
        
        if(balance >= totalTollamount):
            # here query is needed to make entry in the payment table for the seleced booths
            # the list can be found from the selectedTolls.
            
            source  = str(selectedTolls[0])
            destination = str(selectedTolls[len(selectedTolls) - 1])
            
            
            
            sql="SELECT MAX(routeID) FROM Route"
            cursor.execute(sql)
            ROW=cursor.fetchall()
            rid=ROW[0][0]
            rid=rid+1

            date=datetime.today().strftime('%Y-%m-%d')

            sql="INSERT INTO Route (routeID,vehicleRegNo,source,destination,date) VALUES ("+str(rid)+",\""+conf.vehicleRegNo+"\",\""+source+"\",\""+destination+"\",\""+date+"\")"
            cursor.execute(sql)
            
            
            sql="SELECT MAX(paymentID) FROM Payment"
            cursor.execute(sql)
            ROW=cursor.fetchall()
            pid=ROW[0][0]
            pid=pid+1
            sql="INSERT INTO Payment (paymentID,vehicleRegNo,routeID,amount,date) VALUES ("+str(pid)+",\""+str(conf.vehicleRegNo)+"\",2,"+str(totalTollamount)+",\""+date+"\")"
            cursor.execute(sql)

            balance = balance - totalTollamount
            sql="UPDATE Vehicle SET balance = "+str(balance)+" WHERE vehicleRegNo = \""+conf.vehicleRegNo
            cursor.execute(sql)
                 
            cursor.close()
            return JsonResponse(True, safe = False)
        
        else:
            
            cursor.close()
            return JsonResponse(False, safe = False)
    