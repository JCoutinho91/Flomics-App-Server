# Flomics App



This is an app to organize lab sample results for clients ( laboratories ). Show statistics and compare results with the average tendencies.

## User Stories

* **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
* **Signup:** As an anonymous user I can sign up on the platform so that I can acess with general covid stats. Also I can sign up as a Company to get full acess to the app.
* **Login:** As a Company I can login to the platform so that I can access my profile and get access to the app dashboard with all the stats and data. Also I can log in as a 
*          individual to get basic acess to basic stats
* **Logout:** As a logged in user I can logout from the platform so no one else can use it.
* **Profile Page**: As a logged in user I can visit my profile page so that I can access the edit page and see my info and to do list.
* **DashBoard** As a Company i want to be able to have acess to the dashboard that contains an OverView Status, Latest Activity of the User, a to do list, and some basic 
                              statistics.
* **Lab Results:** Data from the lab results send by the company to flomics, displayed in tables and graphs.
* **Data Analysis:** Overview of the statistics for the results from the sequenciation of the samples, comparison with the global data.
* **Send Data for Review:** Submit data for analysis

## Backlog



# Client / Frontend

## React Router Routes (React App)

| Path                         | Component            | Permissions                | Behavior                                                  |
|------------------------------|----------------------|----------------------------|-----------------------------------------------------------|
| `/login`                     | LoginPage            | anon only `<AnonRoute>`    | Login form, navigates to home page after login.           |
| `/signup`                    | SignupPage           | anon only `<AnonRoute>`    | Signup form, navigates to home page after signup.         |
| `/`                          | HomePage             | public `<Route>`           | Home page.                                                |
| `/user-profile`              | ProfilePage          | user only `<PrivateRoute>` | User and player profile for the current user.             |
| `/user-profile/edit`         | EditProfilePage      | user only `<PrivateRoute>` | Edit user profile form.                                   |
| `/tournaments/add`           | CreateTournamentPage | user only `<PrivateRoute>` | Create new tournament form.                               |
| `/tournaments`               | TournamentListPage   | user only `<PrivateRoute>` | Tournaments list.                                         |
| `/tournaments/:tournamentId` | TournamentDetailPage | user only `<PrivateRoute>` | Tournament details. Shows players list and other details. |
| `/tournament/players/:id`    | PlayerDetailsPage    | user only `<PrivateRoute>` | Single player details.                                    |
| `/rankings/:tournamentId`    | RankingsPage         | user only `<PrivateRoute>` | Tournament rankings list.                                 |

## [](https://gist.github.com/ross-u/71e23e7571a90a8d76d6ac97b9304665#components)Components

Pages:

* LoginPage
    
* SignupPage
    
* HomePage
    
* ProfilePage
    
* EditProfilePage
    
* CreateTournamentPage
    
* TournamentListPage
    
* TournamentDetailsPage
    
* PlayerDetailsPage
    
* RankingsPage
    

Components:

* PlayerCard
* TournamentCard
* Navbar

## [](https://gist.github.com/ross-u/71e23e7571a90a8d76d6ac97b9304665#services)Services

* **Auth Service**
    
    * `authService` :
        * `.login(user)`
        * `.signup(user)`
        * `.logout()`
        * `.validate()`

  

# Server / Backend

## Models

**User model**

```js
{
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  CompanyProfile: { type: Schema.Types.ObjectId, ref:'Player' },
  samples: [ { type: Schema.Types.ObjectId, ref:'User Lab Results' } ]
    
}
```

**General Data model**

```js
 {

**Entity:**{type:String, required:true, default: 0 }

**Code:**{type:String, required true, default: 0}

**Day:** {type:date, required:true}

**Beta:** {type:number, required: true, default: 0}

**Epsilon:** {type:number, required: true, default: 0}

**Gama:** {type:number, required: true, default: 0}

**Kappa:** {type:number, required: true, default: 0}

**Iota:** {type:number, required: true, default: 0}

**Eta:** {type:number, required: true, default: 0}

**Delta:** {type:number, required: true, default: 0}

**Alpha:** {type:number, required: true, default: 0}

**non_who:** {type:number, required: true, default: 0}

**Lambda:** {type:number, required: true, default: 0}

**Mu:** {type:number, required: true, default: 0}

**Omicron:** {type:number, required: true, default: 0}

},
```

**Company model**

```js
{
  CompanyName: { type: String, required: true },
  profileImage: { type: String },
  tasks: { type: String, required: true }
}
```
**User Lab Results Mode**

```js
{
  CompanyName: { type: String, required: true },
  Date: { type: String, required: true },
  Type: { type: String, required: true },
  Results: { type: String, required: true },   
}
```
  

## API Endpoints (backend routes)

| HTTP Method | URL              | Request Body            | Success status | Error Status | Description                                                                                                                     |
|-------------|------------------|-------------------------|----------------|--------------|---------------------------------------------------------------------------------------------------------------------------------|
| GET         | `/auth/profile`  | Saved session           | 200            | 404          | Check if user is logged in and return profile page                                                                              |
| POST        | `/auth/signup`   | {name, email, password} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`    | {username, password}    | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| POST        | `/auth/logout`   |                         | 204            | 400          | Logs out the user                                                                                                               |
| GET         | `/api/dashboard` |                         |                | 400          | Show example data for chart                                                                                                     |
| GET         | `/api/profile`   |                         |                |              | Show User Info                                                                                                                  |
| PUT | `/api/profile` | 200 | 404 | edit User Info |
| GET | `/api/:id/analysis` | { name, img, players } | 201 | 400 | Show data from a specific user |
| GET | `/api/:id/results` | { name, img, players } | 200 | 400 | Shows data of the lab results from a specific user |
| POST | `/api/:id/results` | { name, img, players } | 200 | 400 | Send your lab samples to review. |
| PUT | `/api/:id/results` | { name, img, players } | 200 | 400 | Edit your lab samples to review. |
| DELETE | `/api/:id/results` | { name, img, players } | 200 | 400 | Edit your lab samples to review. |

