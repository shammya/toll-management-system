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


from sqlite3 import Row
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from finance.serializers import *
from rest_framework.parsers import JSONParser
# from finance.serializers import SnippetSerializer


from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.shortcuts import render
from django.db import connection
# Create your views here.

from django.http import Http404
from rest_framework.views import APIView



def index(request):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM PaidTollList")
    ROW=cursor.fetchall()
    #ROW="hello"
        #print(object.content)
    return HttpResponse(ROW)
 
    
class SnippetList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM PaidTollList")
        ROW1=cursor.fetchall()
        print(ROW1)
        
        
        
    #     dic = {}
    #     data = []
    #     totalcost = 0

    #     for r in result:
    #         month       = r[1]
    #         year        = r[2]
    #         salary      = r[3]
    #         row = {'month': month, 'year': year, 'salary': salary}
    #         totalcost = totalcost + int(r[3])
    #         data.append(row)
    #     data = sorted(data, key=lambda x: (datetime.strptime(x['month'][:3], '%b'), x['year']))
    #     dic['data'] = data
    #     dic['totalcost'] = totalcost
    # # return render(request, 'employee/workh.html', {'login' : conf.login, 'data' : dic, 'msg' : msg, 'user' : conf.getuser()})
        
        
    #     for r in ROW1:
            
    #         one = r[1]
    #         two = r[2]
    #         three = r[3]
            
    #         row = {'one' : one, 'two' : two, 'three' : three}
            
    #         data.append(row)        
        
        
        
        
        
        
        yourdata = [{"id": 1, "title": "Helllloooooo", "description": "hello here", "completed": True}, {"id": 1, "title": "bla", "description": "hello here", "completed": True}]
        
        serializer = SnippetSerializer(yourdata, many=True).data
        
        print(serializer)
        return JsonResponse(serializer, safe=False)

    def post(self, request, format=None):
        
        serializer = SnippetSerializer(data=request.data)
    
        print(serializer.initial_data)
        if serializer.is_valid():
            print(serializer.data)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
class homepageView(APIView):
    
    def get(self, request, format=None):
        
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Offer")
        offers=cursor.fetchall()
        # print(offers)
        
        offersdata = []
        
        for off in offers:
            type = off[1]
            amount = off[2]
            time = off[3]
            
            row = {'offerType' : type, 'offerAmount' : amount, 'offerTime' : time}
            
            offersdata.append(row)
            
        serializer = OfferSerializer(offersdata, many=True).data
        
        print(serializer)
        
        return JsonResponse(serializer, safe=False)
        
        
    
    
    def post(self, request, format=None):
        
        serializer = SnippetSerializer(data=request.data)
    
        print(serializer.initial_data)
        if serializer.is_valid():
            print(serializer.data)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
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
        
        
        cursor.execute("SELECT * FROM Recharge")
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
        return JsonResponse({
            "rechargeHistory": rechargeserializer,
            "offers*": offerserializer
        })