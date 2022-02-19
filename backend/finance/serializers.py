from email.policy import default
from msilib.schema import ServiceInstall
from rest_framework import serializers


    
class SnippetSerializer(serializers.Serializer):
    
        id = serializers.IntegerField()
        # value = serializers.IntegerField()
        
        title = serializers.CharField(max_length=100)
        description = serializers.CharField()
        completed = serializers.BooleanField(default=False)
        
        


class TollAmount(serializers.Serializer):
        vehicleType = serializers.CharField()
        boothId = serializers.IntegerField()
        amount = serializers.FloatField()
        



class Route(serializers.Serializer):
        routeId = serializers.IntegerField()
        vehicleRegno = serializers.CharField()
        source = serializers.CharField()
        destination = serializers.CharField()
        date = serializers.DateField()
        


class Payment(serializers.Serializer):
        paymentId = serializers.IntegerField()
        vehicleRegno = serializers.CharField()
        routeId = serializers.IntegerField()
        amount = serializers.FloatField()
        date = serializers.DateField()
              
        
class Due(serializers.Serializer):
        reminderId = serializers.IntegerField()
        vehicleRegNo = serializers.CharField()
        boothId = serializers.IntegerField()
        dueAmount = serializers.FloatField()
        paymentId = serializers.IntegerField()
        date = serializers.DateField()
        
        
class Admin(serializers.Serializer):
        adminId = serializers.IntegerField()
        adminPass = serializers.CharField()
        adminEmail = serializers.EmailField()
        adminName = serializers.CharField()
        
class PaidTollList(serializers.Serializer):
        routeId = serializers.IntegerField()
        tollBoothId = serializers.IntegerField()
        isPassed = serializers.BooleanField(default=False)
        