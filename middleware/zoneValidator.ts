import { type Schema } from "express-validator";
import sequelize from "../models";
import { zoneController } from "../controller";

export const validationRules: Record<keyof typeof zoneController, Schema> = {
  
  create: {
    label: {
      in: "body",
      isString: {
        errorMessage: "Label must be a string",
      },
      notEmpty: {
        errorMessage: "Label is required",
      },
      custom: {
        options: async (value) => {
          const exists = await sequelize.sequelize.model("Zone").findOne({ where: { label: value } });
          if (exists) {
            throw new Error("A zone with this label already exists");
          }
          return true;
        },
      },
    },
  },

  get: {
    id: {
      in: "params",
      isInt: {
        errorMessage: "ID must be an integer",
      },
      toInt: true,
      custom: {
        options: async (value) => {
          const exists = await sequelize.sequelize.model("Zone").findByPk(value);
          if (!exists) {
            throw new Error("Zone with this ID does not exist");
          }
          return true;
        },
      },
    },
  },

  update: {
    id: {
      in: "params",
      isInt: {
        errorMessage: "ID must be an integer",
      },
      toInt: true,
      custom: {
        options: async (value) => {
          const exists = await sequelize.sequelize.model("Zone").findByPk(value);
          console.log("id validation triggered");
          if (!exists) {
            throw new Error("Zone with this ID does not exist");
          }
          return true;
        },
      },
    },
    label: {
      in: "body",
      optional: true,
      isString: {
        errorMessage: "Label must be a string",
      },
      notEmpty: {
        errorMessage: "Label cannot be empty if provided",
      },
      custom: {
        options: async (value) => {
          if (typeof value !== "string") {
            throw new Error("Label must be a string");
          }
          const exists = await sequelize.sequelize.model("Zone").findOne({ where: { label: value } });
          console.log("label validation triggered");
          if (exists) {
            throw new Error("A zone with this label already exists");
          }
          return true;
        },
      },
    },
  },  

  delete: {
    id: {
      in: "params",
      isInt: {
        errorMessage: "ID must be an integer",
      },
      toInt: true,
      custom: {
        options: async (value) => {
          const exists = await sequelize.sequelize.model("Zone").findByPk(value);
          if (!exists) {
            throw new Error("Zone with this ID does not exist");
          }
          return true;
        },
      },
    },
  },

  getAll: {
    limit: {
      in: "query",
      optional: true,
      isInt: {
        options: { min: 1 },
        errorMessage: "Limit must be an integer greater than 0",
      },
      toInt: true,
    },
    offset: {
      in: "query",
      optional: true,
      isInt: {
        options: { min: 0 },
        errorMessage: "Offset must be a non-negative integer",
      },
      toInt: true,
    },
  }
  
};
