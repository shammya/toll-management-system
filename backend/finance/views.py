from django.shortcuts import render
from django.http import HttpResponse
from django.db import connection


# Create your views here.

def index(request):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM PaidTollList")
    ROW=cursor.fetchall()
    #ROW="hello"
        #print(object.content)
    return HttpResponse(ROW)