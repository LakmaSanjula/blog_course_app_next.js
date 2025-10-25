Add .env file to the root folder 
GOOGLE_ID= 
GOOGLE_SECRET= 
NEXTAUTH_URL=http://localhost:3000 
NEXTAUTH_SECRET= 
DATABASE_URL= 
FIREBASE = 
1. Install dependencies 
npm install 
This will install all dependencies listed in package.json. 
2. Run the development server 
npm run dev 
• Starts the app in development mode. 
• Usually accessible at http://localhost:3000. 
3. Build the project for production 
npm run build 
4. Start the production server 
npm run start 
5. Prisma commands (for database) 
npx prisma generate # Generates Prisma client 
npx prisma migrate dev # Apply migrations to your database 
npx prisma studio 
# Opens Prisma Studio for database GUI 