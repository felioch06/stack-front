<template>
  <div>
    <h1>Hola Mundo</h1>
    <v-text-field v-model="id" solo placeholder="id"></v-text-field>
    <v-text-field v-model="form.name" solo placeholder="name"></v-text-field>
    <v-text-field v-model="form.image" placeholder="image" solo></v-text-field>
    <v-btn @click="get" color="success">get</v-btn>
    <v-btn @click="post" color="success">post</v-btn>
    <v-btn @click="put" color="success">put</v-btn>
    <v-btn @click="deleted" color="success">delete</v-btn>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      id: "",
      form: {
        name: "",
        image: "",
      },
      errorData: {},
    };
  },
  mounted() {
    let response = this.$store.dispatch("nuxtClientInit");
  },
  methods: {
    get() {
      this.$store
        .dispatch("apiServicesAuth", {
          type: "get",
          form: {
            url: `/cat/${this.id}`,
          },
        })
        .then((result) => {
          if (result.success === true) {
            if (result.code === 100) {
              console.log(result);
            } else {
              this.showError(result.message);
            }
          } else {
            this.showError(result.message);
          }
        });
    },
    post() {
      this.$store
        .dispatch("apiServicesAuth", {
          type: "post",
          form: {
            content: this.form,
            url: "/cat",
          },
        })
        .then((result) => {
          if (result.success === true) {
            if (result.code === 100) {
              console.log(result);
            } else {
              this.showError(result.message);
            }
          } else {
            this.showError(result.message);
          }
        });
    },
    put() {
      this.$store
        .dispatch("apiServicesAuth", {
          type: "put",
          contentType: 0,
          form: {
            content: this.form,
            url: `/cat/${this.id}`,
          },
        })
        .then((result) => {
          if (result.success === true) {
            if (result.code === 100) {
              console.log(result);
            } else {
              this.showError(result.message);
            }
          } else {
            this.showError(result.message);
          }
        });
    },
    deleted() {
      this.$store
        .dispatch("apiServicesAuth", {
          type: "delete",
          form: {
            url: `/cat/${this.id}`,
          },
        })
        .then((result) => {
          if (result.success === true) {
            if (result.code === 100) {
              console.log(result);
            } else {
              this.showError(result.message);
            }
          } else {
            this.showError(result.message);
          }
        });
    },
    showError(message) {
      this.errorData = {
        showError: true,
        message,
      };
    },
  },
};
</script>
