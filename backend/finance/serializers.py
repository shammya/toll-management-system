from rest_framework import serializers


    
class SnippetSerializer(serializers.Serializer):
    
        id = serializers.IntegerField()
        # value = serializers.IntegerField()
        
        title = serializers.CharField(max_length=100)
        description = serializers.CharField()
        completed = serializers.BooleanField(default=False)
        