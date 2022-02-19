from rest_framework import serializers

# for user table
class UserSerializer(serializers.Serializer):
        nid = serializers.CharField(max_length=50)
        password = serializers.CharField(max_length=50)
        name = serializers.CharField(max_length=50)
        email = serializers.CharField(max_length=100)
        phoneNo = serializers.CharField(max_length=20)
        address = serializers.CharField(max_length=100)

# for VehicleType table
class VehicleTypeSerializer(serializers.Serializer):
        vtype = serializers.CharField(max_length=50)

# for Vehicle table
class VehicleSerializer(serializers.Serializer):
        vehicleRegNo = serializers.CharField(max_length=50)
        ownerNID = serializers.CharField(max_length=50)
        modelNo = serializers.CharField(max_length=50)
        vehicleType = serializers.CharField(max_length=50)
        balance = serializers.FloatField(default=0)

# for Offer table
class OfferSerializer(serializers.Serializer):
        offerID = serializers.IntegerField()
        offerType = serializers.CharField(max_length=50)
        offerAmount = serializers.FloatField(default=0)
        offerTime = serializers.IntegerField()

# for PaymentGateway table
class PaymentGatewaySerializer(serializers.Serializer):
        gatewayName = serializers.CharField(max_length=50)
        apiSource = serializers.CharField(max_length=200)

# for Recharge table
class RechargeSerializer(serializers.Serializer):
        rechargeID = serializers.IntegerField()
        vehicleRegNo = serializers.CharField(max_length=50)
        gatewayName = serializers.CharField(max_length=50)
        offerID = serializers.IntegerField()
        amount = serializers.FloatField()
        date = serializers.DateTimeField()

# for TollBooth table
class TollBoothSerializer(serializers.Serializer):
        boothID = serializers.IntegerField()
        location = serializers.CharField(max_length=50)
        status = serializers.CharField(max_length=50)

