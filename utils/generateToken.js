import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  // console.log(token); // Log the generated token

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  // Log the cookies for debugging
  // const cookies = res.getHeaders()["set-cookie"];
  // console.log('Cookies:', cookies);

}; 

export default generateToken;
