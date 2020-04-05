<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-card v-if="!loading">
                    <v-img :src="ad.src"></v-img>
                    <v-card-text class="text--primary">
                        <h2>{{ad.title}}</h2>
                        <p>{{ad.description}}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <edit-ad :ad="ad"></edit-ad>
                        <shared :ad="ad" />
                    </v-card-actions>
                </v-card>
                <div v-else class="text-center pt-12">
                    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>

                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
import EditAd from './EditAd'
    export default {
        name: "Ad",
        props: ['id'],
        components: {
            editAd: EditAd
        },
        computed: {
           ad() {
               const id = this.id
               return this.$store.getters.getById(id) 
           },
           loading() {
               return this.$store.getters.loading
           }
        },
    }
</script>

<style scoped>

</style>
