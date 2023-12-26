export const allowAnonymous = async (context, next) => {

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
