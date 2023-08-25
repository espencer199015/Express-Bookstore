const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("./app"); // Replace with the path to your main app file
const expect = chai.expect;

chai.use(chaiHttp);

describe("Book API Integration Tests", () => {
  // Assuming you have a sampleBookData for testing
  const sampleBookData = {
    isbn: "1234567890",
    // ... other properties
  };

  it("should return a list of all books on GET /books", async () => {
    const res = await chai.request(app).get("/books");
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("books").that.is.an("array");
  });

  it("should create a new book on POST /books", async () => {
    const res = await chai.request(app).post("/books").send(sampleBookData);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property("book").that.is.an("object");
  });

  it("should return a single book on GET /books/[isbn]", async () => {
    const res = await chai.request(app).get("/books/1234567890");
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("book").that.is.an("object");
  });

  it("should update a book on PUT /books/[isbn]", async () => {
    const res = await chai.request(app).put("/books/1234567890").send(sampleBookData);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("book").that.is.an("object");
  });

  it("should delete a book on DELETE /books/[isbn]", async () => {
    const res = await chai.request(app).delete("/books/1234567890");
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("message").that.equals("Book deleted");
  });
});