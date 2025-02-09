# Product Recommendation API

## Overview
This project provides an API for managing users and products, and for generating product recommendations based on user preferences and purchase history. The API is built using Express.js and uses an in-memory storage for simplicity.

## Features
- **User Management:** Create and retrieve users, including their preferences and purchase history.
- **Product Management:** Create and retrieve products.
- **Product Recommendations:** Generate product recommendations for users based on their preferences and purchase history.

## Prerequisites
- Node.js (version 14 or higher)

## Getting Started

### Clone the Repository
```bash
git clone https://github.com/your-username/ProductRecommendationAPI.git
cd ProductRecommendationAPI
```

### Install Dependencies
```bash
npm install
```

### Running the Application
```bash
node server.js
```
The server will start on port 3000 by default. You can access the API at `http://localhost:3000`.

### Running the Application with Docker
```bash
docker build -t productrecommendationapi .
docker run -p 3000:3000 productrecommendationapi
```
The server will start on port 3000 by default. You can access the API at `http://localhost:3000`.

### API Endpoints

#### User Endpoints
- **GET /api/users**: Retrieve all users
  - **Response**:
    ```json
    [
      {
        "id": 1,
        "name": "Ahmed",
        "email": "ahmed@example.com",
        "preferences": {
          "subCategories": [
            "Millefeuille & Profiterole",
            "Cables & Plugs"
          ],
          "brands": [
            "Breadfast"
          ]
        },
        "purchaseHistory": [
          {
            "productId": 1,
            "date": "2024-05-01"
          },
          {
            "productId": 3,
            "date": "2024-04-15"
          },
          {
            "productId": 1,
            "date": "2024-04-10"
          }
        ]
      },
      {
        "id": 2,
        "name": "Mohamed",
        "email": "mohamed@example.com",
        "preferences": {
          "subCategories": [
            "Croissants",
            "Pencils",
            "Cables & Plugs"
          ],
          "brands": [
            "Bic",
            "iLock"
          ]
        },
        "purchaseHistory": [
          {
            "productId": 2,
            "date": "2024-04-20"
          },
          {
            "productId": 4,
            "date": "2024-04-10"
          },
          {
            "productId": 4,
            "date": "2024-04-09"
          },
          {
            "productId": 4,
            "date": "2024-04-08"
          }
        ]
      }
    ]
    ```

- **POST /api/users**: Create a new user
  - **Request Body**:
    ```json
        {
        "name": "Ahmed",
        "email": "ahmed@example.com",
        "preferences": {
            "subCategories": [
                "Millefeuille & Profiterole",
                "Cables & Plugs"
            ],
            "brands": [
                "Breadfast"
            ]
        },
        "purchaseHistory": [
            {
                "productId": "1",
                "date": "2024-05-01"
            },
            {
                "productId": "3",
                "date": "2024-04-15"
            },
            {
                "productId": "1",
                "date": "2024-04-10"
            }
        ]
    }

    ```

- **GET /api/users/:userId**: Retrieve a specific user by ID
  - **Response**:
    ```json
    {
      "id": "user-id",
      "name": "Ahmed",
      "email": "ahmed@example.com",
      "preferences": {
        "subCategories": [
          "Millefeuille & Profiterole",
          "Cables & Plugs"
        ],
        "brands": [
          "Breadfast"
        ]
      },
      "purchaseHistory": [
        {
          "productId": 1,
          "date": "2024-05-01"
        },
        {
          "productId": 3,
          "date": "2024-04-15"
        },
        {
          "productId": 1,
          "date": "2024-04-10"
        }
      ]
    }
    ```

#### Product Endpoints
- **GET /api/products**: Retrieve all products
  - **Response**:
    ```json
    [
      {
        "id": 1,
        "name": "Breadfast Classic Millefeuille Cup",
        "category": "Bakeries & Pastries",
        "subCategory": "Millefeuille & Profiterole",
        "brand": "Breadfast"
      },
      {
        "id": 2,
        "name": "Bic Evolution Black Pencil (12 Pens)",
        "category": "Stationery & Games",
        "subCategory": "Pencils",
        "brand": "Bic"
      },
      {
        "id": 3,
        "name": "iLock 3 Outlet Wall Plug (3500W)",
        "category": "Home",
        "subCategory": "Cables & Plugs",
        "brand": "iLock"
      },
      {
        "id": 4,
        "name": "Breadfast Mini Croissants",
        "category": "Bakeries & Pastries",
        "subCategory": "Croissants",
        "brand": "Breadfast"
      },
      {
        "id": 5,
        "name": "Bic Cristal Original Ballpoint Pen (10 Pens)",
        "category": "Stationery & Games",
        "subCategory": "Pens",
        "brand": "Bic"
      },
      {
        "id": 6,
        "name": "iLock Surge Protector Power Strip",
        "category": "Home",
        "subCategory": "Cables & Plugs",
        "brand": "iLock"
      }
    ]
    ```

- **POST /api/products**: Create a new product
  - **Request Body**:
    ```json
    {
      "name": "Product Name",
      "category": "Category",
      "subCategory": "SubCategory",
      "brand": "Brand"
    }
    ```
  - **Response**:
    ```json
    {
      "id": "generated-uuid",
      "name": "Product Name",
      "category": "Category",
      "subCategory": "SubCategory",
      "brand": "Brand"
    }
    ```

- **GET /api/products/recommendations/:userId**: Get product recommendations for a specific user
  - **Response**:
    ```json
    [
      {
        "id": 1,
        "name": "Breadfast Classic Millefeuille Cup",
        "category": "Bakeries & Pastries",
        "subCategory": "Millefeuille & Profiterole",
        "brand": "Breadfast",
        "relevance": 5
      },
      {
        "id": 3,
        "name": "iLock 3 Outlet Wall Plug (3500W)",
        "category": "Home",
        "subCategory": "Cables & Plugs",
        "brand": "iLock",
        "relevance": 4
      }
    ]
    ```

### Running Tests
The project includes tests written with Jest and Supertest. To run the tests, use the following command:
```bash
npm test
```

### Project Structure
```
ProductRecommendationAPI/
├── data/
│   └── inMemoryDatabase.js  # In-memory storage for products and users
├── routes/
│   ├── products.js          # Product routes
│   └── users.js             # User routes
├── server.js                # Entry point of the application
├── Dockerfile               # Docker configuration
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
```

## Security
The application uses `helmet` for setting various HTTP headers to help protect the app. Make sure to review and configure `helmet` according to your needs.