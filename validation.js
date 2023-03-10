const { ObjectId } = require("mongodb");

module.exports = {
  validValue(input, fieldName) {
    if (!input) throw { status: 400, msg: `Error: ${fieldName} is empty` };
    return input;
  },
  checkString(strVal, varName) {
    if (!strVal) throw { status: 400, msg: `Error: Missing ${varName} input` };
    if (typeof strVal !== "string")
      throw { status: 400, msg: `Error: ${varName} must be a string!` };
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw {
        status: 400,
        msg: `Error: ${varName} cannot be an empty string or string with just spaces`,
      };
    // if (!isNaN(strVal) && varName !== "height")
    //   throw {
    //     status: 400,
    //     msg: `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`,
    //   };
    // if (!/^[A-Za-z ]{1,}$/.test(strVal))
    //   throw {
    //     status: 400,
    //     msg: `Error: Invalid text in ${fieldName}, Please Enter only Alphabets.`,
    //   };
    return strVal.toLowerCase();
  },

  checkPasswordString(strVal, varName) {
    if (!strVal) throw { status: 400, msg: `Error: Missing ${varName} input` };
    if (typeof strVal !== "string")
      throw { status: 400, msg: `Error: ${varName} must be a string!` };
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw {
        status: 400,
        msg: `Error: ${varName} cannot be an empty string or string with just spaces`,
      };
    // if (!isNaN(strVal) && varName !== "height")
    //   throw {
    //     status: 400,
    //     msg: `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`,
    //   };
    // if (!/^[A-Za-z ]{1,}$/.test(strVal))
    //   throw {
    //     status: 400,
    //     msg: `Error: Invalid text in ${fieldName}, Please Enter only Alphabets.`,
    //   };
    return strVal;
  },
  checkId(id) {
    if (!id)
      throw { status: 400, msg: "Error: You must provide an id to search for" };
    if (typeof id !== "string")
      throw { status: 400, msg: "Error: id must be a string" };
    id = id.trim();
    if (id.length === 0)
      throw {
        status: 400,
        msg: "Error: id cannot be an empty string or just spaces",
      };
    if (!ObjectId.isValid(id))
      throw { status: 400, msg: "Error: invalid object ID" };
    return id;
  },

  checkImage(image) {
    if (!image) throw { status: 400, msg: "Error: You must provide an image." };
    if (image.size > 5000000)
      throw { status: 413, msg: "Error: File size limit exceeded" };

    return image;
  },

  checkRating(rating) {
    if (parseInt(rating) < 1 || parseInt(rating) > 5)
      throw { status: 400, msg: "Error: invalid rating" };
    return rating;
  },

  checkPassword(password) {
    let regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!password.match(regex))
      throw {
        status: 400,
        msg: "Error: Password should contain atleast 1 uppercase character, 1 number,1 special character and minimum of 8 characters in length",
      };

    return password;
  },

  checkEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return email;
    }

    throw { status: 400, msg: "Error: Invalid email format" };
  },
  checkAnimal(animal) {
    if (animal == "dog" || animal == "cat") return animal;
    throw { status: 400, msg: "Error: Dont play with dev tools, please!" };
  },
  checkGender(gender) {
    if (gender == "M" || gender == "F") return gender;
    throw { status: 400, msg: "Error: Dont play with dev tools, please!" };
  },
  checkBoolean(bool, fieldName) {
    if (bool == "true" || bool == "false") return bool;
    throw {
      status: 400,
      msg: `Error: Invalid input in ${fieldName}, Please Enter eithe true or false.`,
    };
  },
  checkNumbers(input, fieldName) {
    let regex = /^\d+$/;
    if (input.match(regex)) {
      return input;
    }
    throw {
      status: 400,
      msg: `Error: Invalid number in ${fieldName}, Please Enter only Numbers.`,
    };
  },
  checkAlphabets(input, fieldName) {
    let regex = /^[A-Za-z]+$/;
    if (input.match(regex)) {
      return input;
    }
    throw {
      status: 400,
      msg: `Error: Invalid text in ${fieldName}, Please Enter only Alphabets.`,
    };
  },
  checkAlphabetsWithSpaces(input, fieldName) {
    let regex = /^[a-zA-Z ]*$/;
    if (input.match(regex)) {
      return input;
    }
    throw {
      status: 400,
      msg: `Error: Invalid text in ${fieldName}, Please Enter only Alphabets.`,
    };
  },
};
