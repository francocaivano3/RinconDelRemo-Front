export const determineUserType = (userInfo) => {
  if (!userInfo) return null;

  // Si tiene roles, usamos el primero (para admin y encargado)
  if (userInfo.roles && userInfo.roles.length > 0) {
    return userInfo.roles[0].toLowerCase(); // "admin" o "encargado"
  }

  // Si tiene tipo, usamos el tipo (para cliente y duenio)
  if (userInfo["Tipo de usuario"]) {
    const tipo = userInfo["Tipo de usuario"];
    if (tipo.toLowerCase() === "cliente") return "cliente";
    if (tipo.toLowerCase() === "dueniokayak") return "dueniokayak";
  }

  return null;
};
