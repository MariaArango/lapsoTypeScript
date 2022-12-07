export const courseSchema = {
  id: '/SimpleCourse',
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string', require: true, minLenght: 3, maxLenght: 45 },
    theme: { type: 'string', require: true, minLenght: 2, maxLenght: 45 },
    price: { type: 'number', require: true },
  },
};

export const userSchema = {
  id: 'SimpleUser',
  type: 'object',
  properties: {
    id: { type: 'number' },
    username: { type: 'string', require: true, minLength: 3, maxLength: 45 },
    email: { type: 'string', format: 'email', require: true, maxLength: 45 },
    password: {
      type: 'string',
     
      // pattern: '^(?=w*d)(?=w*[A-Z])(?=w*[a-z])S{8,16}$',
      require: true,
      maxLength: 250,
    },
    rol: {
      type: 'string',
      enum: ['admin', 'user'],
      require: true,
    },
  },
};

export const loginSchema = {
  id: 'SimpleLogin',
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email', require: true, maxLength: 45 },
    password: {
      type: 'string',
      // pattern: '^(?=w*d)(?=w*[A-Z])(?=w*[a-z])S{8,16}$',
      require: true,
      maxLength: 250,
    },
  },
};
