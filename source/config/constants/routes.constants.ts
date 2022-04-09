export const ROUTES = {
  user: {
    getAll: '/api/users',
    getById: '/api/users/:userId',
    create: '/api/users',
    update: '/api/users/:userId',
    delete: '/api/users/:userId'
  },
  auth: {
    login: '/api/auth/login',
    validate: '/api/auth/validate',
  }

}