class SavingsService:
    def __init__(self, repo):
        self._repo = repo

    def get_savings(self):
        return self._repo.get_all()

    def get_saving(self, saving_id):
        return self._repo.get_by_id(saving_id)
