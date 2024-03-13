export function feathersTus(url) {
  return async function (ctx, next) {
    console.log(url, ctx);
    await next();
  };
}
