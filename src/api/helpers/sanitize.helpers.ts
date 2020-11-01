export const sanitizeRequestParams = (body: any) => ({
  ...body,
  password: body?.password?.replace(/./g, '*'),
});
