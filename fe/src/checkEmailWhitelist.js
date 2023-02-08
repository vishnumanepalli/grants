
const checkEmailWhitelist = (req, res, next) => {
    const { email } = req.body;
    Whitelist.findOne({ email }, (err, whitelist) => {
      if (err) {
        return res.status(500).send({ message: 'Internal server error' });
      }
      if (!whitelist) {
        return res.status(401).send({ message: 'Unauthorized email' });
      }
      next();
    });
  };
  