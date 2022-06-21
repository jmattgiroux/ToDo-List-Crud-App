# ToDo-List-Crud-App

## Description

- Project is organized by features, which in turn use the MVC model internally.
  This allows individual features to be removed or updated without interfering
  with other features.

## Background Reading

- Best Practices:
  https://blog.logrocket.com/the-perfect-architecture-flow-for-your-next-node-js-project/
- Organizing Project Files by Feature
  - https://www.planetgeek.ch/2012/01/25/3077/
  - https://blog.risingstack.com/node-hero-node-js-project-structure-tutorial/

## Development

### Environment Setup

- Node is installed in the development environment.

### Project Setup

- Clone repository
- run the following commands

```
$ npm install
$ npm run start
```

### Deployment

## Project Requirements

### This is an independent project that you will complete as you do your personal assignments for lessons 5-8 in this course.

- You get to choose what this project is
- Database should store at least two collections
- At least one collection should store documents that have 7 fields or more
- Node project successfully connects to MongoDB
- API routes perform GET, POST, PUT, DELETE requests that are fully functional
- All routes should include data validation and error handling
- Project must incorporate use of OAuth for user management.
- API Documentation is professional, comprehensive, relevant, and accurate
- API is published to Heroku and can be called from external sources
- Youtube video demonstration of roughly 1 minute demonstrating each API route
  in API documentation, and showing the database being modified.
- Submit the following links in I-learn: GitHub repo, Heroku site, and Youtube
  video.

### Grading Criteria

- Your assignment will receive a zero if it doesn't have a Youtube link, a
  GitHub link, AND a Heroku link submitted in I-learn.
- Your assignment will receive a zero if any type of cheating takes place.

### Extra Credit Opportunity

- 20% for using GraphQL instead of REST
- 20% for using valid TypeScript for your entire Node project
- Discuss details with your instructor

### The grading breakdown is depicted in the rubric below

#### 20%

- Deployed to the Web
  - Node.js app successfully deployed to Heroku and connects to MongoDB using
    config vars. Student also went above and beyond (for example, minified or
    obfuscated code)

#### 20%

- OAuth
  - OAuth is incorporated in professional manner. All relevant routes are
    secured.

#### 15%

- Database -The database is well organized, has multiple collections, and
  relatively complex documents (see description above)

#### 15%

- HTTP Requests
  - GET, POST, PUT, and DELETE requests are fully functional and professionally
    written. Includes several requests of each type

#### 10%

- API Documentation
  - API project as a whole is documented; all API routes are accurately
    documented in the API documentation; requests can run from the docs; docs
    are professional

#### 10%

- Error Handling
  - Every API route handles errors gracefully and professionally, accounting for
    multiple different types of potential errors

#### 10%

- Data Validation
  - Data validation is concise, precise and professional. All data retrieved
    from API requests is validated before processing requests or sending
    anything to database
