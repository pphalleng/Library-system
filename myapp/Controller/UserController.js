const { PrismaClient } = require("@prisma/client");
const jwtUtils = require("../utils/jwtUtils");
const primsa = new PrismaClient();
const bcrypt = require("bcrypt");

const getMyProfile = async (req, res) => {
  const loginId = req.userId;
  if (loginId)
    return res.send(await primsa.user.findUnique({ where: { id: loginId } }));
  else {
    return res.status(401).send({ message: "You are not login" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const username = email;
  console.log(username, password);
  
  const foundUser = await primsa.user.findFirst({ where: { username } });
  
  if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
      const token = jwtUtils.issueToken({ id: foundUser.id })
      console.log(token);
    res.cookie("token", token, { maxAge: 99999999 });
    res.send({
      message: "Login success",
      token: token,
    });
  } else {
    res.status(401).send({
        message: "error: Authentication",
    });
  }
};

const createNewUser = async (request, response) => {
  console.log({ body: request.body });
  const body = request.body;
  console.log({ body });
  const { email, password } = body;
  const username = email;
  const salt = bcrypt.genSaltSync(Math.random() * 10);
  const newUsers = {
    username: username,
    password: bcrypt.hashSync(password, salt),
  };
  const createdUser = await primsa.user.create({
    data: newUsers,
  });
  response.status(201).send({
    message: "Success Created",
    result: createdUser,
  });
};
const updatePassword = async (req, res) => {
  const { body, params } = req;
  console.log({ params });
  const id = parseInt(params.id);
  const { password } = body;
  await primsa.user.update({ data: { password }, where: { id: id } });
  // const findUser = await primsa.user.findUnique({where: { id}});
  // findUser.password = password;
  // await primsa.user.update({ data: findUser, where: { id: id}})
  // findUser.
  // userData.forEach(user => {
  //   if(user.id === id){
  //     user.password = password
  //   }
  // });
  res.status(204).send();
};

const deleteUserById = async (req, res) => {
  const { body, params } = req;
  console.log({ params });
  const id = parseInt(params.id);
  await primsa.user.delete({ where: { id } });
  res.status(204).send();
};
module.exports = {
  login,
  createNewUser,
  updatePassword,
  deleteUserById,
  getMyProfile,
};
