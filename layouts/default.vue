<template>
  <v-app>
    <v-responsive :aspect-ratio="16 / 9">
      <v-card
        class="mx-auto overflow-hidden"
        width="100%"
        rounded="0"
        height="100%"
      >
        <v-app-bar color="deep-purple" dark>
          <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

          <v-toolbar-title>App</v-toolbar-title>

          <v-spacer></v-spacer>

          <div class="d-none d-sm-flex">
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn icon @click="expand = !expand">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-expand-x-transition>
              <div v-show="expand">
                <v-text-field
                  solo
                  hide-details
                  class="my-auto"
                  color="blue"
                  style="backgroud-color: white !important"
                  dense
                ></v-text-field>
              </div>
            </v-expand-x-transition>
          </div>
        </v-app-bar>

        <v-navigation-drawer
          v-model="drawer"
          absolute
          mobile-breakpoint="1000"
          temporary
        >
          <v-list nav dense>
            <v-list-item-group
              v-model="group"
              active-class="deep-purple--text text--accent-4"
            >
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Account</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
        <nuxt />
      </v-card>
    </v-responsive>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      expand: false,
      group: '',
      items: [
        { title: "Home", icon: "mdi-view-dashboard" },
        { title: "About", icon: "mdi-forum" },
      ],
    };
  },
};
</script>
<style lang="css">
.v-input__slot {
  background-color: white !important;
}
.v-text-field__slot input {
  color: black !important;
}
</style>