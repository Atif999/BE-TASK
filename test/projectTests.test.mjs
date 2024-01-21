import { expect } from "chai";
import request from "supertest";
import bcrypt from "bcrypt";
import { connectDatabase, disconnectDatabase } from "../src/utils/connectDB.js";
import app from "../src/app.js";
import UserModel from "../src/models/user.js";
import ProductModel from "../src/models/product.js";

describe("/deposit, /buy and /product Endpoint Tests", () => {
  let buyerToken;
  let sellerToken;
  let seller;

  before(async () => {
    await connectDatabase();
    const hashedPassword = await bcrypt.hash("buyerPassword", 10);
    const buyer = new UserModel({
      username: "buyerUser",
      password: hashedPassword,
      deposit: 25,
      role: "buyer",
    });
    await buyer.save();

    const hashedPasswordSeller = await bcrypt.hash("sellerPassword", 10);
    seller = new UserModel({
      username: "sellerUser",
      password: hashedPasswordSeller,
      deposit: 0,
      role: "seller",
    });
    await seller.save();

    const product = new ProductModel({
      productId: 1,
      productName: "Test Product",
      cost: 10,
      amountAvailable: 4,
      sellerId: buyer._id,
    });
    await product.save();

    const loginResponse = await request(app)
      .post("/user/login")
      .send({ username: "buyerUser", password: "buyerPassword" });

    const loginResponseSeller = await request(app)
      .post("/user/login")
      .send({ username: "sellerUser", password: "sellerPassword" });

    sellerToken = loginResponseSeller.body.token;

    buyerToken = loginResponse.body.token;

    return Promise.resolve();
  });

  after(async () => {
    await disconnectDatabase();
  });

  describe("PUT /deposit", () => {
    it("should deposit coins successfully", async () => {
      const response = await request(app)
        .put("/vending/deposit")
        .set("Authorization", `Bearer ${buyerToken}`)
        .send({
          coins: 5,
          username: "buyerUser",
        });

      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal("Deposit successful");
      expect(response.body.deposit).to.equal(30);
    });

    it("should handle invalid coins", async () => {
      const response = await request(app)
        .put("/vending/deposit")
        .set("Authorization", `Bearer ${buyerToken}`)
        .send({
          coins: 8,
          username: "buyerUser",
        });

      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal(
        `"coins" must be one of [5, 10, 20, 50, 100]`
      );
    });
  });

  describe("PUT buy", () => {
    it("should successfully buy a product", async () => {
      const response = await request(app)
        .put("/vending/buy")
        .set("Authorization", `Bearer ${buyerToken}`)
        .send({
          username: "buyerUser",
          productId: 1,
          amount: 2,
        });

      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal("Purchase successful");
      expect(response.body.product).to.equal("Test Product");
    });

    it("should handle insufficient funds", async () => {
      const response = await request(app)
        .put("/vending/buy")
        .set("Authorization", `Bearer ${buyerToken}`)
        .send({
          productId: 1,
          username: "buyerUser",
          amount: 2,
        });

      expect(response.body.message).to.equal("Insufficient funds");
    });
  });

  describe("POST product", () => {
    it("should create a product successfully for a seller user", async () => {
      const response = await request(app)
        .post("/product/")
        .set("Authorization", `Bearer ${sellerToken}`)
        .send({
          productId: 2,
          productName: "New Product",
          cost: 15,
          amountAvailable: 3,
        });

      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal("Product created successfully");

      // Verify that the product is stored in the database
      const createdProduct = await ProductModel.findOne({ productId: 2 });
      expect(createdProduct).to.exist;
      expect(createdProduct.productName).to.equal("New Product");
      expect(createdProduct.cost).to.equal(15);
      expect(createdProduct.amountAvailable).to.equal(3);
      expect(createdProduct.sellerId.toString()).to.equal(
        seller._id.toString()
      );
    });

    // Attempt to create a product as a non-seller user
    it("should handle creating a product for a non-seller user", async () => {
      const response = await request(app)
        .post("/product/")
        .set("Authorization", `Bearer ${buyerToken}`)
        .send({
          productId: 3,
          productName: "Invalid Product",
          cost: 20,
          amountAvailable: 5,
        });

      expect(response.status).to.equal(401);
      expect(response.body.message).to.equal(
        "You are not allowed to access products!"
      );
    });
  });
});
