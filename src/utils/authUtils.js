export const determineUserType = (userInfo) => {
  if (!userInfo) return null;

  if (userInfo.tipo) return userInfo.tipo;
  if (userInfo["Tipo de usuario"]) return userInfo["Tipo de usuario"];
  if (userInfo.roles && userInfo.roles.length > 0) return userInfo.roles[0];

  return null;
};
