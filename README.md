# Expense Keeper Web App

Welcome to the Expense Keeper web app! Originally developed during the McHacks11 hackathon, our team aimed to create a user-friendly tool for efficient expense management. While I initially led the front-end development during the hackathon, we encountered challenges that hindered project completion. Subsequently, I revisited the project to rewrite and enhance the backend, resulting in my own backend code available in the `backend2` file. (for comprehension purposes) 

## Features (Work in Progress)

- **Expense Tracking:** Record and categorize your expenses to facilitate better financial management.
- **Customization:** Personalize categories and preferences to suit individual needs.

## How to run (I need to double check these)
- Clone The repository: `git clone `
- Navigate to the backend directory: backend2
- Install FastAPI and Uvicorn: `pip install fastapi uvicorn`
- Run the backend server: `uvicorn main:app --host 127.0.0.1 --port 8000 --reload`
- Open a new terminal window, navigate to the frontend directory: `cd ../frontend`
- Start the frontend server: `python -m http.server`
- Visit 'http://localhost:8000' in your web browser to access the Expense Keeper web app.

## Technologies Used

### Frontend
- HTML
- CSS
- JavaScript (Bootstrap)

### Backend
- FastAPI
- SQLAlchemy

Feel free to explore the code and contribute to the development of this evolving Expense Keeper web app! Your feedback and contributions are highly appreciated.

P.S: I am still getting "TypeError: Failed to fetch" on the web console on some occasions but it works regardless. 

