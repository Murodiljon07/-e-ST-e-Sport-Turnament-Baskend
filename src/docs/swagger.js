import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "E-Sport Tournament API",
    version: "1.0.0",
    description:
      "Full-featured backend API for E-Sport tournaments, clans, teams, and ranking system",
  },
  servers: [
    {
      url: "http://localhost:5000/api",
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "JWT Authorization header using the Bearer scheme.",
      },
    },
    schemas: {
      // User schema
      User: {
        type: "object",
        properties: {
          _id: { type: "string" },
          fullName: { type: "string" },
          nickname: { type: "string" },
          age: { type: "integer" },
          country: { type: "string" },
          email: { type: "string" },
          role: { type: "string", enum: ["player", "admin"] },
          mainGame: { type: "string" },
          games: {
            type: "array",
            items: {
              type: "object",
              properties: {
                game: { type: "string" },
                playerId: { type: "string" },
              },
            },
          },
          rank: {
            type: "object",
            properties: {
              current: {
                type: "string",
                enum: ["E", "D", "C", "B", "A", "S", "SS", "SSS"],
              },
              points: { type: "integer" },
              isManual: { type: "boolean" },
            },
          },
          clan: { type: "string" },
          clanRole: { type: "string", enum: ["leader", "elder", "member"] },
          avatar: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },

      UserRegister: {
        type: "object",
        required: ["fullName", "email", "password", "age", "country", "games"],
        properties: {
          fullName: { type: "string" },
          nickname: { type: "string" },
          email: { type: "string", format: "email" },
          password: { type: "string", format: "password" },
          age: { type: "integer" },
          country: { type: "string" },
          mainGame: { type: "string" },
          games: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                playerId: { type: "string" },
              },
            },
          },
        },
      },

      UserLogin: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", format: "password" },
        },
      },

      // Tournament schema
      Tournament: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          game: { type: "string" },
          description: { type: "string" },
          startDate: { type: "string", format: "date-time" },
          endDate: { type: "string", format: "date-time" },
          rankRestriction: {
            type: "object",
            properties: {
              min: {
                type: "string",
                enum: ["E", "D", "C", "B", "A", "S", "SS", "SSS"],
              },
              max: {
                type: "string",
                enum: ["E", "D", "C", "B", "A", "S", "SS", "SSS"],
              },
            },
          },
          maxParticipants: { type: "integer" },
          participantsCount: { type: "integer" },
          isActive: { type: "boolean" },
        },
      },

      // Participant schema
      Participant: {
        type: "object",
        properties: {
          _id: { type: "string" },
          tournament: { type: "string" },
          user: { type: "string" },
          clan: { type: "string" },
          slot: { type: "integer" },
          roomId: { type: "string" },
          roomPassword: { type: "string" },
          status: { type: "string", enum: ["pending", "accepted", "rejected"] },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },

      // Match schema
      Match: {
        type: "object",
        properties: {
          _id: { type: "string" },
          tournament: { type: "string" },
          participants: {
            type: "array",
            items: { type: "string" },
          },
          roomId: { type: "string" },
          password: { type: "string" },
          map: { type: "string" },
          startTime: { type: "string", format: "date-time" },
          endTime: { type: "string", format: "date-time" },
          isFinished: { type: "boolean" },
        },
      },

      // Team schema
      Team: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          members: {
            type: "array",
            items: { type: "string" },
          },
          clan: { type: "string" },
          tournament: { type: "string" },
          slots: { type: "array", items: { type: "string" } },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },

      // Result schema
      Result: {
        type: "object",
        properties: {
          _id: { type: "string" },
          tournament: { type: "string" },
          match: { type: "string" },
          team: { type: "string" },
          pointsEarned: { type: "integer" },
          rankChange: {
            type: "string",
            enum: ["E", "D", "C", "B", "A", "S", "SS", "SSS"],
          },
          stats: { type: "object", additionalProperties: { type: "number" } },
        },
      },

      // Notification schema
      Notification: {
        type: "object",
        properties: {
          _id: { type: "string" },
          user: { type: "string" },
          title: { type: "string" },
          message: { type: "string" },
          type: {
            type: "string",
            enum: ["tournament_join", "match_ready", "clan_request", "system"],
          },
          isRead: { type: "boolean" },
          meta: { type: "object", additionalProperties: { type: "string" } },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const options = {
  swaggerDefinition,
  apis: ["./src/modules/**/*.routes.js"], // routes da @swagger yozilgan bo'lishi kerak
};

export default swaggerJSDoc(options);
