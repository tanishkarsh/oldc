import requests

response = requests.post(
    "http://127.0.0.1:5000/api/chat",
    json={
        "message": "What is the fee for B.Com?"
    }
)

print(response.status_code)
print(response.json())