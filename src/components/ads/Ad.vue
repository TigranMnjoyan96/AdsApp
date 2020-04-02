<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-card>
                    <v-img :src="ad.src"></v-img>
                    <v-card-text class="text--primary">
                        <h2>{{ad.title}}</h2>
                        <p>{{ad.description}}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn class="warning">Edit</v-btn>
                        <v-btn class="success">Buy</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
// import {mapGetters} from 'vuex'
    export default {
        name: "Ad",
        props: ['id'],
        computed: {
           ad() {
               const id = this.id
               console.log(id)
               return this.$store.getters.getById(id) 
           }
        },
    }
</script>

<style scoped>

</style>
