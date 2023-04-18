const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;
const models = require("./models");
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

//구매하기 해야함
app.get("/products", (req, res) => {
  models.Product.findAll({
    order: [["createdAt", "DESC"]], //order 설정변경가능
    attributes: ["id", "name", "price", "category", "imageUrl", "subimageUrl", "subbimageUrl", "subbbimageUrl", "size", "desc", "option", "soldout", "createdAt"],
  })
    .then((result) => {
      res.send({ products: result });
    })
    .catch((err) => {
      console.error(err);
      res.send("에러발생");
    });
});

app.get("/products/new", (req, res) => {
  models.Product.findAll({
    where: { option: "new" },
  })
    .then((result) => {
      res.send({
        product: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("상품조회시 에러가 발생 했습니다.");
    });
});

app.get("/products/best", (req, res) => {
  models.Product.findAll({
    where: { option: "best" },
  })
    .then((result) => {
      res.send({
        product: result,
      });
    })
    .catch((error) => {
      res.send("상품조회시 에러가 발생 했습니다.");
    });
});

app.get("/products/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  models.Product.findOne({
    where: { id: id },
  })
    .then((result) => {
      console.log(result);
      res.send({
        product: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("상품조회시 에러가 발생 했습니다.");
    });
});

app.get("/products/category/:category", (req, res) => {
  const cate = req.params;
  const { category } = cate;
  models.Product.findAll({
    where: { category: category },
  })
    .then((result) => {
      res.send({
        product: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("상품조회시 에러가 발생 했습니다.");
    });
});

app.post("/image", upload.single("image"), (req, res) => {
  const file = req.file;
  console.log(file);
  res.send({
    imageUrl: file.path,
  });
});

app.post("/products", (req, res) => {
  const body = req.body;
  const { name, price, category, imageUrl, subimageUrl, subbimageUrl, subbbimageUrl, size, desc, option, soldout } = body;
  if (!name || !price || !category || !size || !desc) {
    res.send("모든 필드를 입력해주세요");
  }
  models.Product.create({
    name,
    price,
    category,
    imageUrl,
    subimageUrl,
    subbimageUrl,
    subbbimageUrl,
    size,
    desc,
    option,
    soldout,
  })
    .then((result) => {
      res.send({ result });
    })
    .catch((error) => {
      console.error(error);
      res.send("상품 업로드에 문제가 발생했습니다.");
    });
  //res.send({ body });
});

//review upload page
app.get("/reviews", (req, res) => {
  models.Review.findAll({
    attributes: ["name", "productname", "imageUrl", "desc","id"],
  })
    .then((result) => {
      res.send({ reviews: result });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("에러가 발생했습니다");
    });
});

app.get("/reviews/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  models.Review.findOne({
    where: { id: id },
  })
    .then((result) => {
      console.log(result);
      res.send({
        reviews: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("상품조회시 에러가 발생 했습니다.");
    });
});



app.post("/reviews", (req, res) => {
  const body = req.body;
  const { name, productname, imageUrl, desc } = body;
  if (!name || !productname || !desc) {
    res.send("모든 필드를 입력해주세요");
  }
  models.Review.create({
    name,
    productname,
    imageUrl,
    desc,
  })
    .then((result) => {
      res.send({ result });
    })
    .catch((error) => {
      console.error(error);
      res.send("상품 업로드에 문제가 발생했습니다.");
    });
  //res.send({ body });
});

app.post("/purchase/:id", (req, res) => {
  const { id } = req.params;
  models.Product.update(
    {
      soldout: 1,
    },
    {
      where: { id },
    }
  )
    .then((result) => {
      res.send({
        result: true,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("상품구매에 실패했습니다.");
    });
});

app.get("/banner", (req, res) => {
  models.banner.findAll({
    order: [["createdAt", "DESC"]], //order 설정변경가능
    attributes: ["id", "name", "imgUrl", "desc"],
  })
    .then((result) => {
      res.send({ banner: result });
    })
    .catch((err) => {
      console.error(err);
      res.send("에러발생");
    });
});

app.listen(port, () => {
  console.log("🚩4niture의 쇼핑몰 서버가 돌아가고 있습니다");
  models.sequelize
    .sync()
    .then(() => {
      console.log("👌 DB 연결 성공");
    })
    .catch(function (err) {
      console.error(err);
      console.log("😰 DB 연결 에러");
      process.exit();
    });
});

//method: post, /login 로그인이 완료되었습니다
app.post("/login", (req, res) => {
  res.send("로그인이 완료되었습니다");
});