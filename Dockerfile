FROM node:22.15.0-alpine
WORKDIR /app 
COPY package*.json ./
ARG NODE_ENV=production
RUN if 
RUN npm install 
COPY . . 
EXPOSE 3000
CMD ["npm", "run", "dev"]
