# User Management Table Application

This application is a frontend project designed to fetch and display user data in a responsive table format. The users' information is fetched from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/). It allows users to search, sort, and filter data based on user attributes such as name, username, email, and phone number. The project uses **React** with **Redux** and **TypeScript** to ensure type safety and efficient state management.

## Live version

You can view the live version of the application at:

https://user-management-table-beta.vercel.app/

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **Redux Toolkit**: A predictable state container for managing application state.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **CSS Modules**: Local scoped styles to avoid conflicts and improve maintainability.
- **JSONPlaceholder API**: A free fake online REST API for testing and prototyping.

## Installation

**1. Clone the repository:**

   ```bash
   git clone https://github.com/Naygel22/user-management-table.git
   ```
**2. Navigate to the project directory:**
   ```bash
   cd user-management-table
   ```
**3. Install the dependencies:**
   ```bash
   npm install
   ```
**4. Run the app:**
   ```bash
   npm run dev
   ```
## Features

- **Fetch Users Data**: Fetches user data from JSONPlaceholder API.
- **Responsive Design**: The table is fully responsive, adapting to different screen sizes, including mobile views where each column's label and value are displayed stacked for clarity.
- **Dynamic Search**: Each column has its own search input to filter the displayed users dynamically.
- **Sorting**: Users can sort the table by clicking on the column headers.
- **TypeScript**: Ensures type safety throughout the project.
- **Redux State Management**: User data and filter states are managed using Redux, making the application scalable and easier to maintain.

## Challenges

In developing this application, the main goal was to create a responsive and user-friendly interface for managing and viewing user data. 

1. **Responsive Design**: Ensuring the table displayed correctly across all screen sizes presented some challenges. Special attention was required to manage the layout in mobile views, especially with handling column headers and search inputs.
2. **State Management Complexity**: Managing multiple states (e.g., user data, search filters, sorting) in `Redux` could become complex. It required careful planning and structuring of the state slices and actions.


Overall, the project was a valuable learning experience in managing state, handling API data, and designing a responsive UI. In the future improvements can focus on enhancing performance, adding new features, and improving the user experience further.


