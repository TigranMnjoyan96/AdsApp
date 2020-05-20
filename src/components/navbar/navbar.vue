<template>
    <div>
        <v-app>
            <v-navigation-drawer app="app" temporary="temporary" v-model="drawer">
                <v-card class="mx-auto" max-width="300" tile="tile">
                    <v-list>
                        <v-list-item-group color="primary">
                            <v-list-item v-for="(item, key) in links" :key="key" :to="item.path">
                                <v-list-item-icon>
                                    <v-icon>{{item.icon}}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>{{item.title}}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item v-if="isUserLoggedIn">
                                <v-list-item-icon>
                                    <v-icon>mdi-logout</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>LogOut</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </v-navigation-drawer>
            <v-app-bar color="blue darken-1 #1E88E5" app="app" dark="dark">

                <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>

                <v-toolbar-title>
                    <router-link tag="span" to="/" class="ad__application">Ad Application</router-link>
                </v-toolbar-title>

                <v-spacer></v-spacer>
                <v-toolbar-items>

                    <v-btn
                        class="hidden-sm-and-down"
                        text="text"
                        v-for="(item, key) in links"
                        :key="key"
                        :to="item.path">
                        <v-icon left="left" large="large">{{item.icon}}</v-icon>
                        {{item.title}}
                    </v-btn>
                    <v-btn @click="onLogOut" text v-if="isUserLoggedIn">
                        <v-icon>mdi-logout</v-icon>
                        LogOut
                    </v-btn>

                </v-toolbar-items>

            </v-app-bar>

            <v-content>
                <router-view></router-view>

            </v-content>
            <template v-if="err">
                <v-snackbar @input="closeErr" :color="'error'" :timeout="5000" :value="true">
                    {{ err }}

                    <v-btn dark="dark" text="text" @click="closeErr">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-snackbar>
            </template>
        </v-app>

    </div>
</template>

<script>
    export default {
        name: "navbar",
        data() {
            return {drawer: false}
        },
        computed: {
            err() {
                return this.$store.getters.error
            },
            isUserLoggedIn() {
                return this.$store.getters.isUserLoggedIn
            },
            links() { 
                if (this.isUserLoggedIn) {
                    return [
                        {
                            title: 'Orders',
                            icon: 'mdi-bookmark-outline',
                            path: '/orders'
                        }, {
                            title: 'New ad',
                            icon: 'mdi-note',
                            path: '/new'
                        }, {
                            title: 'My ads',
                            icon: 'mdi-drag',
                            path: '/list'
                        }
                    ]
                }
                return [
                    {
                        title: 'Login',
                        icon: 'mdi-lock',
                        path: '/login'
                    }, {
                        title: 'Registration',
                        icon: 'mdi-face',
                        path: '/registration'
                    }
                ]
            }
        },
        methods: {
            closeErr() {
                this
                    .$store
                    .dispatch('CLEAR_PHASE')
            },
            onLogOut() {
                this.$store.dispatch('ON_LOG_OUT')
                    this.$router.push('/')
            }
        }
    }
</script>

<style scoped="scoped">
    .ad__application {
        cursor: pointer;
    }
</style>

