export const actions = {

  async get ({  }, form) {
      let res = await this.$axios.$get(form.url, form.config);
      return res;
  },

  async post ({  }, form) {
      let res = await this.$axios.$post(form.url, form.content, form.config);
      return res;
  },

  async put ({  }, form) {
      let res = await this.$axios.$put(form.url, form.content, form.config);
      return res;
  },

  async delete ({  }, form) {
      let res = await this.$axios.$delete(form.url, form.config);
      return res;
  },

};
