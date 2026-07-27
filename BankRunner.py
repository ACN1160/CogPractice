class user():
    name = "Empty"
    password = "Empty"

    def __init__(self, name, password):
        self.password = password
        self.name = name

class admin(user):
    def __init__(self, name, password):
        super().__init__(name, password)
    def UserList(self):
        print("User List")
        for key in bankApp.DB:
            print(key)


class bankApp():
    DB = {}
    DB["admin"] = "admin123"
    DB["Alice"] = "AE1234"
    DB["Bob"] = "BE1234"
    DB["Charles"] = "CE1234"
    DB["Dawde"] = "DE1234"

    def printMessage(output):
        print(output)
    def myLogin():
        print("Enter username and password seperated by a space")
        name,password = input().split(" ")
        if name in bankApp.DB and bankApp.DB[name] == password:
            return(name,password)
        else:
            return(None,None)


    def main():    
        bankApp.printMessage("Welcome to this app")
        name, password = bankApp.myLogin()
        if name is not None:
            bankApp.printMessage("Login successful")
            if user(name,password).name == "admin":
                bankApp.printMessage("Welcome admin")
                admin(name=name, password=password).UserList()
            else:
                bankApp.printMessage("Welcome user")
                user(name=name, password=password)
        else:
            bankApp.printMessage("Login failed")


if __name__ =="__main__":
    bankApp.main()
