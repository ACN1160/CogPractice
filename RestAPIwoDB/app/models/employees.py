from mongoengine import Document, StringField, BooleanField, DateTimeField

class employees(Document):
    first_name = StringField(required = True, max_length = 120)
    last_name = StringField(required = True, max_length = 120)
    email = StringField(required = True, unique = True, max_length = 120)
    hired_date =  DateTimeField()

    meta = {"collection": "employees"}

    def to_dict(self):
        return {
            "id": str(self.id),
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "hired_date": str(self.hired_date),
        }

