module.exports = {
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "message": "Project name"
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "Project description",
      "default": "A koa project"
    },
    "author": {
      "type": "string",
      "message": "Author"
    },
  },
  "completeMessage": "To get started:\n\n  Please look to README.md, have fun :) "
};
