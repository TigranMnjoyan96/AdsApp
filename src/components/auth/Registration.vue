<template>

    <v-container
            class="fill-height"
            fluid
    >
        <v-row
                align="center"
                justify="center"
        >
            <v-col
                    cols="12"
                    sm="8"
                    md="4"
            >
                <v-card class="elevation-12">
                    <v-toolbar
                            color="primary"
                            dark
                            flat
                    >
                        <v-toolbar-title>Registration form</v-toolbar-title>
                        <v-spacer />

                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" ref="form">
                            <v-text-field
                                    label="Email"
                                    name="email"
                                    prepend-icon="mdi-account"
                                    type="email"
                                    v-model="email"
                                    :rules="emailRules"
                            />

                            <v-text-field
                                    id="password"
                                    label="Password"
                                    name="password"
                                    prepend-icon="mdi-lock"
                                    type="password"
                                    :rules="passwordRules"
                                    v-model="password"
                            />
                            <v-text-field
                                id="confirm"
                                label="confirm"
                                name="confirm"
                                prepend-icon="mdi-lock"
                                type="password"
                                :rules="confirmPasswordRules"
                                v-model="confirm"
                            />

                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn color="primary"
                               @click="onSubmit"
                               :disabled="!valid || loading"
                               :loading="loading"
                        >Create Account</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "Login",
        data() {
            return {
                email: '',
                password: '',
                valid: false,
                confirm: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => (v && v.length >= 6) || 'Password must be equal or more than 6 characters'
                ],
                confirmPasswordRules: [
                    v => !!v || 'Password is required',
                    v => v === this.password  || 'Password should match'
                ]
            }
        },
        computed: {
            loading() {
                return this.$store.getters.loading
            }
        },
        methods: {
            ...mapActions(['REGISTER_USER']),
            onSubmit() {
                const user = {
                    email: this.email,
                    password: this.password
                }
                if(this.$refs.form.validate()) {
                    this.REGISTER_USER(user)
                        .then(() => {
                            this.$router.push('/')
                        })
                        .catch(err => {})
                }
            },
        }
    }
</script>

<style scoped>

</style>
