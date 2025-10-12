# Fesnuk API Backend

This is the backend service for the Fesnuk application, built using .NET 8 Web API and PostgreSQL.

---

## Getting Started

### Prerequisites

Make sure you have the following software installed:
* [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
* [PostgreSQL](https://www.postgresql.org/download/)
* [Git](https://git-scm.com/)

### Installation & Configuration

1. **Clone this repository:**
```bash
git clone [YOUR_GITHUB_REPO_URL]
cd FesnukWeb8.1/Backend
```

2. **Database Connection Configuration:**
*Open the `Fesnuk.API/appsettings.Development.json` file.
* Change the `ConnectionStrings` to match your local PostgreSQL configuration.
```json
"ConnectionStrings": {
"DefaultConnection": "Host=localhost;Port=5432;Database=FesnukDb;Username=postgres;Password=YOURPASSWORD"
}
```

3. **Install Dependencies & Create Database:**
* Open a terminal inside the `Fesnuk.API` folder.
* Run the following commands to install all required packages and apply the initial schema to your database.
```bash
dotnet restore
dotnet ef database update
```

### Running the Application

1. Open a terminal inside the `Fesnuk.API` folder.
2. Run the command:
```bash
dotnet run
```
3. The API will run on `https://localhost:7xxx` and `http://localhost:5xxx`.

---

## Project Structure (Fesnuk.API)

* **/Controllers**: The entry point for all API requests.
* **/DTOs**: (Data Transfer Objects) Objects used as data "contracts" for API requests and responses.
* **/Models**: Representation of data entities that will be mapped to tables in the database.
* **/Data**: Contains the `DbContext` that acts as a bridge between the application and the database.
* **/Migrations**: A history of database schema changes managed by Entity Framework Core.
* **/Services**: (Not yet used) A place to store the main business logic to keep the Controller streamlined.

---

## 🔑 API Endpoints (Current)

### Authentication

* **`POST /api/auth/register`**: Registering a new user.
* **Body (JSON):**
```json
{
"username": "new_user",
"email": "email@baru.com",
"password": "PasswordMinimal8Characters"
}
```