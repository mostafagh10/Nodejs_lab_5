exports.confirmbody = (req, res, next) => {
  if (!req.body.title) {
    res.status(404).send('you must write an title in the body');
  } else {
    next();
  }
};

exports.confirmbodyinupdate = (req, res, next) => {
  if ((!req.body.title) && (!req.body.tags) && (!req.body.status)) {
    res.status(404).send('you must write an title or status in the body');
  } else {
    next();
  }
};

exports.confirmuserlogged = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(404).send('the user not authorized to do this function');
  } else {
    next();
  }
};
