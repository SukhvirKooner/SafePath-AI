# SafePath AI

SafePath AI is a React Native mobile application that helps users find safe routes between locations. The application uses AI to analyze route safety and provides users with the safest path to their destination.

## Features

- User authentication (login/signup)
- Route submission and history
- AI-powered route safety analysis
- Interactive maps with Google Maps integration
- Real-time route tracking
- Route history management

## Tech Stack

### Frontend
- React Native
- TypeScript
- Axios for API calls
- AsyncStorage for local storage
- React Native Maps

### Backend
- FastAPI (Python)
- PostgreSQL
- SQLAlchemy ORM
- JWT Authentication
- Docker

## Prerequisites

- Node.js (v14 or higher)
- Python 3.8+
- Docker and Docker Compose
- React Native development environment setup
- PostgreSQL (if running locally)

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
```
Edit the `.env` file with your configuration.

5. Start the backend using Docker:
```bash
docker-compose up
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the project root:
```bash
cd SafePath-AI
```

2. Install dependencies:
```bash
npm install
```

3. Start the Metro bundler:
```bash
npm start
```

4. Run the app:
```bash
# For iOS
npm run ios

# For Android
npm run android
```

## API Documentation

Once the backend is running, you can access the API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/safepath
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend (src/services/api.ts)
Update the `API_URL` in `src/services/api.ts` if your backend is running on a different URL.

## Project Structure

```
SafePath-AI/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── crud/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── utils/
│   ├── Dockerfile
│   └── docker-compose.yml
├── src/
│   ├── components/
│   ├── screens/
│   ├── services/
│   └── utils/
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@safepath.ai or open an issue in the repository.
