import requests

SERVER = "http://192.168.254.112:3000/message"

while True:
    message = input("Enter message: ")

    try:
        response = requests.post(
            SERVER,
            json={"message": message}
        )

        print(response.text)

    except Exception as e:
        print(e)