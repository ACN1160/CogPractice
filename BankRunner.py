from email.mime import text
import re
class user():
    name = "Empty"
    password = "Empty"

    def __init__(self, name, password):
        self.password = password
        self.name = name

    def updateName(self, name):
        if bankApp.validate(name):
            if name not in bankApp.DB:
                bankApp.DB[name] = bankApp.DB.pop(self.name)
                self.name = name
                return True
            else:
                print("Username already exists")
        else:
            print("Invalid username")
        return False  

    def updatePassword(self, password):
        if bankApp.validate(password):
            bankApp.DB[self.name] = password
            self.password = password
            return True
        else:
            print("Password is not valid")
            return False

class admin(user):
    def __init__(self, name, password):
        super().__init__(name, password)
    def UserList(self):
        print("User List")
        for key, value in bankApp.DB.items():
            print(f"Username: {key}, Password: {value}")


class bankApp():
    DB = {}
    DB["admin"] = "admin123"
    DB["Alice"] = "AE1234"
    DB["Bob"] = "BE1234"
    DB["Charles"] = "CE1234"
    DB["Dawde"] = "DE1234"

    def validate(input):
        if len(input) >= 100:
            return False
        if not re.fullmatch(r'[A-Za-z0-9]+', input):
            return False
        return True
    def printMessage(output):
        print(output)

    def myLogin():
        print("Enter username and password seperated by a space")
        parts = input().split(" ")
        if len(parts) != 2:
            return(None,None)
        name, password = parts
        if bankApp.validate(name) and bankApp.validate(password) and name in bankApp.DB and bankApp.DB[name] == password:
            return(name,password)
        return(None,None)


    def main():    
        bankApp.printMessage("Welcome to this app")
        while True:
            bankApp.printMessage("Would you like to login? (y/n)")
            choice = input()
            if choice == "n":
                break
            elif choice != "y":
                bankApp.printMessage("Invalid choice")
                continue
            name, password = bankApp.myLogin()
            if name is None:
                bankApp.printMessage("Invalid username or password")
                continue
            

            if name is not None:
                bankApp.printMessage("Login successful")
                if user(name,password).name == "admin":
                    bankApp.printMessage("Welcome admin")
                    admin_user = admin(name=name, password=password)
                    bankApp.printMessage("What would you like to do? 1. View User List 2. Exit")
                    choice = input()
                    while(choice != "2"):
                        if choice == "1":
                            admin_user.UserList()
                        else:
                            bankApp.printMessage("Invalid choice")
                        bankApp.printMessage("What would you like to do? 1. View User List 2. Exit")
                        choice = input()

                else:
                    bankApp.printMessage("Welcome user")
                    user_user = user(name=name, password=password)
                    bankApp.printMessage("What would you like to do? 1. Update Username 2. Update Password 3. Exit")
                    choice = input()
                    while(choice != "3"):
                        if choice == "1":
                            while True:
                                bankApp.printMessage("Enter new username")
                                new_name = input()
                                if user_user.updateName(new_name):
                                    break
                        elif choice == "2":
                            while True:  
                                bankApp.printMessage("Enter new password")
                                new_password = input()
                                if user_user.updatePassword(new_password):
                                    break
                        else:
                            bankApp.printMessage("Invalid choice")
                        bankApp.printMessage("What would you like to do? 1. Update Username 2. Update Password 3. Exit")
                        choice = input()
        bankApp.printMessage("Exiting the app")

if __name__ =="__main__":
    bankApp.main()
