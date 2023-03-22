// Reference: About Security: https://github.com/react-boilerplate/react-boilerplate/issues/1744#issuecomment-303112505
export const ENV = {
  development: {
    BASE_API: "http://localhost:8000/v1",
  },
  production: {
    BASE_API: "http://localhost:8000/v1",
  },
  test: {
    BASE_API: "http://localhost:8000/v1",
  },
}[process.env.NODE_ENV];
