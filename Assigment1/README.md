# Family Portal

## Overview

A portal for managing families, including CRUD operations for managing family details and members.

## Installation

1. Install the project dependencies with `npm install`.
2. Run the server with `npm start`.

## CRUD Operations

### List of Families

- **GET /families**: Get a list of all families.
- **GET /families/{familyId}**: Get family details by ID.
- **GET /families/{familyId}/members**: Get a list of family members by ID.

### Create a Family

- **POST /families**: Create a new family. Send a JSON body with the relevant fields.

### Update a Family

- **PUT /families/{familyId}**: Update family details by ID. Send a JSON body with the updated information.

### Delete a Family

- **DELETE /families/{familyId}**: Delete a family by ID.

## Code Overview

The code includes an HTTP server built with Node.js and utilizes the NPM module `familyService` for managing families in a JSON file.

#### בעברית

# Family Portal

## סקירה

פורטל לניהול משפחות, הכולל פעולות CRUD לניהול פרטי משפחות וחבריהן.

## התקנה

1. התקן את התלחצות הפרויקט עם `npm install`.
2. הפעל את השרת עם `npm start`.

## פעולות CRUD

### רשימת משפחות

- **GET /families**: קבלת רשימת כל המשפחות.
- **GET /families/{familyId}**: קבלת פרטי משפחה לפי זיהוי.
- **GET /families/{familyId}/members**: קבלת רשימת חברי משפחה לפי זיהוי.

### יצירת משפחה

- **POST /families**: יצירת משפחה חדשה. יש לשלוח גוף בפורמט JSON עם שדות המתאימים.

### עדכון משפחה

- **PUT /families/{familyId}**: עדכון פרטי משפחה לפי זיהוי. יש לשלוח גוף בפורמט JSON עם המידע המעודכן.

### מחיקת משפחה

- **DELETE /families/{familyId}**: מחיקת משפחה לפי זיהוי.

## סקירת קוד

הקוד כולל שרת HTTP בנוי ב-Node.js ומשתמש במודול NPM של `familyService` לניהול המשפחות בקובץ JSON.
