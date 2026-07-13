import requests

response = requests.post(
    const API_URL = "https://oldc.onrender.com/api/chat";,
    json={
        "message": "What is the fee for B.Com?"
    }
)

print(response.status_code)
print(response.json())