import jwt from 'jsonwebtoken';

const getUserId = (opts) => {
  const { request, requireAuth = true, authorization } = opts;
  const Authorization = authorization || request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  }

  if (requireAuth) {
    throw new Error('Authentication required');
  }
  return null;
};

export { getUserId as default };
