export const allowAnonymous = async (context, next) => {
  console.log(`Running hook allow-anonymous on ${context.path}.${context.method}`);

  const { params } = context;
  if (params.provider && !params.authentication) {
    context.params = {
      ...params,
      authentication: {
        strategy: 'anonymous'
      }
    };
  }

  await next();
};
