export const state = () => ({
  accessToken: "",
  authToken: "",
  contentType: ""
});

export const mutations = {
  setAuthToken(state, data) {
    localStorage.setItem("auth", data);
    state.authToken = data;
  },
  setAccessToken(state, data) {
    localStorage.setItem("access", data);
    state.accessToken = data;
  },
  setContentType(state, position) {
    switch (position) {
      case 0:
        state.contentType = "multipart/form-data";
        break;
      default:
        state.contentType = "application/json";
        break;
    }
  }
};

export const actions = {
  nuxtClientInit({ commit, dispatch }, context) {
    console.log("inició el programa");
    // this.generateAccessToken();
    dispatch("generateAccessToken");
  },
  async generateAccessToken({ commit }) {
    try {
      if (!state.accessToken) {
        let result = await this.$axios.$get("/tg/generate-access-token");

        if (result.code === 100) {
          commit("setAccessToken", result.body.accessToken);
        }
      } else {
        localStorage.setItem("access", state.accessToken);
      }
    } catch (e) {
      console.error("No se consiguió el access: ", e);
    }
  },
  async apiServicesAuth({ commit, dispatch, state }, settings) {
    try {
      let authToken = this.getters.getAuthToken;

      commit("setContentType", settings.contentType);
      //   si el contentType es 0 entonces el valor será multipart/form-data
      //   si se envia otro valor, entonces quedará por defecto como application/json
      //   en dado caso que se quiera agregar un nuevo contentType, solo deberá agregarse en la funcion setContentType con un nuevo case

      settings.form.config = {
        headers: {
          "x-tg-auth-token": authToken,
          "Content-Type": state.contentType 
        },
        timeout: 60000
      };

      if (settings.contentType == 0) {
        let formData = new FormData();

        Object.entries(settings.form.content).map(key => {
          formData.append(key[0], key[1]);
        });

        settings.form.content = formData;
      }

      const result = await dispatch(`crud/${settings.type}`, settings.form);

      return result;
    } catch (e) {
      console.error("Error: ", e);
      if (e.response) {
        if (e.response.data.message) {
          return {
            success: false,
            status: false,
            code: 102,
            message: e.response.data.message,
            error: e
          };
        } else {
          return {
            success: false,
            status: false,
            code: 101,
            message:
              "Ocurrió un error en el servidor. Intente nuevamente más tarde",
            error: e
          };
        }
      } else {
        return {
          success: false,
          status: false,
          code: 101,
          message:
            "Ha tardado demasiado en responder. Intente nuevamente más tarde",
          error: e
        };
      }
    }
  }
};

export const getters = {
  getAccessToken: state => {
    return state.accessToken || localStorage.getItem("access");
  },
  getAuthToken: state => {
    return state.authToken || localStorage.getItem("auth");
  }
};
