import chai from "chai";
import chaiHttp from "chai-http";
import express from "express";
const expect = chai.expect;
const app = express();

chai.use(chaiHttp);

describe("Cart API", () => {
  describe("POST /api/cart/add", () => {
    it("should add an item to the cart", (done) => {
      const newItem = {
        userId: 1,
        items: [
          {
            itemId: 1,
            quantity: 2,
          },
          {
            itemId: 2,
            quantity: 1,
          },
        ],
        discountCode: null,
      };

      chai
        .request(app)
        .post("/api/cart/add-to-cart")
        .send(newItem)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          done();
        });
    });

    it("should handle errors when adding an item which is out of stock", (done) => {
      const newItem = {
        userId: 2,
        items: [
          {
            itemId: 1,
            quantity: 1,
          },
          {
            itemId: 2,
            quantity: 100,
          },
        ],
        discountCode: null,
      };

      chai
        .request(app)
        .post("/api/cart/add")
        .send(newItem)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an("object");
          done();
        });
    });
  });
});
