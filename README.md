# PackMate 🎒

PackMate is an app that helps you manage packing lists for your trips. You can create trips, add items to a global catalog, and track what you've already packed.

## Tech stack
- Node.js
- Express.js
- AJV (for input validation)
- File-based storage (JSON files)

## How to run

1. Clone the repo
2. Install dependencies:
```bash
cd server
npm install
```
3. Start the server:
```bash
node app.js
```
Server runs on http://localhost:8888

## API Endpoints

### Trip
- `GET /trip/list` - Get all trips
- `GET /trip/get?id=` - Get a specific trip
- `POST /trip/create` - Create a new trip
- `POST /trip/update` - Update a trip
- `POST /trip/delete` - Delete a trip
- `POST /trip/addItem` - Add an item to a trip's packing list
- `POST /trip/removeItem` - Remove an item from a trip's packing list
- `POST /trip/updateItemStatus` - Mark an item as packed/unpacked

### Item
- `GET /item/list` - Get all items from the catalog
- `GET /item/get?id=` - Get a specific item
- `POST /item/create` - Add a new item to the catalog
- `POST /item/update` - Update an item
- `POST /item/delete` - Delete an item
