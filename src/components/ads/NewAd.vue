<template>
    <v-container>
        <v-layout row="row">
            <v-flex xs12="xs12" sm6="sm6" offset-sm3="offset-sm3">
                <h2 class="text--secondary" mb3="mb3">Create New Ad</h2>
                <v-form v-model="valid" ref="form">
                    <v-text-field
                        label="Ad Title"
                        name="title"
                        type="text"
                        v-model="title"
                        :rules="[v => !!v || 'Title is required']"/>

                    <v-textarea
                        id="description"
                        label="Ad Description"
                        name="description"
                        type="text"
                        :rules="[v => !!v || 'Description is required']"
                        aria-multiline="true"
                        v-model="description"/>
                </v-form>
                <v-layout row="row">
                    <v-flex xs12="xs12" class="mb-3">
                        <v-btn class="warning" @click="downloadImg">
                            <v-icon>mdi-cloud-upload</v-icon>
                            Upload Img
                        </v-btn>
                        <input
                            type="file"
                            ref="fileImg"
                            style="display: none"
                            accept="image/*"
                            @change="changeFile"></v-flex>
                    </v-layout>
                    <v-layout row="row">
                        <v-flex xs12="xs12">
                            <img
                                :src="src"
                                height="100"
                                alt=""
                                v-if="src"
                                ></v-flex>
                        </v-layout>
                        <v-layout row="row">
                            <v-flex xs12="xs12">
                                <v-switch v-model="promo" label="Add to promo?"></v-switch>
                            </v-flex>
                        </v-layout>
                        <v-layout row="row">
                            <v-flex xs12="xs12">
                                <v-spacer/>
                                <v-btn
                                    class="success"
                                    @click="createAd"
                                    :disabled="!valid || !img || loader"
                                    :loading="loader">
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
                    return {valid: false, title: '', description: '', promo: false, img: null, src: ''}
                },
                computed: {
                    loader() {
                        return this.$store.getters.loading
                    }
                },
                methods: {
                    createAd() {
                        if (this.$refs.form.validate() && this.img) {
                            const ad = {
                                title: this.title,
                                description: this.description,
                                promo: this.promo,
                                image: this.img
                            }
                            this
                                .$store
                                .dispatch('ADD_ITEMS', ad)
                                .then(() => {
                                    this
                                        .$router
                                        .push('/list')
                                })
                                .catch(err => {})
                            }
                    },
                    downloadImg() {
                        this
                            .$refs
                            .fileImg
                            .click()
                    },
                    changeFile(e) {
                        const file = e.target.files[0]
                        const reader = new FileReader()
                        reader.onload = e => {
                            this.src = reader.result
                        }
                        reader.readAsDataURL(file)
                        this.img = file
                    }
                }
            }
        </script>

        <style scoped="scoped"></style>
