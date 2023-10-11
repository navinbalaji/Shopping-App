export const generateRandomId = () => Math.random().toString(36).slice(2);

export const successBaseResposneModel = (message = null, data = null) => ({
  isSuccess: true,
  message: message,
  data: data,
});

export const failureBaseResposneModel = (message = null, data = null) => ({
  isSuccess: false,
  message: message,
  data: data,
});
