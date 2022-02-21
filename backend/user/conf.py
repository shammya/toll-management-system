#all global login sign up variables here


nid = ''
password = ''
name = ''
email = ''
phoneNo = ''
address = ''
vehicleRegNo = 'DHA-123'
vehicleType = ''
balance = ''
login = False

def logout():
    global nid, password, name, email, phoneNo, address, vehicleRegNo, vehicleType, balance
    nid = ''
    password = ''
    name = ''
    email = ''
    phoneNo = ''
    address = ''
    vehicleRegNo = ''
    vehicleType = ''
    balance = ''
    login = False

def login(nid1, password1, name1, email1, phoneNo1, address1, vehicleRegNo1, vehicleType1, balance1):
    global nid, password, name, email, phoneNo, address, vehicleRegNo, vehicleType, balance
    nid = nid1
    password = password1
    name = name1
    email = email1
    phoneNo = phoneNo1
    address = address1
    vehicleRegNo = vehicleRegNo1
    vehicleType = vehicleType1
    balance = balance1
    login = True