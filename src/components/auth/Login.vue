<template>

    <v-container class="fill-height" fluid="fluid">
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark="dark" flat="flat">
                        <v-toolbar-title>Login form</v-toolbar-title>
                        <v-spacer/>

                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" ref="form">
                            <v-text-field
                                label="Email"
                                name="email"
                                prepend-icon="mdi-account"
                                type="email"
                                v-model="email"
                                :rules="emailRules"/>

                            <v-text-field
                                id="password"
                                label="Password"
                                name="password"
                                prepend-icon="mdi-lock"
                                type="password"
                                :rules="passwordRules"
                                v-model="password"/>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                            color="primary"
                            @click="onSubmit"
                            :disabled="!valid || loading"
                            :loading="loading">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                email: '',
                password: '',
                valid: false,
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
                ],
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => (v && v.length >= 6) || 'Password must be equal or more than 6 characters'
                ]
            }
        },
        computed: {
            loading() {
                return this.$store.getters.loading
            }
        },
        methods: {
            onSubmit() {
                const user = {
                    email: this.email,
                    password: this.password
                }
                if (this.$refs.form.validate()) {
                    this
                        .$store
                        .dispatch('login', user)
                        .then(() => this.$router.push('/'))
                        .catch(err => {} )
                    }
            }
        },
        created() {
            if(this.$route.query['loginError']) {
                this.$store.dispatch('ERROR_PHASE', 'Please log in to access this page')
            }
        }
    }
</script>

<style scoped="scoped"></style>