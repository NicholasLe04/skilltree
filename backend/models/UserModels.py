class CreateUserRequest:

    def __init__(self, username, password, verified, description) -> None:
        self.username = username
        self.password = password
        self.verified = verified
        self.description = description

class GetUserResponse:

    def __init__(self, username, password, verified, description) -> None:
        self.username = username
        self.password = password
        self.verified = verified
        self.description = description