# API Documentation

## Endpoints

### POST /api/chat
Send a chat message

**Request:**
```json
{
  "message": "రేపు వర్షం పడుతుందా?",
  "language": "te",
  "userId": "user_id"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Response in Telugu",
    "confidence": 0.9,
    "sources": ["Telangana Weather"]
  }
}
```

### GET /api/weather
Get weather data for a district

### POST /api/auth/login
Authenticate user
