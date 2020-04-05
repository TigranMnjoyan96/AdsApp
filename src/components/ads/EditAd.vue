<template>
    <v-dialog v-model="dialog" persistent max-width="400">
      <template v-slot:activator="{ on }">
        <v-btn color="warning" dark v-on="on" v-if="isOwner">Edit</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
            <h2>Edit Ad</h2>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-text-field
                                label="Title"
                                name="title"
                                type="text"
                                v-model="editTitle"/>
                                    <v-text-field
                                label="Description"
                                name="description"
                                type="text"
                                v-model="editDescription"/>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="warning"  @click="dialogDis">Disagree</v-btn>
          <v-btn class="success" text @click="dialogAgree">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import {mapGetters} from 'vuex'
    export default {
        name: "EditAd",
        props: ['ad'],
        data() {
            return {
                dialog: false,
                editTitle: this.ad.title,
                editDescription: this.ad.description
            }
        },
        computed: {
            ...mapGetters(['loading']),
            loader() {
                return this.loading
            },
            isOwner() {
                return this.ad.ownerId === this.$store.getters.user.id
            }
        },
        methods: {
            dialogAgree() {
                if(this.editTitle !== '' && this.editDescription !== '') {
            this.$store.dispatch('UPDATE_ADS', {
                title: this.editTitle,
                description: this.editDescription,
                id: this.ad.id
            })
                }
                this.dialog = false
            },
            dialogDis() {
                this.dialog = false
                this.editTitle = this.ad.title
                this.editDescription = this.ad.description
            }
        },
    }
</script>

<style scoped>

</style>
