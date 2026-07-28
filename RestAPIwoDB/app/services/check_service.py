class CheckingService:
    def __init__(self, repo):
        self._repo = repo

    def get_checkings(self):
        return self._repo.get_all()

    def get_checking(self, checking_id):
        return self._repo.get_by_id(checking_id)
