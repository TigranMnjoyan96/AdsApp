<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h2 class="text--secondary" mb3>Create New Ad</h2>
                <v-form v-model="valid" ref="form">
                    <v-text-field
                            label="Ad Title"
                            name="title"
                            type="text"
                            v-model="title"
                            :rules="[v => !!v || 'Title is required']"
                    />

                    <v-textarea
                            id="description"
                            label="Ad Description"
                            name="description"
                            type="text"
                            :rules="[v => !!v || 'Description is required']"
                            aria-multiline="true"
                            v-model="description"
                    />
                </v-form>
                <v-layout row>
                    <v-flex xs12 class="mb-3">
                        <v-btn class="warning">
                            <v-icon>mdi-cloud-upload</v-icon>
                            Upload Img
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <img src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg" height="100" alt="">
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-switch v-model="promo" label="Add to promo?">

                        </v-switch>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-spacer />
                        <v-btn class="success" @click="createAd" :disabled="!valid || loader" :loading="loader">
                            Create
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {mapMutations} from 'vuex'
    export default {
        name: "NewAd",
        data() {
            return {
                valid: false,
                title: '',
                description: '',
                promo: false,
            }
        },
        computed: {
            loader() {
                return this.$store.getters.loading
            }
        },
        methods: {
            createAd() {
                if(this.$refs.form.validate()) {
                    const ad = {
                        title: this.title,
                        description: this.description,
                        promo: this.promo,
                        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png'
                    }
                   this.$store.dispatch('ADD_ITEMS', ad)
                    .then(() => {
                        this.$router.push('/list')
                    })
                    .catch(err => {})
                }
            }
        }
    }
</script>

<style scoped>

</style>
