import requests

def post_to_social(data):
    # Replace with actual API logic
    response = requests.post("https://api.example.com/post", json=data)
    return {"status": response.status_code, "response": response.json()}
