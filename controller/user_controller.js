const db = require("../model/index");
const Users = db.users;

exports.createUserSurvey = async (req, res, next) => {
  try {
    const { name, phone, address, gender, jobtitle, age, remark } = req.body;

    if (!name) {
      return res.status(400).json({
        status: "fail",
        message: "Name is required",
      });
    }

    const user = {
      name,
      phone,
      address,
      gender,
      jobtitle,
      age,
      remark,
    };

    const data = await Users.create(user);

    res.status(200).json({
      status: "success",
      message: "Successfully created user survey",
      data,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "error",
      message: `Error: ${e.message}`,
    });
  }
};

exports.getAllUserSurvey = async (req, res, next) => {
  try {
    await Users.findAll({}).then((data) => {
      res.status(200).json({
        status: "success",
        message: "Successfully got user survey",
        data,
      });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "error",
      message: `Error: ${e.message}`,
    });
  }
};

exports.getUserSurveyByID = async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        status: "fail",
        message: "ID is required",
      });
    }

    const data = await Users.findOne({
      where: { id: id },
    });

    if (!data) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully retrieved user survey",
      data,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "error",
      message: `Error: ${e.message}`,
    });
  }
};

exports.updateAllUserSurvey = async (req, res, next) => {
  try {
    const { id, name, phone, address, gender, jobtitle, age, remark } =
      req.body;

    if (!name) {
      return res.status(400).json({
        status: "fail",
        message: "Name is required",
      });
    }
    if (!id) {
      return res.status(400).json({
        status: "fail",
        message: "ID is required",
      });
    }

    const [updated] = await Users.update(
      { name, phone, address, gender, jobtitle, age, remark },
      {
        where: { id: id },
      }
    );

    if (updated) {
      const updatedUser = await Users.findByPk(id);
      return res.status(200).json({
        status: "success",
        message: "Successfully updated user survey",
        data: updatedUser,
      });
    } else {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID or no changes made",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "error",
      message: `Error: ${e.message}`,
    });
  }
};

exports.deleteOneuserSurvey = async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        status: "fail",
        message: "ID is required",
      });
    }

    // `destroy` returns the number of rows affected
    const deleted = await Users.destroy({
      where: { id: id },
    });

    console.log(`delete >>>> ${deleted}`);

    if (deleted > 0) {
      return res.status(200).json({
        status: "success",
        message: "Successfully deleted user survey",
      });
    } else {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID or no user found to delete",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "error",
      message: `Error: ${e.message}`,
    });
  }
};
