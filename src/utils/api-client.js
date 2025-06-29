const baseUrl = import.meta.env.VITE_BASE_URL || "https://localhost:7148/api";

console.log("🌐 BASE URL:", baseUrl);

const apiClient = {
  get: (url) => request(url, { method: "GET" }),
  post: (url, body = {}) =>
    request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }),
  put: (url, body) =>
    request(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }),
  patch: (url, body) =>
    request(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }),
  delete: (url) =>
    request(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }),
};

const request = async (url, options) => {
  const fullUrl = `${baseUrl}/${url}`;

  console.log("🚀 === INICIO DE REQUEST ===");
  console.log("📍 URL completa:", fullUrl);
  console.log("🔧 Método:", options.method);
  console.log("📦 Body original:", options.body);
  console.log("🏷️ Headers:", options.headers);
  console.log("🍪 Credentials:", options.credentials || "include");

  try {
    const response = await fetch(fullUrl, {
      credentials: "include",
      ...options,
    });

    console.log("📡 === RESPUESTA RECIBIDA ===");
    console.log("📊 Status:", response.status);
    console.log("📝 Status Text:", response.statusText);
    console.log("🏷️ Response Headers:");

    // Mostrar todos los headers de respuesta
    for (const [key, value] of response.headers.entries()) {
      console.log(`   ${key}: ${value}`);
    }

    if (!response.ok) {
      console.log("❌ === ERROR EN RESPUESTA ===");

      // Intentar obtener el cuerpo del error
      let errorBody = null;
      let errorText = "";

      try {
        // Clonar la respuesta para poder leerla múltiples veces

        const contentType = response.headers.get("Content-Type");

        if (contentType && contentType.includes("application/json")) {
          errorBody = await response.json();
          errorText = JSON.stringify(errorBody, null, 2);
          console.log("📄 Error JSON completo:", errorBody);

          // Mostrar errores específicos si existen
          if (errorBody.errors) {
            console.log("🔍 Errores de validación:", errorBody.errors);
          }
          if (errorBody.title) {
            console.log("📋 Título del error:", errorBody.title);
          }
          if (errorBody.detail) {
            console.log("📝 Detalle del error:", errorBody.detail);
          }
        } else {
          errorText = await response.text();
          console.log("📄 Error Text:", errorText);
        }
      } catch (parseError) {
        console.log("⚠️ No se pudo parsear el error:", parseError);
        errorText = "No se pudo obtener detalles del error";
      }

      if (response.status === 401) {
        console.log("🔄 Intentando refresh token...");
        const refreshOk = await refresh();
        if (refreshOk) {
          console.log("✅ Token refreshed, reintentando...");
          return request(url, options);
        }
      }

      // Crear error detallado con toda la información disponible
      const errorMessage = errorBody
        ? errorBody.message ||
          errorBody.error ||
          errorBody.title ||
          JSON.stringify(errorBody)
        : errorText || response.statusText;

      // Crear un error más informativo
      const detailedError = new Error(
        `HTTP ${response.status}: ${errorMessage}`
      );
      detailedError.response = {
        status: response.status,
        statusText: response.statusText,
        data: errorBody || errorText,
      };

      throw detailedError;
    }

    console.log("✅ === RESPUESTA EXITOSA ===");
    const contentType = response.headers.get("Content-Type");

    if (contentType && contentType.includes("application/json")) {
      const jsonResponse = await response.json();
      console.log("📄 Response JSON:", jsonResponse);
      return jsonResponse;
    }

    const textResponse = await response.text();
    console.log("📄 Response Text:", textResponse);
    return textResponse;
  } catch (error) {
    console.log("💥 === ERROR EN FETCH ===");
    console.log("Error completo:", error);
    console.log("Error message:", error.message);
    console.log("Error stack:", error.stack);
    throw error;
  } finally {
    console.log("🏁 === FIN DE REQUEST ===");
  }
};

const refresh = async () => {
  try {
    console.log("🔄 Intentando refresh token...");
    const response = await fetch(`${baseUrl}/refresh`, {
      credentials: "include",
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`Error refreshing token: ${response.statusText}`);
    }

    console.log("✅ Token refreshed successfully");
    return true;
  } catch (error) {
    console.error("❌ Error refreshing token:", error);
    return false;
  }
};

export default apiClient;
